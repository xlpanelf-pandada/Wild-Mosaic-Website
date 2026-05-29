import { Star, Award, Heart, Shield } from "lucide-react";

export default function SocialProof() {
  const testimonials = [
    {
      quote: "简直是神仙体验！制作过程出乎意料地静心治愈。我带着满身的工作疲惫而来，却在松弛的氛围中做出了如此精美的托盘。主创 Claire 的指导温柔又极其专业，赞不绝口！",
      author: "Sarah K.",
      role: "零基础学员",
      stars: 5,
    },
    {
      quote: "上周末和伴侣一起报了双人体验班。这里陈列的意式奢华 smalti 手工水晶石料让人大开眼界。边听着舒缓音乐，边任凭灵感在指尖拼接色块，真的是最惬意的周末时光。",
      author: "Julian M.",
      role: "周末工坊体验学员",
      stars: 5,
    },
    {
      quote: "Claire 设计的私人艺术定制绝对是一绝。我为客户的豪宅别墅玄关处定制了一幅多维抽象浮雕彩色玻璃画屏。现在它成了整个空间当之无愧的灵魂主角。",
      author: "Evelyn R.",
      role: "资深室内设计师",
      stars: 5,
    },
  ];

  const trustBadges = [
    { icon: <Award className="w-5 h-5 text-clay-600" />, text: "受认证国际工艺美术师协会成员" },
    { icon: <Heart className="w-5 h-5 text-clay-600" />, text: "2026年度最受欢迎创意手工体验" },
    { icon: <Shield className="w-5 h-5 text-clay-600" />, text: "100% 绿色低碳天然环保矿石物料" },
  ];

  return (
    <section className="bg-white py-8 md:py-16 border-y border-clay-100" id="social-proof-ribbon">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Institutional Trust Badges Area */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-4 items-center justify-between pb-8 md:pb-10 border-b border-slate-100">
          {trustBadges.map((badge, idx) => (
            <div 
              key={idx} 
              className="flex items-center justify-center md:justify-start gap-3 px-4 py-2 bg-clay-50/50 rounded-2xl border border-clay-100/40"
              id={`trust-badge-${idx}`}
            >
              <div className="p-1.5 bg-white rounded-lg shadow-sm border border-clay-100">
                {badge.icon}
              </div>
              <span className="text-xs font-semibold text-slate-700 tracking-wide font-sans">
                {badge.text}
              </span>
            </div>
          ))}
        </div>

        {/* 3 Columns Highlight Snippet Reviews */}
        <div className="pt-8 md:pt-10" id="testimonials-grid">
          <div className="text-center max-w-xl mx-auto mb-6 md:mb-8">
            <h3 className="text-xs font-bold text-clay-600 uppercase tracking-widest font-mono mb-2">学员真实心声</h3>
            <p className="text-xl font-display font-medium text-slate-900">在这里，聆听指尖敲进艺术的清脆律动</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
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
