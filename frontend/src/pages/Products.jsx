import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

const filters = [
  { value: "", label: "All" },
  { value: "seed", label: "Seeds" },
  { value: "plant", label: "Plants" },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "";

  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    setStatus("loading");
    api
      .get("/products", { params: category ? { category } : {} })
      .then((res) => {
        setProducts(res.data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, [category]);

  function setCategory(value) {
    if (value) setSearchParams({ category: value });
    else setSearchParams({});
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl text-ink">Avocado seeds &amp; plants</h1>
        <p className="text-ink/70 mt-3">
          Browse our current stock. Sign in to send an inquiry for any product.
        </p>
      </div>

      <div className="flex justify-center gap-2 mb-10">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setCategory(f.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              category === f.value
                ? "bg-skin text-cream border-skin"
                : "border-line text-ink/70 hover:border-skin"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {status === "loading" && <p className="text-center text-ink/60">Loading products…</p>}

      {status === "error" && (
        <p className="text-center text-ink/60">
          Couldn't load products. Make sure the backend API is running and reachable.
        </p>
      )}

      {status === "ready" && products.length === 0 && (
        <p className="text-center text-ink/60">No products found in this category yet.</p>
      )}

      {status === "ready" && products.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
