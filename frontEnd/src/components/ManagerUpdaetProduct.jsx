import React, { useEffect, useState } from "react";
import useManagerStore from "../store/managerStore";
import useAdminStore from "../store/adminStore";
import { useNavigate } from "react-router-dom";

function ManagerUpdateProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const productToUpdate = useManagerStore((state) => state.ManagerProductToUpdate);
  const updatePro = useAdminStore((state) => state.updateProductWithAdmin);
  const navigate = useNavigate();

  useEffect(() => {
    if (productToUpdate) {
      setName(productToUpdate.name || "");
      setDescription(productToUpdate.description || "");
      setPrice(productToUpdate.price || "");
    }
  }, [productToUpdate]);

  const updateProduct = async () => {
    await updatePro(productToUpdate._id, name, description, price);
    navigate("/managerDashBoard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-6">
      <div className="bg-slate-950 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-teal-400 mb-6">
          Update Product
        </h2>

        <div className="space-y-5">
          {/* Name */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            className="w-full px-4 py-2 border border-teal-400 bg-slate-900 text-white rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
          />

          {/* Description */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            rows="4"
            className="w-full px-4 py-2 border border-teal-400 bg-slate-900 text-white rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
          />

          {/* Price */}
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter product price"
            className="w-full px-4 py-2 border border-teal-400 bg-slate-900 text-white rounded-lg focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
          />

          {/* Save Button */}
          <button
            onClick={updateProduct}
            className="w-full bg-teal-500 text-slate-900 py-2 rounded-lg font-semibold hover:bg-teal-400 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManagerUpdateProduct;
