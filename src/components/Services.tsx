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
      title: "灵感沟通与测绘",
      desc: "提供您的居家或商用空间照片、预想尺寸与主色调偏好。Claire 将在48小时内草拟专属概念布局与色稿。",
      icon: <Compass className="w-5 h-5 text-art-amber" />,
    },
    {
      step: "02",
      title: "定制严选石料玻璃",
      desc: "甄选符合高级空间质感的定制马赛克奢料：从威尼斯 smalti 手工玻璃、天然大理石原岩、到极光折射的穆拉诺裂纹大教堂玻璃。",
      icon: <Palette className="w-5 h-5 text-art-amber" />,
    },
    {
      step: "03",
      title: "艺术纯手工剪裁拼筑",
      desc: "Claire 亲手钳切并对数千颗晶片在独立工作室进行定位与浇筑。在制作期间，您每周五均会收到超高清进度照片。",
      icon: <Hammer className="w-5 h-5 text-art-amber" />,
    },
    {
      step: "04",
      title: "奢华保价空运上门",
      desc: "采用双层气泡防震艺术防损木箱密封托运。提供全球保价派送上门，并在适宜的建筑结构下提供墙体定位指导与加固配件支持。",
      icon: <Truck className="w-5 h-5 text-art-amber" />,
    },
  ];

  const getLevelText = (lvl: string) => {
    if (lvl === "Beginner") return "零基础起步";
    if (lvl === "Intermediate") return "中阶进阶";
    return "全等级通用";
  };

  return (
    <section className="py-20 bg-clay-50" id="services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-clay-600 uppercase tracking-widest font-mono">开启指尖与色彩的修行</span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mt-2 tracking-tight">
            选择属于您的艺术体验
          </h2>
          <p className="text-slate-500 font-sans mt-3 text-sm sm:text-base">
            无论您是渴望在静谧轻松的工作室团队中体验亲手雕琢的乐趣，还是希望定制一幅由主创 Claire 亲切定制的建筑级彩色玻璃马赛克传世壁饰。
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
                <span className="p-2.5 bg-clay-100 text-clay-600 rounded-xl" aria-hidden="true">
                  <Users className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="text-2xl font-display font-extrabold text-slate-900 leading-tight">手作艺术体验课</h3>
                  <p className="text-xs text-clay-600 font-bold tracking-wider uppercase font-sans mt-0.5">线下沉浸式体验</p>
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-6 font-sans">
                体验手工磨切和慢节奏彩色玻璃拼贴的内心安宁与松弛感。邀上三两好友，在充满午后斜照暖阳的桌前，品味研磨草本茶，亲手将一片片晶莹色块熔铸成美轮美奂的家居小物。课程提供所有专业用具、护目防护镜及材料。
              </p>

              {/* Specific Workshop Classes lists */}
              <div className="space-y-4 mb-8">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">近期可预订的体验课：</h4>
                
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
                          <span className={`px-2 py-0.5 text-[9px] font-bold rounded-md uppercase font-sans tracking-wide ${
                            w.level === "Beginner" 
                              ? "bg-teal-50 text-teal-700 border border-teal-100" 
                              : "bg-clay-200 text-clay-800"
                          }`}>
                            {getLevelText(w.level)}
                          </span>
                          <span className="text-[11px] text-slate-500 flex items-center gap-1 font-sans">
                            <Clock className="w-3 h-3" /> {w.duration}
                          </span>
                        </div>
                        <h5 className="font-display font-bold text-slate-900 group-hover:text-clay-600 transition-colors text-base">
                          {w.title}
                        </h5>
                        <p className="text-xs text-slate-500 font-sans line-clamp-1">{w.description}</p>
                      </div>

                      <div className="flex sm:flex-col justify-between items-end gap-1 flex-shrink-0 border-t sm:border-t-0 border-slate-100 pt-2.5 sm:pt-0">
                        <div className="text-left sm:text-right">
                          <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-sans">课程预约价</span>
                          <span className="text-lg font-display font-bold text-clay-800">${w.price} <span className="text-xs text-slate-400 inline">/ 位</span></span>
                        </div>

                        {seatsLeft <= 2 ? (
                          <span className="text-[10px] text-red-500 font-bold bg-red-50 px-2 py-0.5 rounded-full tracking-wider animate-pulse inline-block select-none">
                            特紧急 仅剩 {seatsLeft} 人！
                          </span>
                        ) : (
                          <span className="text-[10px] text-teal-600 font-bold bg-teal-50 px-2 py-0.5 rounded-full tracking-wider inline-block">
                            可预订 {seatsLeft} 席
                          </span>
                        )}
                        
                        <button
                          onClick={() => onOpenBooking("booking", w.id)}
                          className="mt-1 px-4 py-1.5 bg-clay-600 hover:bg-clay-700 text-white text-[11px] font-semibold rounded-lg tracking-wider transition-all shadow-sm cursor-pointer"
                          id={`book-w-${w.id}-btn`}
                        >
                          预约席位
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
                🎁 <strong>精美礼赠服务？</strong> 我们可以手工写就烧制黏土兑换凭证，并用金丝编线复古包裹作为精美礼物。
              </p>
              <button 
                onClick={() => onOpenBooking("booking")}
                className="text-xs font-bold text-clay-800 hover:text-clay-900 flex items-center gap-1 uppercase tracking-wider cursor-pointer whitespace-nowrap"
                id="gift-card-inquire-btn"
              >
                咨询礼品定制 <ArrowRight className="w-3.5 h-3.5" />
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
                  <h3 className="text-2xl font-display font-extrabold text-white leading-tight">私人艺术品定制</h3>
                  <p className="text-xs text-art-amber font-bold tracking-wider uppercase font-sans mt-0.5">高端空间壁饰 / 纯金法国 Smalti</p>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-8 font-sans">
                为大堂、中式玄关屏风、私人定制酒窖、厨房精致护墙板或高端奢侈会客长餐桌，设计一幅带有艺术家 Claire 独特手刀切裂痕肌理与亲笔题字签名的传世马赛克重彩挂件。每一颗细小晶格都承载着经年累月的温度和建筑感。
              </p>

              {/* Meticulous Steps Grid */}
              <div className="space-y-5 mb-8">
                <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest font-mono mb-2">遵循意大利古典制法五步曲：</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {commissionSteps.map((step) => (
                    <div 
                      key={step.step} 
                      className="p-3 bg-slate-800/40 rounded-xl border border-slate-800 hover:bg-slate-800/80 transition-colors"
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
                🎨 <strong>目前正在诚意接受2026年下半年高级预订。</strong> 艺术家 Claire 直接对接知名室内设计事务所、高标准硬装监理，以及追求独到艺术品位的个人收藏家。
              </div>
              
              <button 
                onClick={() => onOpenBooking("commission")}
                className="w-full py-3.5 bg-art-amber hover:bg-amber-500 text-slate-900 font-bold rounded-xl shadow-lg shadow-amber-500/10 hover:shadow-amber-600/15 transition-all text-center flex items-center justify-center gap-2 text-sm tracking-widest cursor-pointer"
                id="request-commission-quote-btn"
              >
                索取专属艺术定制方案及报价
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
