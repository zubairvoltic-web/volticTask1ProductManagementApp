import React from "react";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="bg-slate-950 min-h-screen text-white">
      {/* <Navbar /> */}

      {/* Hero Section */}
      <div className="h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl sm:text-6xl font-bold text-teal-400 mb-4">
          Welcome to Product Management App
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          A secure, role-based system for managing products. Admins have full
          control, while managers can collaborate by updating product details.
        </p>
      </div>

      {/* Features Section */}
      <section className="px-6 py-12 bg-slate-900">
        <h2 className="text-3xl font-bold text-teal-400 mb-8 text-center">
          Key Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl hover:shadow-teal-500/30 transition">
            <h3 className="text-xl font-semibold text-teal-300 mb-3">
              🔑 Authentication
            </h3>
            <p className="text-gray-400">
              Secure signup and login with JWT stored in HTTP-only cookies for
              safe authentication.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl hover:shadow-teal-500/30 transition">
            <h3 className="text-xl font-semibold text-teal-300 mb-3">
              📦 Product Dashboard
            </h3>
            <p className="text-gray-400">
              Admins can perform full CRUD operations. Managers can view and
              update products.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl hover:shadow-teal-500/30 transition">
            <h3 className="text-xl font-semibold text-teal-300 mb-3">
              🛡️ Role-Based Access
            </h3>
            <p className="text-gray-400">
              Permissions are validated via tokens to ensure managers and admins
              only see allowed actions.
            </p>
          </div>
        </div>
      </section>

      {/* Planning Timeline */}
      <section className="px-6 py-12">
        <h2 className="text-3xl font-bold text-teal-400 mb-8 text-center">
          Project Roadmap
        </h2>
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-3 h-3 bg-teal-400 rounded-full mt-2"></div>
            <div>
              <h4 className="font-semibold text-white">Phase 1: Requirements</h4>
              <p className="text-gray-400 text-sm">
                Define user roles, access control, and API endpoints.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-3 h-3 bg-teal-400 rounded-full mt-2"></div>
            <div>
              <h4 className="font-semibold text-white">Phase 2: Design</h4>
              <p className="text-gray-400 text-sm">
                Create use case diagrams, database schema, and UI architecture.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-3 h-3 bg-teal-400 rounded-full mt-2"></div>
            <div>
              <h4 className="font-semibold text-white">Phase 3: Development</h4>
              <p className="text-gray-400 text-sm">
                Build backend with NestJS, frontend with React, and integrate
                JWT authentication.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-3 h-3 bg-teal-400 rounded-full mt-2"></div>
            <div>
              <h4 className="font-semibold text-white">Phase 4: Testing</h4>
              <p className="text-gray-400 text-sm">
                Unit and integration testing for authentication and CRUD
                endpoints.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-3 h-3 bg-teal-400 rounded-full mt-2"></div>
            <div>
              <h4 className="font-semibold text-white">Phase 5: Deployment</h4>
              <p className="text-gray-400 text-sm">
                Secure deployment with XSS protection and production-ready setup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-slate-900 border-t border-slate-800">
        <p className="text-center text-gray-400 text-sm">
          Developed by{" "}
          <span className="text-teal-400 font-semibold">Voltic Emp</span>
        </p>
      </footer>
    </div>
  );
}

export default Home;
