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
      title: "Abstract Solar Iridescence",
      category: "original",
      image: originalArt1,
      dimensions: "24\" x 36\"",
      materials: "Hand-cut Iridescent Glass, Terracotta Stone, Sea Slate",
      isAvailableForSale: true,
      price: 1850,
    },
    {
      id: "student-1",
      title: "Cozy Garden Sunflowers",
      category: "student",
      image: "https://picsum.photos/seed/mosaic-sunflower/800/800",
      dimensions: "12\" x 12\"",
      materials: "Vitreous Stained Glass, Ceramic Grout",
    },
    {
      id: "orig-2",
      title: "Ocean Wave Crest",
      category: "original",
      image: "https://picsum.photos/seed/mosaic-ocean/800/800",
      dimensions: "18\" x 18\"",
      materials: "Italian Smalti, Shimmering Gold Leaf Tile, Quartz bits",
      isAvailableForSale: false,
    },
    {
      id: "student-2",
      title: "Tuscan Vineyard Plate",
      category: "student",
      image: "https://picsum.photos/seed/mosaic-grape/800/800",
      dimensions: "14\" x 14\"",
      materials: "Tumbled Pebble, Hand-cut Ceramic Inlays",
    },
    {
      id: "orig-3",
      title: "Desert Sunset Geometric",
      category: "original",
      image: "https://picsum.photos/seed/mosaic-sunset/800/800",
      dimensions: "30\" x 30\"",
      materials: "Mexican Smalti Tile, Limestone, Brass accents",
      isAvailableForSale: true,
      price: 2400,
    },
    {
      id: "student-3",
      title: "Teal Mandalic Coffee Coaster",
      category: "student",
      image: "https://picsum.photos/seed/mosaic-coaster/800/800",
      dimensions: "6\" x 6\"",
      materials: "Shining Metallic Beads, Glass Millifiore pieces",
    },
  ];

  const filteredItems = galleryItems.filter(
    (item) => activeFilter === "all" || item.category === activeFilter
  );

  return (
    <section className="py-20 bg-white" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div className="text-left max-w-xl">
            <span className="text-xs font-bold text-clay-700 uppercase tracking-widest font-mono">STUDIO GALLERY PORTFOLIO</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mt-2 tracking-tight">
              Tactile Stories in Glass & Stone
            </h2>
            <p className="text-slate-500 font-sans mt-3 text-sm sm:text-base">
              Explore the rich details of our masterworks and beginner student final achievements. Tap any block to examine the individual tile geometry.
            </p>
          </div>

          {/* Nav Filtering Tabs Selector */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-clay-50 border border-clay-100 rounded-xl" id="gallery-tab-container">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                activeFilter === "all"
                  ? "bg-clay-700 text-white shadow-sm"
                  : "text-slate-600 hover:text-clay-800"
              }`}
              id="gallery-filter-all"
            >
              All Artworks
            </button>
            <button
              onClick={() => setActiveFilter("original")}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                activeFilter === "original"
                  ? "bg-clay-700 text-white shadow-sm"
                  : "text-slate-600 hover:text-clay-800"
              }`}
              id="gallery-filter-originals"
            >
              Studio Originals
            </button>
            <button
              onClick={() => setActiveFilter("student")}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                activeFilter === "student"
                  ? "bg-clay-700 text-white shadow-sm"
                  : "text-slate-600 hover:text-clay-800"
              }`}
              id="gallery-filter-students"
            >
              Student Creations
            </button>
          </div>
        </div>

        {/* Dynamic Responsive Mosaic Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" id="gallery-grid-items">
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
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                      item.category === "original" ? "bg-amber-500 text-slate-900" : "bg-teal-500 text-white"
                    }`}>
                      {item.category === "original" ? "Original Fine Art" : "Made in Class"}
                    </span>
                    <h4 className="font-display font-extrabold text-base tracking-tight">{item.title}</h4>
                    <p className="text-[11px] text-slate-200 leading-normal line-clamp-1">{item.materials}</p>
                  </div>
                </div>
              </div>

              {/* Lower Details Bar */}
              <div className="p-4 flex items-center justify-between">
                <div className="text-left">
                  <h3 className="font-display font-bold text-slate-800 text-sm group-hover:text-clay-800 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-sans">{item.dimensions} • {item.materials.split(",", 1)[0]}</p>
                </div>

                {item.category === "original" && (
                  <div className="text-right">
                    {item.isAvailableForSale ? (
                      <span className="text-xs font-bold text-clay-700 bg-clay-100/70 p-1.5 px-3 rounded-xl border border-clay-200">
                        ${item.price}
                      </span>
                    ) : (
                      <span className="text-[9px] font-medium text-slate-400 border border-slate-200 p-1 px-2 rounded-lg">
                        Private Collection
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
              <Sparkles className="w-5 h-5 text-clay-700" />
              Do you have a specific space in mind?
            </h4>
            <p className="text-slate-500 text-xs sm:text-sm font-sans max-w-xl">
              From colorful glass backsplashes, custom house numbers, garden paving stones, to sprawling restaurant wall murals. Claire is available to bring your custom dream art projects to life.
            </p>
          </div>
          <button 
            onClick={() => onOpenBooking("commission")}
            className="px-6 py-3 bg-clay-700 hover:bg-clay-800 text-white text-xs font-bold rounded-xl uppercase tracking-wider transition-all shadow-md flex items-center gap-2 flex-shrink-0 cursor-pointer"
            id="gallery-commission-lead-btn"
          >
            Commission a Piece <ArrowRight className="w-4 h-4" />
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
              className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-100"
              id="lightbox-container"
            >
              <button 
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 z-20 p-2 text-slate-500 hover:text-slate-800 bg-white/95 rounded-full shadow-lg transition-colors"
                aria-label="Close image"
                id="lightbox-close-btn"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Artwork view */}
                <div className="relative aspect-square max-h-[500px] bg-slate-100">
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
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                      lightboxItem.category === "original" ? "bg-amber-50 text-amber-800 border border-amber-200" : "bg-teal-50 text-teal-800 border border-teal-200"
                    }`}>
                      {lightboxItem.category === "original" ? "Original Studio Masterwork" : "Beginner Student Project"}
                    </span>
                    
                    <h3 className="text-2xl font-display font-extrabold text-slate-900 leading-tight">
                      {lightboxItem.title}
                    </h3>

                    <div className="space-y-2 text-xs text-slate-600 font-sans">
                      <p>📐 <strong>Dimensions Target:</strong> {lightboxItem.dimensions}</p>
                      <p>✨ <strong>Tile Materials Used:</strong> {lightboxItem.materials}</p>
                      <p>🕒 <strong>Curation / Dev Time:</strong> {lightboxItem.category === "original" ? "45 Craft Hours" : "3.5 Course Hours"}</p>
                    </div>

                    <p className="text-slate-500 text-xs sm:text-sm font-sans leading-relaxed pt-2 border-t border-slate-100">
                      This piece reflects the exquisite textures generated by arranging hand-cut stained glass into high-contrast grout structures, letting the colors shift and dance as the user walks past.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between gap-4">
                    {lightboxItem.category === "original" ? (
                      lightboxItem.isAvailableForSale ? (
                        <>
                          <div>
                            <span className="text-[10px] text-slate-400 block font-sans">Available Purchase</span>
                            <span className="text-xl font-display font-bold text-clay-800">${lightboxItem.price}</span>
                          </div>
                          <button
                            onClick={() => {
                              setLightboxItem(null);
                              onOpenBooking("commission");
                            }}
                            className="px-5 py-2.5 bg-clay-700 hover:bg-clay-800 text-white text-xs font-bold rounded-xl uppercase tracking-wider flex items-center gap-1.5 transition-all shadow cursor-pointer"
                            id="buy-gallery-original-btn"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" /> Purchase Original
                          </button>
                        </>
                      ) : (
                        <p className="text-xs text-slate-400 font-medium italic">
                          🔒 Owned by private art collector in Sausalito, CA.
                        </p>
                      )
                    ) : (
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between w-full gap-3">
                        <p className="text-xs text-slate-500 font-sans">Make your own in class!</p>
                        <button
                          onClick={() => {
                            setLightboxItem(null);
                            onOpenBooking("booking");
                          }}
                          className="px-5 py-2.5 bg-clay-700 hover:bg-clay-800 text-white text-xs font-bold rounded-xl uppercase tracking-wider transition-all text-center cursor-pointer"
                          id="make-class-from-gallery-btn"
                        >
                          Book Course Schedule
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
