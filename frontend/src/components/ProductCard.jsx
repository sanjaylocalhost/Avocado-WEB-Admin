// import { Link } from "react-router-dom";

// export default function ProductCard({ product }) {
//   return (
//     <Link
//       to={`/products/${product._id}`}
//       className="group block rounded-2xl border border-line bg-white/60 overflow-hidden hover:shadow-soft transition-shadow"
//     >
//       <div className="aspect-[4/3] bg-flesh-light/40 flex items-center justify-center overflow-hidden">
//         {product.image ? (
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//           />
//         ) : (
//           <span className="font-display text-skin/40 text-sm">No image yet</span>
//         )}
//       </div>
//       <div className="p-5">
//         <span className="font-mono text-xs uppercase tracking-wide text-seed">
//           {product.category === "seed" ? "Seed" : "Plant"}
//         </span>
//         <h3 className="font-display text-lg text-ink mt-1">{product.name}</h3>
//         <p className="text-sm text-ink/60 mt-1 line-clamp-2">{product.description}</p>
//         <div className="mt-3 flex items-center justify-between">
//           <span className="font-mono text-sm text-skin-dark">
//             ₹{product.price} <span className="text-ink/50">{product.unit}</span>
//           </span>
//           <span className="text-sm font-medium text-skin group-hover:underline">View details</span>
//         </div>
//       </div>
//     </Link>
//   );
// }


// components/ProductCard.js
import React from "react";
import { getImageUrl, getPlaceholderImage } from "../services/api";

export default function ProductCard({ product, onEdit, onDelete }) {
  const imageUrl = product.image ? getImageUrl(product.image) : null;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
      <div className="relative h-48 bg-gray-100">
        <img
          src={imageUrl || getPlaceholderImage()}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.target.src = getPlaceholderImage();
          }}
        />
        {!product.isActive && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Inactive
          </span>
        )}
        <span className="absolute top-2 left-2 bg-skin/90 text-white text-xs px-2 py-1 rounded-full capitalize">
          {product.category}
        </span>
      </div>
      
      <div className="p-4">
        <h3 className="font-display text-lg text-ink truncate">{product.name}</h3>
        <p className="text-skin font-bold mt-1">
          ₹{product.price} <span className="text-sm font-normal text-ink/60">/{product.unit}</span>
        </p>
        <p className="text-sm text-ink/60 mt-1">Stock: {product.stock}</p>
        
        {product.features && product.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {product.features.slice(0, 3).map((feature, index) => (
              <span key={index} className="text-xs bg-skin/10 text-skin px-2 py-1 rounded-full truncate max-w-full">
                {feature}
              </span>
            ))}
            {product.features.length > 3 && (
              <span className="text-xs text-ink/60">+{product.features.length - 3}</span>
            )}
          </div>
        )}
        
        {(onEdit || onDelete) && (
          <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
            {onEdit && (
              <button
                onClick={() => onEdit(product)}
                className="flex-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(product._id)}
                className="flex-1 px-3 py-1 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}