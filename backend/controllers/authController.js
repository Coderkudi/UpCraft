import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/User.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

export const hello = async (req, res) => {
  return res.status(200).json({ message: "Hello from the server" });
};

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

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // res.cookie("accessToken", accessToken, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: "lax",
  //   path: "/",
  //   maxAge: 15 * 60 * 1000,
  // });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    accessToken,
  });
});

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

export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select(
    "-password -refreshToken"
  );
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    success: true,
    user,
  });
});

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

export const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { username, email } = req.body;

  if (!username && !email) {
    return res.status(400).json({ message: "Please provide data to update" });
  }

  if (email) {
    const emailExists = await User.findOne({ email, _id: { $ne: userId } });
    if (emailExists) {
      return res.status(400).json({ message: "Email already in use" });
    }
  }

  if (username) {
    const usernameExists = await User.findOne({
      username,
      _id: { $ne: userId },
    });
    if (usernameExists) {
      return res.status(400).json({ message: "Username already in use" });
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { username, email },
    { new: true, runValidators: true }
  ).select("-password -refreshToken");

  return res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: updatedUser,
  });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res
      .status(400)
      .json({ message: "oldPassword and newPassword are required" });
  }

  const user = await User.findById(req.user.id).select("+password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await user.comparePassword(oldPassword);
  if (!isMatch) {
    return res.status(400).json({ message: "Old password is incorrect" });
  }

  user.password = newPassword;

  await user.save();

  res.status(200).json({ message: "Password updated successfully" });
});
