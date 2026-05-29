import { Sparkles, Quote, CheckCircle2 } from "lucide-react";
import artistPortraitImg from "../assets/images/artist_portrait_1780061769359.png";

export default function About() {
  const highlights = [
    "12+ 年专注建筑级艺术玻璃、彩嵌彩砂与奢华矿石镶嵌行业经验。",
    "曾远赴意式马赛克发源圣地——意大利拉文纳（Ravenna）系统修读古典手作。",
    "倾心于将繁复的古典手工拼贴重塑为让零基础普通人皆能上手的治愈系自愈修行。"
  ];

  return (
    <section className="py-12 md:py-20 bg-clay-100" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          
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
                <Quote className="w-5 h-5 text-clay-600 mb-1.5 fill-clay-100" />
                <p className="text-[11px] text-slate-600 leading-relaxed font-sans italic">
                  “每一次钳切，都镌刻着您当下的心灵印章。在马赛克的世界里没有所谓的‘失误’，只有未曾预料的绝美设计契机。”
                </p>
                <p className="text-[10px] text-slate-900 font-bold font-display mt-2">— 艺术家 Claire</p>
              </div>

            </div>
          </div>

          {/* Right Column - Brand Story */}
          <div className="lg:col-span-7 text-left space-y-6" id="about-copy-column">
            <span className="text-xs font-bold text-clay-600 uppercase tracking-widest font-mono">碎璃之畔的指尖匠心</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 leading-tight tracking-normal">
              遇见 Claire：在碎璃与晶石间，拥抱心流的温存
            </h2>
            
            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
              <p>
                您好，我是 Claire。我与马赛克装饰艺术的缘分，源于在<strong>意大利历史名城拉文纳</strong>跟随古典马赛克大师为期一年的贴身学徒生涯。当我置身于那些古老、沉静而幽暗的拜占庭式大教堂中，目睹了数世纪前传承下来的金箔玻璃片是如何在斑驳的石墙缝隙间捕捉并数倍折射外界的曦光时，我便深深沦陷其中，不可自拔。
              </p>
              <p>
                然而，相比于私人大型佣金创作，我发现自己甚至更加疯狂地迷恋上了<strong>艺术教学</strong>。马赛克是一门极其具有疗愈性的古典介质——它不需要您具备任何精细画工或速写造型天赋，它唯一需要的是您片刻内心的宁静与笃行。当您围坐在我们洒满柔和光耀的长桌前，伴着舒缓的爵士乐剪切玻璃，尘世生活的所有杂音都将如潮水般褪去，那是无可替代的减压静修。
              </p>
            </div>

            {/* Structured studio beliefs */}
            <div className="space-y-3.5 pt-2">
              {highlights.map((bullet, index) => (
                <div key={index} className="flex items-start gap-2.5 text-xs sm:text-sm font-sans" id={`about-bullet-${index}`}>
                  <CheckCircle2 className="w-5 h-5 text-clay-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">{bullet}</span>
                </div>
              ))}
            </div>

            {/* Artistic Signature Block */}
            <div className="pt-4 border-t border-clay-200/50 flex items-center justify-between gap-4 max-w-sm">
              <div>
                <p className="text-xs text-slate-400 font-sans tracking-widest">高级工匠 / 创始主创</p>
                <p className="text-slate-800 font-display font-bold text-lg mt-0.5">Claire d'Aoust</p>
              </div>
              <div className="font-serif italic text-2xl text-clay-600 select-none opacity-80" aria-hidden="true">
                Claire d'Aoust
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
