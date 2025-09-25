import React from "react";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="bg-slate-950 min-h-screen text-white flex flex-col">
      {/* Navbar */}
      {/* <Navbar /> */}

      {/* Hero Section */}
      <section className="h-[80vh] flex flex-col items-center justify-center text-center px-6 relative">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6">
          <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Product Management App
          </span>
        </h1>
        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
          Role-based, secure, and collaborative platform to streamline product
          management between <span className="text-teal-400">Admins</span> and{" "}
          <span className="text-cyan-400">Managers</span>.
        </p>
        <div className="space-x-4">
          <a
            href="/adminSignup"
            className="px-6 py-3 bg-teal-500 text-slate-900 rounded-xl font-semibold hover:bg-teal-400 transition shadow-lg"
          >
            Signup as Admin
          </a>
          <a
            href="/login"
            className="px-6 py-3 border border-teal-400 text-teal-400 rounded-xl font-semibold hover:bg-teal-400 hover:text-slate-900 transition"
          >
            Login
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 bg-slate-900">
        <h2 className="text-4xl font-bold text-center mb-12 text-teal-400">
          🚀 Key Features
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Feature Card */}
          {[
            {
              title: "🔑 Authentication",
              desc: "Secure signup and login with JWT in HTTP-only cookies.",
            },
            {
              title: "📦 Product Dashboard",
              desc: "Admins can do full CRUD, Managers can update product details.",
            },
            {
              title: "🛡️ Role-Based Access",
              desc: "Permissions enforced by JWT to ensure secure access control.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-slate-950/70 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-teal-500/30 transition"
            >
              <h3 className="text-xl font-semibold text-teal-300 mb-3">
                {f.title}
              </h3>
              <p className="text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-teal-400">
          🗓️ Project Roadmap
        </h2>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-4 top-0 bottom-0 w-1 bg-teal-500/40 rounded-full"></div>
          {[
            {
              phase: "Phase 1: Requirements",
              desc: "Define user roles, access control, and API endpoints.",
            },
            {
              phase: "Phase 2: Design",
              desc: "Create use case diagrams, database schema, and UI layout.",
            },
            {
              phase: "Phase 3: Development",
              desc: "Build backend with NestJS and frontend with React.",
            },
            {
              phase: "Phase 4: Testing",
              desc: "Unit & integration tests for authentication and CRUD.",
            },
            {
              phase: "Phase 5: Deployment",
              desc: "Secure deployment with production-ready optimizations.",
            },
          ].map((item, i) => (
            <div key={i} className="flex items-start space-x-6 mb-10">
              <div className="relative z-10 w-6 h-6 flex items-center justify-center bg-slate-950 border-2 border-teal-400 rounded-full">
                <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">
                  {item.phase}
                </h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 border-t border-slate-800 text-center">
        <p className="text-gray-400 text-sm">
          Developed by{" "}
          <span className="text-teal-400 font-semibold">Voltic Emp</span> 🚀
        </p>
      </footer>
    </div>
  );
}

export default Home;
