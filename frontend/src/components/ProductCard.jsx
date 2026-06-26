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
import { Link } from "react-router-dom";
import { getImageUrl, getPlaceholderImage } from "../services/api";

export default function ProductCard({ product }) {
  // Debug: Log the image URL
  const imageUrl = product.image ? getImageUrl(product.image) : null;
  console.log(`Product: ${product.name}, Image URL:`, imageUrl);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all group">
      {/* Image Container */}
      <div className="relative h-56 bg-gray-100 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              console.error(`Failed to load image for ${product.name}:`, imageUrl);
              e.target.src = getPlaceholderImage();
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-500 text-sm">No Image</span>
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