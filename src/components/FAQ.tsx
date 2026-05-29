import { useState } from "react";
import { Plus, Minus, HelpCircle, ArrowRight } from "lucide-react";
import { FAQItem } from "../types";

interface FAQProps {
  onOpenBooking: () => void;
}

export default function FAQ({ onOpenBooking }: FAQProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqItems: FAQItem[] = [
    {
      id: "faq-1",
      question: "Do I need drawing or painterly studio skills?",
      answer: "Absolutely not! In fact, most of our masterclass graduates have never completed a professional art project in their lives. We provide pre-sketched design stencils, trace carbon transfers, and easy-to-follow geometric template sheets that help you piece together gorgeous patterns effortlessly. It is more about relaxation than perfect draftsmanship!"
    },
    {
      id: "faq-2",
      question: "Are raw mosaic materials and tools included in the seat price?",
      answer: "Yes, 100%! The booking tier covers everything you need to finish your creation: your backing frame (wooden trays, mirrors, coasters, or stone slate bases), a massive array of colored stained glass chips, hand-cut stone pebbles, Italian glass smalti, industrial clays, glue, grouting mortars, workspace safeties, wheeled glass nippers, and full apron usage."
    },
    {
      id: "faq-3",
      question: "Can I take my completed piece home the exact same day?",
      answer: "You will finish layout gluing during the session! Once glued, the adhesive takes 12-24 hours to cure. You have two options: either we bundle a take-home grouting bucket kit with custom sealer instructions, or you leave your piece in our studio tables and we will professionally grout, clean, and seal your piece within 4 days for free local hand-pickup!"
    },
    {
      id: "faq-4",
      question: "Is the tile-nipping and glasswork completely safe?",
      answer: "Safety is our priority. We utilize special wheeled dual-nippers that make crisp, clean glass separations by crushing rather than scoring, generating almost zero flying shards. We also provide secure, clean workspace safety glasses for every single student and supervise minor activities meticulously (Ages 10+ welcome!)."
    },
    {
      id: "faq-5",
      question: "How do group passes, partnerships, or private parties work?",
      answer: "We accommodate private anniversaries, birthday gatherings, or creative corporate events up to 12 people. If you select 2 people or more in our reservation drawer, our system reserves adjacent tables so you can craft together."
    },
    {
      id: "faq-6",
      question: "What is your cancellation or date-swapping policy?",
      answer: "We maintain highly flexible policies. If an emergency or sickness arises, simply notify us via email or call at least 24 hours prior to class time, and we will happily swap you into any future workshop seat for free."
    }
  ];

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white border-t border-clay-100" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-xl mx-auto mb-14" id="faq-heading-block">
          <span className="text-xs font-bold text-clay-700 uppercase tracking-widest font-mono">RESOLVING CONCERNS</span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mt-2 tracking-tight">
            Common Objections—Answered
          </h2>
          <p className="text-slate-500 font-sans mt-3 text-sm sm:text-base">
            Everything you need to know about safety, materials, booking flexibility, and finding our physical workspace.
          </p>
        </div>

        {/* Interactive Collapsible Accordions List */}
        <div className="space-y-4" id="faq-accordions-container">
          {faqItems.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={item.id}
                className={`border rounded-2xl transition-all duration-300 ${
                  isOpen
                    ? "border-clay-300 bg-clay-50/70 shadow-sm"
                    : "border-slate-200 bg-white hover:border-clay-200"
                }`}
                id={`faq-item-container-${index}`}
              >
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  className="w-full px-5 py-4 sm:py-5 flex items-center justify-between gap-4 text-left font-display font-bold text-slate-800 hover:text-clay-800 text-sm sm:text-base transition-colors"
                  aria-expanded={isOpen}
                  id={`faq-trigger-${index}`}
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-clay-600 flex-shrink-0" />
                    {item.question}
                  </span>
                  <span className="p-1 bg-white border border-slate-200 rounded-lg shadow-sm flex-shrink-0">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-clay-700" />
                    ) : (
                      <Plus className="w-4 h-4 text-slate-600" />
                    )}
                  </span>
                </button>

                {/* Animated collapse height */}
                {isOpen && (
                  <div 
                    className="px-5 pb-5 pt-1 border-t border-clay-100/60 text-slate-600 text-xs sm:text-sm leading-relaxed font-sans"
                    id={`faq-answer-container-${index}`}
                  >
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom micro CTA to prompt conversion */}
        <div className="text-center mt-10">
          <p className="text-slate-500 text-xs sm:text-sm font-sans mb-4">
            Still have an unresolved custom inquiry? Let's chat directly!
          </p>
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-clay-100 hover:bg-clay-200 text-clay-800 text-xs font-bold rounded-xl tracking-wider uppercase transition-all cursor-pointer shadow-sm border border-clay-200"
            id="faq-sub-btn"
          >
            Chat With Claire Now <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
