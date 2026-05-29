import { Sparkles, Calendar, Eye, ArrowRight } from "lucide-react";
import heroImg from "../assets/images/mosaic_hero_banner_1780061747767.png";
import mosaicPiece1 from "../assets/images/mosaic_artpiece_1_1780061787150.png";

interface HeroProps {
  onOpenBooking: (type: "booking" | "commission") => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section className="relative pt-24 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-clay-50" id="hero-section">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-clay-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-art-amber/10 rounded-full blur-2xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column - Copywriting & Action Blocks */}
          <div className="lg:col-span-7 space-y-6 text-left" id="hero-left-column">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-clay-100 text-clay-800 border border-clay-200 text-xs font-semibold uppercase tracking-wider font-sans">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-clay-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-clay-700"></span>
              </span>
              Creative Workshops & Bespoke Gallery Art
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-slate-900 leading-[1.08] tracking-tight">
              Piece Together <br />Your Creativity:
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-clay-700 to-clay-900 leading-tight">
                Hands-On Mosaic Classes
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-sans max-w-xl leading-relaxed">
              Unwind in our cozy sunlit studio. Learn the therapeutic rhythm of selecting, cutting, and setting shimmering premium Italian glass & stones into beautiful, permanent works of art. No prior credentials or design skills required!
            </p>

            {/* CTAs and triggers */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="#workshops"
                className="px-6 py-3.5 bg-clay-700 hover:bg-clay-800 text-white font-bold rounded-xl shadow-lg shadow-clay-700/20 hover:shadow-clay-800/30 transition-all text-center flex items-center justify-center gap-2 text-sm uppercase tracking-wider cursor-pointer"
                id="hero-primary-cta"
              >
                <Calendar className="w-4 h-4" />
                View Workshop Dates
              </a>
              <a
                href="#gallery"
                className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl border border-slate-200 shadow-sm transition-all text-center flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
                id="hero-secondary-cta"
              >
                <Eye className="w-4 h-4" />
                Explore the Gallery
              </a>
            </div>

            {/* Micro Social Proof Text */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
              <div className="flex text-amber-500 text-sm tracking-wide">
                {"★".repeat(5)}
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-sans">
                <strong className="text-slate-800 font-semibold">4.9/5 stars</strong> based on 200+ local students, designers & curators.
              </p>
            </div>
            
          </div>

          {/* Right Column - Multi-Image Layout Mosaic Grid */}
          <div className="lg:col-span-5 relative" id="hero-right-column">
            <div className="relative mx-auto max-w-[440px] lg:max-w-none">
              
              {/* Outer Decorative Grid border backdrop representing mosaic structure */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 group border-[6px] border-white ring-1 ring-slate-100 bg-clay-100">
                <img
                  src={heroImg}
                  alt="Sunny Mosaic Working Studio wooden table with glass pieces"
                  className="w-full h-[320px] sm:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  id="hero-rendered-banner"
                />
                
                {/* Embedded Glass Overlay Info Card */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/15 to-transparent flex flex-col justify-end p-5">
                  <span className="text-[11px] font-mono text-clay-200 uppercase tracking-widest font-semibold flex items-center gap-1.5 mb-1 bg-white/10 backdrop-blur-md w-fit px-2.5 py-1 rounded-full border border-white/15">
                    <Sparkles className="w-3 h-3 animate-pulse text-amber-400" /> Live Studio Space
                  </span>
                  <p className="text-white font-display font-medium text-sm sm:text-base leading-snug">
                    "A sanctuary of color where individual fragments unite into timeless stories."
                  </p>
                </div>
              </div>

              {/* Floating Mosaic Highlight item (Visual Grid Accent Card B) */}
              <div 
                className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 w-28 h-28 sm:w-36 h-28 sm:h-36 rounded-2xl overflow-hidden border-[6px] border-white shadow-xl bg-white hidden sm:block hover:rotate-3 transition-transform duration-300"
                id="hero-vintage-tile-accent-1"
              >
                <img
                  src={mosaicPiece1}
                  alt="Textured Glass Mosaic detail close-up"
                  className="w-[140px] h-[140px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating Artistic Tag Overlay Container */}
              <div 
                className="absolute -top-4 -right-4 p-4 bg-white/95 backdrop-blur-md border border-clay-100 rounded-2xl shadow-lg max-w-[170px] space-y-1.5 hidden md:block select-none"
                id="hero-experience-badge-tag"
              >
                <p className="text-[10px] font-bold text-clay-700 uppercase tracking-wider font-mono">NEXT OPEN CLASS</p>
                <p className="text-xs font-display font-bold text-slate-800 leading-snug">Beginner Glass coaster set</p>
                <p className="text-[11px] text-slate-500 font-sans">Saturday at 10 AM</p>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-[80%] bg-clay-700 rounded-full" />
                </div>
                <div className="flex justify-between items-center text-[9px] font-semibold text-clay-800">
                  <span>80% Booked</span>
                  <span>2 Seats Left</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
