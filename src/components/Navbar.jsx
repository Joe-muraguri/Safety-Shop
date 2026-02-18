import { useState, useEffect } from "react";
import { Menu, X, Phone, MessageCircle, Shield } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#products", label: "Products" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-blue-950 shadow-lg shadow-blue-950/50 border-b border-blue-900"
            : "bg-blue-950"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <a href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center shadow-md shadow-red-900/40">
                <Shield size={18} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                JOYSafety<span className="text-red-500">KE</span>
              </span>
            </a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-blue-200 hover:text-white text-sm font-medium transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-200" />
                </a>
              ))}

              {/* Divider */}
              <div className="w-px h-5 bg-blue-800" />

              {/* Call Button */}
              <a
                href="tel:+254712345678"
                className="hidden lg:flex items-center gap-2 text-blue-200 hover:text-white text-sm font-medium px-4 py-2 rounded-lg border border-blue-800 hover:border-blue-600 hover:bg-blue-900 transition-all duration-200"
              >
                <Phone size={15} />
                Call Now
              </a>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/254717988187?text=Hello%20SafetyKE%2C%20I%27d%20like%20to%20enquire%20about..."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-md shadow-red-900/30 hover:shadow-red-900/50 transition-all duration-200"
              >
                <MessageCircle size={16} />
                WhatsApp Us
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden text-white p-2 rounded-lg border border-blue-800 hover:bg-blue-900 transition"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      >
        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-4/5 max-w-sm bg-blue-950 border-l border-blue-900 flex flex-col transform transition-transform duration-300 ease-in-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Red accent bar */}
          <div className="h-1 bg-red-600" />

          {/* Drawer Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-blue-900">
            <span className="text-xl font-bold text-white">
              Safety<span className="text-red-500">KE</span>
            </span>
            <button
              onClick={() => setOpen(false)}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-blue-800 text-blue-300 hover:text-white hover:border-blue-600 transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Drawer Links */}
          <nav className="flex flex-col flex-1 py-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center px-6 py-4 text-blue-200 hover:text-white hover:bg-blue-900/50 border-l-2 border-transparent hover:border-red-500 text-sm font-medium transition-all duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Drawer Footer CTAs */}
          <div className="px-6 py-6 space-y-3 border-t border-blue-900">
            <a
              href="tel:+254717988187"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl border border-blue-800 bg-blue-900/50 hover:bg-blue-900 text-blue-100 text-sm font-semibold transition"
            >
              <Phone size={17} />
              Call Us
            </a>
            <a
              href="https://wa.me/254717988187?text=Hello%20SafetyKE%2C%20I%27m%20interested%20in%20your%20safety%20equipment..."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition shadow-md shadow-red-900/30"
            >
              <MessageCircle size={17} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
