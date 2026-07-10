import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
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

// Specialty items data
const specialtyItems = [
  {
    id: 1,
    name: "EXOTIC FRUIT PLANT",
    image: "/exotic-fruit.jpg",
    link: "/products?category=exotic-fruit",
    description: "Rare and exotic fruit varieties"
  },
  {
    id: 2,
    name: "FLOWER PLANT",
    image: "/flower-plant.jpg",
    link: "/products?category=flower",
    description: "Beautiful flowering plants"
  },
  {
    id: 3,
    name: "HYBRID MANGO PLANT",
    image: "/hybrid-mango.jpg",
    link: "/products?category=mango",
    description: "High-yield hybrid mango varieties"
  },
  {
    id: 4,
    name: "BEST SELLERS",
    image: "/best-sellers.jpg",
    link: "/products?category=bestsellers",
    description: "Our most popular products"
  }
];

// Commercial Avocado Varieties data
const commercialVarieties = [
  "Hass", "Fuerte", "Pinkerton", "Reed", "Lamb Hass", "Gwen", 
  "Bacon", "Zutano", "Nabal", "Ettinger", "Sharwil", "Wurtz (Little Cado)", 
  "Sir Prize", "GEM", "Carmen Hass", "Maluma Hass", "Rincon", 
  "Mexicola", "Mexicola Grande", "Stewart", "Choquette", "Lula", 
  "Hall", "Pollock", "Simmonds", "Monroe", "Booth 7", "Booth 8", 
  "Booth 11", "Oro Negro", "Day", "Winter Mexican", "Jan Boyce", 
  "Nishikawa", "Ardith", "Holiday (XX3)", "Ryan", "Queen", "Fuchs", "Linda"
];

// Most Popular Varieties in India with images
const popularInIndia = [
  { name: "Hass", image: "/hass.png" },
  { name: "Fuerte", image: "/Fuerte.png" },
  { name: "Pinkerton", image: "/Pinkerton.png" },
  { name: "Reed", image: "/reed.png" },
  { name: "Bacon", image: "/Bacon.png" },
  { name: "Zutano", image: "/Zutano.png" },
  { name: "Nabal", image: "/Nabal.png" },
  { name: "Ettinger", image: "/Ettinger.png" }
];

// New Arrivals data
const newArrivals = [
  {
    id: 1,
    name: "Dragon Fruit Plant",
    image: "/dragon-fruit.jpg",
    price: "₹450",
    link: "/products/dragon-fruit"
  },
  {
    id: 2,
    name: "Rare Orchid Collection",
    image: "/orchid.jpg",
    price: "₹350",
    link: "/products/orchid"
  },
  {
    id: 3,
    name: "Alphonso Mango Grafted",
    image: "/alphonso-mango.jpg",
    price: "₹550",
    link: "/products/alphonso-mango"
  },
  {
    id: 4,
    name: "Premium Avocado Plant",
    image: "/premium-avocado.jpg",
    price: "₹400",
    link: "/products/premium-avocado"
  }
];

// Add your hero images here
const heroImages = [
  {
    id: 1,
    src: "/Firstpage.png.jpeg",
    alt: "Avocado farm with healthy trees"
  },
  {
    id: 2,
    src: "/Firstpagetwo.png.jpeg",
    alt: "Premium avocado seeds"
  },
  {
    id: 3,
    src: "/Firstpagefour.png.jpeg",
    alt: "Avocado nursery plants"
  },
  {
    id: 4,
    src: "/Firstpage.png.jpeg",
    alt: "Fresh avocado harvest"
  },
  {
    id: 5,
    src: "/Firstpageone.png.jpeg",
    alt: "Lush avocado orchard"
  }
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loadError, setLoadError] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [useStatic, setUseStatic] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const totalSeconds = 2 * 24 * 60 * 60;
    let remainingSeconds = totalSeconds;

    const timer = setInterval(() => {
      if (remainingSeconds <= 0) {
        remainingSeconds = totalSeconds;
      } else {
        remainingSeconds--;
      }

      setTimeLeft({
        days: Math.floor(remainingSeconds / 86400),
        hours: Math.floor((remainingSeconds % 86400) / 3600),
        minutes: Math.floor((remainingSeconds % 3600) / 60),
        seconds: remainingSeconds % 60,
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
        setUseStatic(true);
      });
  }, []);

  useEffect(() => {
    api
      .get("/products")
      .then((res) => setFeatured(res.data.slice(0, 3)))
      .catch(() => setLoadError(true));
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
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
                index === currentSlide ? "opacity-100" : "opacity-0"
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

      {/* About teaser with Background and Image */}
      <section className="relative overflow-hidden py-16" style={{ backgroundColor: '#f5f0eb' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-skin/20"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-skin/20"></div>
        </div>
        
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
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
        <div className="absolute inset-0">
          <img
            src="/Fruit 2.png"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/70"></div>
        </div>
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-skin/30 rounded-full transform translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-skin/30 rounded-full transform -translate-x-32 translate-y-32"></div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl text-ink text-center mb-12">Why farmers choose us</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-white/50">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-skin/10 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-skin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <p className="text-ink/80 font-medium">{item}</p>
                  <div className="mt-3 w-12 h-1 bg-skin/30 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR SPECIALTY SECTION */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl text-ink">Our Specialty</h2>
          <div className="w-24 h-1 bg-skin mx-auto mt-4 rounded-full"></div>
          <p className="text-ink/60 mt-3">Premium quality plants for every garden</p>
        </div>

         {/* Most Popular Varieties in India */}
        <div className="mt-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h3 className="font-display text-3xl text-ink">Most Popular Varieties in India</h3>
              <p className="text-ink/60 mt-1">Top avocado varieties preferred by Indian farmers</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularInIndia.map((variety, index) => (
              <Link
                key={index}
                to={`/products?variety=${variety.name.toLowerCase()}`}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-48 bg-gradient-to-br from-green-50 to-emerald-50 overflow-hidden">
                  <img
                    src={variety.image}
                    alt={variety.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = `https://placehold.co/400x300/2d6a4f/ffffff?text=${variety.name}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="font-display text-xl text-white font-bold tracking-wide">
                      {variety.name}
                    </h4>
                  </div>
                </div>
                <div className="p-4 bg-white text-center">
                  <span className="text-skin font-medium text-sm group-hover:underline inline-flex items-center gap-1">
                    View Variety
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

       {/* Commercial Avocado Varieties - Modern Grid */}
<div className="mt-16">
  <div className="flex items-end justify-between mb-8">
    <div>
      <h3 className="font-display text-3xl text-ink">Commercial Avocado Varieties</h3>
      <p className="text-ink/60 mt-1">Premium quality avocado varieties for commercial farming</p>
    </div>
    <span className="text-sm text-skin font-medium">{commercialVarieties.length}+ Varieties</span>
  </div>

  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
    {commercialVarieties.map((variety, index) => (
      <div
        key={index}
        className="group relative p-3 bg-gradient-to-br from-white to-green-50 rounded-lg border border-skin/10 hover:border-skin/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-skin/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative text-center">
          <div className="text-lg mb-1">🥑</div>
          <span className="text-xs font-medium text-ink/70 group-hover:text-skin transition-colors">
            {variety}
          </span>
        </div>
      </div>
    ))}
  </div>
</div>

      

        {/* New Arrivals Section */}
       <div className="mt-16">


  {/* Avocado Plants by Age Section */}
  <div className="mt-16">
    <div className="flex items-end justify-between mb-8">
      <div>
        <h3 className="font-display text-3xl text-ink">Avocado Nursery Plants</h3>
        <p className="text-ink/60 mt-1">Healthy avocado plants at every growth stage</p>
      </div>
    </div>

    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {/* Seedling / Germinated */}
      <Link
        to="/products?category=seedling"
        className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-green-100"
      >
        <div className="text-center">
          <div className="text-5xl mb-3">🌱</div>
          <h4 className="font-display text-lg text-ink">Seedling</h4>
          <p className="text-sm text-ink/60 mt-1">Germinated</p>
          <p className="text-skin font-bold text-lg mt-2">₹99</p>
          <span className="inline-block mt-3 text-xs text-skin font-medium group-hover:underline">
            View Details →
          </span>
        </div>
      </Link>

      {/* 6 Months */}
      <Link
        to="/products?category=6-months"
        className="group bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-green-200"
      >
        <div className="text-center">
          <div className="text-5xl mb-3">🌿</div>
          <h4 className="font-display text-lg text-ink">6 Months</h4>
          <p className="text-sm text-ink/60 mt-1">Young Plant</p>
          <p className="text-skin font-bold text-lg mt-2">₹199</p>
          <span className="inline-block mt-3 text-xs text-skin font-medium group-hover:underline">
            View Details →
          </span>
        </div>
      </Link>

      {/* 1 Year */}
      <Link
        to="/products?category=1-year"
        className="group bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-emerald-200"
      >
        <div className="text-center">
          <div className="text-5xl mb-3">🌳</div>
          <h4 className="font-display text-lg text-ink">1 Year</h4>
          <p className="text-sm text-ink/60 mt-1">Established</p>
          <p className="text-skin font-bold text-lg mt-2">₹350</p>
          <span className="inline-block mt-3 text-xs text-skin font-medium group-hover:underline">
            View Details →
          </span>
        </div>
      </Link>

      {/* 2 Years */}
      <Link
        to="/products?category=2-years"
        className="group bg-gradient-to-br from-emerald-200 to-green-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-emerald-300"
      >
        <div className="text-center">
          <div className="text-5xl mb-3">🌳</div>
          <h4 className="font-display text-lg text-ink">2 Years</h4>
          <p className="text-sm text-ink/60 mt-1">Mature Plant</p>
          <p className="text-skin font-bold text-lg mt-2">₹550</p>
          <span className="inline-block mt-3 text-xs text-skin font-medium group-hover:underline">
            View Details →
          </span>
        </div>
      </Link>

      {/* 3 Years */}
      <Link
        to="/products?category=3-years"
        className="group bg-gradient-to-br from-green-200 to-emerald-300 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-green-300"
      >
        <div className="text-center">
          <div className="text-5xl mb-3">🌳</div>
          <h4 className="font-display text-lg text-ink">3 Years</h4>
          <p className="text-sm text-ink/60 mt-1">Ready to Fruit</p>
          <p className="text-skin font-bold text-lg mt-2">₹799</p>
          <span className="inline-block mt-3 text-xs text-skin font-medium group-hover:underline">
            View Details →
          </span>
        </div>
      </Link>
    </div>

    {/* Additional Info Banner */}
    <div className="mt-6 bg-gradient-to-r from-skin/10 to-emerald-50 rounded-2xl p-4 border border-skin/20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏷️</span>
          <div>
            <p className="text-sm font-medium text-ink">Bulk orders available for farms</p>
            <p className="text-xs text-ink/60">Get special pricing on bulk purchases</p>
          </div>
        </div>
        <Link 
          to="/contact" 
          className="px-6 py-2 bg-skin text-white rounded-full text-sm font-medium hover:bg-skin-dark transition-colors"
        >
          Contact for Bulk Order
        </Link>
      </div>
    </div>
  </div>
</div>
      </section>

      {/* Featured products */}
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
  {/* Section Header with Decorative Elements */}
  <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12">
    <div>
      <div className="flex items-center gap-3 mb-2">
        <span className="w-8 h-0.5 bg-skin"></span>
        <span className="text-sm font-medium text-skin uppercase tracking-wider">Hot Picks</span>
        <span className="w-8 h-0.5 bg-skin"></span>
      </div>
      <h2 className="font-display text-4xl md:text-5xl text-ink font-bold">Featured Products</h2>
      <p className="text-ink/60 mt-2 text-sm">Premium quality products handpicked for you</p>
    </div>
    <Link 
      to="/products" 
      className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-6 py-2.5 bg-skin text-white rounded-full font-medium hover:bg-skin-dark transition-all hover:shadow-lg group"
    >
      View All
      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  </div>

  {loadError && (
    <div className="text-center py-10">
      <p className="text-ink/60 text-sm">
        Couldn't load live products right now — make sure the backend API is running.
      </p>
    </div>
  )}

  {!loadError && featured.length === 0 && (
    <div className="text-center py-10">
      <p className="text-ink/60 text-sm">No products published yet. Check back soon.</p>
    </div>
  )}

  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
    {featured.map((p) => (
      <div key={p._id} className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden">
        {/* Discount Badge */}
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
          🔥 Extra 60% OFF
        </div>

        {/* Wishlist Button */}
        <button className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100">
          <svg className="w-5 h-5 text-ink/60 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Product Image */}
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <img
            src={p.image || "/placeholder.jpg"}
            alt={p.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={(e) => {
              e.target.src = `https://placehold.co/400x300/2d6a4f/ffffff?text=${p.name.replace(/ /g, '+')}`;
            }}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        {/* Product Info */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
              p.category === 'seed' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-blue-100 text-blue-700'
            }`}>
              {p.category || 'Plant'}
            </span>
            <span className="text-xs text-ink/40">•</span>
            <span className="text-xs text-ink/40">In Stock</span>
          </div>

          <h3 className="font-display text-lg text-ink font-semibold truncate group-hover:text-skin transition-colors">
            {p.name}
          </h3>
          
          <p className="text-ink/60 text-sm mt-1 line-clamp-2">{p.description}</p>

          {/* Price Section */}
          <div className="flex items-end justify-between mt-4 pt-4 border-t border-gray-100">
            <div>
              <span className="text-ink/40 text-sm line-through block">₹{Math.round(p.price * 5)}</span>
              <div className="flex items-center gap-2">
                <span className="text-skin font-bold text-2xl">₹{p.price}</span>
                <span className="text-xs text-ink/40">{p.unit || ''}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                80% OFF
              </span>
            </div>
          </div>

          {/* Hover Action - Book Now Button */}
          <div className="mt-4">
            <Link
              to={`/products/${p._id}`}
              className="relative w-full overflow-hidden group/btn flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-skin to-skin-dark text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-skin/25"
            >
              <span className="relative z-10">Book Now</span>
              <svg className="relative z-10 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="absolute inset-0 bg-white/20 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500"></div>
            </Link>
          </div>
        </div>
      </div>
    ))}
    
    {/* Static fallback products if no featured products */}
    {featured.length === 0 && !loadError && (
      <>
        {/* Static Product 1 */}
        <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden">
          <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
            🔥 Extra 60% OFF
          </div>
          
          <button className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100">
            <svg className="w-5 h-5 text-ink/60 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
            <img
              src="/images/avocado-seed-static.jpg"
              alt="Premium Avocado Seed"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              onError={(e) => {
                e.target.src = "https://placehold.co/400x300/2d6a4f/ffffff?text=Premium+Avocado+Seed";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          <div className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-100 text-green-700">Seed</span>
              <span className="text-xs text-ink/40">•</span>
              <span className="text-xs text-ink/40">In Stock</span>
            </div>

            <h3 className="font-display text-lg text-ink font-semibold truncate group-hover:text-skin transition-colors">
              Premium Avocado Seed
            </h3>
            
            <p className="text-ink/60 text-sm mt-1 line-clamp-2">High-quality seeds with excellent germination rate.</p>

            <div className="flex items-end justify-between mt-4 pt-4 border-t border-gray-100">
              <div>
                <span className="text-ink/40 text-sm line-through block">₹125</span>
                <div className="flex items-center gap-2">
                  <span className="text-skin font-bold text-2xl">₹25</span>
                  <span className="text-xs text-ink/40">/per seed</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">80% OFF</span>
              </div>
            </div>

            <div className="mt-4">
              <Link
                to="/products/1"
                className="relative w-full overflow-hidden group/btn flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-skin to-skin-dark text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-skin/25"
              >
                <span className="relative z-10">Book Now</span>
                <svg className="relative z-10 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="absolute inset-0 bg-white/20 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500"></div>
              </Link>
            </div>
          </div>
        </div>

        {/* Static Product 2 */}
        <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden">
          <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
            🔥 Extra 60% OFF
          </div>
          
          <button className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100">
            <svg className="w-5 h-5 text-ink/60 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
            <img
              src="/images/avocado-plant-static.jpg"
              alt="Grafted Avocado Plant"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              onError={(e) => {
                e.target.src = "https://placehold.co/400x300/2d6a4f/ffffff?text=Grafted+Avocado+Plant";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          <div className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">Plant</span>
              <span className="text-xs text-ink/40">•</span>
              <span className="text-xs text-ink/40">In Stock</span>
            </div>

            <h3 className="font-display text-lg text-ink font-semibold truncate group-hover:text-skin transition-colors">
              Grafted Avocado Plant
            </h3>
            
            <p className="text-ink/60 text-sm mt-1 line-clamp-2">Healthy grafted plant ready for transplantation.</p>

            <div className="flex items-end justify-between mt-4 pt-4 border-t border-gray-100">
              <div>
                <span className="text-ink/40 text-sm line-through block">₹1,750</span>
                <div className="flex items-center gap-2">
                  <span className="text-skin font-bold text-2xl">₹350</span>
                  <span className="text-xs text-ink/40">/per plant</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">80% OFF</span>
              </div>
            </div>

            <div className="mt-4">
              <Link
                to="/products/2"
                className="relative w-full overflow-hidden group/btn flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-skin to-skin-dark text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-skin/25"
              >
                <span className="relative z-10">Book Now</span>
                <svg className="relative z-10 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="absolute inset-0 bg-white/20 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500"></div>
              </Link>
            </div>
          </div>
        </div>

        {/* Static Product 3 */}
        <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden">
          <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
            🔥 Extra 60% OFF
          </div>
          
          <button className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100">
            <svg className="w-5 h-5 text-ink/60 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
            <img
              src="/images/hass-avocado-static.jpg"
              alt="Hass Avocado Seed"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              onError={(e) => {
                e.target.src = "https://placehold.co/400x300/2d6a4f/ffffff?text=Hass+Avocado+Seed";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          <div className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-100 text-green-700">Seed</span>
              <span className="text-xs text-ink/40">•</span>
              <span className="text-xs text-ink/40">In Stock</span>
            </div>

            <h3 className="font-display text-lg text-ink font-semibold truncate group-hover:text-skin transition-colors">
              Hass Avocado Seed
            </h3>
            
            <p className="text-ink/60 text-sm mt-1 line-clamp-2">Premium Hass seeds with high germination rate.</p>

            <div className="flex items-end justify-between mt-4 pt-4 border-t border-gray-100">
              <div>
                <span className="text-ink/40 text-sm line-through block">₹125</span>
                <div className="flex items-center gap-2">
                  <span className="text-skin font-bold text-2xl">₹25</span>
                  <span className="text-xs text-ink/40">/per seed</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">80% OFF</span>
              </div>
            </div>

            <div className="mt-4">
              <Link
                to="/products/3"
                className="relative w-full overflow-hidden group/btn flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-skin to-skin-dark text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-skin/25"
              >
                <span className="relative z-10">Book Now</span>
                <svg className="relative z-10 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="absolute inset-0 bg-white/20 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500"></div>
              </Link>
            </div>
          </div>
        </div>
      </>
    )}
  </div>

  {/* Bottom Banner */}
  <div className="mt-12 bg-gradient-to-r from-skin/5 via-skin/10 to-skin/5 rounded-2xl p-6 border border-skin/10">
  <div className="flex flex-wrap items-center justify-between gap-4">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-skin/10 rounded-full flex items-center justify-center animate-bounce">
        <span className="text-2xl">🚀</span>
      </div>
      <div>
        <p className="text-sm font-medium text-ink">Limited Time Offer</p>
        <p className="text-xs text-ink/60">Grab your favorites before they're gone!</p>
      </div>
    </div>
    
    <div className="flex items-center gap-3 md:gap-6">
      {/* Days */}
      <div className="text-center">
        <div className="bg-white/80 backdrop-blur rounded-lg px-3 py-2 min-w-[50px] shadow-sm border border-skin/10">
          <p className="text-xl md:text-2xl font-bold text-skin font-mono">
            {String(timeLeft.days).padStart(2, '0')}
          </p>
        </div>
        <p className="text-[10px] md:text-xs text-ink/60 mt-1 font-medium">Days</p>
      </div>
      
      <span className="text-2xl font-bold text-skin/30 animate-pulse">:</span>
      
      {/* Hours */}
      <div className="text-center">
        <div className="bg-white/80 backdrop-blur rounded-lg px-3 py-2 min-w-[50px] shadow-sm border border-skin/10">
          <p className="text-xl md:text-2xl font-bold text-skin font-mono">
            {String(timeLeft.hours).padStart(2, '0')}
          </p>
        </div>
        <p className="text-[10px] md:text-xs text-ink/60 mt-1 font-medium">Hours</p>
      </div>
      
      <span className="text-2xl font-bold text-skin/30 animate-pulse">:</span>
      
      {/* Minutes */}
      <div className="text-center">
        <div className="bg-white/80 backdrop-blur rounded-lg px-3 py-2 min-w-[50px] shadow-sm border border-skin/10">
          <p className="text-xl md:text-2xl font-bold text-skin font-mono">
            {String(timeLeft.minutes).padStart(2, '0')}
          </p>
        </div>
        <p className="text-[10px] md:text-xs text-ink/60 mt-1 font-medium">Mins</p>
      </div>
      
      <span className="text-2xl font-bold text-skin/30 animate-pulse">:</span>
      
      {/* Seconds */}
      <div className="text-center">
        <div className="bg-white/80 backdrop-blur rounded-lg px-3 py-2 min-w-[50px] shadow-sm border border-skin/10">
          <p className="text-xl md:text-2xl font-bold text-skin font-mono">
            {String(timeLeft.seconds).padStart(2, '0')}
          </p>
        </div>
        <p className="text-[10px] md:text-xs text-ink/60 mt-1 font-medium">Secs</p>
      </div>
    </div>
  </div>
  
  {/* Progress Bar */}
  <div className="mt-4 w-full bg-gray-200/50 rounded-full h-1.5 overflow-hidden">
    <div 
      className="bg-gradient-to-r from-skin to-skin-dark h-1.5 rounded-full transition-all duration-1000"
      style={{ 
        width: `${((timeLeft.days * 24 * 60 * 60 + timeLeft.hours * 60 * 60 + timeLeft.minutes * 60 + timeLeft.seconds) / (2 * 24 * 60 * 60)) * 100}%` 
      }}
    ></div>
  </div>
  
  {/* Reset Animation Notice */}
  {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 && (
    <div className="mt-3 text-center">
      <span className="text-xs font-medium text-skin animate-pulse">🔄 Offer refreshed! New deals available!</span>
    </div>
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

