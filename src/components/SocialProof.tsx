import { Star, Award, Heart, Shield } from "lucide-react";

export default function SocialProof() {
  const testimonials = [
    {
      quote: "Absolute gold! It's unbelievably therapeutic. I came in stressed from work and left with a beautiful custom tray.Claire is a gentle and masterful guide.",
      author: "Sarah K.",
      role: "Beginner Student",
      stars: 5,
    },
    {
      quote: "My partner and I did the weekend session. The selection of Italian tiles is insane. It's so much fun to just listen to music and piece tiles together.",
      author: "Julian M.",
      role: "Weekend Student",
      stars: 5,
    },
    {
      quote: "Bespoke commissions are spectacular. I requested a dimensional backsplash design for my kitchen renovation, and she made it an absolute focal point.",
      author: "Evelyn R.",
      role: "Interior Designer",
      stars: 5,
    },
  ];

  const trustBadges = [
    { icon: <Award className="w-5 h-5 text-clay-700" />, text: "Certified Masterglass Guild Member" },
    { icon: <Heart className="w-5 h-5 text-clay-700" />, text: "Top-Rated Creative Experience 2026" },
    { icon: <Shield className="w-5 h-5 text-clay-700" />, text: "100% Eco-Friendly Recycled Sourcing" },
  ];

  return (
    <section className="bg-white py-12 border-y border-clay-100" id="social-proof-ribbon">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Institutional Trust Badges Area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 items-center justify-between pb-10 border-b border-slate-100">
          {trustBadges.map((badge, idx) => (
            <div 
              key={idx} 
              className="flex items-center justify-center md:justify-start gap-3 px-4 py-2 bg-clay-50/50 rounded-2xl border border-clay-100/40"
              id={`trust-badge-${idx}`}
            >
              <div className="p-1.5 bg-white rounded-lg shadow-sm border border-clay-100">
                {badge.icon}
              </div>
              <span className="text-xs font-semibold text-slate-700 tracking-wide uppercase font-sans">
                {badge.text}
              </span>
            </div>
          ))}
        </div>

        {/* 3 Columns Highlight Snippet Reviews */}
        <div className="pt-10" id="testimonials-grid">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-xs font-bold text-clay-700 uppercase tracking-widest font-mono mb-2">STUDENT REVIEWS</h3>
            <p className="text-xl font-display font-medium text-slate-900">What it feels like behind the workspace tables</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((test, idx) => (
              <div 
                key={idx} 
                className="bg-clay-100 border border-clay-200/50 p-6 rounded-2xl flex flex-col justify-between hover:shadow-md transition-shadow"
                id={`testimonial-card-${idx}`}
              >
                <div className="space-y-3.5">
                  <div className="flex gap-1 text-art-amber" aria-label="5 star rating">
                    {Array.from({ length: test.stars }).map((_, s) => (
                      <Star key={s} className="w-4 h-4 fill-art-amber" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed italic font-sans">
                    "{test.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-2.5 pt-4 border-t border-clay-200/40 mt-4">
                  <div className="w-7 h-7 bg-clay-700 text-clay-50 font-display font-bold text-xs rounded-full flex items-center justify-center">
                    {test.author[0]}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">{test.author}</h5>
                    <p className="text-[10px] text-slate-500 font-sans">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
