// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import api from "../services/api";
// import AvocadoMark from "../components/AvocadoMark";
// import SectionDivider from "../components/SectionDivider";
// import ProductCard from "../components/ProductCard";

// const whyChooseUs = [
//   "Quality seeds with high germination rates",
//   "Healthy, disease-free nursery plants",
//   "Expert farming guidance from planting to harvest",
//   "Bulk orders available for farms and nurseries",
//   "Sustainable, water-efficient farming practices",
//   "Responsive customer support",
// ];

// const benefits = [
//   "High and growing market demand",
//   "A strong commercial crop with long-term income potential",
//   "Rich in nutrients, valued by health-conscious buyers",
//   "Adaptable to a range of climatic conditions",
// ];

// export default function Home() {
//   const [featured, setFeatured] = useState([]);
//   const [loadError, setLoadError] = useState(false);

//   useEffect(() => {
//     api
//       .get("/products")
//       .then((res) => setFeatured(res.data.slice(0, 3)))
//       .catch(() => setLoadError(true));
//   }, []);

//   return (
//     <div>
//       {/* Hero */}
//       <section className="relative overflow-hidden border-b border-line">
//         <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
//           <div>
//             <span className="font-mono text-xs uppercase tracking-widest text-seed">
//               Greenstone Avocado Farm &amp; Nursery
//             </span>
//             <h1 className="font-display text-4xl md:text-5xl text-ink mt-3 leading-tight">
//               Premium avocado seeds, plants &amp; farming solutions
//             </h1>
//             <p className="text-ink/70 mt-5 text-lg max-w-md">
//               Grow a healthy, productive avocado orchard with germination-tested seeds,
//               grafted nursery plants, and hands-on guidance from people who farm avocado
//               every day.
//             </p>
//             <div className="mt-8 flex flex-wrap gap-3">
//               <Link
//                 to="/products?category=seed"
//                 className="px-6 py-3 rounded-full bg-skin text-cream font-medium hover:bg-skin-dark transition-colors"
//               >
//                 Buy seeds
//               </Link>
//               <Link
//                 to="/products?category=plant"
//                 className="px-6 py-3 rounded-full border border-skin text-skin font-medium hover:bg-skin hover:text-cream transition-colors"
//               >
//                 Buy plants
//               </Link>
//               <Link
//                 to="/contact"
//                 className="px-6 py-3 rounded-full text-ink/70 font-medium hover:text-skin transition-colors"
//               >
//                 Contact us →
//               </Link>
//             </div>
//           </div>

//           <div className="relative flex items-center justify-center">
//             <AvocadoMark size={280} className="drop-shadow-soft" />
//             <AvocadoMark
//               size={70}
//               className="absolute -top-2 right-6 opacity-50 rotate-12"
//             />
//             <AvocadoMark
//               size={50}
//               className="absolute bottom-2 left-2 opacity-40 -rotate-6"
//             />
//           </div>
//         </div>
//         <div className="bg-skin-dark text-cream text-center py-3 font-display text-sm md:text-base">
//           From seed to harvest — supporting farmers every step of the way
//         </div>
//       </section>

//       {/* About teaser */}
//       <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 text-center">
//         <h2 className="font-display text-3xl text-ink">Welcome to Meenakshi Plantation</h2>
//         <p className="text-ink/70 mt-4 leading-relaxed">
//           We specialise in cultivating, growing, and supplying premium avocado seeds and
//           healthy avocado plants. With a passion for sustainable agriculture and modern
//           farming practices, we help farmers, nurseries, and gardening enthusiasts build
//           productive avocado plantations — backed by high-germination seeds, disease-free
//           plants, and guidance you can actually use.
//         </p>
//         <Link to="/about" className="inline-block mt-5 text-skin font-medium hover:underline">
//           More about us →
//         </Link>
//       </section>

//       <SectionDivider />

//       {/* Why choose us */}
//       <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
//         <h2 className="font-display text-3xl text-ink text-center mb-10">Why farmers choose us</h2>
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {whyChooseUs.map((item) => (
//             <p key={item} className="seed-bullet text-ink/80">
//               {item}
//             </p>
//           ))}
//         </div>
//       </section>

//       {/* Featured products */}
//       <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 bg-white/40 rounded-3xl">
//         <div className="flex items-end justify-between mb-8">
//           <h2 className="font-display text-3xl text-ink">Featured products</h2>
//           <Link to="/products" className="text-skin font-medium hover:underline">
//             View all →
//           </Link>
//         </div>

//         {loadError && (
//           <p className="text-ink/60 text-sm">
//             Couldn't load live products right now — make sure the backend API is running.
//           </p>
//         )}

//         {!loadError && featured.length === 0 && (
//           <p className="text-ink/60 text-sm">No products published yet. Check back soon.</p>
//         )}

//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {featured.map((p) => (
//             <ProductCard key={p._id} product={p} />
//           ))}
//         </div>
//       </section>

//       {/* Benefits of avocado */}
//       <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
//         <h2 className="font-display text-3xl text-ink text-center mb-10">Why grow avocado?</h2>
//         <div className="grid sm:grid-cols-2 gap-6">
//           {benefits.map((item) => (
//             <p key={item} className="seed-bullet text-ink/80">
//               {item}
//             </p>
//           ))}
//         </div>
//       </section>

//       <SectionDivider />

//       {/* Testimonials */}
//       <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
//         <h2 className="font-display text-3xl text-ink text-center mb-10">What growers say</h2>
//         <div className="grid md:grid-cols-2 gap-6">
//           <blockquote className="bg-white/60 border border-line rounded-2xl p-6">
//             <p className="text-ink/80 italic">
//               “The plants were healthy and showed excellent growth after plantation.”
//             </p>
//             <footer className="mt-3 text-sm font-mono text-seed">— A grower in the network</footer>
//           </blockquote>
//           <blockquote className="bg-white/60 border border-line rounded-2xl p-6">
//             <p className="text-ink/80 italic">
//               “High-quality seeds with a good germination rate, batch after batch.”
//             </p>
//             <footer className="mt-3 text-sm font-mono text-seed">— A nursery owner</footer>
//           </blockquote>
//         </div>
//       </section>

//       {/* Farmer support CTA */}
//       <section className="bg-skin text-cream">
//         <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 text-center">
//           <h2 className="font-display text-3xl">Need guidance, not just plants?</h2>
//           <p className="mt-4 text-cream/85 max-w-xl mx-auto">
//             We offer support on plantation setup, seed germination, nursery management,
//             irrigation planning, and ongoing crop maintenance.
//           </p>
//           <Link
//             to="/contact"
//             className="inline-block mt-6 px-6 py-3 rounded-full bg-cream text-skin-dark font-medium hover:bg-flesh-light transition-colors"
//           >
//             Talk to our team
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }


// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import api from "../services/api";
// import AvocadoMark from "../components/AvocadoMark";
// import SectionDivider from "../components/SectionDivider";
// import ProductCard from "../components/ProductCard";

// const whyChooseUs = [
//   "Quality seeds with high germination rates",
//   "Healthy, disease-free nursery plants",
//   "Expert farming guidance from planting to harvest",
//   "Bulk orders available for farms and nurseries",
//   "Sustainable, water-efficient farming practices",
//   "Responsive customer support",
// ];

// const benefits = [
//   "High and growing market demand",
//   "A strong commercial crop with long-term income potential",
//   "Rich in nutrients, valued by health-conscious buyers",
//   "Adaptable to a range of climatic conditions",
// ];

// // Add your hero images here
// const heroImages = [
//   {
//     id: 1,
//     src: "public/first page 1.png",
//     alt: "Avocado farm with healthy trees"
//   },
//   {
//     id: 2,
//     src: "public/first page 2.png",
//     alt: "Premium avocado seeds"
//   },
//   {
//     id: 3,
//     src: "public/first page 3.png",
//     alt: "Avocado nursery plants"
//   },
//   {
//     id: 4,
//     src: "public/first page 4.png",
//     alt: "Fresh avocado harvest"
//   },
//   {
//     id: 5,
//     src: "public/first page 1.png",
//     alt: "Lush avocado orchard"
//   }
// ];

// export default function Home() {
//   const [featured, setFeatured] = useState([]);
//   const [loadError, setLoadError] = useState(false);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     api
//       .get("/products")
//       .then((res) => setFeatured(res.data.slice(0, 3)))
//       .catch(() => setLoadError(true));
//   }, []);

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % heroImages.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
//   };

//   // Auto-slide every 5 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       nextSlide();
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div>
//       {/* Hero with Image Carousel */}
//       <section className="relative overflow-hidden border-b border-line">
//         <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
//           {/* Left side - Text content */}
//           <div>
//             <span className="font-mono text-xs uppercase tracking-widest text-seed">
//               Greenstone Avocado Farm &amp; Nursery
//             </span>
//             <h1 className="font-display text-4xl md:text-5xl text-ink mt-3 leading-tight">
//               Premium avocado seeds, plants &amp; farming solutions
//             </h1>
//             <p className="text-ink/70 mt-5 text-lg max-w-md">
//               Grow a healthy, productive avocado orchard with germination-tested seeds,
//               grafted nursery plants, and hands-on guidance from people who farm avocado
//               every day.
//             </p>
//             <div className="mt-8 flex flex-wrap gap-3">
//               <Link
//                 to="/products?category=seed"
//                 className="px-6 py-3 rounded-full bg-skin text-cream font-medium hover:bg-skin-dark transition-colors"
//               >
//                 Buy seeds
//               </Link>
//               <Link
//                 to="/products?category=plant"
//                 className="px-6 py-3 rounded-full border border-skin text-skin font-medium hover:bg-skin hover:text-cream transition-colors"
//               >
//                 Buy plants
//               </Link>
//               <Link
//                 to="/contact"
//                 className="px-6 py-3 rounded-full text-ink/70 font-medium hover:text-skin transition-colors"
//               >
//                 Contact us →
//               </Link>
//             </div>
//           </div>

//           {/* Right side - Image Carousel */}
//           <div className="relative flex items-center justify-center">
//             <div className="relative w-full max-w-md h-80 md:h-96 overflow-hidden rounded-2xl shadow-xl">
//               {/* Images */}
//               {heroImages.map((image, index) => (
//                 <div
//                   key={image.id}
//                   className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
//                     index === currentSlide ? "opacity-100" : "opacity-0"
//                   }`}
//                 >
//                   <img
//                     src={image.src}
//                     alt={image.alt}
//                     className="w-full h-full object-cover"
//                   />
//                   {/* Image overlay for better text readability if needed */}
//                   <div className="absolute inset-0 bg-black/10"></div>
//                 </div>
//               ))}

//               {/* Slide indicators/dots */}
//               <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
//                 {heroImages.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentSlide(index)}
//                     className={`w-2.5 h-2.5 rounded-full transition-all ${
//                       index === currentSlide
//                         ? "bg-white w-8"
//                         : "bg-white/50 hover:bg-white/80"
//                     }`}
//                     aria-label={`Go to slide ${index + 1}`}
//                   />
//                 ))}
//               </div>

//               {/* Left Arrow */}
//               <button
//                 onClick={prevSlide}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
//                 aria-label="Previous slide"
//               >
//                 <svg
//                   className="w-6 h-6 text-ink"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 19l-7-7 7-7"
//                   />
//                 </svg>
//               </button>

//               {/* Right Arrow */}
//               <button
//                 onClick={nextSlide}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
//                 aria-label="Next slide"
//               >
//                 <svg
//                   className="w-6 h-6 text-ink"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 5l7 7-7 7"
//                   />
//                 </svg>
//               </button>
//             </div>

//             {/* Decorative Avocado Marks - keep them or remove */}
//             <AvocadoMark
//               size={70}
//               className="absolute -top-2 -right-6 opacity-50 rotate-12 hidden md:block"
//             />
//             <AvocadoMark
//               size={50}
//               className="absolute -bottom-2 -left-6 opacity-40 -rotate-6 hidden md:block"
//             />
//           </div>
//         </div>
//         <div className="bg-skin-dark text-cream text-center py-3 font-display text-sm md:text-base">
//           From seed to harvest — supporting farmers every step of the way
//         </div>
//       </section>

//       {/* Rest of your component remains the same */}
//       {/* About teaser */}
//       <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 text-center">
//         <h2 className="font-display text-3xl text-ink">Welcome to Meenakshi Plantation</h2>
//         <p className="text-ink/70 mt-4 leading-relaxed">
//           We specialise in cultivating, growing, and supplying premium avocado seeds and
//           healthy avocado plants. With a passion for sustainable agriculture and modern
//           farming practices, we help farmers, nurseries, and gardening enthusiasts build
//           productive avocado plantations — backed by high-germination seeds, disease-free
//           plants, and guidance you can actually use.
//         </p>
//         <Link to="/about" className="inline-block mt-5 text-skin font-medium hover:underline">
//           More about us →
//         </Link>
//       </section>

//       <SectionDivider />

//       {/* Why choose us */}
//       <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
//         <h2 className="font-display text-3xl text-ink text-center mb-10">Why farmers choose us</h2>
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {whyChooseUs.map((item) => (
//             <p key={item} className="seed-bullet text-ink/80">
//               {item}
//             </p>
//           ))}
//         </div>
//       </section>

//       {/* Featured products */}
//       <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 bg-white/40 rounded-3xl">
//         <div className="flex items-end justify-between mb-8">
//           <h2 className="font-display text-3xl text-ink">Featured products</h2>
//           <Link to="/products" className="text-skin font-medium hover:underline">
//             View all →
//           </Link>
//         </div>

//         {loadError && (
//           <p className="text-ink/60 text-sm">
//             Couldn't load live products right now — make sure the backend API is running.
//           </p>
//         )}

//         {!loadError && featured.length === 0 && (
//           <p className="text-ink/60 text-sm">No products published yet. Check back soon.</p>
//         )}

//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {featured.map((p) => (
//             <ProductCard key={p._id} product={p} />
//           ))}
//         </div>
//       </section>

//       {/* Benefits of avocado */}
//       <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
//         <h2 className="font-display text-3xl text-ink text-center mb-10">Why grow avocado?</h2>
//         <div className="grid sm:grid-cols-2 gap-6">
//           {benefits.map((item) => (
//             <p key={item} className="seed-bullet text-ink/80">
//               {item}
//             </p>
//           ))}
//         </div>
//       </section>

//       <SectionDivider />

//       {/* Testimonials */}
//       <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
//         <h2 className="font-display text-3xl text-ink text-center mb-10">What growers say</h2>
//         <div className="grid md:grid-cols-2 gap-6">
//           <blockquote className="bg-white/60 border border-line rounded-2xl p-6">
//             <p className="text-ink/80 italic">
//               “The plants were healthy and showed excellent growth after plantation.”
//             </p>
//             <footer className="mt-3 text-sm font-mono text-seed">— A grower in the network</footer>
//           </blockquote>
//           <blockquote className="bg-white/60 border border-line rounded-2xl p-6">
//             <p className="text-ink/80 italic">
//               “High-quality seeds with a good germination rate, batch after batch.”
//             </p>
//             <footer className="mt-3 text-sm font-mono text-seed">— A nursery owner</footer>
//           </blockquote>
//         </div>
//       </section>

//       {/* Farmer support CTA */}
//       <section className="bg-skin text-cream">
//         <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 text-center">
//           <h2 className="font-display text-3xl">Need guidance, not just plants?</h2>
//           <p className="mt-4 text-cream/85 max-w-xl mx-auto">
//             We offer support on plantation setup, seed germination, nursery management,
//             irrigation planning, and ongoing crop maintenance.
//           </p>
//           <Link
//             to="/contact"
//             className="inline-block mt-6 px-6 py-3 rounded-full bg-cream text-skin-dark font-medium hover:bg-flesh-light transition-colors"
//           >
//             Talk to our team
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }


import { Link } from "react-router-dom";
import { useEffect, useState,useStatic  } from "react";
import api from "../services/api";
import AvocadoMark from "../components/AvocadoMark";
import SectionDivider from "../components/SectionDivider";
import ProductCard from "../components/ProductCard";

// Static products data
const staticProducts = [
  {
    _id: "1",
    name: "Premium Avocado Seed",
    category: "seed",
    description: "High-quality seeds with excellent germination rate, ideal for commercial farming.",
    price: 25,
    unit: "per seed",
    stock: 400,
    image: "/seeds 4.png",
    features: ["High germination rate", "Bulk available", "Freshly harvested"]
  },
  {
    _id: "2",
    name: "Grafted Hass Avocado Plant",
    category: "plant",
    description: "One-year-old grafted Hass sapling with strong root system.",
    price: 350,
    unit: "per plant",
    stock: 150,
    image: "/Plant 2.png",
    features: ["Strong root system", "Disease-free", "Farm-ready"]
  },
  {
    _id: "3",
    name: "Fuerte Avocado Seed",
    category: "seed",
    description: "Fuerte variety seeds known for cold tolerance and consistent fruiting.",
    price: 25,
    unit: "per seed",
    stock: 400,
    image: "/seeds 2.png",
    features: ["Cold tolerant", "Consistent fruiting"]
  }
];


const whyChooseUs = [
  "Quality seeds with high germination rates",
  "Healthy, disease-free nursery plants",
  "Expert farming guidance from planting to harvest",
  "Bulk orders available for farms and nurseries",
  "Sustainable, water-efficient farming practices",
  "Responsive customer support",
];

const benefits = [
  "High and growing market demand",
  "A strong commercial crop with long-term income potential",
  "Rich in nutrients, valued by health-conscious buyers",
  "Adaptable to a range of climatic conditions",
];

// Add your hero images here
const heroImages = [
  {
    id: 1,
    src: "/public/first page 1.png",
    alt: "Avocado farm with healthy trees"
  },
  {
    id: 2,
    src: "/public/first page 2.png",
    alt: "Premium avocado seeds"
  },
  {
    id: 3,
    src: "/public/first page 3.png",
    alt: "Avocado nursery plants"
  },
  {
    id: 4,
    src: "/public/first page 4.png",
    alt: "Fresh avocado harvest"
  },
  {
    id: 5,
    src: "/public/first page 1.png",
    alt: "Lush avocado orchard"
  }
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loadError, setLoadError] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [UseStatic,setUseStatic] = useState([]);

  useEffect(() => {
    api
      .get("/products")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setFeatured(res.data.slice(0, 3));
          setUseStatic(false);
        } else {
          setUseStatic(true);
        }
      })
      .catch(() => {
        setLoadError(true);
        setUseStatic(true); // Use static when API fails
      });
  }, []);

  const displayProducts = useStatic ? staticProducts : featured;

  useEffect(() => {
    api
      .get("/products")
      .then((res) => setFeatured(res.data.slice(0, 3)))
      .catch(() => setLoadError(true));
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero with Full Background Image */}
      <section className="relative overflow-hidden border-b border-line min-h-screen">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 w-full h-full">
          {heroImages.map((image, index) => (
            <div
              key={image.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "" : "opacity-0"
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            
            </div>
          ))}
        </div>

      
        {/* Slide indicators/dots - positioned at bottom center */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all ${
                index === currentSlide
                  ? "w-10 h-2.5 bg-white rounded-full"
                  : "w-2.5 h-2.5 bg-white/50 rounded-full hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Bottom bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-skin-dark/90 backdrop-blur-sm text-cream text-center py-3 font-display text-sm md:text-base z-10">
          From seed to harvest — supporting farmers every step of the way
        </div>
      </section>

      {/* Rest of your component remains the same */}
  {/* About teaser with Background and Image */}
<section className="relative overflow-hidden py-16" style={{ backgroundColor: '#f5f0eb' }}>
  {/* Background decorative elements */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-skin/20"></div>
    <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-skin/20"></div>
  </div>
  
  <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      {/* Left side - Text Content */}
      <div className="text-center md:text-left">
        <h2 className="font-display text-3xl text-ink">Welcome to Meenakshi Plantation</h2>
        <p className="text-ink/70 mt-4 leading-relaxed">
          We specialise in cultivating, growing, and supplying premium avocado seeds and
          healthy avocado plants. With a passion for sustainable agriculture and modern
          farming practices, we help farmers, nurseries, and gardening enthusiasts build
          productive avocado plantations — backed by high-germination seeds, disease-free
          plants, and guidance you can actually use.
        </p>
        <Link to="#About" className="inline-block mt-5 text-skin font-medium hover:underline">
          More about us →
        </Link>
      </div>
      
      {/* Right side - Image */}
      <div className="relative">
        <div className="flex justify-center">
          <img
            src="/logo.png"
            alt="Meenakshi Plantation - Avocado Farming"
            className="w-60 h-30 md:h-105 object-cover hover:scale-70 transition-transform duration-500"
          />
        </div>
       
      </div>
    </div>
  </div>
</section>

<SectionDivider />

{/* Why choose us with Background and Images */}
<section className="relative overflow-hidden py-16">
  {/* Background Image with Light Overlay */}
  <div className="absolute inset-0">
    <img
      src="/Fruit 2.png"
      alt="Background"
      className="w-full h-full object-cover"
    />
    {/* Light overlay for text readability */}
    <div className="absolute inset-0 bg-white/70"></div>
    {/* Or use the same color as before with opacity */}
    {/* <div className="absolute inset-0" style={{ backgroundColor: '#e8f0e6', opacity: 0.85 }}></div> */}
  </div>
  
  {/* Background decorative elements */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-0 right-0 w-96 h-96 bg-skin/30 rounded-full transform translate-x-32 -translate-y-32"></div>
    <div className="absolute bottom-0 left-0 w-72 h-72 bg-skin/30 rounded-full transform -translate-x-32 translate-y-32"></div>
  </div>
  
  <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <h2 className="font-display text-3xl text-ink text-center mb-12">Why farmers choose us</h2>
    
    <div className="grid md:grid-cols-3 gap-8">
      {/* Cards remain the same */}
      {/* Card 1 */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-white/50">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-skin/10 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-skin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <p className="text-ink/80 font-medium">{whyChooseUs[0]}</p>
          <div className="mt-3 w-12 h-1 bg-skin/30 rounded-full"></div>
        </div>
      </div>
      
      {/* Card 2 */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-white/50">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-skin/10 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-skin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <p className="text-ink/80 font-medium">{whyChooseUs[1]}</p>
          <div className="mt-3 w-12 h-1 bg-skin/30 rounded-full"></div>
        </div>
      </div>
      
      {/* Card 3 */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-white/50">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-skin/10 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-skin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <p className="text-ink/80 font-medium">{whyChooseUs[2]}</p>
          <div className="mt-3 w-12 h-1 bg-skin/30 rounded-full"></div>
        </div>
      </div>
      
      {/* Card 4 */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-white/50">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-skin/10 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-skin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <p className="text-ink/80 font-medium">{whyChooseUs[3]}</p>
          <div className="mt-3 w-12 h-1 bg-skin/30 rounded-full"></div>
        </div>
      </div>
      
      {/* Card 5 */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-white/50">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-skin/10 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-skin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <p className="text-ink/80 font-medium">{whyChooseUs[4]}</p>
          <div className="mt-3 w-12 h-1 bg-skin/30 rounded-full"></div>
        </div>
      </div>
      
      {/* Card 6 */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-white/50">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-skin/10 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-skin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
          </div>
          <p className="text-ink/80 font-medium">{whyChooseUs[5]}</p>
          <div className="mt-3 w-12 h-1 bg-skin/30 rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Featured products */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 bg-white/40 rounded-3xl">
  <div className="flex items-end justify-between mb-8">
    <h2 className="font-display text-3xl text-ink">Featured products</h2>
    <Link to="/products" className="text-skin font-medium hover:underline">
      View all →
    </Link>
  </div>

  {loadError && (
    <p className="text-ink/60 text-sm">
      Couldn't load live products right now — make sure the backend API is running.
    </p>
  )}

  {!loadError && featured.length === 0 && (
    <p className="text-ink/60 text-sm">No products published yet. Check back soon.</p>
  )}

  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {featured.map((p) => (
      <ProductCard key={p._id} product={p} />
    ))}
    
    {/* Static fallback products if no featured products */}
    {featured.length === 0 && !loadError && (
      <>
        {/* Static Product 1 */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all group">
          <div className="relative h-56 bg-gray-100 overflow-hidden">
            <img
              src="/images/avocado-seed-static.jpg"
              alt="Avocado Seed"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src = "https://placehold.co/400x300/2d6a4f/ffffff?text=Avocado+Seed";
              }}
            />
            <span className="absolute top-3 left-3 bg-skin/90 text-white text-xs px-3 py-1 rounded-full capitalize">
              Seed
            </span>
          </div>
          <div className="p-4">
            <h3 className="font-display text-lg text-ink truncate">Premium Avocado Seed</h3>
            <p className="text-ink/60 text-sm mt-1 line-clamp-2">High-quality seeds with excellent germination rate.</p>
            <div className="flex items-center justify-between mt-3">
              <p className="text-skin font-bold text-xl">₹25 <span className="text-sm font-normal text-ink/60">/per seed</span></p>
              <span className="text-sm text-ink/60">Stock: 400</span>
            </div>
            <Link to="/products" className="mt-4 w-full block text-center px-4 py-2 bg-skin text-white rounded-lg hover:bg-skin-dark transition-colors text-sm font-medium">
              View Details
            </Link>
          </div>
        </div>

        {/* Static Product 2 */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all group">
          <div className="relative h-56 bg-gray-100 overflow-hidden">
            <img
              src="/images/avocado-plant-static.jpg"
              alt="Avocado Plant"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src = "https://placehold.co/400x300/2d6a4f/ffffff?text=Avocado+Plant";
              }}
            />
            <span className="absolute top-3 left-3 bg-skin/90 text-white text-xs px-3 py-1 rounded-full capitalize">
              Plant
            </span>
          </div>
          <div className="p-4">
            <h3 className="font-display text-lg text-ink truncate">Grafted Avocado Plant</h3>
            <p className="text-ink/60 text-sm mt-1 line-clamp-2">Healthy grafted plant ready for transplantation.</p>
            <div className="flex items-center justify-between mt-3">
              <p className="text-skin font-bold text-xl">₹350 <span className="text-sm font-normal text-ink/60">/per plant</span></p>
              <span className="text-sm text-ink/60">Stock: 150</span>
            </div>
            <Link to="/products" className="mt-4 w-full block text-center px-4 py-2 bg-skin text-white rounded-lg hover:bg-skin-dark transition-colors text-sm font-medium">
              View Details
            </Link>
          </div>
        </div>

        {/* Static Product 3 */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all group">
          <div className="relative h-56 bg-gray-100 overflow-hidden">
            <img
              src="/images/hass-avocado-static.jpg"
              alt="Hass Avocado"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src = "https://placehold.co/400x300/2d6a4f/ffffff?text=Hass+Avocado";
              }}
            />
            <span className="absolute top-3 left-3 bg-skin/90 text-white text-xs px-3 py-1 rounded-full capitalize">
              Seed
            </span>
          </div>
          <div className="p-4">
            <h3 className="font-display text-lg text-ink truncate">Hass Avocado Seed</h3>
            <p className="text-ink/60 text-sm mt-1 line-clamp-2">Premium Hass seeds with high germination rate.</p>
            <div className="flex items-center justify-between mt-3">
              <p className="text-skin font-bold text-xl">₹25 <span className="text-sm font-normal text-ink/60">/per seed</span></p>
              <span className="text-sm text-ink/60">Stock: 500</span>
            </div>
            <Link to="/products" className="mt-4 w-full block text-center px-4 py-2 bg-skin text-white rounded-lg hover:bg-skin-dark transition-colors text-sm font-medium">
              View Details
            </Link>
          </div>
        </div>
      </>
    )}
  </div>
</section>

      {/* Benefits of avocado */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display text-3xl text-ink text-center mb-10">Why grow avocado?</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {benefits.map((item) => (
            <p key={item} className="seed-bullet text-ink/80">
              {item}
            </p>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* Testimonials */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display text-3xl text-ink text-center mb-10">What growers say</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <blockquote className="bg-white/60 border border-line rounded-2xl p-6">
            <p className="text-ink/80 italic">
              “The plants were healthy and showed excellent growth after plantation.”
            </p>
            <footer className="mt-3 text-sm font-mono text-seed">— A grower in the network</footer>
          </blockquote>
          <blockquote className="bg-white/60 border border-line rounded-2xl p-6">
            <p className="text-ink/80 italic">
              “High-quality seeds with a good germination rate, batch after batch.”
            </p>
            <footer className="mt-3 text-sm font-mono text-seed">— A nursery owner</footer>
          </blockquote>
        </div>
      </section>

      {/* Farmer support CTA */}
      <section className="bg-skin text-cream">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="font-display text-3xl">Need guidance, not just plants?</h2>
          <p className="mt-4 text-cream/85 max-w-xl mx-auto">
            We offer support on plantation setup, seed germination, nursery management,
            irrigation planning, and ongoing crop maintenance.
          </p>
          <Link
            to="/contact"
            className="inline-block mt-6 px-6 py-3 rounded-full bg-cream text-skin-dark font-medium hover:bg-flesh-light transition-colors"
          >
            Talk to our team
          </Link>
        </div>
      </section>
    </div>
  );
}