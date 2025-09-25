import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;

const useManagerStore = create(
    devtools((set) => ({
        managerAllProduct: [],
        manager: null,
        ManagerProductToUpdate:null,

        loginManager: async (email, password) => {
            try {
                const response = await axios.post(
                    `${baseURL}/manager/login`,
                    { email, password },
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true, // ✅ include cookies
                    }
                );

                console.log("Login response:", response.data);

                // ✅ Save JWT manually if needed (but server already sets cookie with withCredentials)
                document.cookie = `jwt=${response.data.access_token}; path=/;`;

                // ✅ Save admin detail into Zustand
                set({ manager: response.data.access_token });

                return response.data;

            } catch (error) {

            }
        },
        AllProduct: async () => {
            try {
                axios.get(`${baseURL}/manager/getAll`, {
                    withCredentials: true, // ⬅️ ensures cookies (jwt) are included
                })
                    .then((response) => {
                        console.log("Products:", response.data);
                        set({ managerAllProduct: response.data });
                    })
                    .catch((error) => {
                        console.error("Error fetching products:", error);
                    });


            } catch (error) {

            }
        },
        updateIntheStore:(product)=>{
            console.log("in the update function ",product);
            
            set({ManagerProductToUpdate:product})
        },
       logOutManager: async () => {
      try {
        const response = await axios.post(
          `${baseURL}/manager/logout`,
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
    }))
)
export default useManagerStore;