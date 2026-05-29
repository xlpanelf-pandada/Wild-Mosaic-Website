import { useState, useEffect } from "react";
import { Menu, X, Sparkles, BookOpen } from "lucide-react";

interface NavbarProps {
  onOpenBooking: (type: "booking" | "commission", workshopId?: string) => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "手作工坊", href: "#workshops" },
    { label: "定制预定", href: "#commissions" },
    { label: "杰作画廊", href: "#gallery" },
    { label: "主创艺术家", href: "#about" },
    { label: "疑难答疑", href: "#faq" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md shadow-sm border-b border-clay-100 py-3"
          : "bg-transparent py-5"
      }`}
      id="studio-navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Brand */}
          <a href="#" className="flex items-center gap-2 group" id="navbar-brand-logo">
            <span className="p-2 bg-clay-600 text-white rounded-xl shadow-md shadow-clay-600/15 group-hover:bg-clay-700 group-hover:rotate-6 transition-all duration-300">
              <Sparkles className="w-5 h-5" />
            </span>
            <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-clay-600 transition-colors">
              Mosaic<span className="text-clay-600 font-light font-sans ml-1.5 text-xs sm:text-sm border-l border-slate-200 pl-1.5 uppercase tracking-wide">玛赛克艺术空间</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8" id="navbar-desktop-menu">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs font-semibold text-slate-600 hover:text-clay-600 transition-colors tracking-widest"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop Call To Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => onOpenBooking("booking")}
              className="px-5 py-2.5 bg-clay-600 hover:bg-clay-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-clay-600/10 hover:shadow-clay-700/15 transition-all text-center tracking-widest cursor-pointer"
              id="navbar-cta-book-btn"
            >
              预约体验课
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-700 hover:text-clay-600 transition-colors"
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle-btn"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-clay-100 shadow-xl" id="navbar-mobile-drawer">
          <div className="px-4 pt-3 pb-6 space-y-3">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-clay-50 hover:text-clay-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenBooking("booking");
                }}
                className="w-full py-3 bg-clay-600 hover:bg-clay-700 text-white text-xs font-bold rounded-xl tracking-wider text-center"
                id="mobile-drawer-cta-booking"
              >
                预订手作体验课
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenBooking("commission");
                }}
                className="w-full py-3 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl tracking-wider text-center bg-white"
                id="mobile-drawer-cta-commission"
              >
                预约私人艺术定制
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
