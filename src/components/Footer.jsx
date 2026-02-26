import { Shield, Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight, Facebook, Instagram, Twitter } from "lucide-react";

const quickLinks = [
  { href: "#home", label: "Home" },
  { href: "#products", label: "Products" },
  { href: "#about", label: "About Us" },
  { href: "#contact", label: "Contact" },
];

const productCategories = [
  "Head Protection",
  "Eye & Face Protection",
  "Reflective Vests",
  "Safety Gloves",
  "Respiratory Protection",
  "Safety Footwear",
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-blue-950 text-white">

      {/* Top CTA strip */}
      <div className="border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center flex-shrink-0">
              <MessageCircle size={15} className="text-red-400" />
            </div>
            <p className="text-sm text-blue-200">
              Need a bulk order or custom quote?{" "}
              <span className="text-white font-semibold">We respond within 30 minutes.</span>
            </p>
          </div>
          <a
            href="https://wa.me/254701223920?text=Hi%20TelcoSafetyMart%2C%20I%27d%20like%20a%20bulk%20order%20quote."
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-md shadow-red-900/30"
          >
            Get a Quote <ArrowRight size={13} />
          </a>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand col */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center shadow-md shadow-red-900/40">
                <Shield size={18} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold tracking-tight">
                <span className="text-red-500">Telco Safety Mart</span>
              </span>
            </div>
            <p className="text-blue-300 text-sm leading-relaxed mb-6">
              Kenya's trusted supplier of certified industrial safety equipment — protecting workers across construction, manufacturing & logistics.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg border border-blue-800 hover:border-red-500 hover:bg-red-600/10 flex items-center justify-center text-blue-400 hover:text-red-400 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-blue-300 hover:text-white text-sm flex items-center gap-2 group transition-colors duration-150"
                  >
                    <span className="w-1 h-1 rounded-full bg-red-600 group-hover:w-3 transition-all duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Product categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-5">
              Categories
            </h4>
            <ul className="space-y-3">
              {productCategories.map((cat) => (
                <li key={cat}>
                  <a
                    href="#products"
                    className="text-blue-300 hover:text-white text-sm flex items-center gap-2 group transition-colors duration-150"
                  >
                    <span className="w-1 h-1 rounded-full bg-red-600 group-hover:w-3 transition-all duration-200" />
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+254701223920"
                  className="flex items-start gap-3 group"
                >
                  <div className="w-7 h-7 rounded-md bg-blue-900 border border-blue-800 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-red-500 transition-colors">
                    <Phone size={13} className="text-blue-400 group-hover:text-red-400 transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-500 uppercase tracking-wider mb-0.5">Phone</p>
                    <p className="text-sm text-blue-200 group-hover:text-white transition-colors">+254 701 223 920</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@telcosafetymart.co.ke"
                  className="flex items-start gap-3 group"
                >
                  <div className="w-7 h-7 rounded-md bg-blue-900 border border-blue-800 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-red-500 transition-colors">
                    <Mail size={13} className="text-blue-400 group-hover:text-red-400 transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-500 uppercase tracking-wider mb-0.5">Email</p>
                    <p className="text-sm text-blue-200 group-hover:text-white transition-colors">info@telcosafetymart.co.ke</p>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-md bg-blue-900 border border-blue-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={13} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-blue-500 uppercase tracking-wider mb-0.5">Location</p>
                  <p className="text-sm text-blue-200">Nairobi, Kenya</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-md bg-blue-900 border border-blue-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock size={13} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-blue-500 uppercase tracking-wider mb-0.5">Hours</p>
                  <p className="text-sm text-blue-200">Mon – Sat, 8:00am – 6:00pm</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-blue-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-blue-500 text-xs">
            © 2026 Telco Safety Mart. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-blue-600 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            <span>Protecting Kenya's Workforce</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
