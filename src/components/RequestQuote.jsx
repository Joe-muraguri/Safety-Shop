import { useState } from "react";
import { Shield, MessageCircle, ArrowRight, CheckCircle, Package, User, Phone, Building2, Hash, FileText } from "lucide-react";

const productOptions = [
  "Head Protection (Helmets)",
  "Eye & Face Protection",
  "Reflective Vests",
  "Safety Gloves",
  "Respiratory Protection",
  "Safety Footwear",
  "Ear Protection",
  "Fall Protection / Harnesses",
  "First Aid Kits",
  "Fire Safety Equipment",
  "Other / Not Listed",
];

const initialForm = {
  name: "",
  phone: "",
  company: "",
  products: [],
  quantity: "",
  message: "",
};

export default function RequestQuote() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [productOpen, setProductOpen] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleProduct = (product) => {
    setForm((prev) => ({
      ...prev,
      products: prev.products.includes(product)
        ? prev.products.filter((p) => p !== product)
        : [...prev.products, product],
    }));
  };

  const isValid = form.name.trim() && form.phone.trim() && form.products.length > 0;

  const handleSubmit = () => {
    if (!isValid) return;

    const lines = [
      `Hi SafetyKE 👋, I'd like to request a quote.`,
      ``,
      `*Name:* ${form.name}`,
      `*Phone:* ${form.phone}`,
      form.company ? `*Company:* ${form.company}` : null,
      `*Products Interested In:*`,
      ...form.products.map((p) => `  • ${p}`),
      form.quantity ? `*Quantity / Order Size:* ${form.quantity}` : null,
      form.message ? `*Additional Notes:* ${form.message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const waUrl = `https://wa.me/2547XXXXXXXX?text=${encodeURIComponent(lines)}`;
    window.open(waUrl, "_blank");
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm(initialForm);
    setSubmitted(false);
    setProductOpen(false);
  };

  return (
    <section id="contact" className="bg-white py-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Section header */}
        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* Left — info */}
          <div className="lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 text-red-600 text-xs font-bold uppercase tracking-widest mb-4">
              <span className="w-6 h-px bg-red-600" />
              Get in Touch
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 tracking-tight leading-tight mb-5">
              Request a <span className="text-red-600">Free Quote</span>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed max-w-md mb-10">
              Fill in the form and we'll send you a detailed quote via WhatsApp within 30 minutes. No commitment required.
            </p>

            {/* Trust points */}
            <div className="space-y-4">
              {[
                { icon: MessageCircle, title: "Instant WhatsApp Response", desc: "Our team typically replies within 30 minutes during business hours." },
                { icon: Shield, title: "Certified Products Only", desc: "Every item we quote meets Kenya Bureau of Standards requirements." },
                { icon: Package, title: "Bulk & Custom Orders Welcome", desc: "We handle everything from single units to full-site procurement." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-blue-950">{title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Business hours */}
            <div className="mt-10 p-4 rounded-2xl bg-blue-950 border border-blue-900 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-red-400 text-lg">🕗</span>
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Business Hours</p>
                <p className="text-blue-300 text-xs mt-0.5">Monday – Saturday &nbsp;|&nbsp; 8:00am – 6:00pm</p>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-xl shadow-gray-100 overflow-hidden">

            {/* Form header */}
            <div className="bg-blue-950 px-6 py-5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center">
                <FileText size={15} className="text-red-400" />
              </div>
              <div>
                <p className="text-white text-sm font-bold">Quote Request Form</p>
                <p className="text-blue-400 text-xs">Sends directly to our WhatsApp</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-xs font-medium">Online</span>
              </div>
            </div>

            {!submitted ? (
              <div className="p-6 space-y-5">

                {/* Name + Phone */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-blue-950 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Kamau"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none text-sm text-blue-950 placeholder-gray-400 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-blue-950 uppercase tracking-wider mb-1.5">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+254 7XX XXX XXX"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none text-sm text-blue-950 placeholder-gray-400 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="block text-xs font-semibold text-blue-950 uppercase tracking-wider mb-1.5">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building2 size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Your company (optional)"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none text-sm text-blue-950 placeholder-gray-400 transition-all"
                    />
                  </div>
                </div>

                {/* Product selector */}
                <div>
                  <label className="block text-xs font-semibold text-blue-950 uppercase tracking-wider mb-1.5">
                    Products Interested In <span className="text-red-500">*</span>
                  </label>

                  {/* Selected tags */}
                  {form.products.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {form.products.map((p) => (
                        <span
                          key={p}
                          onClick={() => toggleProduct(p)}
                          className="inline-flex items-center gap-1.5 bg-red-50 border border-red-200 text-red-700 text-xs font-medium px-3 py-1 rounded-full cursor-pointer hover:bg-red-100 transition-colors"
                        >
                          {p}
                          <span className="text-red-400 hover:text-red-600 font-bold">×</span>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Dropdown toggle */}
                  <button
                    type="button"
                    onClick={() => setProductOpen((v) => !v)}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-gray-200 hover:border-red-300 text-sm text-gray-500 transition-all bg-white"
                  >
                    <span className="flex items-center gap-2">
                      <Package size={15} className="text-gray-400" />
                      {form.products.length === 0
                        ? "Select product categories..."
                        : `${form.products.length} selected`}
                    </span>
                    <span className={`text-gray-400 transition-transform duration-200 ${productOpen ? "rotate-180" : ""}`}>▾</span>
                  </button>

                  {/* Dropdown list */}
                  {productOpen && (
                    <div className="mt-1 border border-gray-200 rounded-xl overflow-hidden shadow-lg z-10 bg-white">
                      {productOptions.map((option) => {
                        const selected = form.products.includes(option);
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => toggleProduct(option)}
                            className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors hover:bg-red-50 border-b border-gray-100 last:border-0 ${
                              selected ? "bg-red-50 text-red-700 font-medium" : "text-gray-700"
                            }`}
                          >
                            {option}
                            {selected && <CheckCircle size={15} className="text-red-500 flex-shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-xs font-semibold text-blue-950 uppercase tracking-wider mb-1.5">
                    Quantity / Order Size
                  </label>
                  <div className="relative">
                    <Hash size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="quantity"
                      value={form.quantity}
                      onChange={handleChange}
                      placeholder="e.g. 50 helmets, 100 vests..."
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none text-sm text-blue-950 placeholder-gray-400 transition-all"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-blue-950 uppercase tracking-wider mb-1.5">
                    Additional Notes
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any specific requirements, certifications needed, delivery location..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none text-sm text-blue-950 placeholder-gray-400 transition-all resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={!isValid}
                  className={`w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                    isValid
                      ? "bg-[#25D366] hover:bg-[#20b858] text-white shadow-md shadow-green-200 hover:-translate-y-0.5 hover:shadow-green-300"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <MessageCircle size={18} className="fill-current" />
                  Send Quote Request via WhatsApp
                  {isValid && <ArrowRight size={16} />}
                </button>

                <p className="text-center text-xs text-gray-400">
                  You'll be redirected to WhatsApp with your details pre-filled.
                </p>
              </div>
            ) : (
              /* Success state */
              <div className="p-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center mb-5">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
                <h3 className="text-xl font-extrabold text-blue-950 mb-2">WhatsApp Opened!</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-8">
                  Your quote request has been pre-filled. Just hit <strong>Send</strong> on WhatsApp and our team will get back to you shortly.
                </p>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-500 border border-red-200 hover:border-red-400 hover:bg-red-50 px-6 py-2.5 rounded-xl transition-all"
                >
                  Submit Another Request
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
