import { useState } from "react";
import { Sparkles, ZoomIn, X, ShoppingBag, ArrowRight } from "lucide-react";
import { GalleryItem } from "../types";
import originalArt1 from "../assets/images/mosaic_artpiece_1_1780061787150.png";

interface GalleryProps {
  onOpenBooking: (type: "booking" | "commission") => void;
}

export default function Gallery({ onOpenBooking }: GalleryProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "student" | "original">("all");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: "orig-1",
      title: "流光暖阳：抽象多维折射线",
      category: "original",
      image: originalArt1,
      dimensions: "24\" x 36\"",
      materials: "极光虹彩手割玻璃、手工红陶、天然深海石板",
      isAvailableForSale: true,
      price: 1850,
    },
    {
      id: "student-1",
      title: "向日葵花田手作盘",
      category: "student",
      image: "https://picsum.photos/seed/mosaic-sunflower/800/800",
      dimensions: "12\" x 12\"",
      materials: "进口大教堂绚白玻璃片、防潮纯生态填砂干粉",
    },
    {
      id: "orig-2",
      title: "沧海碧波的叹息",
      category: "original",
      image: "https://picsum.photos/seed/mosaic-ocean/800/800",
      dimensions: "18\" x 18\"",
      materials: "高级威尼斯手工 Smalti、纯手工 24K 金箔烧制马赛克、大理石原块",
      isAvailableForSale: false,
    },
    {
      id: "student-2",
      title: "托斯卡纳葡萄庄园果盘",
      category: "student",
      image: "https://picsum.photos/seed/mosaic-grape/800/800",
      dimensions: "14\" x 14\"",
      materials: "手工研磨浑圆彩色天然原石、定制手剪厚实陶块",
    },
    {
      id: "orig-3",
      title: "沙漠落日：几何秩序",
      category: "original",
      image: "https://picsum.photos/seed/mosaic-sunset/800/800",
      dimensions: "30\" x 30\"",
      materials: "墨西哥大理石手工 Smalti、金砂白灰岩石、极简抛光黄铜骨架",
      isAvailableForSale: true,
      price: 2400,
    },
    {
      id: "student-3",
      title: "碧翠曼陀罗下午茶杯托",
      category: "student",
      image: "https://picsum.photos/seed/mosaic-coaster/800/800",
      dimensions: "6\" x 6\"",
      materials: "金属防锈斑彩琉璃珠、意大利彩虹千花拉丝小料(Millifiore)",
    },
  ];

  const filteredItems = galleryItems.filter(
    (item) => activeFilter === "all" || item.category === activeFilter
  );

  return (
    <section className="py-12 md:py-20 bg-white" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div className="text-left max-w-xl">
            <span className="text-xs font-bold text-clay-600 uppercase tracking-widest font-mono">杰作珍藏画廊</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mt-2 tracking-tight">
              凝固在晶石与玻璃里的斑斓故事
            </h2>
            <p className="text-slate-500 font-sans mt-3 text-sm sm:text-base">
              探寻工作室原创传世作品与高阶新进学员的毕业佳作。轻触任意画册块面，即可极清鉴析手工用钳切割出的碎块咬合几何律动。
            </p>
          </div>

          {/* Nav Filtering Tabs Selector */}
          <div className="flex flex-nowrap overflow-x-auto gap-1 sm:flex-wrap sm:gap-1.5 p-1 bg-clay-50 border border-clay-100 rounded-xl max-w-full scrollbar-none" id="gallery-tab-container">
            <button
               onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeFilter === "all"
                  ? "bg-clay-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-clay-600"
              }`}
              id="gallery-filter-all"
            >
              全部画幅
            </button>
            <button
              onClick={() => setActiveFilter("original")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeFilter === "original"
                  ? "bg-clay-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-clay-600"
              }`}
              id="gallery-filter-originals"
            >
              工坊原创原作
            </button>
            <button
              onClick={() => setActiveFilter("student")}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeFilter === "student"
                  ? "bg-clay-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-clay-600"
              }`}
              id="gallery-filter-students"
            >
              学员创意小作
            </button>
          </div>
        </div>

        {/* Dynamic Responsive Mosaic Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8" id="gallery-grid-items">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="group cursor-pointer bg-clay-50/50 rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:border-clay-200 transition-all duration-300"
              id={`gallery-card-${item.id}`}
            >
              {/* Image Container with Hover zoom */}
              <div className="relative overflow-hidden aspect-square bg-slate-100 border-b border-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Micro hover metadata block */}
                <div className="absolute inset-0 bg-slate-950/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
                  <div className="flex justify-end">
                    <span className="p-2 bg-white/95 text-slate-800 rounded-xl shadow">
                      <ZoomIn className="w-4 h-4" />
                    </span>
                  </div>
                  
                  <div className="space-y-1.5 text-left text-white translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                    <span className={`text-[9px] font-bold tracking-widest px-2.5 py-0.5 rounded-full ${
                      item.category === "original" ? "bg-amber-400 text-slate-900" : "bg-teal-500 text-white"
                    }`}>
                      {item.category === "original" ? "高阶传世原作" : "体验课毕业大作"}
                    </span>
                    <h4 className="font-display font-extrabold text-base tracking-tight">{item.title}</h4>
                    <p className="text-[11px] text-slate-200 leading-normal line-clamp-1">{item.materials}</p>
                  </div>
                </div>
              </div>

              {/* Lower Details Bar */}
              <div className="p-4 flex items-center justify-between">
                <div className="text-left">
                  <h3 className="font-display font-bold text-slate-800 text-sm group-hover:text-clay-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-sans">{item.dimensions} • {item.materials.split("、", 1)[0]}</p>
                </div>

                {item.category === "original" && (
                  <div className="text-right">
                    {item.isAvailableForSale ? (
                      <span className="text-xs font-bold text-clay-600 bg-clay-100/70 p-1.5 px-3 rounded-xl border border-clay-200">
                        ${item.price}
                      </span>
                    ) : (
                      <span className="text-[9px] font-medium text-slate-400 border border-slate-200 p-1 px-2 rounded-lg">
                        私人家族珍藏
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Lead magnet bar */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-clay-100 border border-clay-200 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h4 className="text-lg font-display font-bold text-slate-900 flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-clay-600" />
              内心早已有了想要装点的特定墙面？
            </h4>
            <p className="text-slate-500 text-xs sm:text-sm font-sans max-w-xl">
              无论是色彩夺目的厨房防护壁板、专属红陶姓氏门牌、惬意的秘密花园铺石、或是气势恢宏的商用餐厅整墙重质大壁画，艺术家 Claire 都能为您点石成金。
            </p>
          </div>
          <button 
            onClick={() => onOpenBooking("commission")}
            className="px-6 py-3 bg-clay-600 hover:bg-clay-700 text-white text-xs font-bold rounded-xl uppercase tracking-wider transition-all shadow-md flex items-center gap-2 flex-shrink-0 cursor-pointer"
            id="gallery-commission-lead-btn"
          >
            索求私人艺术定制 <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Lightbox Modal Window */}
        {lightboxItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
              onClick={() => setLightboxItem(null)}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm"
              id="lightbox-backdrop"
            />
            
            {/* Modal Body */}
            <div 
              className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-100 animate-in fade-in-50 zoom-in-95 duration-200"
              id="lightbox-container"
            >
              <button 
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 z-20 p-2 text-slate-500 hover:text-slate-800 bg-white/95 rounded-full shadow-lg transition-colors cursor-pointer"
                aria-label="Close image"
                id="lightbox-close-btn"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Artwork view */}
                <div className="relative aspect-[16/10] sm:aspect-square sm:max-h-[500px] bg-slate-100 flex-shrink-0">
                  <img
                    src={lightboxItem.image}
                    alt={lightboxItem.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Info and action */}
                <div className="p-6 sm:p-8 flex flex-col justify-between text-left">
                  <div className="space-y-4">
                    <span className={`text-[9px] font-bold tracking-widest px-2.5 py-1 rounded-full ${
                      lightboxItem.category === "original" ? "bg-amber-50 text-amber-800 border border-amber-200" : "bg-teal-50 text-teal-800 border border-teal-200"
                    }`}>
                      {lightboxItem.category === "original" ? "艺术珍藏原作" : "学员体验创作课毕业作品"}
                    </span>
                    
                    <h3 className="text-2xl font-display font-extrabold text-slate-900 leading-tight">
                      {lightboxItem.title}
                    </h3>

                    <div className="space-y-2 text-xs text-slate-600 font-sans">
                      <p>📐 <strong>参考尺寸规范：</strong> {lightboxItem.dimensions}</p>
                      <p>✨ <strong>镶嵌铺设料件：</strong> {lightboxItem.materials}</p>
                      <p>🕒 <strong>手切精细工时：</strong> {lightboxItem.category === "original" ? "耗费 45 纯手工手刀切工时" : "3.5 课时手工新手心流"}</p>
                    </div>

                    <p className="text-slate-500 text-xs sm:text-sm font-sans leading-relaxed pt-2 border-t border-slate-100">
                      这块杰作极尽色彩变幻之特色。通过将精细手切的古法彩色玻璃镶嵌到高对比度的嵌缝灰水泥基底中，散发出温润如玉、如海贝鳞光般随步履方向折射变色而律动的惊艳美感。
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between gap-4">
                    {lightboxItem.category === "original" ? (
                      lightboxItem.isAvailableForSale ? (
                        <>
                          <div>
                            <span className="text-[10px] text-slate-400 block font-sans">现货原件售价</span>
                            <span className="text-xl font-display font-bold text-clay-800">${lightboxItem.price}</span>
                          </div>
                          <button
                            onClick={() => {
                              setLightboxItem(null);
                              onOpenBooking("commission");
                            }}
                            className="px-5 py-2.5 bg-clay-600 hover:bg-clay-700 text-white text-xs font-bold rounded-xl uppercase tracking-wider flex items-center gap-1.5 transition-all shadow cursor-pointer"
                            id="buy-gallery-original-btn"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" /> 选购这一原作
                          </button>
                        </>
                      ) : (
                        <p className="text-xs text-slate-400 font-medium italic">
                          🔒 尊贵家族版权珍藏自美国加州苏萨利托。
                        </p>
                      )
                    ) : (
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between w-full gap-3">
                        <p className="text-xs text-slate-500 font-sans">您也能在此做出专属艺术品！</p>
                        <button
                          onClick={() => {
                            setLightboxItem(null);
                            onOpenBooking("booking");
                          }}
                          className="px-5 py-2.5 bg-clay-600 hover:bg-clay-700 text-white text-xs font-bold rounded-xl tracking-wider transition-all text-center cursor-pointer"
                          id="make-class-from-gallery-btn"
                        >
                          预选该体验课档期
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
