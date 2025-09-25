import React from "react";

function Footer() {
  return (
    <footer className="py-10 bg-slate-900 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-teal-400">
            Product Management App
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage products securely with role-based access.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-gray-400 text-sm">
          <a
            href="/home"
            className="hover:text-teal-400 transition"
          >
            Home
          </a>
          <a
            href="/products"
            className="hover:text-teal-400 transition"
          >
            Products
          </a>
          <a
            href="/addProduct"
            className="hover:text-teal-400 transition"
          >
            Add Product
          </a>
        </div>

        {/* Credits */}
        <div className="text-gray-500 text-xs">
          © {new Date().getFullYear()}{" "}
          <span className="text-teal-400 font-semibold">Voltic Emp</span>. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
