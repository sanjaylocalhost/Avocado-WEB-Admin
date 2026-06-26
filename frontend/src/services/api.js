// import axios from "axios";

// const baseURL = "https://avocado-web-admin-2.onrender.com/api";

// const api = axios.create({ baseURL });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;


// services/api.js
import axios from "axios";

const baseURL = "https://avocado-web-admin-2.onrender.com/api";

const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fixed: Get full image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  // If it's already a full URL, return it
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  
  // If it starts with /uploads, add the base URL (without /api)
  if (imagePath.startsWith("/uploads")) {
    return `https://avocado-web-admin-2.onrender.com${imagePath}`;
  }
  
  // If it's just a filename, construct the URL
  if (!imagePath.includes("/")) {
    return `https://avocado-web-admin-2.onrender.com/uploads/${imagePath}`;
  }
  
  // Default: return as is
  return imagePath;
};

// Placeholder image
export const getPlaceholderImage = () => {
  return "https://via.placeholder.com/400x300/2d6a4f/ffffff?text=No+Image";
};

// Upload image function
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  
  try {
    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export default api;