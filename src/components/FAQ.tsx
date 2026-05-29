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
      question: "我需要具备美术、素描或设计基础吗？",
      answer: "完全不需要！实际上，我们90%以上的结业学员在踏入工坊前都从未接触过任何艺术手作项目。我们会为您精心提供多套画册级的大师预构底稿设计、极易上手的复写纸和几何曼陀罗排布尺。在这里，享受拼贴色块带来的内心平和心流，往往远比起步时的画工更为迷人。"
    },
    {
      id: "faq-2",
      question: "学费中是否包含了所有的材料耗材和防护工具？",
      answer: "是的，百分百全包，到店后绝无任何隐性或二次消费！课程价格包含了您所需要的一切：实木杯垫板、进口加厚竹茶盘、天然重质板岩、或是定制画框镜。另外，意大利 Smalti 手工玻璃、彩色矿石、大教堂绚白玻璃等数百种晶石无限量配给，以及专业裁切玻璃钳和护目防尘镜的免费使用权。"
    },
    {
      id: "faq-3",
      question: "我在体验课当天就能拿走自己亲手剪切排布好的作品吗？",
      answer: "您将在排期内完成作品的所有碎块拼拼与贴合上胶。拼贴胶水自然干透通常需要12至24个小时。对此我们提供两种方案：选择一，您可以带走我们赠送的手工灌浆工具袋，在家享受填泥收边和擦拭封口的光影成就。选择二，您可以把未干作品安全交由主创 Claire。我们将免费为您上浆、压实、修糙并精工封釉，4天后通知您自取或同城邮递。"
    },
    {
      id: "faq-4",
      question: "手工裁剪玻璃和石头碎瓷，过程安全吗？",
      answer: "我们对于安全问题的防备精细在每一处细节。工坊提供无损双轮省力高压断块玻璃钳。它借助局部高刚力均匀剪断玻璃而非划线裁切，几乎不会产生飞舞残红。此外，工坊为每位学员准备了高透光无阻碍的专业护目目镜、耐磨连体围裙及环保指纹防护手套，提供全方位安全保驾。（欢迎10岁及以上儿童在家长陪同下体验！）"
    },
    {
      id: "faq-5",
      question: "多人结伴同行、闺蜜出游或生日 corporate 团建如何报名？",
      answer: "工坊极为热忱地承接求婚周年纪念、生日狂欢、家庭团聚创意出游，或至多12人的高质感企业团建等。如果您在右下角的预约清单里选择2位或以上，系统将智能连座拼卡并锁定相邻的大桌，为陪伴增添更多舒心畅谈氛围。"
    },
    {
      id: "faq-6",
      question: "若临时行程发生变动，工坊取消或改期怎么安排？",
      answer: "我们怀揣万分的体贴并提供高度的灵活变通！若是因为突发身体状况或难以推脱的差旅急事，只需在开课前 24 小时通知我们，客服或主创 Claire 将极速帮您调配、无损免费延换调签到接下来的任意一期同等体验课，免除您的后顾之忧。"
    }
  ];

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-12 md:py-20 bg-white border-t border-clay-100" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-xl mx-auto mb-8 md:mb-14" id="faq-heading-block">
          <span className="text-xs font-bold text-clay-600 uppercase tracking-widest font-mono">释除各种顾虑</span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mt-2 tracking-tight">
            有何疑惑？看这便一知半解
          </h2>
          <p className="text-slate-500 font-sans mt-3 text-sm sm:text-base">
            关于安全、店中耗材配给、课时退改灵活性、以及探访工坊所需的细节全在其中。
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
                  className="w-full px-5 py-4 sm:py-5 flex items-center justify-between gap-4 text-left font-display font-bold text-slate-800 hover:text-clay-650 text-sm sm:text-base transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                  id={`faq-trigger-${index}`}
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-clay-600 flex-shrink-0" />
                    {item.question}
                  </span>
                  <span className="p-1 bg-white border border-slate-200 rounded-lg shadow-sm flex-shrink-0">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-clay-600" />
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
            仍然有其他更富创意的艺术想法、品牌合作或特殊商用大单需求？直接与 Claire 本人一对一探讨吧！
          </p>
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-clay-100 hover:bg-clay-200 text-clay-800 text-xs font-bold rounded-xl tracking-widest uppercase transition-all cursor-pointer shadow-sm border border-clay-200"
            id="faq-sub-btn"
          >
            直接留言给主创 Claire <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
