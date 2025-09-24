import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import useAdminStore from "../store/adminStore";

function CreateProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const baseURL = import.meta.env.VITE_BASE_URL;
  const productToUpdate = useAdminStore((state)=>state.productToUpdate)
  const createPro = useAdminStore((state)=>state.createPro)
  const updatePro = useAdminStore((state)=>state.updateProductWithAdmin)
  const navigate = useNavigate();

  const createProduct = async () => {
    console.log('adkahsd',name,description,price);
    
    if(!productToUpdate){
      await createPro(name, description, price);
    }else{
      await updatePro(productToUpdate._id,name,description,price)

    }
    navigate("/products")
   
  };
  
  useEffect(()=>{
    console.log("update teh ",productToUpdate);
    setName(productToUpdate?.name||"");
    setDescription(productToUpdate?.description||"")
    setPrice(productToUpdate?.price ||"")

  },[productToUpdate])

  return (
    <div>
        <Navbar/>
        <div className="min-h-screen flex items-center justify-center bg-slate-800">
        
      <div className="h-auto bg-slate-950 p-8 rounded-2xl shadow-xl w-full max-w-md hover:scale-105 hover:shadow-teal-500/30 transform transition duration-300">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-2 text-teal-400">Create Product</h2>
        <p className="text-center text-gray-400 mb-8 text-sm">Add a new product to the store</p>

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
            onClick={createProduct}
            className="w-full bg-teal-500 text-slate-900 py-2 rounded-lg font-semibold transition duration-300 hover:bg-teal-400 hover:shadow-lg"
          >
            Create Product
          </button>
        </div>
      </div>
    </div>
    </div>
    
  );
}

export default CreateProduct;
