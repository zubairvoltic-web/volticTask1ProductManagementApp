import React, { useEffect, useState } from "react";
import useManagerStore from "../store/managerStore";
import { useNavigate } from "react-router-dom";

function ManagerProduct() {
  const [products, setProducts] = useState([]);

  const fetchProduct = useManagerStore((state) => state.AllProduct);
  const managerProduct = useManagerStore((state) => state.managerAllProduct);
  const updatePro = useManagerStore((state) => state.updateIntheStore);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    setProducts(managerProduct);
    console.log("product in the product folder ", managerProduct);
  }, [managerProduct]);

  const UpdateTheProduct = (product) => {
    console.log("product to update", product);
    updatePro(product);
    navigate("/UpdateManagerProduct");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h2 className="text-3xl font-bold text-center text-teal-400 mb-10">
        Manager Products
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div
            key={p._id}
            className="relative bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl hover:shadow-teal-500/30 transition hover:-translate-y-2 group"
          >
            {/* Gradient Border Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition"></div>

            {/* Content */}
            <div className="relative">
              <h3 className="text-xl font-bold text-teal-400">{p.name}</h3>
              <p className="text-gray-300 mt-1 line-clamp-2">{p.description}</p>
              <p className="text-lg font-semibold mt-3 text-cyan-400">
                {p.price} PKR
              </p>

              {/* Manage Button */}
              <div className="flex mt-5">
                <button
                  onClick={() => UpdateTheProduct(p)}
                  className="w-full py-2 rounded-full bg-teal-500 hover:bg-teal-400 transition text-sm font-medium text-slate-900"
                >
                  Manage
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManagerProduct;
