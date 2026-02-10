import { useState } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#products", label: "Products" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950 bg-opacity-95 backdrop-blur-md border-b border-slate-800 border-opacity-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-yellow-500 rounded-md flex items-center justify-center font-black text-slate-950 text-xl">
                SK
              </div>
              <span className="text-xl md:text-2xl font-bold tracking-tight text-white">
                SafetyKE
              </span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-slate-300 hover:text-yellow-400 font-medium transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}

              {/* Call Button */}
              <a
                href="tel:+254712345678"
                className="hidden lg:flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all border border-slate-700 hover:border-slate-500"
              >
                <Phone size={18} />
                Call Now
              </a>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/2547XXXXXXXX?text=Hello%20SafetyPro%2C%20I%27d%20like%20to%20enquire%20about..."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md shadow-green-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-900/40"
              >
                <MessageCircle size={20} className="fill-current" />
                WhatsApp Enquiry
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-white p-2 rounded-lg hover:bg-slate-800 transition"
              aria-label="Toggle menu"
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-slate-950 bg-opacity-90 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 bottom-0 w-4/5 max-w-sm bg-slate-900 border-l border-slate-800 transform transition-transform duration-300 ease-in-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col h-full p-6">
            <div className="flex items-center justify-between mb-10">
              <span className="text-2xl font-bold text-white">SafetyPro</span>
              <button onClick={() => setOpen(false)}>
                <X size={28} className="text-slate-400 hover:text-white" />
              </button>
            </div>

            <div className="flex flex-col gap-6 text-lg">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-slate-300 hover:text-yellow-400 py-3 font-medium transition"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="mt-auto space-y-4">
              <a
                href="tel:+2547XXXXXXXX"
                className="flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-700 text-white py-4 rounded-xl font-semibold transition"
                onClick={() => setOpen(false)}
              >
                <Phone size={20} />
                Call Us Now
              </a>

              <a
                href="https://wa.me/2547XXXXXXXX?text=Hello%20SafetyPro%2C%20I%27m%20interested%20in%20your%20safety%20equipment..."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white py-4 rounded-xl font-semibold shadow-md transition"
                onClick={() => setOpen(false)}
              >
                <MessageCircle size={22} className="fill-current" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content jump */}
      <div className="h-16 md:h-18" />
    </>
  );
}