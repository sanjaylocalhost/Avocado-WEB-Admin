// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import AvocadoMark from "./AvocadoMark";
// import { useAuth } from "../context/AuthContext";

// const links = [
//   { to: "/", label: "Home" },
//   { to: "/about", label: "About" },
//   { to: "/products", label: "Products" },
//   { to: "/farming", label: "Farming" },
//   { to: "/gallery", label: "Gallery" },
//   { to: "/contact", label: "Contact" },
// ];

// function navLinkClass({ isActive }) {
//   return `text-sm font-medium tracking-wide transition-colors ${
//     isActive ? "text-skin" : "text-ink/70 hover:text-skin"
//   }`;
// }

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [isSaleBannerVisible, setIsSaleBannerVisible] = useState(true);
//   const { user, isAdmin, logout } = useAuth();
//   const navigate = useNavigate();
//   const [timeLeft, setTimeLeft] = useState({
//   days: 2,
//   hours: 0,
//   minutes: 0,
//   seconds: 0,
// });

//   function handleLogout() {
//     logout();
//     navigate("/");
//   }

//   function closeSaleBanner() {
//     setIsSaleBannerVisible(false);
//   }

//   useEffect(() => {
//   const totalSeconds = 2 * 24 * 60 * 60;
//   let remainingSeconds = totalSeconds;

//   const timer = setInterval(() => {
//     if (remainingSeconds <= 0) {
//       remainingSeconds = totalSeconds; // restart after 2 days
//     } else {
//       remainingSeconds--;
//     }

//     setTimeLeft({
//       days: Math.floor(remainingSeconds / 86400),
//       hours: Math.floor((remainingSeconds % 86400) / 3600),
//       minutes: Math.floor((remainingSeconds % 3600) / 60),
//       seconds: remainingSeconds % 60,
//     });
//   }, 1000);

//   return () => clearInterval(timer);
// }, []);

//   return (
//     <>
//       {/* SALE ANNOUNCEMENT BANNER - ABOVE NAVBAR */}
//       {isSaleBannerVisible && (
//         <div className="relative bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-white py-2.5 px-4 overflow-hidden shadow-lg">
//           {/* Animated background stripes */}
//           <div className="absolute inset-0 overflow-hidden">
//             <div className="absolute inset-0 bg-white/5 transform -skew-y-6"></div>
//             <div className="absolute inset-0 bg-white/5 transform skew-y-6"></div>
//             <div className="absolute -inset-10 bg-white/5 rotate-12 animate-pulse"></div>
//           </div>
          
//           <div className="relative z-10 max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-3 md:gap-6">
//             <div className="flex items-center gap-2 md:gap-3">
//               <span className="bg-white text-red-600 font-extrabold px-3 py-0.5 rounded-full text-xs md:text-sm animate-pulse shadow-lg">
//                 🔥 SALE
//               </span>
//               <span className="font-bold text-base md:text-lg tracking-wide">Extra 60% OFF</span>
//             </div>
            
//             <div className="flex items-center gap-2 text-xs md:text-sm">
//               <span className="hidden sm:inline text-white/60">|</span>
//               <span className="font-medium text-white/90">Limited Time Offer</span>
//               <span className="hidden sm:inline text-white/60">|</span>
//               <span className="bg-white/20 px-2 md:px-3 py-0.5 rounded-full text-xs font-mono text-white/90">
//                 ⏰ Hurry!
//               </span>
//             </div>
            
//             <Link 
//               to="/products" 
//               className="bg-white text-red-600 px-4 md:px-6 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-md flex items-center gap-1"
//             >
//               Shop Now
//               <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </Link>
            
//             {/* Close button */}
//             <button 
//               onClick={closeSaleBanner}
//               className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-1"
//               aria-label="Close sale banner"
//             >
//               <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
          
//           {/* Countdown timer (optional) */}
//           <div className="relative z-10 text-center mt-0.5">
//             <span className="text-xs text-white/80 font-mono">
//               🎉 Offer ends in: <span className="font-bold text-white font-mono">
//   {String(timeLeft.days).padStart(2, "0")}d{" "}
//   {String(timeLeft.hours).padStart(2, "0")}h{" "}
//   {String(timeLeft.minutes).padStart(2, "0")}m{" "}
//   {String(timeLeft.seconds).padStart(2, "0")}s
// </span>
//             </span>
//           </div>
//         </div>
//       )}

//       {/* ORIGINAL NAVBAR */}
//       <header className={`sticky top-0 z-40 bg-cream/95 backdrop-blur border-b border-line transition-all duration-300 ${
//         isSaleBannerVisible ? "" : ""
//       }`}>
//         <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
//           <Link to="/" className="flex items-center gap-2">
//             <img
//               src="/logo.png"
//               alt="Meenakshi Plantation Logo"
//               className="w-10 h-10 object-contain"
//             />
//             <span className="font-display text-lg text-skin-dark">Meenakshi Plantation</span>
//           </Link>

//           <nav className="hidden md:flex items-center gap-7">
//             {links.map((l) => (
//               <NavLink key={l.to} to={l.to} className={navLinkClass} end={l.to === "/"}>
//                 {l.label}
//               </NavLink>
//             ))}
//           </nav>

//           <div className="hidden md:flex items-center gap-4">
//             {user ? (
//               <>
//                 <Link
//                   to={isAdmin ? "/admin" : "/dashboard"}
//                   className="text-sm font-medium text-ink/70 hover:text-skin"
//                 >
//                   {isAdmin ? "Admin panel" : "My account"}
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="text-sm font-medium px-4 py-2 rounded-full border border-skin text-skin hover:bg-skin hover:text-cream transition-colors"
//                 >
//                   Log out
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link to="/login" className="text-sm font-medium text-ink/70 hover:text-skin">
//                   Log in
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="text-sm font-medium px-4 py-2 rounded-full bg-skin text-cream hover:bg-skin-dark transition-colors"
//                 >
//                   Create account
//                 </Link>
//               </>
//             )}
//           </div>

//           <button
//             className="md:hidden p-2 text-ink"
//             onClick={() => setOpen((v) => !v)}
//             aria-label={open ? "Close menu" : "Open menu"}
//             aria-expanded={open}
//           >
//             <span className="block w-6 h-0.5 bg-ink mb-1.5" />
//             <span className="block w-6 h-0.5 bg-ink mb-1.5" />
//             <span className="block w-6 h-0.5 bg-ink" />
//           </button>
//         </div>

//         {open && (
//           <div className="md:hidden border-t border-line bg-cream px-4 pb-4">
//             <nav className="flex flex-col gap-3 pt-3">
//               {links.map((l) => (
//                 <NavLink
//                   key={l.to}
//                   to={l.to}
//                   className={navLinkClass}
//                   end={l.to === "/"}
//                   onClick={() => setOpen(false)}
//                 >
//                   {l.label}
//                 </NavLink>
//               ))}
//               <hr className="border-line" />
//               {user ? (
//                 <>
//                   <Link to={isAdmin ? "/admin" : "/dashboard"} onClick={() => setOpen(false)}>
//                     {isAdmin ? "Admin panel" : "My account"}
//                   </Link>
//                   <button onClick={handleLogout} className="text-left text-skin font-medium">
//                     Log out
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <Link to="/login" onClick={() => setOpen(false)}>
//                     Log in
//                   </Link>
//                   <Link to="/signup" onClick={() => setOpen(false)} className="text-skin font-medium">
//                     Create account
//                   </Link>
//                 </>
//               )}
//             </nav>
//           </div>
//         )}
//       </header>
//     </>
//   );
// }


import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AvocadoMark from "./AvocadoMark";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/farming", label: "Farming" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

function navLinkClass({ isActive }) {
  return `text-sm font-medium tracking-wide transition-colors ${
    isActive ? "text-skin" : "text-ink/70 hover:text-skin"
  }`;
}

// Sale advertisements data
const saleAds = [
  {
    id: 1,
    icon: "🔥",
    title: "Extra 60% OFF",
    badge: "SALE",
    description: "Limited Time Offer",
    bgGradient: "from-red-600 via-orange-500 to-red-600",
    link: "/products",
    cta: "Shop Now",
    emoji: "🎉",
    timer: true,
  },
  {
    id: 2,
    icon: "🌿",
    title: "Buy 2 Get 1 Free",
    badge: "BOGO",
    description: "On All Avocado Plants",
    bgGradient: "from-green-600 via-emerald-500 to-green-600",
    link: "/products?category=plants",
    cta: "Grab Offer",
    emoji: "🌱",
    timer: false,
  },
  {
    id: 3,
    icon: "🚀",
    title: "Free Shipping",
    badge: "FREE",
    description: "On Orders Above ₹999",
    bgGradient: "from-blue-600 via-indigo-500 to-blue-600",
    link: "/products",
    cta: "Explore",
    emoji: "📦",
    timer: false,
  },
  {
    id: 4,
    icon: "🌟",
    title: "Summer Special",
    badge: "HOT",
    description: "Up to 50% Off",
    bgGradient: "from-yellow-500 via-orange-500 to-yellow-600",
    link: "/products",
    cta: "View Deals",
    emoji: "☀️",
    timer: false,
  },
  {
    id: 5,
    icon: "🎁",
    title: "Exclusive Offer",
    badge: "EXCLUSIVE",
    description: "First Order 40% Off",
    bgGradient: "from-purple-600 via-pink-500 to-purple-600",
    link: "/products",
    cta: "Claim Now",
    emoji: "🎊",
    timer: false,
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isSaleBannerVisible, setIsSaleBannerVisible] = useState(true);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  function handleLogout() {
    logout();
    navigate("/");
  }

  function closeSaleBanner() {
    setIsSaleBannerVisible(false);
  }

  // Auto-rotate ads every 5 seconds
  useEffect(() => {
    if (isSaleBannerVisible) {
      const interval = setInterval(() => {
        setCurrentAdIndex((prev) => (prev + 1) % saleAds.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isSaleBannerVisible]);

  // Timer for the first ad only
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

  // Manual navigation
  const goToAd = (index) => {
    setCurrentAdIndex(index);
  };

  const currentAd = saleAds[currentAdIndex];

  return (
    <>
      {/* SALE ANNOUNCEMENT BANNER - ABOVE NAVBAR */}
      {isSaleBannerVisible && (
        <div className={`relative bg-gradient-to-r ${currentAd.bgGradient} text-white py-3 px-4 overflow-hidden shadow-lg`}>
          {/* Animated background stripes */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-white/5 transform -skew-y-6"></div>
            <div className="absolute inset-0 bg-white/5 transform skew-y-6"></div>
            <div className="absolute -inset-10 bg-white/5 rotate-12 animate-pulse"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto">
            {/* Main Content */}
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
              {/* Left: Icon & Badge */}
              <div className=" flex items-center gap-2 md:gap-3">
                <span className="text-xl md:text-2xl animate-bounce">{currentAd.icon}</span>
                <span className="border border-white text-current font-extrabold px-3 py-0.5 rounded-full text-xs md:text-sm animate-pulse shadow-lg">
                  {currentAd.badge}
                </span>
                <span className="font-bold text-base md:text-lg tracking-wide">{currentAd.title}</span>
              </div>
              
              {/* Middle: Description */}
              <div className="flex items-center gap-2 text-xs md:text-sm">
                <span className="hidden sm:inline text-white/60">|</span>
                <span className="font-medium text-white/90">{currentAd.description}</span>
                <span className="hidden sm:inline text-white/60">|</span>
                <span className="bg-white/20 px-2 md:px-3 py-0.5 rounded-full text-xs font-mono text-white/90">
                  {currentAd.emoji} Hurry!
                </span>
              </div>
              
              {/* Right: CTA Button */}
              <Link 
                to={currentAd.link} 
                className="border border-white text-current px-4 md:px-6 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-bold transition-all hover:scale-105 shadow-md flex items-center gap-1"
              >
                {currentAd.cta}
                <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              
              {/* Close button */}
              <button 
                onClick={closeSaleBanner}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-1"
                aria-label="Close sale banner"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Timer - Only show for first ad */}
            {currentAd.timer && (
              <div className="relative z-10 text-center mt-1">
                <span className="text-xs text-white/80 font-mono">
                  🎉 Offer ends in: <span className="font-bold text-white font-mono">
                    {String(timeLeft.days).padStart(2, "0")}d{" "}
                    {String(timeLeft.hours).padStart(2, "0")}h{" "}
                    {String(timeLeft.minutes).padStart(2, "0")}m{" "}
                    {String(timeLeft.seconds).padStart(2, "0")}s
                  </span>
                </span>
              </div>
            )}
          </div>

          {/* Ad Indicators / Dots */}
          <div className="relative z-10 flex justify-center gap-1.5 mt-1.5">
            {saleAds.map((_, index) => (
              <button
                key={index}
                onClick={() => goToAd(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentAdIndex
                    ? "w-6 h-1.5 bg-white"
                    : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to ad ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrow Navigation */}
          <button
            onClick={() => setCurrentAdIndex((prev) => (prev - 1 + saleAds.length) % saleAds.length)}
            className="absolute left-1 md:left-3 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-white transition-colors"
            aria-label="Previous ad"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentAdIndex((prev) => (prev + 1) % saleAds.length)}
            className="absolute right-1 md:right-3 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-white transition-colors"
            aria-label="Next ad"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* ORIGINAL NAVBAR */}
      <header className={`sticky top-0 z-40 bg-cream/95 backdrop-blur border-b border-line transition-all duration-300 ${
        isSaleBannerVisible ? "" : ""
      }`}>
        {/* ... rest of your navbar code remains the same ... */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Meenakshi Plantation Logo"
              className="w-10 h-10 object-contain"
            />
            <span className="font-display text-lg text-skin-dark">Meenakshi Plantation</span>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={navLinkClass} end={l.to === "/"}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link
                  to={isAdmin ? "/admin" : "/dashboard"}
                  className="text-sm font-medium text-ink/70 hover:text-skin"
                >
                  {isAdmin ? "Admin panel" : "My account"}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium px-4 py-2 rounded-full border border-skin text-skin hover:bg-skin hover:text-cream transition-colors"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-ink/70 hover:text-skin">
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-medium px-4 py-2 rounded-full bg-skin text-cream hover:bg-skin-dark transition-colors"
                >
                  Create account
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 text-ink"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className="block w-6 h-0.5 bg-ink mb-1.5" />
            <span className="block w-6 h-0.5 bg-ink mb-1.5" />
            <span className="block w-6 h-0.5 bg-ink" />
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-line bg-cream px-4 pb-4">
            <nav className="flex flex-col gap-3 pt-3">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={navLinkClass}
                  end={l.to === "/"}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </NavLink>
              ))}
              <hr className="border-line" />
              {user ? (
                <>
                  <Link to={isAdmin ? "/admin" : "/dashboard"} onClick={() => setOpen(false)}>
                    {isAdmin ? "Admin panel" : "My account"}
                  </Link>
                  <button onClick={handleLogout} className="text-left text-skin font-medium">
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)}>
                    Log in
                  </Link>
                  <Link to="/signup" onClick={() => setOpen(false)} className="text-skin font-medium">
                    Create account
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}