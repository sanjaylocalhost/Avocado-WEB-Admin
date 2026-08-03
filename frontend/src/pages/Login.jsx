// import { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import AvocadoMark from "../components/AvocadoMark";

// export default function Login() {
//   const { login, adminLogin } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [loginType, setLoginType] = useState("user"); // "user" or "admin"

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError("");
//     setSubmitting(true);
    
//     try {
//       if (loginType === "admin") {
//         await adminLogin(email, password);
//         navigate("/admin/dashboard", { replace: true });
//       } else {
//         await login(email, password);
//         const redirectTo = location.state?.from?.pathname || "/dashboard";
//         navigate(redirectTo, { replace: true });
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Could not log in. Check your details.");
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-cream to-flesh-light/30 px-4 py-12">
//       <div className="w-full max-w-md">
//         {/* Logo and Header */}
//         <div className="text-center mb-8">
//           <AvocadoMark size={56} className="mx-auto mb-4" />
//           <h1 className="font-display text-3xl text-ink">Welcome back</h1>
//           <p className="text-ink/60 mt-2">
//             {loginType === "admin" 
//               ? "Access the admin dashboard to manage your farm" 
//               : "Log in to send inquiries and track your requests"}
//           </p>
//         </div>

//         {/* Login Type Selector */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-line p-1.5 mb-6 flex gap-1">
//           <button
//             onClick={() => {
//               setLoginType("user");
//               setError("");
//               setEmail("");
//               setPassword("");
//             }}
//             className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
//               loginType === "user"
//                 ? "bg-skin text-cream shadow-md"
//                 : "text-ink/60 hover:text-ink hover:bg-cream/50"
//             }`}
//           >
//             <span className="flex items-center justify-center gap-2">
//               <span className="text-lg">👤</span>
//               User Login
//             </span>
//           </button>
//           <button
//             onClick={() => {
//               setLoginType("admin");
//               setError("");
//               setEmail("");
//               setPassword("");
//             }}
//             className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
//               loginType === "admin"
//                 ? "bg-seed text-cream shadow-md"
//                 : "text-ink/60 hover:text-ink hover:bg-cream/50"
//             }`}
//           >
//             <span className="flex items-center justify-center gap-2">
//               <span className="text-lg">🛡️</span>
//               Admin Login
//             </span>
//           </button>
//         </div>

//         {/* Login Form */}
//         <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm border border-line rounded-2xl p-6 shadow-lg">
//           {/* Role-specific Badge */}
//           {loginType === "admin" ? (
//             <div className="mb-4 p-3 bg-seed/10 border border-seed/20 rounded-lg flex items-center gap-3">
//               <span className="text-2xl">🔐</span>
//               <div>
//                 <p className="text-sm font-semibold text-seed">Admin Access</p>
//                 <p className="text-xs text-ink/50">Enter your admin credentials to manage the farm</p>
//               </div>
//             </div>
//           ) : (
//             <div className="mb-4 p-3 bg-skin/10 border border-skin/20 rounded-lg flex items-center gap-3">
//               <span className="text-2xl">👋</span>
//               <div>
//                 <p className="text-sm font-semibold text-skin-dark">Customer Login</p>
//                 <p className="text-xs text-ink/50">Access your inquiries and track requests</p>
//               </div>
//             </div>
//           )}

//           <div className="space-y-4">
//             {/* Email Field */}
//             <div>
//               <label className="block text-sm font-medium text-ink/70 mb-1">
//                 {loginType === "admin" ? "Admin Email" : "Email Address"}
//               </label>
//               <div className="relative">
//                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40">
//                   {loginType === "admin" ? "🔑" : "📧"}
//                 </span>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   placeholder={loginType === "admin" ? "admin@meenakshiplantation.com" : "you@example.com"}
//                   className="w-full rounded-lg border border-line pl-10 pr-3 py-2.5 bg-white focus:ring-2 focus:ring-skin focus:border-transparent transition-all"
//                 />
//               </div>
//             </div>

//             {/* Password Field */}
//             <div>
//               <label className="block text-sm font-medium text-ink/70 mb-1">Password</label>
//               <div className="relative">
//                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40">🔒</span>
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   placeholder="Enter your password"
//                   className="w-full rounded-lg border border-line pl-10 pr-3 py-2.5 bg-white focus:ring-2 focus:ring-skin focus:border-transparent transition-all"
//                 />
//               </div>
//             </div>

//             {/* Error Message */}
//             {error && (
//               <div className="p-3 bg-red-50 border border-red-200 rounded-lg animate-shake">
//                 <p className="text-sm text-red-700 flex items-center gap-2">
//                   <span>⚠️</span> {error}
//                 </p>
//               </div>
//             )}

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={submitting}
//               className={`w-full px-6 py-3 rounded-full text-cream font-medium transition-all disabled:opacity-60 ${
//                 loginType === "admin"
//                   ? "bg-seed hover:bg-seed-dark shadow-md hover:shadow-lg"
//                   : "bg-skin hover:bg-skin-dark shadow-md hover:shadow-lg"
//               }`}
//             >
//               {submitting ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Logging in...
//                 </span>
//               ) : (
//                 loginType === "admin" ? "🔐 Log in as Admin" : "🚀 Log in"
//               )}
//             </button>

//             {/* Forgot Password Link */}
//             <div className="text-right">
//               <button 
//                 type="button"
//                 className="text-xs text-ink/40 hover:text-skin transition-colors"
//                 onClick={() => alert("Please contact support to reset your password.")}
//               >
//                 Forgot password?
//               </button>
//             </div>
//           </div>
//         </form>

//         {/* Footer Links */}
//         <div className="mt-6 text-center space-y-2">
//           {loginType === "user" ? (
//             <>
//               <p className="text-ink/60 text-sm">
//                 New here?{" "}
//                 <Link to="/signup" className="text-skin font-medium hover:underline transition-colors">
//                   Create an account
//                 </Link>
//               </p>
//               <p className="text-ink/40 text-xs">
//                 👨‍🌾 Are you a farm staff member?{" "}
//                 <button
//                   onClick={() => {
//                     setLoginType("admin");
//                     setError("");
//                     setEmail("");
//                     setPassword("");
//                   }}
//                   className="text-seed hover:underline font-medium transition-colors"
//                 >
//                   Switch to Admin Login
//                 </button>
//               </p>
//             </>
//           ) : (
//             <>
//               <p className="text-ink/60 text-sm">
//                 <button
//                   onClick={() => {
//                     setLoginType("user");
//                     setError("");
//                     setEmail("");
//                     setPassword("");
//                   }}
//                   className="text-skin hover:underline font-medium transition-colors flex items-center justify-center gap-1"
//                 >
//                   <span>←</span> Switch to User Login
//                 </button>
//               </p>
//               <div className="p-3 bg-cream/50 rounded-lg border border-line/50">
//                 <p className="text-xs text-ink/50">
//                   📞 Need help? Contact support at{" "}
//                   <a href="mailto:admin@meenakshiplantation.com" className="text-seed hover:underline font-medium">
//                     admin@meenakshiplantation.com
//                   </a>
//                 </p>
//               </div>
//             </>
//           )}
//         </div>

//         {/* Back to Home */}
//         <div className="mt-4 text-center">
//           <Link to="/" className="text-xs text-ink/40 hover:text-ink transition-colors inline-flex items-center gap-1">
//             <span>←</span> Back to Home
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AvocadoMark from "../components/AvocadoMark";

export default function Login() {
  const { login, adminLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loginType, setLoginType] = useState("user"); // "user" or "admin"

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    
    try {
      if (loginType === "admin") {
        // Admin login - uses /auth/admin/login
        await adminLogin(email, password);
        navigate("/admin/dashboard", { replace: true });
      } else {
        // User login - uses /auth/login
        await login(email, password);
        const redirectTo = location.state?.from?.pathname || "/dashboard";
        navigate(redirectTo, { replace: true });
      }
    } catch (err) {
      // Show specific error message
      const errorMessage = err.response?.data?.message || "Could not log in. Check your details.";
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-cream to-flesh-light/30 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <AvocadoMark size={56} className="mx-auto mb-4" />
          <h1 className="font-display text-3xl text-ink">Welcome back</h1>
          <p className="text-ink/60 mt-2">
            {loginType === "admin" 
              ? "Access the admin dashboard to manage your farm" 
              : "Log in to send inquiries and track your requests"}
          </p>
        </div>

        {/* Login Type Selector */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-line p-1.5 mb-6 flex gap-1">
          <button
            onClick={() => {
              setLoginType("user");
              setError("");
              setEmail("");
              setPassword("");
            }}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
              loginType === "user"
                ? "bg-skin text-cream shadow-md"
                : "text-ink/60 hover:text-ink hover:bg-cream/50"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <span className="text-lg">👤</span>
              User Login
            </span>
          </button>
          <button
            onClick={() => {
              setLoginType("admin");
              setError("");
              setEmail("");
              setPassword("");
            }}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
              loginType === "admin"
                ? "bg-seed text-cream shadow-md"
                : "text-ink/60 hover:text-ink hover:bg-cream/50"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <span className="text-lg">🛡️</span>
              Admin Login
            </span>
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm border border-line rounded-2xl p-6 shadow-lg">
          {/* Role-specific Badge */}
          {loginType === "admin" ? (
            <div className="mb-4 p-3 bg-seed/10 border border-seed/20 rounded-lg flex items-center gap-3">
              <span className="text-2xl">🔐</span>
              <div>
                <p className="text-sm font-semibold text-seed">Admin Access</p>
                <p className="text-xs text-ink/50">Enter your admin credentials to manage the farm</p>
              </div>
            </div>
          ) : (
            <div className="mb-4 p-3 bg-skin/10 border border-skin/20 rounded-lg flex items-center gap-3">
              <span className="text-2xl">👋</span>
              <div>
                <p className="text-sm font-semibold text-skin-dark">Customer Login</p>
                <p className="text-xs text-ink/50">Access your inquiries and track requests</p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-ink/70 mb-1">
                {loginType === "admin" ? "Admin Email" : "Email Address"}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40">
                  {loginType === "admin" ? "🔑" : "📧"}
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder={loginType === "admin" ? "admin@meenakshiplantation.com" : "you@example.com"}
                  className="w-full rounded-lg border border-line pl-10 pr-3 py-2.5 bg-white focus:ring-2 focus:ring-skin focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-ink/70 mb-1">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40">🔒</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-line pl-10 pr-3 py-2.5 bg-white focus:ring-2 focus:ring-skin focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg animate-shake">
                <p className="text-sm text-red-700 flex items-center gap-2">
                  <span>⚠️</span> {error}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className={`w-full px-6 py-3 rounded-full text-cream font-medium transition-all disabled:opacity-60 ${
                loginType === "admin"
                  ? "bg-seed hover:bg-seed-dark shadow-md hover:shadow-lg"
                  : "bg-skin hover:bg-skin-dark shadow-md hover:shadow-lg"
              }`}
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                loginType === "admin" ? "🔐 Log in as Admin" : "🚀 Log in"
              )}
            </button>

            {/* Forgot Password Link */}
            <div className="text-right">
              <button 
                type="button"
                className="text-xs text-ink/40 hover:text-skin transition-colors"
                onClick={() => alert("Please contact support to reset your password.")}
              >
                Forgot password?
              </button>
            </div>
          </div>
        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center space-y-2">
          {loginType === "user" ? (
            <>
              <p className="text-ink/60 text-sm">
                New here?{" "}
                <Link to="/signup" className="text-skin font-medium hover:underline transition-colors">
                  Create an account
                </Link>
              </p>
              <p className="text-ink/40 text-xs">
                👨‍🌾 Are you a farm staff member?{" "}
                <button
                  onClick={() => {
                    setLoginType("admin");
                    setError("");
                    setEmail("");
                    setPassword("");
                  }}
                  className="text-seed hover:underline font-medium transition-colors"
                >
                  Switch to Admin Login
                </button>
              </p>
            </>
          ) : (
            <>
              <p className="text-ink/60 text-sm">
                <button
                  onClick={() => {
                    setLoginType("user");
                    setError("");
                    setEmail("");
                    setPassword("");
                  }}
                  className="text-skin hover:underline font-medium transition-colors flex items-center justify-center gap-1"
                >
                  <span>←</span> Switch to User Login
                </button>
              </p>
              <div className="p-3 bg-cream/50 rounded-lg border border-line/50">
                <p className="text-xs text-ink/50">
                  📞 Need help? Contact support at{" "}
                  <a href="mailto:admin@meenakshiplantation.com" className="text-seed hover:underline font-medium">
                    admin@meenakshiplantation.com
                  </a>
                </p>
              </div>
            </>
          )}
        </div>

        {/* Back to Home */}
        <div className="mt-4 text-center">
          <Link to="/" className="text-xs text-ink/40 hover:text-ink transition-colors inline-flex items-center gap-1">
            <span>←</span> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}