import { useState, useEffect } from "react";
import { Workshop } from "./types";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SocialProof from "./components/SocialProof";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import About from "./components/About";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import BookingForm from "./components/BookingForm";

const INITIAL_WORKSHOPS: Workshop[] = [
  {
    id: "class-1",
    title: "斑斓彩色玻璃杯垫手作坊",
    description: "学习玻璃刻划、剪切安全技巧，以及圆盘曼陀罗排布。极其适合零基础初学者，亲手制作2款如晨曦阳光般绚丽的专属艺术杯垫。",
    price: 65,
    duration: "2小时工匠课",
    date: "2026年6月6日",
    seatsTotal: 8,
    seatsLeft: 3,
    level: "Beginner",
    includes: ["实木杯垫底板", "100+ 进口大教堂彩色玻璃晶片", "便携式填缝填缝DIY工具包", "手工研磨草本热茶"]
  },
  {
    id: "class-2",
    title: "托斯卡纳夏影：彩色玻璃艺术镜框",
    description: "选用金箔、翡翠绿与晴空蓝的威尼斯 Smalti 艺术玻璃，设计并制作一幅带折射光耀的复古镜面外框。亲手雕琢优雅、厚实的高级感画框镜。",
    price: 95,
    duration: "3.5小时大师课",
    date: "2026年6月13日",
    seatsTotal: 6,
    seatsLeft: 2,
    level: "Intermediate",
    includes: ["双轮省力玻璃剪切钳租用", "正宗威尼斯金箔 Smalti 手工玻璃", "14英寸重质镜面底板", "工作室画廊级专业真缝填实工艺"]
  },
  {
    id: "class-3",
    title: "周末生活美学：石质竹盘陶瓷镶嵌",
    description: "体验切割硬质天然陶片与板岩。在质地考究的细密竹底盘中，通过现代几何拼贴艺术，镶嵌出美轮美奂的食品级餐盘底纹，仪式感十足。",
    price: 130,
    duration: "4小时深度手作",
    date: "2026年6月20日",
    seatsTotal: 8,
    seatsLeft: 6,
    level: "All Levels",
    includes: ["顶级加厚板岩天然餐盘", "马赛克专用食品级防霉填缝泥", "滚圆抛光天然彩色卵石", "特调清凉手工气泡水及茶点"]
  }
];

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<"booking" | "commission">("booking");
  const [selectedWorkshopId, setSelectedWorkshopId] = useState<string | undefined>(undefined);
  const [seatsLeftMap, setSeatsLeftMap] = useState<Record<string, number>>({});

  // Sync seats left from local storage (handles persistence)
  useEffect(() => {
    const loadSeats = () => {
      const stored = localStorage.getItem("workshop_seats_left");
      if (stored) {
        setSeatsLeftMap(JSON.parse(stored));
      } else {
        // Build initial maps
        const initialMap: Record<string, number> = {};
        INITIAL_WORKSHOPS.forEach(w => {
          initialMap[w.id] = w.seatsLeft;
        });
        localStorage.setItem("workshop_seats_left", JSON.stringify(initialMap));
        setSeatsLeftMap(initialMap);
      }
    };
    
    loadSeats();
    
    // Listen for storage changes in case modal triggers update
    window.addEventListener("storage", loadSeats);
    return () => window.removeEventListener("storage", loadSeats);
  }, [bookingOpen]); // Recalculate seats when modal state opens/closes to reflect booked counts

  const handleOpenBooking = (type: "booking" | "commission", workshopId?: string) => {
    setBookingType(type);
    setSelectedWorkshopId(workshopId);
    setBookingOpen(true);
  };

  return (
    <div className="bg-clay-50 min-h-screen text-slate-800 antialiased selection:bg-clay-300 selection:text-clay-900" id="mosaic-app-root">
      
      {/* 1. Stick Minimalist Navigation Bar */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* 2. Hero Section (The Emotional Hook with original media asset) */}
      <Hero onOpenBooking={handleOpenBooking} />

      {/* 3. Authority Ribbon & Snippet Reviews */}
      <SocialProof />

      {/* 4. Core Offerings Pillars: Guided Classes vs Custom Commissions */}
      <Services 
        workshops={INITIAL_WORKSHOPS} 
        onOpenBooking={handleOpenBooking} 
        seatsLeftMap={seatsLeftMap}
      />

      {/* 5. Tactile Visual Portfolio Gallery with filters & Lightbox */}
      <Gallery onOpenBooking={handleOpenBooking} />

      {/* 6. Biographic Portrait & compelling founder's motivation text */}
      <About />

      {/* 7. Collapsible faq objections solver */}
      <FAQ onOpenBooking={() => handleOpenBooking("commission")} />

      {/* 8. Modern footer, Lead Magnet newsletter & studio schedule Drops */}
      <Footer />

      {/* Interactive Booking & Inquiry Drawer Overlay */}
      <BookingForm
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        type={bookingType}
        selectedWorkshopId={selectedWorkshopId}
        workshops={INITIAL_WORKSHOPS}
      />

    </div>
  );
}
