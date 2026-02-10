export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        
        <div>
          <h3 className="font-bold text-lg">SafetyPro</h3>
          <p className="mt-3 text-gray-400">
            Providing reliable safety equipment for construction,
            industrial and corporate needs.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <p>+254 7XX XXX XXX</p>
          <p>info@safetypro.co.ke</p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Location</h4>
          <p>Nairobi, Kenya</p>
          <p>Mon - Sat | 8:00am - 6:00pm</p>
        </div>

      </div>

      <div className="text-center text-gray-500 mt-10 text-sm">
        © 2026 SafetyPro. All rights reserved.
      </div>
    </footer>
  );
}
