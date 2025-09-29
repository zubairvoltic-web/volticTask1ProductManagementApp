import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import useUsersStore from "../store/usersStore";

function CreateProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  // Zustand store
  const productToUpdate = useUsersStore((state) => state.productToUpdate);
  const createPro = useUsersStore((state) => state.createProduct);
  const updatePro = useUsersStore((state) => state.updateProduct);

  const handleSubmit = async () => {
    if (!name || !description || !price) {
      alert("All fields are required!");
      return;
    }

    try {
      if (productToUpdate) {
        // Update existing
        await updatePro(productToUpdate._id, name, description, price);
        alert("Product updated successfully!");
      } else {
        // Create new
        await createPro(name, description, price);
        alert("Product created successfully!");
      }

      navigate("/products"); // ✅ redirect after action
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  // Pre-fill fields if updating
  useEffect(() => {
    if (productToUpdate) {
      setName(productToUpdate.name || "");
      setDescription(productToUpdate.description || "");
      setPrice(productToUpdate.price || "");
    }
  }, [productToUpdate]);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-slate-800">
        <div className="h-auto bg-slate-950 p-8 rounded-2xl shadow-xl w-full max-w-md hover:scale-105 hover:shadow-teal-500/30 transform transition duration-300">
          {/* Title */}
          <h2 className="text-3xl font-bold text-center mb-2 text-teal-400">
            {productToUpdate ? "Update Product" : "Create Product"}
          </h2>
          <p className="text-center text-gray-400 mb-8 text-sm">
            {productToUpdate
              ? "Edit the details of your product"
              : "Add a new product to the store"}
          </p>

          {/* Inputs */}
          <div className="space-y-5">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              className="w-full px-4 py-2 border border-teal-400 bg-slate-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              className="w-full px-4 py-2 border border-teal-400 bg-slate-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter product price"
              className="w-full px-4 py-2 border border-teal-400 bg-slate-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />

            {/* Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-teal-500 text-slate-900 py-2 rounded-lg font-semibold transition duration-300 hover:bg-teal-400 hover:shadow-lg"
            >
              {productToUpdate ? "Update Product" : "Create Product"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
