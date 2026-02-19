import { Shield, Target, Eye, Award, CheckCircle, ArrowRight, Handshake, Zap, Globe } from "lucide-react";

const stats = [
  { value: "10+", label: "Years in Business" },
  { value: "5,000+", label: "Products Delivered" },
  { value: "300+", label: "Clients Served" },
  { value: "47", label: "Counties Reached" },
];

const values = [
  {
    icon: Shield,
    title: "Safety First, Always",
    desc: "Every product we stock is rigorously vetted. We refuse to compromise on quality — because the consequences of failure are too high.",
  },
  {
    icon: Zap,
    title: "Speed & Reliability",
    desc: "Same-day dispatch in Nairobi. We understand worksites can't wait — our logistics are built around your deadlines.",
  },
  {
    icon: Handshake,
    title: "Honest Partnerships",
    desc: "No upselling, no misleading specs. We recommend only what your team genuinely needs for the job at hand.",
  },
  {
    icon: Globe,
    title: "Built for Kenya",
    desc: "We understand local conditions — climate, regulations, and industry standards — better than any international supplier.",
  },
];

const certifications = [
  {
    name: "Kenya Bureau of Standards",
    short: "KEBS",
    desc: "All PPE stocked meets KEBS certification requirements for the Kenyan market.",
    color: "bg-blue-50 border-blue-200 text-blue-700",
    dot: "bg-blue-500",
  },
  {
    name: "ISO 9001:2015",
    short: "ISO",
    desc: "Our supply chain and quality management processes meet international ISO standards.",
    color: "bg-red-50 border-red-200 text-red-700",
    dot: "bg-red-500",
  },
  {
    name: "CE Marked Products",
    short: "CE",
    desc: "European conformity marking on applicable products ensures global safety compliance.",
    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
    dot: "bg-emerald-500",
  },
  {
    name: "ANSI/ISEA Standards",
    short: "ANSI",
    desc: "Key product lines meet American National Standards Institute safety specifications.",
    color: "bg-amber-50 border-amber-200 text-amber-700",
    dot: "bg-amber-500",
  },
];

const partners = [
  "3M", "Honeywell", "MSA Safety", "Uvex", "Ansell", "JSP",
];

export default function About() {
  return (
    <div id="about" className="bg-white">

      {/* ── Hero Banner ──────────────────────────────────────────── */}
      <section className="bg-blue-950 pt-24 pb-20 relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }}
        />
        <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 -left-10 w-60 h-60 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-red-600 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <div className="inline-flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-widest mb-5">
            <span className="w-6 h-px bg-red-500" />
            About SafetyKE
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-3xl">
            Kenya's Most Trusted <span className="text-red-500">Safety Equipment</span> Supplier
          </h1>
          <p className="mt-6 text-blue-300 text-lg max-w-2xl leading-relaxed">
            We don't just sell safety gear — we take responsibility for the protection of Kenya's workforce. Every product we supply is chosen with that weight in mind.
          </p>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="border-l-2 border-red-600 pl-4">
                <p className="text-3xl font-extrabold text-white">{s.value}</p>
                <p className="text-blue-400 text-xs font-medium mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Story ────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — text */}
            <div>
              <div className="inline-flex items-center gap-2 text-red-600 text-xs font-bold uppercase tracking-widest mb-4">
                <span className="w-6 h-px bg-red-600" />
                Our Story
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 tracking-tight leading-tight mb-6">
                Built on the Belief That Every Worker Deserves to Go Home Safe
              </h2>
              <div className="space-y-4 text-gray-600 text-base leading-relaxed">
                <p>
                  SafetyKE was founded in 2014 by a team that had seen firsthand the consequences of poor-quality safety equipment on Kenyan worksites. Substandard helmets, counterfeit gloves, vests that offered no real protection — the market was flooded with gear that looked the part but failed when it mattered most.
                </p>
                <p>
                  We built SafetyKE with one non-negotiable principle: <strong className="text-blue-950">we only stock what we would trust on our own family members.</strong> That standard has never changed, and it's what has earned us the trust of over 300 companies across Kenya.
                </p>
                <p>
                  From a small Nairobi outlet in 2014 to a nationwide supplier today — our growth has been built entirely on referrals, repeat clients, and a reputation we guard fiercely.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-md shadow-red-100 hover:-translate-y-0.5"
                >
                  Work With Us <ArrowRight size={15} />
                </a>
                <a
                  href="#products"
                  className="inline-flex items-center gap-2 text-blue-950 hover:text-red-600 font-semibold text-sm transition-colors"
                >
                  View Products <ArrowRight size={15} />
                </a>
              </div>
            </div>

            {/* Right — brand visual */}
            <div className="relative rounded-3xl overflow-hidden bg-blue-950 min-h-80 flex items-center justify-center p-10">
              <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-red-600/20 rounded-full blur-3xl" />
              <div className="absolute top-10 -left-10 w-40 h-40 bg-red-600/10 rounded-full blur-3xl" />
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-red-900/40">
                  <Shield size={38} className="text-white" strokeWidth={2} />
                </div>
                <p className="text-white text-2xl font-black tracking-tight">Safety<span className="text-red-500">KE</span></p>
                <p className="text-blue-300 text-sm mt-2">Kenya's Trusted PPE Supplier</p>
                <div className="mt-8 grid grid-cols-2 gap-4 text-left">
                  {stats.map((s) => (
                    <div key={s.label} className="border-l-2 border-red-600 pl-3">
                      <p className="text-white font-extrabold text-xl leading-none">{s.value}</p>
                      <p className="text-blue-400 text-xs mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ─────────────────────────────────────── */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-950 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-red-600/10 rounded-full blur-2xl" />
              <div className="w-11 h-11 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center mb-5">
                <Target size={20} className="text-red-400" />
              </div>
              <h3 className="text-xl font-extrabold text-white mb-3">Our Mission</h3>
              <p className="text-blue-300 text-sm leading-relaxed">
                To make certified, high-quality personal protective equipment accessible and affordable to every worker in Kenya — from the largest construction company to the smallest workshop.
              </p>
            </div>
            <div className="bg-red-600 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
              <div className="w-11 h-11 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center mb-5">
                <Eye size={20} className="text-white" />
              </div>
              <h3 className="text-xl font-extrabold text-white mb-3">Our Vision</h3>
              <p className="text-red-100 text-sm leading-relaxed">
                A Kenya where zero workers are injured due to inadequate safety equipment. We exist to drive that number down — one certified product, one protected worker at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-red-600 text-xs font-bold uppercase tracking-widest mb-4">
              <span className="w-6 h-px bg-red-600" />
              Why SafetyKE
              <span className="w-6 h-px bg-red-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 tracking-tight">
              We Don't Cut Corners. Neither Should Your Safety.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-5 p-6 rounded-2xl border border-gray-100 hover:border-red-100 hover:bg-red-50/30 transition-all duration-200 group">
                <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
                  <Icon size={20} className="text-red-600" />
                </div>
                <div>
                  <h4 className="font-bold text-blue-950 mb-1.5">{title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ───────────────────────────────────────── */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 text-red-600 text-xs font-bold uppercase tracking-widest mb-4">
                <span className="w-6 h-px bg-red-600" />
                Certifications
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 tracking-tight leading-tight mb-4">
                Every Product Backed by a Standard You Can Trust
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-8">
                We don't just take suppliers at their word. Every product line we carry is verified against recognized safety standards before it reaches your team.
              </p>

              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div key={cert.name} className={`flex items-start gap-4 p-4 rounded-2xl border ${cert.color} bg-opacity-50`}>
                    <div className={`w-10 h-10 rounded-xl ${cert.color} flex items-center justify-center flex-shrink-0 font-black text-xs`}>
                      {cert.short}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-blue-950">{cert.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{cert.desc}</p>
                    </div>
                    <CheckCircle size={16} className="text-emerald-500 flex-shrink-0 mt-0.5 ml-auto" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right — partners */}
            <div>
              <div className="inline-flex items-center gap-2 text-red-600 text-xs font-bold uppercase tracking-widest mb-4">
                <span className="w-6 h-px bg-red-600" />
                Brand Partners
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-blue-950 tracking-tight leading-tight mb-4">
                We Stock the World's Leading Safety Brands
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-8">
                Our partnerships with globally recognized manufacturers mean you get authentic, warranted products — not imitations.
              </p>

              <div className="grid grid-cols-3 gap-4">
                {partners.map((partner) => (
                  <div key={partner} className="bg-white rounded-2xl border border-gray-200 h-20 flex items-center justify-center hover:border-red-200 hover:shadow-md transition-all duration-200">
                    <span className="text-blue-950 font-black text-lg tracking-tight">{partner}</span>
                  </div>
                ))}
              </div>

              {/* Bottom CTA card */}
              <div className="mt-8 bg-blue-950 rounded-2xl p-6 flex items-start gap-4 relative overflow-hidden">
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-red-600/10 rounded-full blur-2xl" />
                <div className="w-10 h-10 bg-red-600/20 border border-red-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award size={18} className="text-red-400" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Need proof of certification?</p>
                  <p className="text-blue-300 text-xs mt-1 leading-relaxed">
                    We can provide product datasheets and certification documents for any item we supply. Just ask.
                  </p>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-red-400 hover:text-red-300 text-xs font-bold mt-3 transition-colors"
                  >
                    Request Documents <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────── */}
      <section className="bg-red-600 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "28px 28px" }}
        />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            Ready to Protect Your Team?
          </h2>
          <p className="text-red-100 text-base max-w-xl mx-auto leading-relaxed mb-8">
            Talk to us today. We'll assess your worksite needs and get you the right gear — fast.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-red-600 font-black px-8 py-3.5 rounded-xl text-sm transition-all shadow-lg hover:-translate-y-0.5"
            >
              Request a Free Quote <ArrowRight size={15} />
            </a>
            <a
              href="#products"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white/40 hover:border-white text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-all"
            >
              Browse Products
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
