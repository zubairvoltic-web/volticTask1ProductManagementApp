import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import useUsersStore from "../store/usersStore";

function Product() {
  const [userRole,setUserRole] = useState("")
  const navigate = useNavigate();

  // Zustand store
  const fetchProducts = useUsersStore((state) => state.AllProduct);
  const userProfile = useUsersStore((state) => state.userProfile)// function
  const products = useUsersStore((state) => state.Products);        // ✅ actual products array
  const deleteProduct = useUsersStore((state) => state.deleteProduct);
  const setProductToUpdate = useUsersStore((state) => state.updateProductState);

  // Fetch all products on mount
   const userDetail = useUsersStore((state)=>state.userDetail)
  
  
  useEffect(() => {
  if (userDetail) {
    console.log("the user DEtal ", userDetail);
    setUserRole(userDetail.role);
  } else {
    setUserRole(""); // or null if you prefer
  }
}, [userDetail]);
  useEffect(() => {
    fetchProducts();
    userProfile()
  }, [fetchProducts]);

  const deleteWithId = async (productId) => {
    console.log("Deleting product with ID:", productId);
    await deleteProduct(productId);
    fetchProducts(); // ✅ refresh after delete
  };

  const updateProduct = (product) => {
    setProductToUpdate(product);
    navigate("/addProduct");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <Navbar />
      <button className='bg-teal-400 text-slate-950 px-4 mb-3 py-2 rounded-lg font-semibold hover:bg-teal-300 hover:shadow-lg transition duration-300'><a href="/addManager"> Add Your Manager</a></button>

      <h2 className="text-3xl font-bold mt-6 mb-6 text-teal-400">Products</h2>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((p) => (
          <div
            key={p._id}
            className="relative bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl hover:shadow-teal-500/30 transition hover:-translate-y-2 group"
          >
            {/* Glow border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition"></div>

            {/* Product content */}
            <div className="relative">
              <h3 className="text-xl font-bold text-teal-400">{p.name}</h3>
              <p className="text-gray-300 mt-1 line-clamp-2">{p.description}</p>
              <p className="text-lg font-semibold mt-3 text-cyan-400">
                {p.price} PKR
              </p>

              {/* Actions */}
              <div className="flex space-x-3 mt-5">
                {userRole === "admin"?
                <button
                  onClick={() => deleteWithId(p._id)}
                  className="flex-1 py-2 rounded-full bg-red-600 hover:bg-red-700 transition text-sm font-medium"
                >
                  Delete
                </button>:null}
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
    </div>
  );
}

export default Product;
