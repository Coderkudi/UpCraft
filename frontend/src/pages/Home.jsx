import { Link } from "react-router-dom";
import { ArrowRight, Star, Shield, Smartphone } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">
      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-indigo-900/20 to-purple-900/30 blur-3xl opacity-50" />
        <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 mb-8">
            <Star className="w-4 h-4" />
            <span className="text-sm font-medium">Learn. Build. Certify.</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent mb-8">
            Build Real Skills <br /> That Actually Matter
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Learn job-ready skills through structured courses, hands-on lessons,
            and certifications designed for real-world impact.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg transition transform hover:scale-105 shadow-xl shadow-blue-900/30 flex items-center justify-center gap-2"
            >
              Start Learning
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/register"
              className="px-8 py-4 rounded-xl border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 transition text-lg"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: <Shield className="w-6 h-6 text-blue-400" />,
              title: "Industry Verified",
              desc: "Content reviewed by professionals to ensure relevance and accuracy.",
              glow: "hover:border-blue-500/50",
            },
            {
              icon: <Smartphone className="w-6 h-6 text-purple-400" />,
              title: "Learn Anywhere",
              desc: "Access lessons anytime on any device, at your own pace.",
              glow: "hover:border-purple-500/50",
            },
            {
              icon: <Star className="w-6 h-6 text-green-400" />,
              title: "Get Certified",
              desc: "Earn certificates you can actually showcase.",
              glow: "hover:border-green-500/50",
            },
          ].map((f, i) => (
            <div
              key={i}
              className={`p-8 rounded-3xl bg-gray-900/60 border border-gray-800 transition ${f.glow}`}
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
