import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/User.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

//
// TEST ROUTE
//
export const hello = async (req, res) => {
  return res.status(200).json({ message: "Hello from the server" });
};

//
// REGISTER
//
export const register = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;
  const finalUsername = username || name;

  if (!finalUsername || !email || !password) {
    return res
      .status(400)
      .json({ message: "username, email and password required" });
  }

  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  const user = await User.create({
    username: finalUsername,
    email,
    password,
  });

  const accessToken = generateAccessToken({ id: user._id });
  const refreshToken = generateRefreshToken({ id: user._id });

  user.refreshToken = refreshToken;
  await user.save();

  // only refresh token goes in cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/", // universal path
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    accessToken, // frontend stores in memory/localStorage
  });
});

//
// LOGIN
//
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "email and password required" });

  const user = await User.findOne({ email }).select("+password +refreshToken");
  if (!user)
    return res.status(400).json({ message: "Invalid email or password" });

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return res.status(400).json({ message: "Invalid email or password" });

  const accessToken = generateAccessToken({ id: user._id });
  const refreshToken = generateRefreshToken({ id: user._id });

  user.refreshToken = refreshToken;
  await user.save();

  // send refresh token cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "Login successful",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    accessToken,
  });
});

//
// LOGOUT
//
export const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (refreshToken) {
    const user = await User.findOne({ refreshToken });
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
  }

  res.clearCookie("refreshToken", { path: "/" });

  res.status(200).json({ message: "Logged out" });
});
