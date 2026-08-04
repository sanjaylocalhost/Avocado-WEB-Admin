// // App.jsx
// import { Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import PrivateRoute from "./components/PrivateRoute";
// import AdminRoute from "./components/AdminRoute";
// import AdminLayout from "./components/AdminLayout";

// // Public Pages
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Products from "./pages/Products";
// import ProductDetail from "./pages/ProductDetail";
// import Farming from "./pages/Farming";
// import Gallery from "./pages/Gallery";
// import Contact from "./pages/Contact";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import CustomerDashboard from "./pages/Dashboard";
// import NotFound from "./pages/NotFound";

// // Admin Pages
// import AdminDashboard from "./pages/AdminDashboard";
// import AdminProducts from "./pages/AdminProducts";
// import AdminInquiries from "./pages/AdminInquiries";
// import AdminLeads from "./pages/AdminLeads";
// import AdminAnalytics from "./pages/Analytics";
// import AdminSettings from "./pages/Settings";

// export default function App() {
//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Navbar should NOT be shown on admin routes */}
//       <Routes>
//         {/* Public Routes with Navbar */}
//         <Route
//           path="/*"
//           element={
//             <>
//               <Navbar />
//               <main className="flex-1">
//                 <Routes>
//                   <Route path="/" element={<Home />} />
//                   <Route path="/about" element={<About />} />
//                   <Route path="/products" element={<Products />} />
//                   <Route path="/products/:id" element={<ProductDetail />} />
//                   <Route path="/farming" element={<Farming />} />
//                   <Route path="/gallery" element={<Gallery />} />
//                   <Route path="/contact" element={<Contact />} />
//                   <Route path="/login" element={<Login />} />
//                   <Route path="/signup" element={<Signup />} />
//                   <Route
//                     path="/dashboard"
//                     element={
//                       <PrivateRoute>
//                         <CustomerDashboard />
//                       </PrivateRoute>
//                     }
//                   />
//                 </Routes>
//               </main>
//               <Footer />
//             </>
//           }
//         />

//         {/* Admin Routes - No Navbar/Footer */}
//         <Route
//           path="/admin"
//           element={
//             <AdminRoute>
//               <AdminLayout />
//             </AdminRoute>
//           }
//         >
//           <Route index element={<Navigate to="/admin/dashboard" replace />} />
//           <Route path="dashboard" element={<AdminDashboard />} />
//           <Route path="products" element={<AdminProducts />} />
//           <Route path="products/new" element={<AdminProducts />} />
//           <Route path="inquiries" element={<AdminInquiries />} />
//           <Route path="leads" element={<AdminLeads />} />
//           <Route path="analytics" element={<AdminAnalytics />} />
//           <Route path="settings" element={<AdminSettings />} />
//         </Route>

//         {/* 404 Not Found */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </div>
//   );
// }

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // 👈 Added this import
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./components/AdminLayout";
import PublicLayout from "./components/PublicLayout";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Farming from "./pages/Farming";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CustomerDashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminInquiries from "./pages/AdminInquiries";
import AdminLeads from "./pages/AdminLeads";
import AdminAnalytics from "./pages/Analytics";
import AdminSettings from "./pages/Settings";

export default function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white/60">Loading application...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/farming" element={<Farming />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <CustomerDashboard />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Routes - Add key to force remount */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<AdminProducts />} />
          <Route path="inquiries" element={<AdminInquiries />} />
          <Route path="leads" element={<AdminLeads />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}