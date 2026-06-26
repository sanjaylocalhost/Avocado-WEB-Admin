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


// components/ProductCard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getImageUrl, getPlaceholderImage } from "../services/api";

export default function ProductCard({ product }) {
  // Use state to track image error - prevents infinite loop
  const [imgError, setImgError] = useState(false);
  
  const imageUrl = product.image ? getImageUrl(product.image) : null;

  console.log("Product:", product.name);
console.log("Original:", product.image);
console.log("Final URL:", imageUrl);
  
  // Use a simple fallback that won't cause infinite loop
  const fallbackImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%232d6a4f'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-family='Arial' font-size='20'%3ENo Image%3C/text%3E%3C/svg%3E";

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all group">
      {/* Image Container */}
      <div className="relative h-56 bg-gray-100 overflow-hidden">
        {imageUrl && !imgError ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={() => {
              // Only set error state - DO NOT try to load another image
              setImgError(true);
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-500 text-sm mt-2">No Image</span>
          </div>
        )}
        
        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-skin/90 text-white text-xs px-3 py-1 rounded-full capitalize">
          {product.category}
        </span>
        
        {/* Stock Badge */}
        {product.stock === 0 && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
            Out of Stock
          </span>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-display text-lg text-ink truncate">{product.name}</h3>
        <p className="text-ink/60 text-sm mt-1 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mt-3">
          <p className="text-skin font-bold text-xl">
            ₹{product.price} <span className="text-sm font-normal text-ink/60">/{product.unit}</span>
          </p>
          <span className="text-sm text-ink/60">Stock: {product.stock}</span>
        </div>
        
        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {product.features.slice(0, 2).map((feature, index) => (
              <span key={index} className="text-xs bg-skin/10 text-skin px-2 py-1 rounded-full">
                {feature}
              </span>
            ))}
            {product.features.length > 2 && (
              <span className="text-xs text-ink/60">+{product.features.length - 2} more</span>
            )}
          </div>
        )}
        
        <Link 
          to={`/products/${product._id}`}
          className="mt-4 w-full block text-center px-4 py-2 bg-skin text-white rounded-lg hover:bg-skin-dark transition-colors text-sm font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}