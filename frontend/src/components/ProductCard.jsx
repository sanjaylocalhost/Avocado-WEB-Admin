import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product._id}`}
      className="group block rounded-2xl border border-line bg-white/60 overflow-hidden hover:shadow-soft transition-shadow"
    >
      <div className="aspect-[4/3] bg-flesh-light/40 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <span className="font-display text-skin/40 text-sm">No image yet</span>
        )}
      </div>
      <div className="p-5">
        <span className="font-mono text-xs uppercase tracking-wide text-seed">
          {product.category === "seed" ? "Seed" : "Plant"}
        </span>
        <h3 className="font-display text-lg text-ink mt-1">{product.name}</h3>
        <p className="text-sm text-ink/60 mt-1 line-clamp-2">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-mono text-sm text-skin-dark">
            ₹{product.price} <span className="text-ink/50">{product.unit}</span>
          </span>
          <span className="text-sm font-medium text-skin group-hover:underline">View details</span>
        </div>
      </div>
    </Link>
  );
}
