// // pages/AdminLogin.jsx
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function AdminLogin() {
//   const { adminLogin } = useAuth();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       await adminLogin(form.email, form.password);
//       navigate("/admin/dashboard");
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid admin credentials");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-cream px-4 py-12">
//       <div className="bg-white rounded-2xl border border-line p-8 max-w-md w-full">
//         <div className="text-center mb-8">
//           <h1 className="font-display text-3xl text-ink">Admin Login</h1>
//           <p className="text-ink/60 mt-2">For farm staff managing products and inquiries.</p>
//         </div>

//         {error && (
//           <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-ink/70 mb-1">Email</label>
//             <input
//               type="email"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               className="w-full rounded-lg border border-line px-3 py-2 bg-white focus:ring-2 focus:ring-skin"
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label className="block text-sm font-medium text-ink/70 mb-1">Password</label>
//             <input
//               type="password"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               className="w-full rounded-lg border border-line px-3 py-2 bg-white focus:ring-2 focus:ring-skin"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-2.5 rounded-full bg-skin text-cream font-medium hover:bg-skin-dark transition-colors disabled:opacity-60"
//           >
//             {loading ? "Logging in..." : "Log in to admin panel"}
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <Link to="/login" className="text-sm text-ink/60 hover:text-skin">
//             Regular user login →
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }