// src/store/usersStore.js
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const useUsersStore = create(
  devtools((set) => ({
    Products: [],
    userDetail: null,       // ✅ generic
    userProfile: null,      // ✅ generic
    productToUpdate: null,

    // Login for ANY user (admin/manager/other roles)
    login: async (email, password) => {
      try {
        const response = await axios.post(
          `${baseURL}/user/login`,
          { email, password },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        console.log("Login response:", response.data);

        // ✅ Save user detail
        console.log("the userDetail", response.data);

        set({ userDetail: response.data }); // rename admin → user

        return response.data;
      } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        throw error;
      }
    },


    logOutUser: async () => {
      try {
        const response = await axios.post(
          `${baseURL}/user/logout`,
          {},
          { withCredentials: true }
        );

        console.log(response.data);
        alert(response.data.message);

        set({ userDetail: null }); // ✅ clear generic user

        window.location.href = "/login";
      } catch (error) {
        console.error("Logout failed:", error);
      }
    },

    // Register user (role can be admin/manager/etc.)
    registerUser: async (name, email, password, age, role = "user") => {
      try {
        const response = await axios.post(
          `${baseURL}/user/register`,
          {
            name,
            email,
            password,
            age: Number(age),
            role,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        console.log("Signup success:", response.data);
        set({ userProfile: response.data });

        // set cookie
        document.cookie = `token=${response.data.access_token}; path=/;`;
      } catch (error) {
        console.error("Signup failed:", error);
      }
    },

    // Product CRUD
    deleteProduct: async (productId) => {
      try {
        const response = await axios.delete(
          `${baseURL}/product/delete/${productId}`,
          { withCredentials: true }
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
        const response = await axios.get(`${baseURL}/product/all`, {
          withCredentials: true,
        });
        console.log("Products:", response.data);
        set({ Products: response.data });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },

    updateProductState: (product) => {
      set({ productToUpdate: product });
    },

    createProduct: async (name, description, price) => {
      try {
        const response = await axios.post(
          `${baseURL}/product/create`,
          { name, description, price: Number(price) },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        console.log("Product created:", response.data);
      } catch (error) {
        console.error("Product creation failed:", error);
        alert("Failed to create product");
      }
    },

    updateProduct: async (productId, name, description, price) => {
      try {
        const response = await axios.put(
          `${baseURL}/product/update/${productId}`,
          { name, description, price: Number(price) },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        // alert("Product updated successfully!");
        return response.data;
      } catch (error) {
        console.error("Update failed:", error.response?.data || error.message);
        alert("Failed to update product");
        throw error;
      }
    },

    // Admin-specific: Add manager
    addManager: async (name, email, password, role = "manager") => {
      try {
        const response = await axios.post(
          `${baseURL}/user/create-manager`,
          { name, email, password, role },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
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
    userProfile: async () => {
      try {
        const response = await axios.get(
          `${baseURL}/user/profile`,
          {
            withCredentials: true, // ✅ send JWT cookie
          }
        );

        console.log("Profile response:", response.data);

        // Save the logged-in user in Zustand
        set({ userDetail: response.data });

        return response.data;
      } catch (error) {
        console.error("Fetching profile failed:", error.response?.data || error.message);
        throw error;
      }
    }

  }))
);

export default useUsersStore;
