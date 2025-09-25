// src/store/adminStore.js
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_BASE_URL;

const useAdminStore = create(
  devtools((set) => ({
    adminProducts: [],
    adminDetail: null,
    adminProfile: null,
    productToUpdate: null,

    loginAdmin: async (email, password) => {
      try {
        const response = await axios.post(
          `${baseURL}/auth/login`,
          { email, password },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true, // ✅ include cookies
          }
        );

        console.log("Login response:", response.data);


        // ✅ Save admin detail into Zustand
        set({ adminDetail: response.data.admin });

        return response.data;
      } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        throw error;
      }
    },

    logOutAdmin: async () => {
      try {
        const response = await axios.post(
          `${baseURL}/auth/logout`,
          {},
          { withCredentials: true }  // important: so cookies are included
        );

        console.log(response.data);
        alert(response.data.message);

        // Clear any local state (store, tokens in memory/localStorage)
        set({ admin: null });

        // Navigate back to login
        window.location.href = "/login";
      } catch (error) {
        console.error("Logout failed:", error);
      }
    },

    signupAdmin: async (name, email, password, age) => {
      try {
        const response = await axios.post(
          `${baseURL}/auth/register`,
          {
            name,
            email,
            password,
            age: Number(age) // ✅ ensure age is a number
          },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true, // ✅ if you want cookies
          }
        )

        console.log("Signup success:", response.data)
        set({ adminProfile: response.data });
        // set it in the cookies
        document.cookie = `token=${response.data.access_token}; path=/;`

      } catch (error) {
        console.error("Signup failed:", error)
      }
    },
    deleteProduct: async (productId) => {
      try {
        console.log("Deleting product with ID:", productId);

        const response = await axios.delete(
          `${baseURL}/product/delete/${productId}`,
          {
            withCredentials: true, // ✅ send cookie automatically
          }
        );

        console.log("Delete success:", response.data);
        alert("Product deleted successfully!");
        return response.data;
      } catch (error) {
        console.error("Delete failed:", error.response?.data || error.message);
        alert("Failed to delete product");
        throw error;
      }

    },
    AllProduct: async () => {
      try {
        axios.get(`${baseURL}/product/all`, {
          withCredentials: true, // ⬅️ ensures cookies (jwt) are included
        })
          .then((response) => {
            console.log("Products:", response.data);
            set({ adminProducts: response.data });
          })
          .catch((error) => {
            console.error("Error fetching products:", error);
          });


      } catch (error) {

      }
    },
    updateProductState: (product) => {
      set({ productToUpdate: product })

    },
    createPro: async (name, description, price) => {
      try {
        console.log("NAME", name, description, price);

        const response = await axios.post(
          `${baseURL}/product/create`,
          {
            name,
            description,
            price: Number(price),
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true, // ✅ include server-set cookie automatically
          }
        );

        console.log("Product created:", response.data);
        // ("/products")
        // alert("Product created successfully!");
      } catch (error) {
        console.error("Product creation failed:", error);

        alert("Failed to create product");
      }

    },
    updateProductWithAdmin: async (productId, name, description, price) => {

      try {
        console.log("updated product with ID:", productId);
        console.log("NAME", name, description, price);

        const response = await axios.put(
          `${baseURL}/product/update/${productId}`,
          {
            name,
            description,
            price: Number(price),
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true, // ✅ include server-set cookie automatically
          }
        );
        alert("product updated Successfully")




      } catch (error) {
        console.error("update failed:", error.response?.data || error.message);
        alert("Failed to update product");
        throw error;
      }
    },
    adminAddManager: async (name, email, password, role) => {
      try {
        const response = await axios.post(
          `${baseURL}/manager/AddUserRole`,
          {
            name,
            email,
            password,
            role,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true, // ✅ include cookies (JWT)
          }
        );
        alert("Manager added successfully!");
        return response.data;
      } catch (error) {
        console.error("Add manager failed:", error.response?.data || error.message);
        alert("Failed to add manager");
        throw error;
      }
    },

  }))
);

export default useAdminStore;
