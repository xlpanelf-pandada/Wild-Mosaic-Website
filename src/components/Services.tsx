import { Clock, Gift, Users, Palette, Compass, Hammer, Truck, ArrowRight, UserCheck } from "lucide-react";
import { Workshop } from "../types";

interface ServicesProps {
  workshops: Workshop[];
  onOpenBooking: (type: "booking" | "commission", workshopId?: string) => void;
  seatsLeftMap: Record<string, number>;
}

export default function Services({ workshops, onOpenBooking, seatsLeftMap }: ServicesProps) {
  
  const commissionSteps = [
    {
      step: "01",
      title: "Interactive Mood Sync",
      desc: "Share your space, dimension targets, and color ideas. Claire sketches custom concept layouts in 48 hours.",
      icon: <Compass className="w-5 h-5 text-art-amber" />,
    },
    {
      step: "02",
      title: "Material Sourcing",
      desc: "Approve premium mosaic components—from French smalti, organic stones, to iridescent Murano stained glass.",
      icon: <Palette className="w-5 h-5 text-art-amber" />,
    },
    {
      step: "03",
      title: "Meticulous Fabricating",
      desc: "Claire hand-nippes and sets each element in our physical kiln. You receive weekly progressive photo updates.",
      icon: <Hammer className="w-5 h-5 text-art-amber" />,
    },
    {
      step: "04",
      title: "White-Glove Mounting",
      desc: "Bespoke protective boxing. Safe, insured shipping or on-the-wall backing support directly to your home.",
      icon: <Truck className="w-5 h-5 text-art-amber" />,
    },
  ];

  return (
    <section className="py-20 bg-clay-50" id="services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-clay-700 uppercase tracking-widest font-mono">CONVERSION ENGINE</span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mt-2 tracking-tight">
            How You Can Work with Us
          </h2>
          <p className="text-slate-500 font-sans mt-3 text-sm sm:text-base">
            Whether you want to learn the physical process in a guided group, or order a custom architectural glass masterpiece made directly by Claire.
          </p>
        </div>

        {/* Responsive Dual Column Engine */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card A: Studio Workshops (Beginners) */}
          <div 
            className="bg-white rounded-3xl p-6 sm:p-8 border border-clay-100 shadow-xl flex flex-col justify-between"
            id="workshops"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="p-2.5 bg-clay-100 text-clay-700 rounded-xl" aria-hidden="true">
                  <Users className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="text-2xl font-display font-extrabold text-slate-900 leading-tight">Guided Workshops</h3>
                  <p className="text-xs text-clay-600 font-bold tracking-wider uppercase font-sans mt-0.5">Hands-On Learning Experience</p>
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-6 font-sans">
                Experience the relaxing flow of creating standard and stained-glass mosaics. Grab a table, enjoy organic local teas under sunbeams, and design gorgeous decor to show off in your home. All materials, safety gear, and grout are fully provided!
              </p>

              {/* Specific Workshop Classes lists */}
              <div className="space-y-4 mb-8">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">Available Class Schedules:</h4>
                
                {workshops.map((w) => {
                  const seatsLeft = seatsLeftMap[w.id] ?? w.seatsLeft;
                  return (
                    <div 
                      key={w.id} 
                      className="group p-4 rounded-2xl bg-clay-50 hover:bg-clay-100/70 border border-clay-200/50 hover:border-clay-300 transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-3.5"
                      id={`workshop-item-${w.id}`}
                    >
                      <div className="space-y-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 text-[9px] font-bold rounded-md uppercase font-sans tracking-wider ${
                            w.level === "Beginner" 
                              ? "bg-teal-50 text-teal-700 border border-teal-100" 
                              : "bg-clay-200 text-clay-800"
                          }`}>
                            {w.level}
                          </span>
                          <span className="text-[11px] text-slate-500 flex items-center gap-1 font-sans">
                            <Clock className="w-3 h-3" /> {w.duration}
                          </span>
                        </div>
                        <h5 className="font-display font-bold text-slate-900 group-hover:text-clay-800 transition-colors text-base">
                          {w.title}
                        </h5>
                        <p className="text-xs text-slate-500 font-sans line-clamp-1">{w.description}</p>
                      </div>

                      <div className="flex sm:flex-col justify-between items-end gap-1 flex-shrink-0 border-t sm:border-t-0 border-slate-100 pt-2.5 sm:pt-0">
                        <div className="text-left sm:text-right">
                          <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-sans">Price</span>
                          <span className="text-lg font-display font-bold text-clay-800">${w.price}</span>
                        </div>

                        {seatsLeft <= 2 ? (
                          <span className="text-[10px] text-red-500 font-bold bg-red-50 px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse inline-block select-none">
                            Last {seatsLeft} Seats!
                          </span>
                        ) : (
                          <span className="text-[10px] text-teal-600 font-bold bg-teal-50 px-2 py-0.5 rounded-full uppercase tracking-wider inline-block">
                            {seatsLeft} Slots open
                          </span>
                        )}
                        
                        <button
                          onClick={() => onOpenBooking("booking", w.id)}
                          className="mt-1 px-4 py-1.5 bg-clay-700 hover:bg-clay-800 text-white text-[11px] font-semibold rounded-lg uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                          id={`book-w-${w.id}-btn`}
                        >
                          Book Class
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inner Workshop Lead trigger bar */}
            <div className="p-4 bg-clay-50/70 border border-clay-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <p className="text-xs text-slate-500 font-sans">
                🎁 <strong>Gifting a Seat?</strong> We write out handmade physical ceramic gift cards with custom copper wrapping for recipients.
              </p>
              <button 
                onClick={() => onOpenBooking("booking")}
                className="text-xs font-bold text-clay-800 hover:text-clay-900 flex items-center gap-1 uppercase tracking-wider cursor-pointer whitespace-nowrap"
                id="gift-card-inquire-btn"
              >
                Inquire Gift <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card B: Custom Fine Art Commissions (Interior Designers) */}
          <div 
            className="bg-slate-900 text-slate-100 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl flex flex-col justify-between"
            id="commissions"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="p-2.5 bg-slate-800 text-art-amber rounded-xl" aria-hidden="true">
                  <Palette className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="text-2xl font-display font-extrabold text-white leading-tight">Bespoke Commissions</h3>
                  <p className="text-xs text-art-amber font-bold tracking-wider uppercase font-sans mt-0.5">High-End Architectural Pieces</p>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-8 font-sans">
                Elevate your home, patio garden, kitchen backsplashes, or luxury dining room table with an authentic, heavy-duty glass art piece designed in direct sync with your architectural intent. Each piece is hand-fabricated and signed by Artist-Founder Claire.
              </p>

              {/* Meticulous Steps Grid */}
              <div className="space-y-5 mb-8">
                <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest font-mono mb-2">Our Meticulous Creation Process:</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {commissionSteps.map((step) => (
                    <div 
                      key={step.step} 
                      className="p-3 bg-slate-800/40 rounded-xl border border-slate-800 hover:bg-slate-800 transition-colors"
                      id={`commission-step-${step.step}`}
                    >
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <span className="p-1 px-1.5 bg-slate-800 text-art-amber rounded font-mono text-[10px] font-extrabold">
                          {step.step}
                        </span>
                        <h5 className="font-display font-bold text-white text-xs sm:text-sm">
                          {step.title}
                        </h5>
                      </div>
                      <p className="text-[11px] text-slate-400 font-sans leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Inquire Call To Action */}
            <div className="space-y-4">
              <div className="p-3.5 bg-slate-800 rounded-xl border border-slate-700/60 text-xs text-slate-300 font-sans">
                🎨 <strong>Now booking commissions for late Summer/Fall slots.</strong> Claire works directly with premium home designers, kitchen contractors, and independent collectors.
              </div>
              
              <button 
                onClick={() => onOpenBooking("commission")}
                className="w-full py-3.5 bg-art-amber hover:bg-amber-600 text-slate-900 font-bold rounded-xl shadow-lg shadow-amber-500/10 hover:shadow-amber-600/15 transition-all text-center flex items-center justify-center gap-2 text-sm uppercase tracking-wider cursor-pointer"
                id="request-commission-quote-btn"
              >
                Inquire Custom Quote Proposal
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
