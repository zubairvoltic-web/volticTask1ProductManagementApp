import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import useAdminStore from "../store/usersStore";
import useUsersStore from "../store/usersStore";


function AdminProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const deleteProduct = useUsersStore((state) => state.deleteProduct);
  const fetchProducts = useUsersStore((state) => state.AllProduct);
  const productToUpdate = useUsersStore((state) => state.updateProductState);

  useEffect(() => {
    fetchProducts();
  }, []);

  const adminProducts = useAdminStore((state) => state.adminProducts);

  useEffect(() => {
    setProducts(adminProducts || []);
  }, [adminProducts]);

  const deleteWithId = async (productId) => {
    console.log("Deleting product with ID:", productId);
    await deleteProduct(productId);
  };

  const updateProduct = (product) => {
    productToUpdate(product);
    navigate("/addProduct");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <Navbar />
      <h2 className="text-3xl font-bold mt-6 mb-6 text-teal-400">Products</h2>
      <button className='bg-teal-400 text-slate-950 px-4 mb-3 py-2 rounded-lg font-semibold hover:bg-teal-300 hover:shadow-lg transition duration-300'><a href="/addManager"> Add Your Manager</a></button>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

              {/* Actions */}
              <div className="flex space-x-3 mt-5">
                <button
                  onClick={() => deleteWithId(p._id)}
                  className="flex-1 py-2 rounded-full bg-red-600 hover:bg-red-700 transition text-sm font-medium"
                >
                  Delete
                </button>
                <button
                  onClick={() => updateProduct(p)}
                  className="flex-1 py-2 rounded-full bg-green-600 hover:bg-green-700 transition text-sm font-medium"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Manager Section */}
      <div className="mt-12">
        
      </div>
    </div>
  );
}

export default AdminProducts;
