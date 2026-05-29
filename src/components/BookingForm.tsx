import React, { useState, useEffect } from "react";
import { X, Calendar, DollarSign, Sparkles, Send, CheckCircle2, User, Mail, Phone, Users, FileText, ArrowRight } from "lucide-react";
import { Workshop } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedWorkshopId?: string;
  workshops: Workshop[];
  type: "booking" | "commission";
}

export default function BookingForm({ isOpen, onClose, selectedWorkshopId, workshops, type }: BookingFormProps) {
  const [activeTab, setActiveTab] = useState<"booking" | "commission">(type);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Booking Form State
  const [bWorkshopId, setBWorkshopId] = useState(selectedWorkshopId || "");
  const [bName, setBName] = useState("");
  const [bEmail, setBEmail] = useState("");
  const [bPhone, setBPhone] = useState("");
  const [bGuests, setBGuests] = useState(1);
  const [bNotes, setBNotes] = useState("");

  // Commission Form State
  const [cName, setCName] = useState("");
  const [cEmail, setCEmail] = useState("");
  const [cType, setCType] = useState("Wall Art / Mural");
  const [cDimensions, setCDimensions] = useState("");
  const [cBudget, setCBudget] = useState("$500 - $1,500");
  const [cDescription, setCDescription] = useState("");

  // Sync types
  useEffect(() => {
    setActiveTab(type);
  }, [type]);

  useEffect(() => {
    if (selectedWorkshopId) {
      setBWorkshopId(selectedWorkshopId);
    } else if (workshops.length > 0 && !bWorkshopId) {
      setBWorkshopId(workshops[0].id);
    }
  }, [selectedWorkshopId, workshops]);

  const selectedWorkshop = workshops.find((w) => w.id === bWorkshopId);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      // Save to localStorage
      const existing = JSON.parse(localStorage.getItem("mosaic_bookings") || "[]");
      const newBooking = {
        id: crypto.randomUUID(),
        workshopId: bWorkshopId,
        workshopTitle: selectedWorkshop?.title || "Unknown Workshop",
        userName: bName,
        userEmail: bEmail,
        userPhone: bPhone,
        guests: bGuests,
        totalPaid: (selectedWorkshop?.price || 0) * bGuests,
        notes: bNotes,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem("mosaic_bookings", JSON.stringify([...existing, newBooking]));

      // Reduce seats left in storage dynamically
      const storedSeats = JSON.parse(localStorage.getItem("workshop_seats_left") || "{}");
      storedSeats[bWorkshopId] = Math.max(0, (storedSeats[bWorkshopId] ?? selectedWorkshop?.seatsLeft ?? 5) - bGuests);
      localStorage.setItem("workshop_seats_left", JSON.stringify(storedSeats));

      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  const handleCommissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const existing = JSON.parse(localStorage.getItem("mosaic_commissions") || "[]");
      const newCommission = {
        id: crypto.randomUUID(),
        userName: cName,
        userEmail: cEmail,
        projectType: cType,
        dimensions: cDimensions,
        budgetRange: cBudget,
        description: cDescription,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem("mosaic_commissions", JSON.stringify([...existing, newCommission]));
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  const handleReset = () => {
    setSuccess(false);
    setBName("");
    setBEmail("");
    setBPhone("");
    setBGuests(1);
    setBNotes("");
    setCName("");
    setCEmail("");
    setCDimensions("");
    setCDescription("");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          id="booking-backdrop"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl border border-clay-100"
          id="booking-modal-container"
        >
          {/* Header */}
          <div className="bg-clay-50 px-6 py-4 border-b border-clay-100 flex items-center justify-between">
            <h3 className="text-xl font-display font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-clay-700" />
              {activeTab === "booking" ? "Book your Spot" : "Request Custom Art Quote"}
            </h3>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-full transition-colors"
              aria-label="Close"
              id="close-booking-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Selector when modal loaded without specific type triggers */}
          {!selectedWorkshopId && !success && (
            <div className="flex border-b border-slate-100 bg-slate-50 p-1">
              <button
                onClick={() => { setActiveTab("booking"); handleReset(); }}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  activeTab === "booking"
                    ? "bg-white text-clay-800 shadow-sm font-semibold"
                    : "text-slate-500 hover:text-slate-800"
                }`}
                id="tab-select-booking"
              >
                Join a Workshop
              </button>
              <button
                onClick={() => { setActiveTab("commission"); handleReset(); }}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  activeTab === "commission"
                    ? "bg-white text-clay-800 shadow-sm font-semibold"
                    : "text-slate-500 hover:text-slate-800"
                }`}
                id="tab-select-commission"
              >
                Custom Commission
              </button>
            </div>
          )}

          {/* Content Area */}
          <div className="p-6 max-h-[75vh] overflow-y-auto">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
                id="form-success-alert"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-clay-100 text-clay-700 mb-4 ring-8 ring-clay-50 animate-bounce">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="text-2xl font-display font-bold text-slate-900 mb-2">You are officially set!</h4>
                <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
                  {activeTab === "booking"
                    ? `Thank you for booking! A confirmation email and pre-workshop guide are on their way to ${bEmail}.`
                    : `We have received your custom mosaic project details. Master artisan Claire will contact you within 24 hours at ${cEmail} to schedule your creative sync.`}
                </p>
                <div className="bg-clay-50 rounded-xl p-4 mb-6 border border-clay-100 text-left text-sm max-w-sm mx-auto">
                  <span className="font-semibold text-slate-800 block mb-1">Details Submitted:</span>
                  {activeTab === "booking" ? (
                    <div className="text-slate-600 space-y-1 font-sans">
                      <p>✨ <strong>Class:</strong> {selectedWorkshop?.title}</p>
                      <p>📅 <strong>Date:</strong> {selectedWorkshop?.date} at 10:00 AM</p>
                      <p>👥 <strong>Guests:</strong> {bGuests} {bGuests === 1 ? "person" : "people"}</p>
                      <p>💵 <strong>Price:</strong> ${(selectedWorkshop?.price || 0) * bGuests} total (paid at door / card)</p>
                    </div>
                  ) : (
                    <div className="text-slate-600 space-y-1 font-sans">
                      <p>🎨 <strong>Art Piece:</strong> {cType}</p>
                      <p>📐 <strong>Size Target:</strong> {cDimensions || "As agreed"}</p>
                      <p>💰 <strong>Rough Budget:</strong> {cBudget}</p>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => { handleReset(); onClose(); }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-clay-700 hover:bg-clay-800 text-white font-semibold rounded-xl shadow-lg shadow-clay-700/20 hover:shadow-clay-800/30 transition-all font-sans"
                  id="final-success-close-btn"
                >
                  Return to Studio Landing
                </button>
              </motion.div>
            ) : (
              <div>
                {activeTab === "booking" ? (
                  <form onSubmit={handleBookingSubmit} className="space-y-4" id="workshop-booking-form">
                    {/* Workshop Selector */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                        Select Your Masterclass
                      </label>
                      <div className="relative">
                        <select
                          value={bWorkshopId}
                          onChange={(e) => setBWorkshopId(e.target.value)}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-clay-600 focus:bg-white transition-all font-medium"
                          required
                          id="select-workshop-field"
                        >
                          {workshops.map((w) => (
                            <option key={w.id} value={w.id}>
                              {w.title} — ${w.price} ({w.level})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Workshop Meta Summary banner */}
                    {selectedWorkshop && (
                      <div className="p-3.5 bg-clay-50 rounded-xl border border-clay-100 flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-clay-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-clay-800 font-bold mb-0.5">
                            Next slot: {selectedWorkshop.date} (10:00 AM)
                          </p>
                          <p className="text-xs text-slate-500 font-sans">
                            {selectedWorkshop.duration} • Materials fully supplied. {selectedWorkshop.seatsLeft} seats currently left.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Personal Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-slate-400">
                            <User className="w-4 h-4" />
                          </span>
                          <input
                            type="text"
                            value={bName}
                            onChange={(e) => setBName(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-clay-600 focus:bg-white transition-all"
                            placeholder="Claire Glass"
                            required
                            id="booking-name-field"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-slate-400">
                            <Mail className="w-4 h-4" />
                          </span>
                          <input
                            type="email"
                            value={bEmail}
                            onChange={(e) => setBEmail(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-clay-600 focus:bg-white transition-all"
                            placeholder="claire@example.com"
                            required
                            id="booking-email-field"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                          Phone Number
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-slate-400">
                            <Phone className="w-4 h-4" />
                          </span>
                          <input
                            type="tel"
                            value={bPhone}
                            onChange={(e) => setBPhone(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-clay-600 focus:bg-white transition-all"
                            placeholder="(555) 000-0000"
                            required
                            id="booking-phone-field"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                          Booking For (Guests)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-slate-400">
                            <Users className="w-4 h-4" />
                          </span>
                          <select
                            value={bGuests}
                            onChange={(e) => setBGuests(Number(e.target.value))}
                            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-clay-600 focus:bg-white transition-all font-sans"
                            required
                            id="booking-guests-field"
                          >
                            <option value={1}>1 Person</option>
                            <option value={2}>2 People (Partner Save!)</option>
                            <option value={3}>3 People</option>
                            <option value={4}>4 People (Group Pass)</option>
                            <option value={5}>5+ People (Private Group)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                        Dietary, Access or Creative requests (Optional)
                      </label>
                      <textarea
                        value={bNotes}
                        onChange={(e) => setBNotes(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-clay-600 focus:bg-white transition-all min-h-[70px]"
                        placeholder="Any special physical requirements, or celebrating an occasion like an anniversary?"
                        id="booking-notes-field"
                      />
                    </div>

                    {/* Dynamic Pricing Estimate Builder */}
                    {selectedWorkshop && (
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-400 uppercase tracking-widest font-sans font-bold">Total Investment</p>
                          <p className="text-slate-500 text-xs font-sans">
                            ${selectedWorkshop.price} × {bGuests} {bGuests === 1 ? "student" : "students"}
                          </p>
                        </div>
                        <div className="flex items-center text-2xl font-display font-bold text-clay-800">
                          <DollarSign className="w-5 h-5 text-clay-700 mt-1" />
                          <span>{selectedWorkshop.price * bGuests}</span>
                        </div>
                      </div>
                    )}

                    {/* Submit Section */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full mt-2 py-3 bg-clay-700 hover:bg-clay-800 text-white font-bold rounded-xl shadow-lg shadow-clay-700/20 hover:shadow-clay-800/30 transition-all font-sans flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      id="submit-booking-form-btn"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing your booking...
                        </>
                      ) : (
                        <>
                          Reserve Class Seat Now <ArrowRight className="w-4 h-4 animate-pulse" />
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-slate-400 font-sans">
                      🔒 No immediate payment required. Pay at the studio doors via Card, Cash, or Apple Pay.
                    </p>
                  </form>
                ) : (
                  <form onSubmit={handleCommissionSubmit} className="space-y-4" id="commission-quot-form">
                    {/* Art Project Type */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                        What type of mosaic piece are you looking for?
                      </label>
                      <select
                        value={cType}
                        onChange={(e) => setCType(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-clay-600 focus:bg-white transition-all font-medium"
                        required
                        id="select-commission-type"
                      >
                        <option value="Wall Art / Mural">Custom Fine-Art Hanging Mural</option>
                        <option value="Backsplash / Kitchen">Kitchen backsplashes & bathroom spaces</option>
                        <option value="Garden Stone / Patio">Garden stepping stones & patio accents</option>
                        <option value="Table / Furniture inlay">Custom mosaic dining top, coffee tables, or credenzas</option>
                        <option value="Other / Unique piece">Other custom architectural glass concepts</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-slate-400">
                            <User className="w-4 h-4" />
                          </span>
                          <input
                            type="text"
                            value={cName}
                            onChange={(e) => setCName(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-clay-600 focus:bg-white transition-all"
                            placeholder="Lydia Smith"
                            required
                            id="commission-name-field"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-slate-400">
                            <Mail className="w-4 h-4" />
                          </span>
                          <input
                            type="email"
                            value={cEmail}
                            onChange={(e) => setCEmail(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-clay-600 focus:bg-white transition-all"
                            placeholder="lydia@interiordesign.com"
                            required
                            id="commission-email-field"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                          Approx. Dimensions (width x height)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-slate-400 text-xs">
                            📐
                          </span>
                          <input
                            type="text"
                            value={cDimensions}
                            onChange={(e) => setCDimensions(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-clay-600 focus:bg-white transition-all font-sans"
                            placeholder="e.g. 2ft x 3ft or 60cm x 100cm"
                            required
                            id="commission-dims-field"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                          Budget Target Range
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-slate-400">
                            <DollarSign className="w-4 h-4" />
                          </span>
                          <select
                            value={cBudget}
                            onChange={(e) => setCBudget(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-clay-600 focus:bg-white transition-all font-sans"
                            required
                            id="commission-budget-field"
                          >
                            <option value="Under $500">Under $500</option>
                            <option value="$500 - $1,500">$500 - $1,500 (Standard panels)</option>
                            <option value="$1,500 - $4,000">$1,500 - $4,000 (Larger architectural)</option>
                            <option value="$4,000+">$4,000+ (High scale / complex mural)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                        Describe your artistic vision and space
                      </label>
                      <textarea
                        value={cDescription}
                        onChange={(e) => setCDescription(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-clay-600 focus:bg-white transition-all min-h-[100px]"
                        placeholder="Tell us about the colors, pattern inspiration, room location, outdoor vs indoor exposure, and anything that helps spark our creative direction."
                        required
                        id="commission-description-field"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full mt-2 py-3 bg-clay-700 hover:bg-clay-800 text-white font-bold rounded-xl shadow-lg shadow-clay-700/20 hover:shadow-clay-800/30 transition-all font-sans flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      id="submit-commission-form-btn"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Submitting request...
                        </>
                      ) : (
                        <>
                          Inquire Custom Commission <Send className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-slate-400 font-sans">
                      ✨ Claire will review color, materials, and size bounds to return a highly detailed proposal.
                    </p>
                  </form>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
