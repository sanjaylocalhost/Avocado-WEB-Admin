// import AvocadoMark from "../components/AvocadoMark";

// const categories = [
//   "Farm photos",
//   "Nursery plants",
//   "Seed collection",
//   "Plantation activities",
//   "Harvest photos",
//   "Team at work",
// ];

// export default function Gallery() {
//   return (
//     <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
//       <div className="text-center mb-10">
//         <h1 className="font-display text-4xl text-ink">Gallery</h1>
//         <p className="text-ink/70 mt-3">
//           A look at the farm, the nursery, and the seasons in between.
//         </p>
//       </div>

//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {categories.map((c) => (
//           <div
//             key={c}
//             className="aspect-[4/3] rounded-2xl border border-line bg-flesh-light/30 flex flex-col items-center justify-center gap-3"
//           >
//             <AvocadoMark size={48} className="opacity-50" />
//             <span className="font-mono text-xs uppercase tracking-wide text-ink/50">{c}</span>
//           </div>
//         ))}
//       </div>

//       <p className="text-center text-ink/50 text-sm mt-10">
//         Add your own farm photos here by replacing these placeholders with images stored
//         in the <code className="font-mono">image</code> field on each product, or by
//         wiring this page up to your own media source.
//       </p>
//     </div>
//   );
// }

import { useState } from "react";
import AvocadoMark from "../components/AvocadoMark";

const categories = [
  { 
    id: "farm-photos", 
    name: "Farm photos", 
    image: "public/Plant 1.png",
    fallback: "🌳"
  },
  { 
    id: "nursery-plants", 
    name: "Nursery plants", 
    image: "public/nursery 1.png",
    fallback: "🌱"
  },
  { 
    id: "seed-collection", 
    name: "Seed collection", 
    image: "public/seeds 2.png",
    fallback: "🌰"
  },
  { 
    id: "plantation-activities", 
    name: "Plantation activities", 
    image: "public/Plant 3.png",
    fallback: "🌾"
  },
  { 
    id: "harvest-photos", 
    name: "Harvest photos", 
    image: "public/pLANT 1.png",
    fallback: "🥑"
  },
  { 
    id: "team-at-work", 
    name: "Team at work", 
    image: "public/nursery3.png",
    fallback: "👨‍🌾"
  },
];

export default function Gallery() {
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl text-ink">Gallery</h1>
        <p className="text-ink/70 mt-3">
          A look at the farm, the nursery, and the seasons in between.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((c) => (
          <div
            key={c.id}
            className="aspect-[4/3] rounded-2xl border border-line overflow-hidden bg-flesh-light/30 relative group hover:shadow-xl transition-shadow"
          >
            {!imageErrors[c.id] ? (
              <img
                src={c.image}
                alt={c.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={() => handleImageError(c.id)}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                <span className="text-5xl">{c.fallback}</span>
                <span className="font-mono text-xs uppercase tracking-wide text-ink/50">{c.name}</span>
              </div>
            )}
            
            {/* Overlay with category name on hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white font-display text-lg">{c.name}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-ink/50 text-sm mt-10">
        Add your own farm photos here by placing images in the <code className="font-mono bg-gray-100 px-2 py-1 rounded">public/gallery/</code> folder.
      </p>
    </div>
  );
}
