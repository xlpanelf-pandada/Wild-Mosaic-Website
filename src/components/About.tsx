import { Sparkles, Quote, CheckCircle2 } from "lucide-react";
import artistPortraitImg from "../assets/images/artist_portrait_1780061769359.png";

export default function About() {
  const highlights = [
    "12+ years of professional glasswork & ceramic curation.",
    "Trained in classical mosaic fabrication in Ravenna, Italy.",
    "Passionate about making complex creative crafts accessible to anyone."
  ];

  return (
    <section className="py-20 bg-clay-100" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Founder Portrait Portrait */}
          <div className="lg:col-span-5 relative" id="about-image-column">
            <div className="relative mx-auto max-w-[360px] lg:max-w-none">
              
              {/* Artistic Background Frame Offset */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-clay-300 to-clay-200 rounded-2xl transform -rotate-3 -z-10" />
              
              <div className="rounded-2xl overflow-hidden shadow-2xl border-[6px] border-white bg-white">
                <img
                  src={artistPortraitImg}
                  alt="Artist-founder Claire holding colorful mosaic tile chips in aprons"
                  className="w-full h-auto object-cover aspect-[3/4]"
                  referrerPolicy="no-referrer"
                  id="about-artist-img"
                />
              </div>

              {/* Floating Testimonial Quote Bubble */}
              <div className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur border border-clay-200 rounded-2xl p-4 shadow-xl max-w-[200px] text-left hidden sm:block">
                <Quote className="w-5 h-5 text-clay-700 mb-1.5 fill-clay-100" />
                <p className="text-[11px] text-slate-600 leading-relaxed font-sans italic">
                  "Each cut represents an intention. There are no mistakes in mosaic art, only new design decisions."
                </p>
                <p className="text-[10px] text-slate-900 font-bold font-display mt-2">— Artist Claire</p>
              </div>

            </div>
          </div>

          {/* Right Column - Brand Story */}
          <div className="lg:col-span-7 text-left space-y-6" id="about-copy-column">
            <span className="text-xs font-bold text-clay-700 uppercase tracking-widest font-mono">ARTIST BEHIND THE GLASS</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 leading-tight tracking-tight">
              Meet Claire: Championing the Meditative Flow of Mosaics
            </h2>
            
            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
              <p>
                Hi, I'm Claire. My creative journey with mosaics started during a year-long training series under old-world tile masters in <strong>Ravenna, Italy</strong>. Stepping into those quiet, dark stone basilicas, I saw how centuries-old glass tiles captured and amplified daylight. I instantly became obsessed with how scattered, raw fragments could coalesce into permanent, breathtaking stories.
              </p>
              <p>
                But more than my personal commissions, I fell absolutely in love with <strong>teaching</strong>. Mosaics are a unique medium—they demand patience, but require zero innate painting or drawing credentials. When you sit at our tables, listen to soft jazz, and start nipping glass, the chatter of daily life naturally fades. It's a therapeutic, meditative screen-free escape.
              </p>
            </div>

            {/* Structured studio beliefs */}
            <div className="space-y-3.5 pt-2">
              {highlights.map((bullet, index) => (
                <div key={index} className="flex items-start gap-2.5 text-xs sm:text-sm font-sans" id={`about-bullet-${index}`}>
                  <CheckCircle2 className="w-5 h-5 text-clay-700 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">{bullet}</span>
                </div>
              ))}
            </div>

            {/* Artistic Signature Block */}
            <div className="pt-4 border-t border-clay-200/50 flex items-center justify-between gap-4 max-w-sm">
              <div>
                <p className="text-xs text-slate-400 font-sans uppercase tracking-widest">OWNER & MASTER ARTISAN</p>
                <p className="text-slate-800 font-display font-bold text-lg mt-0.5">Claire d'Aoust</p>
              </div>
              <div className="font-serif italic text-2xl text-clay-700 select-none opacity-80" aria-hidden="true">
                Claire d'Aoust
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
