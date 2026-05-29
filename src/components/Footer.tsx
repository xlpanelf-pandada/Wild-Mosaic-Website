import React, { useState } from "react";
import { Mail, Send, CheckCircle, Flame, Instagram, Facebook, MapPin, Watch, ShieldCheck } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setIsValidEmail(false);
      return;
    }
    setSubmitting(true);
    setIsValidEmail(true);

    setTimeout(() => {
      // Persist newsletter lead in localStorage
      const existing = JSON.parse(localStorage.getItem("mosaic_newsletter") || "[]");
      if (!existing.includes(email)) {
        localStorage.setItem("mosaic_newsletter", JSON.stringify([...existing, email]));
      }
      setSubmitting(false);
      setSubscribed(true);
      setEmail("");
    }, 1000);
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-100 font-sans" id="studio-footer">
      
      {/* Newsletter Lead Magnet Area */}
      <div className="bg-clay-800 relative overflow-hidden py-12 px-6 sm:px-12 text-center border-b border-clay-900">
        {/* Background visual geometric accents */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-clay-700/30 rounded-full blur-2xl -z-10" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-art-amber/10 rounded-full blur-2xl -z-10" />

        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur rounded-full text-xs font-bold text-art-amber uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-art-amber" aria-hidden="true" />
            Class Seats Fill Rapidly
          </div>
          
          <h3 className="text-xl sm:text-3xl font-display font-bold text-white leading-tight">
            Can't find an open date?
          </h3>
          <p className="text-clay-100 text-xs sm:text-sm max-w-lg mx-auto">
            Get early notifications when our monthly schedule blocks drop. Only curated schedules and studio invites, zero junk.
          </p>

          {/* Form container */}
          <div className="max-w-md mx-auto pt-2" id="newsletter-form-container">
            {subscribed ? (
              <div 
                className="p-4 bg-white/10 rounded-xl border border-white/10 text-white text-xs sm:text-sm flex items-center justify-center gap-2"
                id="newsletter-success-alert"
              >
                <CheckCircle className="w-5 h-5 text-art-amber" />
                <span>You're in! We will notify you 2 hours before the public drop.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-1">
                <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                  <div className="relative flex-1">
                    <span className="absolute left-3.5 top-3.5 text-clay-300">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setIsValidEmail(true);
                      }}
                      placeholder="Enter your personal email"
                      className="w-full pl-10 pr-4 py-3 bg-white text-slate-800 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-art-amber placeholder-slate-400 font-sans"
                      disabled={submitting}
                      id="newsletter-email-input"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-805 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap min-w-[120px]"
                    id="newsletter-submit-btn"
                  >
                    {submitting ? "Signing up..." : "Send invites"}
                    <Send className="w-3.5 h-3.5 text-art-amber" />
                  </button>
                </div>
                {!isValidEmail && (
                  <p className="text-[11px] text-red-200 mt-1.5 text-left pl-1 font-semibold" id="newsletter-error">
                    ⚠️ Please provide a valid email structure (e.g. name@example.com).
                  </p>
                )}
                <p className="text-[10px] text-clay-200/80 pt-1 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Curated local schedules only. Safe and double-opted.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Structural Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="footer-midsections">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Column A: Logo Brand and Description */}
          <div className="md:col-span-5 space-y-4 text-left">
            <h4 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <span className="p-1.5 bg-clay-700 text-white rounded-lg">❇️</span>
              Mosaic Working Studio
            </h4>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              A serene brick-and-mortar space in San Francisco's Creative District. Dedicated to teaching traditional and contemporary stained glass mosaic fabrication routines under meditative guiding workflows.
            </p>
            {/* Social handles */}
            <div className="flex gap-3">
              <a 
                href="#footer" 
                className="p-2 bg-slate-800 hover:bg-clay-700 text-slate-300 hover:text-white rounded-lg transition-colors border border-slate-700"
                aria-label="Find us on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="#footer" 
                className="p-2 bg-slate-800 hover:bg-clay-700 text-slate-300 hover:text-white rounded-lg transition-colors border border-slate-700"
                aria-label="Join our Facebook community group"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="#footer" 
                className="p-2 bg-slate-800 hover:bg-clay-700 text-slate-300 hover:text-white rounded-lg transition-colors border border-slate-700"
                aria-label="See mosaic layout references on Pinterest"
              >
                <span className="text-xs font-bold font-mono">Pinterest</span>
              </a>
            </div>
          </div>

          {/* Column B: Local Workspace Coordinates */}
          <div className="md:col-span-4 space-y-3.5 text-left">
            <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono">Location & Coordinates</h5>
            <div className="space-y-4 text-xs text-slate-300 leading-normal font-sans">
              
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4.5 h-4.5 text-clay-600 mt-0.5 flex-shrink-0" />
                <p>
                  <strong>Physical Space:</strong><br />
                  614 Stained Glass Alley, Creative District<br />
                  San Francisco, CA 94107
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <Watch className="w-4.5 h-4.5 text-clay-600 mt-0.5 flex-shrink-0" />
                <p>
                  <strong>Studio Doors Open:</strong><br />
                  Thursday - Sunday • 10:00 AM - 6:00 PM<br />
                  <span className="text-clay-500 font-medium">Classes occur on select evenings.</span>
                </p>
              </div>

            </div>
          </div>

          {/* Column C: Quick Link Navigation */}
          <div className="md:col-span-3 space-y-3 text-left">
            <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono">Explorations</h5>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="#workshops" className="hover:text-art-amber transition-colors">Studio Guided Classes</a>
              </li>
              <li>
                <a href="#commissions" className="hover:text-art-amber transition-colors">Custom Commission Designs</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-art-amber transition-colors">Tactile Glass Gallery</a>
              </li>
              <li>
                <a href="#about" className="hover:text-art-amber transition-colors">Artist Biography</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-art-amber transition-colors">Policies & Questions</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower Legal Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-sans">
          <p>© {new Date().getFullYear()} Mosaic Working Studio LLC. All fine crafts and layout pixels reserved.</p>
          <div className="flex gap-4">
            <a href="#footer" className="hover:text-slate-300">Terms of Use</a>
            <a href="#footer" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#footer" className="hover:text-slate-300 font-mono text-[9px] text-clay-500">Local Time: 2026-05-29 UTC</a>
          </div>
        </div>

      </div>

    </footer>
  );
}
