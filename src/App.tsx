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
    title: "Vibrant Stained Glass Drink Coaster Set",
    description: "Learn glass scoring, nipping safety, and circular mandalic layout flow. Perfect for beginners to create 2 beautiful coasters in our signature sunshine colors.",
    price: 65,
    duration: "2 Hours Class",
    date: "June 6, 2026",
    seatsTotal: 8,
    seatsLeft: 3,
    level: "Beginner",
    includes: ["Coaster boards", "Over 100 stained glass chips", "Take-home sealant bags", "Herbal teas"]
  },
  {
    id: "class-2",
    title: "Tuscan Stained Glass Mirror Frames",
    description: "Design a luminous mirror frame bordered in shimmering gold, jade, and sky-blue French smalti glass. Create an elegant, heavy-duty accent mirror.",
    price: 95,
    duration: "3.5 Hours Class",
    date: "June 13, 2026",
    seatsTotal: 6,
    seatsLeft: 2,
    level: "Intermediate",
    includes: ["Dual glass nipper usage", "Authentic Venetian smalti leaf", "Spacious 14\" mirror back board", "In-studio professional grouting"]
  },
  {
    id: "class-3",
    title: "Weekend Slate Pizza Board Inlays",
    description: "Learn how to cut robust ceramics and slate. Decorate an organic bamboo and slate serving tray with beautiful geo designs to feed your friends in style.",
    price: 130,
    duration: "4 Hours Class",
    date: "June 20, 2026",
    seatsTotal: 8,
    seatsLeft: 6,
    level: "All Levels",
    includes: ["Thick slate serving board", "Mosaic food-safe grout mixtures", "Tumbled volcanic stones", "Chilled refreshments"]
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
