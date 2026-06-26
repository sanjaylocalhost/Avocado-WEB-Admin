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

// Single image upload only
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith("http")) return imagePath;
  return `https://avocado-web-admin-2.onrender.com/uploads${imagePath.replace(/^\/uploads/, '')}`;
};

export const getPlaceholderImage = () => {
  return "https://via.placeholder.com/300x300?text=No+Image";
};

// Product-specific API calls with single image handling
export const productAPI = {
  // Get all products
  getAll: async (params = {}) => {
    const response = await api.get("/products", { params });
    return response.data;
  },

  // Get single product
  getById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Create product with optional single image
  create: async (productData, imageFile = null) => {
    let imageUrl = productData.image || "";
    
    // If there's an image file, upload it first
    if (imageFile) {
      const uploadResult = await uploadImage(imageFile);
      imageUrl = uploadResult.imageUrl;
    }
    
    const data = {
      ...productData,
      image: imageUrl,
    };
    
    const response = await api.post("/products", data);
    return response.data;
  },

  // Update product with optional single image
  update: async (id, productData, imageFile = null) => {
    let imageUrl = productData.image || "";
    
    // If there's a new image file, upload it
    if (imageFile) {
      const uploadResult = await uploadImage(imageFile);
      imageUrl = uploadResult.imageUrl;
    }
    
    const data = {
      ...productData,
      image: imageUrl,
    };
    
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  },

  // Delete product
  delete: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};

// Request interceptor for FormData
api.interceptors.request.use(
  (config) => {
    // If the data is FormData, remove the default Content-Type
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response) {
      const { status, data } = error.response;
      
      if (status === 401) {
        // Unauthorized - redirect to login
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      
      console.error(`API Error (${status}):`, data.message || data);
    } else if (error.request) {
      console.error("Network Error: No response from server");
    } else {
      console.error("Error:", error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;