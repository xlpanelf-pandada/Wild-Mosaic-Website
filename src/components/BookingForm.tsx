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
        workshopTitle: selectedWorkshop?.title || "未命名体验",
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
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
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative z-10 w-full max-w-lg max-h-[92vh] sm:max-h-[85vh] flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl border border-clay-100"
          id="booking-modal-container"
        >
          {/* Header */}
          <div className="bg-clay-50 px-6 py-4 border-b border-clay-100 flex items-center justify-between">
            <h3 className="text-xl font-display font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-clay-600" />
              {activeTab === "booking" ? "立即线上预留席位" : "提请艺术大作定制研讨"}
            </h3>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
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
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === "booking"
                    ? "bg-white text-clay-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
                id="tab-select-booking"
              >
                报名体验课程
              </button>
              <button
                onClick={() => { setActiveTab("commission"); handleReset(); }}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === "commission"
                    ? "bg-white text-clay-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
                id="tab-select-commission"
              >
                寻求私人定制
              </button>
            </div>
          )}

          {/* Content Area */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
                id="form-success-alert"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-clay-100 text-clay-700 mb-4 ring-8 ring-clay-55 animate-bounce">
                  <CheckCircle2 className="w-9 h-9 text-clay-600" />
                </div>
                <h4 className="text-2xl font-display font-bold text-slate-900 mb-2">恭喜中，已完美提呈！</h4>
                <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
                  {activeTab === "booking"
                    ? `非常感谢您的预订！一封精心整理的入店二维码及课前须知文件正在飞往您的邮箱：${bEmail}，请注意查收。`
                    : `我们已获悉您极具品味的马赛克艺术创意构思。主创雕磨师 Claire 将在24h内回复您的邮件 ${cEmail}，与您预约首次视频灵感共研会。`}
                </p>
                <div className="bg-clay-50 rounded-xl p-4 mb-6 border border-clay-100 text-left text-sm max-w-sm mx-auto">
                  <span className="font-semibold text-slate-800 block mb-1">您呈交的细节：</span>
                  {activeTab === "booking" ? (
                    <div className="text-slate-600 space-y-1 font-sans">
                      <p>✨ <strong>体验课程：</strong> {selectedWorkshop?.title}</p>
                      <p>📅 <strong>开课时间：</strong> {selectedWorkshop?.date}（上午 10:00）</p>
                      <p>👥 <strong>随行学员：</strong> {bGuests} 位同行</p>
                      <p>💵 <strong>到店首付预计：</strong> ￥{(selectedWorkshop?.price || 0) * bGuests} 全包（无隐性消费）</p>
                    </div>
                  ) : (
                    <div className="text-slate-600 space-y-1 font-sans">
                      <p>🎨 <strong>定制品类：</strong> {cType}</p>
                      <p>📐 <strong>参考尺寸上限：</strong> {cDimensions || "后续商榷"}</p>
                      <p>💰 <strong>期待预算范围：</strong> {cBudget}</p>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => { handleReset(); onClose(); }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-clay-600 hover:bg-clay-700 text-white font-semibold rounded-xl shadow-lg transition-all font-sans cursor-pointer"
                  id="final-success-close-btn"
                >
                  返回工坊美学主页
                </button>
              </motion.div>
            ) : (
              <div>
                {activeTab === "booking" ? (
                  <form onSubmit={handleBookingSubmit} className="space-y-4" id="workshop-booking-form">
                    {/* Workshop Selector */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                        预定首选创意课程
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
                              {w.title} — ${w.price} ({w.level === 'Beginner' ? '零基础友好' : w.level === 'Intermediate' ? '中阶进阶' : '大师级心流'})
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
                            下周期开班排课：{selectedWorkshop.date}（下午 13:00）
                          </p>
                          <p className="text-xs text-slate-500 font-sans">
                            耗时 {selectedWorkshop.duration} • 免费配给顶级彩色晶片与防滑面屏。目前席位仅剩 {selectedWorkshop.seatsLeft} 人。
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Personal Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                          您的中文姓名
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
                            placeholder="如：孙悟空"
                            required
                            id="booking-name-field"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                          接收通知的电子邮箱
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
                          联系电话电话
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
                            placeholder="如：138-0000-0000"
                            required
                            id="booking-phone-field"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                          同行参与人数（享伴侣特惠）
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
                            <option value={1}>1 人行（悦己独享体验）</option>
                            <option value={2}>2 人行（亲密同行•全单9折优惠）</option>
                            <option value={3}>3 人行（温情全家福体验）</option>
                            <option value={4}>4 人行（好友组团聚欢腾）</option>
                            <option value={5}>5人及以上（企业或多人定制包桌）</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                        是否有过敏性、无障碍出行或其他特殊备注（选填）
                      </label>
                      <textarea
                        value={bNotes}
                        onChange={(e) => setBNotes(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-clay-600 focus:bg-white transition-all min-h-[70px]"
                        placeholder="比如：是否正值孕期不便受力、是否需要婴儿椅或为特定的亲友生日作保密惊喜准备？"
                        id="booking-notes-field"
                      />
                    </div>

                    {/* Dynamic Pricing Estimate Builder */}
                    {selectedWorkshop && (
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-400 uppercase tracking-widest font-sans font-bold">待预留全包票价</p>
                          <p className="text-slate-500 text-xs font-sans">
                            ${selectedWorkshop.price} × {bGuests} 位学员
                          </p>
                        </div>
                        <div className="flex items-center text-2xl font-display font-bold text-clay-800">
                          <DollarSign className="w-5 h-5 text-clay-650 mt-1" />
                          <span>{selectedWorkshop.price * bGuests}</span>
                        </div>
                      </div>
                    )}

                    {/* Submit Section */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full mt-2 py-3 bg-clay-600 hover:bg-clay-700 text-white font-bold rounded-xl shadow-lg transition-all font-sans flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      id="submit-booking-form-btn"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          正在为您锁留席位中...
                        </>
                      ) : (
                        <>
                          安全预订本期美学席位 <ArrowRight className="w-4 h-4 animate-pulse" />
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-slate-400 font-sans">
                      🔒 线上预订完全免预付金：支持店中付款，支持银联、Apple Pay、微信与支付宝。
                    </p>
                  </form>
                ) : (
                  <form onSubmit={handleCommissionSubmit} className="space-y-4" id="commission-quot-form">
                    {/* Art Project Type */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                        期待定制的马赛克大作类型
                      </label>
                      <select
                        value={cType}
                        onChange={(e) => setCType(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-clay-600 focus:bg-white transition-all font-medium"
                        required
                        id="select-commission-type"
                      >
                        <option value="纯挂壁画 / 艺术画">主梁挂墙壁画 / 独栋艺术玄关挂画</option>
                        <option value="厨卫防溅水墙面板">厨房重质隔热背景墙面、温润浴室防水墙封</option>
                        <option value="花园庭院踏步拼铺石">庄园小径踏铺石、庭院拼花耐磨防滑马赛克铺装</option>
                        <option value="定制全套马赛克桌面板">定制会客餐桌台面、精致轻奢茶水几、高架边几板</option>
                        <option value="其他概念性建筑玻璃拼接">其他不拘一格的个性化公共空间艺术拼接</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                          您的尊称
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
                            placeholder="例如：李设计师"
                            required
                            id="commission-name-field"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                          联系电子邮箱
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
                          大致尺寸规格要求 (长 x 宽)
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
                            placeholder="如: 60cm x 100cm"
                            required
                            id="commission-dims-field"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                          期待的单件预估预算区间
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
                            <option value="Under $500">500美元以内 (适于精巧挂饰画)</option>
                            <option value="$500 - $1,500">$500 - $1,500 (适于经典中型茶海拼拼板)</option>
                            <option value="$1,500 - $4,000">$1,500 - $4,000 (适于卫浴防潮大面板及餐桌)</option>
                            <option value="$4,000+">$4,000+ (大型奢华手工剪切商用大型壁画)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                        用人性的文字聊聊您的色彩灵感、空间布局和想法
                      </label>
                      <textarea
                        value={cDescription}
                        onChange={(e) => setCDescription(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-clay-600 focus:bg-white transition-all min-h-[100px]"
                        placeholder="告诉我们您偏爱的色彩基调、中意的流派故事（如地中海浪漫风、复古意式重彩风）、室外耐候性要求以及希望呈现何种氛围？"
                        required
                        id="commission-description-field"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full mt-2 py-3 bg-clay-600 hover:bg-clay-700 text-white font-bold rounded-xl shadow-lg transition-all font-sans flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      id="submit-commission-form-btn"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          正在送达您的至臻灵感灵思...
                        </>
                      ) : (
                        <>
                          索求 Claire 主创专属定制研讨提案 <Send className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-slate-400 font-sans">
                      ✨ Claire 会通盘细究石料配料，力求在接下来的视频互动里为您奉上精准惊艳的设计方案。
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
