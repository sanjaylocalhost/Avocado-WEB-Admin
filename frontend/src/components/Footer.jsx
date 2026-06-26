import { Link } from "react-router-dom";
import AvocadoMark from "./AvocadoMark";

export default function Footer() {
  return (
    <footer className="bg-skin-dark text-cream/90 mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AvocadoMark size={28} />
            <span className="font-display text-lg text-cream">Meenakshi Plantation</span>
          </div>
          <p className="text-sm text-cream/70 max-w-xs">
            From seed to harvest, we support farmers and nursery owners with healthy avocado
            seeds, grafted plants, and practical growing guidance.
          </p>
        </div>

        <div>
          <h3 className="font-display text-base mb-3">Explore</h3>
          <ul className="space-y-2 text-sm text-cream/70">
            <li><Link to="/products" className="hover:text-flesh">Products</Link></li>
            <li><Link to="/farming" className="hover:text-flesh">Farming practices</Link></li>
            <li><Link to="/gallery" className="hover:text-flesh">Gallery</Link></li>
            <li><Link to="/about" className="hover:text-flesh">About us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base mb-3">Account</h3>
          <ul className="space-y-2 text-sm text-cream/70">
            <li><Link to="/signup" className="hover:text-flesh">Create account</Link></li>
            <li><Link to="/login" className="hover:text-flesh">Log in</Link></li>
            <li><Link to="/contact" className="hover:text-flesh">Send an inquiry</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base mb-3">Get in touch</h3>
          <ul className="space-y-2 text-sm text-cream/70">
            <li>Meenakshi Plantation, Karnataka, India</li>
            <li>+91 98453 11238</li>
            <li>admin@meenakshiplantation.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 py-4 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} Meenakshi Plantation & Nursery. All rights reserved.
      </div>
    </footer>
  );
}
