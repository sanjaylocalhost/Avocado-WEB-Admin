
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../services/api";
// import { useAuth } from "../context/AuthContext";

// const statusStyles = {
//   pending: "bg-flesh-light/60 text-seed",
//   contacted: "bg-skin/15 text-skin-dark",
//   resolved: "bg-line/60 text-ink/60",
// };

// export default function Dashboard() {
//   const { user } = useAuth();
//   const [inquiries, setInquiries] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [leads, setLeads] = useState([]);
//   const [stats, setStats] = useState({
//     totalProducts: 0,
//     totalInquiries: 0,
//     totalLeads: 0,
//     pendingInquiries: 0,
//     newLeads: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     setLoading(true);
//     setError("");
    
//     try {
//       // Fetch all data in parallel for better performance
//       const [inquiriesRes, productsRes, leadsRes] = await Promise.all([
//         api.get("/inquiries/mine"),
//         api.get("/products"),
//         api.get("/leads"),
//       ]);

//       setInquiries(inquiriesRes.data || []);
//       setProducts(productsRes.data || []);
//       setLeads(leadsRes.data?.leads || []);

//       // Calculate statistics
//       const totalProducts = productsRes.data?.length || 0;
//       const totalInquiries = inquiriesRes.data?.length || 0;
//       const totalLeads = leadsRes.data?.leads?.length || 0;
      
//       const pendingInquiries = inquiriesRes.data?.filter(
//         (inq) => inq.status === "pending"
//       ).length || 0;
      
//       const newLeads = leadsRes.data?.leads?.filter(
//         (lead) => lead.status === "new"
//       ).length || 0;

//       setStats({
//         totalProducts,
//         totalInquiries,
//         totalLeads,
//         pendingInquiries,
//         newLeads,
//       });
//     } catch (err) {
//       console.error("Error fetching dashboard data:", err);
//       setError("Could not load dashboard data. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Format date helper
//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   // Get recent items (last 3)
//   const recentInquiries = inquiries.slice(0, 3);
//   const recentLeads = leads.slice(0, 3);

//   if (loading) {
//     return (
//       <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
//         <div className="flex items-center justify-center min-h-[400px]">
//           <div className="text-center">
//             <div className="w-12 h-12 border-4 border-skin border-t-transparent rounded-full animate-spin mx-auto"></div>
//             <p className="mt-4 text-ink/60">Loading your dashboard...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
//         <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
//           <p className="text-red-600">{error}</p>
//           <button
//             onClick={fetchDashboardData}
//             className="mt-4 px-4 py-2 bg-skin text-cream rounded-full hover:bg-skin-dark transition-colors"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
//       {/* Welcome Section */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
//         <div>
//           <h1 className="font-display text-3xl text-ink">
//             Welcome back, {user?.name?.split(" ")[0] || "User"}! 👋
//           </h1>
//           <p className="text-ink/60 mt-1">
//             Here's an overview of your activity and inquiries.
//           </p>
//         </div>
//         <div className="flex gap-3">
//           <Link
//             to="/products"
//             className="px-5 py-2.5 rounded-full bg-skin text-cream text-sm font-medium hover:bg-skin-dark transition-colors whitespace-nowrap"
//           >
//             Browse Products
//           </Link>
//           <Link
//             to="/contact"
//             className="px-5 py-2.5 rounded-full border border-skin text-skin text-sm font-medium hover:bg-skin hover:text-cream transition-colors whitespace-nowrap"
//           >
//             Contact Us
//           </Link>
//         </div>
//       </div>

//       {/* Statistics Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//         <div className="bg-white rounded-2xl p-5 border border-line shadow-sm hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-ink/50 text-sm">Products</p>
//               <p className="text-2xl font-bold text-ink mt-1">{stats.totalProducts}</p>
//             </div>
//             <span className="text-3xl">🌱</span>
//           </div>
//           <Link to="/products" className="text-xs text-skin hover:underline mt-2 inline-block">
//             View all →
//           </Link>
//         </div>

//         <div className="bg-white rounded-2xl p-5 border border-line shadow-sm hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-ink/50 text-sm">Your Inquiries</p>
//               <p className="text-2xl font-bold text-ink mt-1">{stats.totalInquiries}</p>
//             </div>
//             <span className="text-3xl">📧</span>
//           </div>
//           <p className="text-xs text-yellow-600 mt-2">
//             {stats.pendingInquiries} pending {stats.pendingInquiries !== 1 ? "replies" : "reply"}
//           </p>
//         </div>

//         <div className="bg-white rounded-2xl p-5 border border-line shadow-sm hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-ink/50 text-sm">Total Leads</p>
//               <p className="text-2xl font-bold text-ink mt-1">{stats.totalLeads}</p>
//             </div>
//             <span className="text-3xl">👥</span>
//           </div>
//           <p className="text-xs text-blue-600 mt-2">
//             {stats.newLeads} new {stats.newLeads !== 1 ? "leads" : "lead"}
//           </p>
//         </div>

//         <div className="bg-white rounded-2xl p-5 border border-line shadow-sm hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-ink/50 text-sm">Quick Actions</p>
//               <p className="text-sm text-ink mt-1">Get started</p>
//             </div>
//             <span className="text-3xl">⚡</span>
//           </div>
//           <Link
//             to="/contact"
//             className="text-xs text-skin hover:underline mt-2 inline-block"
//           >
//             Send inquiry →
//           </Link>
//         </div>
//       </div>

//       {/* Recent Activity Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Recent Inquiries */}
//         <div className="bg-white rounded-2xl border border-line p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="font-display text-xl text-ink">Recent Inquiries</h2>
//             <Link to="/contact" className="text-sm text-skin hover:underline">
//               View all
//             </Link>
//           </div>

//           {recentInquiries.length === 0 ? (
//             <p className="text-ink/50 text-sm py-8 text-center">
//               No inquiries yet. Start by sending a message!
//             </p>
//           ) : (
//             <div className="space-y-4">
//               {recentInquiries.map((inq) => (
//                 <div key={inq._id} className="border-b border-line/60 pb-4 last:border-0 last:pb-0">
//                   <div className="flex items-start justify-between gap-2">
//                     <div className="flex-1 min-w-0">
//                       {inq.product && (
//                         <p className="font-mono text-xs uppercase tracking-wide text-seed">
//                           {inq.product.name}
//                         </p>
//                       )}
//                       <p className="text-ink/80 text-sm mt-1 line-clamp-2">
//                         {inq.message}
//                       </p>
//                       {inq.quantity && (
//                         <p className="text-ink/50 text-xs mt-1">
//                           Qty: {inq.quantity}
//                         </p>
//                       )}
//                     </div>
//                     <span
//                       className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
//                         statusStyles[inq.status] || "bg-gray-100 text-gray-600"
//                       }`}
//                     >
//                       {inq.status}
//                     </span>
//                   </div>
//                   <p className="text-ink/40 text-xs mt-2">
//                     {formatDate(inq.createdAt)}
//                   </p>
//                   {inq.adminNote && (
//                     <p className="text-ink/70 text-xs mt-2 bg-cream/50 p-2 rounded-lg">
//                       <span className="font-medium">Reply: </span>
//                       {inq.adminNote}
//                     </p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Recent Leads */}
//         <div className="bg-white rounded-2xl border border-line p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="font-display text-xl text-ink">Recent Leads</h2>
//             <Link to="/admin/leads" className="text-sm text-skin hover:underline">
//               View all
//             </Link>
//           </div>

//           {recentLeads.length === 0 ? (
//             <p className="text-ink/50 text-sm py-8 text-center">
//               No leads tracked yet.
//             </p>
//           ) : (
//             <div className="space-y-4">
//               {recentLeads.map((lead) => (
//                 <div key={lead._id} className="border-b border-line/60 pb-4 last:border-0 last:pb-0">
//                   <div className="flex items-start justify-between gap-2">
//                     <div className="flex-1 min-w-0">
//                       <p className="font-medium text-ink">{lead.name}</p>
//                       <p className="text-ink/60 text-sm">{lead.email}</p>
//                       {lead.interest && (
//                         <p className="text-xs text-ink/50 mt-1">
//                           Interest: <span className="capitalize">{lead.interest}</span>
//                         </p>
//                       )}
//                     </div>
//                     <span
//                       className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
//                         lead.status === "new"
//                           ? "bg-blue-100 text-blue-700"
//                           : lead.status === "contacted"
//                           ? "bg-yellow-100 text-yellow-700"
//                           : lead.status === "qualified"
//                           ? "bg-green-100 text-green-700"
//                           : lead.status === "closed"
//                           ? "bg-green-600 text-white"
//                           : lead.status === "lost"
//                           ? "bg-red-100 text-red-700"
//                           : "bg-gray-100 text-gray-600"
//                       }`}
//                     >
//                       {lead.status}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-3 mt-2 text-xs text-ink/40">
//                     <span>📱 {lead.phone}</span>
//                     {lead.source && (
//                       <span>📌 {lead.source}</span>
//                     )}
//                   </div>
//                   <p className="text-ink/40 text-xs mt-1">
//                     Added {formatDate(lead.createdAt)}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Quick Stats Footer */}
//       <div className="mt-8 bg-cream/50 rounded-2xl border border-line p-4">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
//           <div>
//             <p className="text-2xl font-bold text-skin">{stats.totalProducts}</p>
//             <p className="text-xs text-ink/50">Available Products</p>
//           </div>
//           <div>
//             <p className="text-2xl font-bold text-skin">{stats.totalInquiries}</p>
//             <p className="text-xs text-ink/50">Total Inquiries</p>
//           </div>
//           <div>
//             <p className="text-2xl font-bold text-skin">{stats.totalLeads}</p>
//             <p className="text-xs text-ink/50">Total Leads</p>
//           </div>
//           <div>
//             <p className="text-2xl font-bold text-skin">
//               {stats.pendingInquiries > 0 ? "📨" : "✅"}
//             </p>
//             <p className="text-xs text-ink/50">
//               {stats.pendingInquiries > 0 
//                 ? `${stats.pendingInquiries} Pending` 
//                 : "All Caught Up"}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const statusStyles = {
  pending: "bg-flesh-light/60 text-seed",
  contacted: "bg-skin/15 text-skin-dark",
  resolved: "bg-line/60 text-ink/60",
};

export default function Dashboard() {
  const { user } = useAuth();
  const [inquiries, setInquiries] = useState([]);
  const [products, setProducts] = useState([]);
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalInquiries: 0,
    totalLeads: 0,
    pendingInquiries: 0,
    newLeads: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError("");
    
    try {
      // Fetch inquiries and products (always accessible)
      const [inquiriesRes, productsRes] = await Promise.all([
        api.get("/inquiries/mine"),
        api.get("/products"),
      ]);

      setInquiries(inquiriesRes.data || []);
      setProducts(productsRes.data || []);

      // Calculate statistics from available data
      const totalProducts = productsRes.data?.length || 0;
      const totalInquiries = inquiriesRes.data?.length || 0;
      const pendingInquiries = inquiriesRes.data?.filter(
        (inq) => inq.status === "pending"
      ).length || 0;

      // Try to fetch leads (may fail if user is not admin)
      let totalLeads = 0;
      let newLeads = 0;
      
      try {
        const leadsRes = await api.get("/leads");
        if (leadsRes.data?.leads) {
          setLeads(leadsRes.data.leads);
          totalLeads = leadsRes.data.leads.length;
          newLeads = leadsRes.data.leads.filter(
            (lead) => lead.status === "new"
          ).length;
        }
      } catch (leadsError) {
        // If leads fetch fails (non-admin), just ignore and continue
        console.log("Leads data not available for regular users");
      }

      setStats({
        totalProducts,
        totalInquiries,
        totalLeads,
        pendingInquiries,
        newLeads,
      });
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Could not load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Format date helper
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get recent items (last 3)
  const recentInquiries = inquiries.slice(0, 3);
  const recentLeads = leads.slice(0, 3);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-skin border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-ink/60">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="mt-4 px-4 py-2 bg-skin text-cream rounded-full hover:bg-skin-dark transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl text-ink">
            Welcome back, {user?.name?.split(" ")[0] || "User"}! 👋
          </h1>
          <p className="text-ink/60 mt-1">
            Here's an overview of your activity and inquiries.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/products"
            className="px-5 py-2.5 rounded-full bg-skin text-cream text-sm font-medium hover:bg-skin-dark transition-colors whitespace-nowrap"
          >
            Browse Products
          </Link>
          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-full border border-skin text-skin text-sm font-medium hover:bg-skin hover:text-cream transition-colors whitespace-nowrap"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 border border-line shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-ink/50 text-sm">Products</p>
              <p className="text-2xl font-bold text-ink mt-1">{stats.totalProducts}</p>
            </div>
            <span className="text-3xl">🌱</span>
          </div>
          <Link to="/products" className="text-xs text-skin hover:underline mt-2 inline-block">
            View all →
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-line shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-ink/50 text-sm">Your Inquiries</p>
              <p className="text-2xl font-bold text-ink mt-1">{stats.totalInquiries}</p>
            </div>
            <span className="text-3xl">📧</span>
          </div>
          <p className="text-xs text-yellow-600 mt-2">
            {stats.pendingInquiries} pending {stats.pendingInquiries !== 1 ? "replies" : "reply"}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-line shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-ink/50 text-sm">Total Leads</p>
              <p className="text-2xl font-bold text-ink mt-1">{stats.totalLeads}</p>
            </div>
            <span className="text-3xl">👥</span>
          </div>
          {stats.totalLeads > 0 && (
            <p className="text-xs text-blue-600 mt-2">
              {stats.newLeads} new {stats.newLeads !== 1 ? "leads" : "lead"}
            </p>
          )}
        </div>

        <div className="bg-white rounded-2xl p-5 border border-line shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-ink/50 text-sm">Quick Actions</p>
              <p className="text-sm text-ink mt-1">Get started</p>
            </div>
            <span className="text-3xl">⚡</span>
          </div>
          <Link
            to="/contact"
            className="text-xs text-skin hover:underline mt-2 inline-block"
          >
            Send inquiry →
          </Link>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="bg-white rounded-2xl border border-line p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl text-ink">Recent Inquiries</h2>
            <Link to="/contact" className="text-sm text-skin hover:underline">
              View all
            </Link>
          </div>

          {recentInquiries.length === 0 ? (
            <p className="text-ink/50 text-sm py-8 text-center">
              No inquiries yet. Start by sending a message!
            </p>
          ) : (
            <div className="space-y-4">
              {recentInquiries.map((inq) => (
                <div key={inq._id} className="border-b border-line/60 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      {inq.product && (
                        <p className="font-mono text-xs uppercase tracking-wide text-seed">
                          {inq.product.name}
                        </p>
                      )}
                      <p className="text-ink/80 text-sm mt-1 line-clamp-2">
                        {inq.message}
                      </p>
                      {inq.quantity && (
                        <p className="text-ink/50 text-xs mt-1">
                          Qty: {inq.quantity}
                        </p>
                      )}
                    </div>
                    <span
                      className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                        statusStyles[inq.status] || "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {inq.status}
                    </span>
                  </div>
                  <p className="text-ink/40 text-xs mt-2">
                    {formatDate(inq.createdAt)}
                  </p>
                  {inq.adminNote && (
                    <p className="text-ink/70 text-xs mt-2 bg-cream/50 p-2 rounded-lg">
                      <span className="font-medium">Reply: </span>
                      {inq.adminNote}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Leads - Only show if user has leads data */}
        <div className="bg-white rounded-2xl border border-line p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl text-ink">Recent Leads</h2>
            {stats.totalLeads > 0 && (
              <Link to="/admin/leads" className="text-sm text-skin hover:underline">
                View all
              </Link>
            )}
          </div>

          {stats.totalLeads === 0 ? (
            <p className="text-ink/50 text-sm py-8 text-center">
              {user?.role === "admin" 
                ? "No leads tracked yet." 
                : "Lead management is available for admin users."}
            </p>
          ) : (
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div key={lead._id} className="border-b border-line/60 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-ink">{lead.name}</p>
                      <p className="text-ink/60 text-sm">{lead.email}</p>
                      {lead.interest && (
                        <p className="text-xs text-ink/50 mt-1">
                          Interest: <span className="capitalize">{lead.interest}</span>
                        </p>
                      )}
                    </div>
                    <span
                      className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                        lead.status === "new"
                          ? "bg-blue-100 text-blue-700"
                          : lead.status === "contacted"
                          ? "bg-yellow-100 text-yellow-700"
                          : lead.status === "qualified"
                          ? "bg-green-100 text-green-700"
                          : lead.status === "closed"
                          ? "bg-green-600 text-white"
                          : lead.status === "lost"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-ink/40">
                    <span>📱 {lead.phone}</span>
                    {lead.source && (
                      <span>📌 {lead.source}</span>
                    )}
                  </div>
                  <p className="text-ink/40 text-xs mt-1">
                    Added {formatDate(lead.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="mt-8 bg-cream/50 rounded-2xl border border-line p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-skin">{stats.totalProducts}</p>
            <p className="text-xs text-ink/50">Available Products</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-skin">{stats.totalInquiries}</p>
            <p className="text-xs text-ink/50">Total Inquiries</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-skin">{stats.totalLeads}</p>
            <p className="text-xs text-ink/50">Total Leads</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-skin">
              {stats.pendingInquiries > 0 ? "📨" : "✅"}
            </p>
            <p className="text-xs text-ink/50">
              {stats.pendingInquiries > 0 
                ? `${stats.pendingInquiries} Pending` 
                : "All Caught Up"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}