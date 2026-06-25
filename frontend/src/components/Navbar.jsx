import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
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

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur border-b border-line">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <AvocadoMark size={32} />
          <span className="font-display text-lg text-skin-dark">Greenstone Farm</span>
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
  );
}
