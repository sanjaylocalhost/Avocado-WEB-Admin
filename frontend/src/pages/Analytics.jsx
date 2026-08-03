import { useState, useEffect } from "react";
import api from "../services/api";

export default function Analytics() {
  const [stats, setStats] = useState({
    leads: { total: 0, byStatus: {}, bySource: {} },
    products: { total: 0 },
    inquiries: { total: 0 }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllStats();
  }, []);

  const fetchAllStats = async () => {
    setLoading(true);
    try {
      // You'll need to add these endpoints or use existing ones
      const [leadsRes, productsRes, inquiriesRes] = await Promise.all([
        api.get("/leads/stats/overview"),
        api.get("/products"),
        api.get("/inquiries"),
      ]);

      setStats({
        leads: leadsRes.data,
        products: { total: productsRes.data.length },
        inquiries: { total: inquiriesRes.data.length }
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading analytics...</p>;

  return (
    <div>
      <h1 className="font-display text-3xl text-ink mb-8">Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-line">
          <p className="text-ink/50 text-sm">Total Leads</p>
          <p className="text-3xl font-bold text-ink">{stats.leads.total}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-line">
          <p className="text-ink/50 text-sm">Total Products</p>
          <p className="text-3xl font-bold text-ink">{stats.products.total}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-line">
          <p className="text-ink/50 text-sm">Total Inquiries</p>
          <p className="text-3xl font-bold text-ink">{stats.inquiries.total}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-line">
          <h3 className="font-medium mb-4">Leads by Status</h3>
          <div className="space-y-2">
            {Object.entries(stats.leads.byStatus || {}).map(([status, count]) => (
              <div key={status} className="flex justify-between items-center">
                <span className="capitalize">{status}</span>
                <span className="font-medium">{count}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-line">
          <h3 className="font-medium mb-4">Leads by Source</h3>
          <div className="space-y-2">
            {Object.entries(stats.leads.bySource || {}).map(([source, count]) => (
              <div key={source} className="flex justify-between items-center">
                <span className="capitalize">{source}</span>
                <span className="font-medium">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}