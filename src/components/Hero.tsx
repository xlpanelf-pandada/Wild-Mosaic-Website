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
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-clay-100 text-clay-800 border border-clay-200 text-xs font-semibold tracking-wider font-sans">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-clay-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-clay-600"></span>
              </span>
              创意手作工坊 & 艺术私人定制空间
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-900 leading-[1.12] tracking-normal">
              拼接灵感，淬炼斑斓：<br />
              亲手雕琢属于你的
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-clay-600 to-clay-800 leading-tight">
                马赛克手工艺术之美
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 font-sans max-w-xl leading-relaxed">
              在和煦温馨的洒满阳光的工作室里，感受指尖拼贴工艺带来的心灵解压与疗愈。您无须任何美术基础与设计经验，我们优秀的艺术家将现场指导您进行玻璃切割、几何布局与真缝填补，让一片片闪烁的进口意式手工 Smalti 玻璃与天然原石，在指甲间凝聚成高贵隽永的光影杰作。
            </p>

            {/* CTAs and triggers */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="#workshops"
                className="px-6 py-3.5 bg-clay-600 hover:bg-clay-700 text-white font-bold rounded-xl shadow-lg shadow-clay-600/20 hover:shadow-clay-700/30 transition-all text-center flex items-center justify-center gap-2 text-sm tracking-widest cursor-pointer"
                id="hero-primary-cta"
              >
                <Calendar className="w-4 h-4" />
                查看工坊排期表
              </a>
              <a
                href="#gallery"
                className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl border border-slate-200 shadow-sm transition-all text-center flex items-center justify-center gap-2 text-sm tracking-widest"
                id="hero-secondary-cta"
              >
                <Eye className="w-4 h-4" />
                探索珍藏画廊
              </a>
            </div>

            {/* Micro Social Proof Text */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
              <div className="flex text-amber-500 text-sm tracking-wide">
                {"★".repeat(5)}
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-sans">
                根据 200+ 多位本地学员、独立室内设计师和策展艺术家的五星好评，真实推荐分 <strong className="text-slate-800 font-semibold">4.9/5</strong>。
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
                    <Sparkles className="w-3 h-3 animate-pulse text-amber-300" /> 艺术空间现场实拍
                  </span>
                  <p className="text-white font-display font-medium text-sm sm:text-base leading-snug">
                    “这是一座色彩的圣殿，无数破碎的彩色微粒，终将在你指尖汇聚成永恒的故事。”
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
                <p className="text-[10px] font-bold text-clay-600 uppercase tracking-wider font-mono">下期热门推荐课</p>
                <p className="text-xs font-display font-bold text-slate-800 leading-snug">零基础大教堂玻璃杯垫手作</p>
                <p className="text-[11px] text-slate-500 font-sans">周六上午 10:00 开课</p>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-[80%] bg-clay-600 rounded-full" />
                </div>
                <div className="flex justify-between items-center text-[9px] font-semibold text-clay-800">
                  <span>已满 80%</span>
                  <span>仅余 2 坐席</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
