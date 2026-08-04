
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FaPlus, 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaUsers, 
  FaEnvelope, 
  FaChartLine,
  FaUserPlus,
  FaClock,
  FaCalendarAlt,
  FaBell,
  FaCheckCircle,
  FaExclamationCircle,
  FaRupeeSign,
  FaClipboardList
} from "react-icons/fa";

// Dummy data
const dummyDemoRequests = [
  { id: 1, company: "ABC Chits", contact: "Ramesh", amount: "₹5,00,000", status: "Pending" },
  { id: 2, company: "Sri Sai Chits", contact: "Kumar", amount: "₹3,00,000", status: "Contacted" },
  { id: 3, company: "Shree Vinayaka", contact: "Suresh", amount: "₹10,00,000", status: "Pending" },
  { id: 4, company: "Mahalakshmi Chits", contact: "Priya", amount: "₹2,00,000", status: "Contacted" },
  { id: 5, company: "Sri Balaji Chits", contact: "Venkat", amount: "₹7,00,000", status: "Pending" },
];

const dummyContactForms = [
  { id: 1, name: "Priya Sharma", company: "Shree Chits", status: "New", date: "Today" },
  { id: 2, name: "Vikram Raj", company: "Raj Finance", status: "Replied", date: "Yesterday" },
  { id: 3, name: "Ananya Reddy", company: "Reddy Chits", status: "New", date: "2 days ago" },
  { id: 4, name: "Manoj Kumar", company: "Kumar Finance", status: "Replied", date: "3 days ago" },
  { id: 5, name: "Lakshmi Devi", company: "Devi Chits", status: "New", date: "4 days ago" },
];

const recentActivities = [
  { user: "Sanjay", action: "added a new lead", time: "5 min ago" },
  { user: "Ramesh", action: "completed a demo", time: "15 min ago" },
  { user: "Priya", action: "submitted a contact form", time: "30 min ago" },
  { user: "Kumar", action: "updated inquiry status", time: "1 hour ago" },
  { user: "Suresh", action: "added new product", time: "2 hours ago" },
];

export default function AdminDashboard() {
console.log("helo guya sna")
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stats, setStats] = useState({
    totalLeads: 156,
    newLeads: 12,
    totalInquiries: 89,
    pendingInquiries: 23,
    demoRequests: 45,
    pendingDemos: 18
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => {
      console.log("📊 AdminDashboard - Unmounted");
      clearInterval(timer);
    };
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Contacted': return 'bg-blue-100 text-blue-800';
      case 'New': return 'bg-green-100 text-green-800';
      case 'Replied': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Welcome Back, Sanjay! 👋
            </h1>
            <p className="text-emerald-100 text-sm mt-1">Admin</p>
          </div>
          <div className="mt-3 md:mt-0 flex items-center gap-3 text-emerald-100">
            <FaCalendarAlt className="text-lg" />
            <span className="text-sm">{formatDate(currentTime)}</span>
            <span className="w-px h-6 bg-emerald-400/30"></span>
            <FaClock className="text-lg" />
            <span className="text-sm font-mono">{formatTime(currentTime)}</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs font-medium">Total Leads</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.totalLeads}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaUsers className="text-blue-500 text-lg" />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1">
            <span className="text-xs text-green-600 font-medium">+{stats.newLeads} new</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs font-medium">Inquiries</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.totalInquiries}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FaEnvelope className="text-purple-500 text-lg" />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1">
            <span className="text-xs text-yellow-600 font-medium">{stats.pendingInquiries} pending</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs font-medium">Demo Requests</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stats.demoRequests}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <FaClipboardList className="text-orange-500 text-lg" />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1">
            <span className="text-xs text-red-600 font-medium">{stats.pendingDemos} pending</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs font-medium">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">24%</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <FaChartLine className="text-green-500 text-lg" />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1">
            <span className="text-xs text-green-600 font-medium">↑ 3.2%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">₹45.6L</p>
            </div>
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <FaRupeeSign className="text-emerald-500 text-lg" />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1">
            <span className="text-xs text-green-600 font-medium">↑ 8.5%</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <FaBell className="text-emerald-500" />
            Recent Activity
          </h2>
        </div>
        <div className="space-y-2">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <span className="text-xs font-bold text-emerald-600">
                  {activity.user[0]}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">{activity.user}</span>
                  <span className="text-gray-500"> {activity.action}</span>
                </p>
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Demo Requests & Contact Forms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Demo Requests */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Demo Requests</h2>
            <Link to="/admin/demos" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
              View All →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-200">
                  <th className="pb-2 font-medium">Company</th>
                  <th className="pb-2 font-medium">Contact</th>
                  <th className="pb-2 font-medium">Amount</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {dummyDemoRequests.slice(0, 4).map((request) => (
                  <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2 text-gray-700">{request.company}</td>
                    <td className="py-2 text-gray-600">{request.contact}</td>
                    <td className="py-2 font-medium text-gray-700">{request.amount}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="py-2">
                      <button className="text-emerald-600 hover:text-emerald-700 transition-colors">
                        <FaEye className="text-sm" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Contact Forms */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Contact Forms</h2>
            <Link to="/admin/contacts" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
              View All →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-200">
                  <th className="pb-2 font-medium">Name</th>
                  <th className="pb-2 font-medium">Company</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Date</th>
                  <th className="pb-2 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {dummyContactForms.slice(0, 4).map((contact) => (
                  <tr key={contact.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2 text-gray-700">{contact.name}</td>
                    <td className="py-2 text-gray-600">{contact.company}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                        {contact.status}
                      </span>
                    </td>
                    <td className="py-2 text-gray-500">{contact.date}</td>
                    <td className="py-2">
                      <button className="text-emerald-600 hover:text-emerald-700 transition-colors">
                        <FaEye className="text-sm" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="flex items-center gap-2 px-4 py-3 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors">
            <FaPlus className="text-sm" />
            <span>Add Blog</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
            <FaPlus className="text-sm" />
            <span>Upload Video</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
            <FaUserPlus className="text-sm" />
            <span>Add Lead</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
            <FaPlus className="text-sm" />
            <span>New Product</span>
          </button>
        </div>
      </div>
    </div>
  );
}