// import { Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import PrivateRoute from "./components/PrivateRoute";
// import AdminRoute from "./components/AdminRoute";
// import Layout from "./components/Layout";

// // Public Pages
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Products from "./pages/Products";
// import ProductDetail from "./pages/ProductDetail";
// import Farming from "./pages/Farming";
// import Gallery from "./pages/Gallery";
// import Contact from "./pages/Contact";
// import Login from "./pages/Login"; // This now handles both user and admin login
// import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
// import NotFound from "./pages/NotFound";

// // Admin Pages
// import AdminDashboard from "./pages/AdminDashboard";
// import Leads from "./pages/Leads";
// import Analytics from "./pages/Analytics";
// import Settings from "./pages/Settings";

// export default function App() {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-1">
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/products" element={<Products />} />
//           <Route path="/products/:id" element={<ProductDetail />} />
//           <Route path="/farming" element={<Farming />} />
//           <Route path="/gallery" element={<Gallery />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/login" element={<Login />} /> {/* Single login page */}
//           <Route path="/signup" element={<Signup />} />
          
//           {/* User Dashboard */}
//           <Route
//             path="/dashboard"
//             element={
//               <PrivateRoute>
//                 <Dashboard />
//               </PrivateRoute>
//             }
//           />
          
//           {/* Admin Routes with Sidebar Layout */}
//           <Route
//             path="/admin"
//             element={
//               <AdminRoute>
//                 <Layout />
//               </AdminRoute>
//             }
//           >
//             <Route index element={<Navigate to="/admin/dashboard" replace />} />
//             <Route path="dashboard" element={<AdminDashboard />} />
//             <Route path="products" element={<AdminDashboard />} />
//             <Route path="leads" element={<Leads />} />
//             <Route path="inquiries" element={<AdminDashboard />} />
//             <Route path="analytics" element={<Analytics />} />
//             <Route path="settings" element={<Settings />} />
//           </Route>
          
//           {/* 404 Not Found */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </main>
//       <Footer />
//     </div>
//   );
// }


import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./components/AdminLayout";

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
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/farming" element={<Farming />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Customer Dashboard - No Sidebar */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <CustomerDashboard />
              </PrivateRoute>
            }
          />
          
          {/* Admin Routes with Sidebar */}
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
            <Route path="inquiries" element={<AdminInquiries />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          
          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}