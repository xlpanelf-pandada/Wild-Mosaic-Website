import React, { useState } from "react";
import { Mail, Send, CheckCircle, Flame, Instagram, Facebook, MapPin, Watch, ShieldCheck } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setIsValidEmail(false);
      return;
    }
    setSubmitting(true);
    setIsValidEmail(true);

    setTimeout(() => {
      // Persist newsletter lead in localStorage
      const existing = JSON.parse(localStorage.getItem("mosaic_newsletter") || "[]");
      if (!existing.includes(email)) {
        localStorage.setItem("mosaic_newsletter", JSON.stringify([...existing, email]));
      }
      setSubmitting(false);
      setSubscribed(true);
      setEmail("");
    }, 1000);
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-100 font-sans" id="studio-footer">
      
      {/* Newsletter Lead Magnet Area */}
      <div className="bg-clay-800 relative overflow-hidden py-12 px-6 sm:px-12 text-center border-b border-clay-900">
        {/* Background visual geometric accents */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-clay-700/30 rounded-full blur-2xl -z-10" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-art-amber/10 rounded-full blur-2xl -z-10" />

        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur rounded-full text-xs font-bold text-art-amber uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-art-amber" aria-hidden="true" />
            近期班次名额极易爆满
          </div>
          
          <h3 className="text-xl sm:text-3xl font-display font-bold text-white leading-tight">
            目前暂时没有找到空余的心仪档期？
          </h3>
          <p className="text-clay-100 text-xs sm:text-sm max-w-lg mx-auto">
            订阅我们的排班月度发布表，在新课上架对公众公开的前 2 小时，自动在您的邮箱获取抢占链接。除工坊动态，终身零垃圾邮件。
          </p>

          {/* Form container */}
          <div className="max-w-md mx-auto pt-2" id="newsletter-form-container">
            {subscribed ? (
              <div 
                className="p-4 bg-white/10 rounded-xl border border-white/10 text-white text-xs sm:text-sm flex items-center justify-center gap-2"
                id="newsletter-success-alert"
              >
                <CheckCircle className="w-5 h-5 text-art-amber" />
                <span>恭喜进入邀请白名单！我们将在发布抢票链接时提前2小时向您送达。</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-1">
                <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                  <div className="relative flex-1">
                    <span className="absolute left-3.5 top-3.5 text-clay-300">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setIsValidEmail(true);
                      }}
                      placeholder="输入您的常用电子邮箱地址"
                      className="w-full pl-10 pr-4 py-3 bg-white text-slate-800 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-art-amber placeholder-slate-400 font-sans"
                      disabled={submitting}
                      id="newsletter-email-input"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-950 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap min-w-[120px]"
                    id="newsletter-submit-btn"
                  >
                    {submitting ? "正在报名..." : "获取优先邀请"}
                    <Send className="w-3.5 h-3.5 text-art-amber" />
                  </button>
                </div>
                {!isValidEmail && (
                  <p className="text-[11px] text-red-200 mt-1.5 text-left pl-1 font-semibold" id="newsletter-error">
                    ⚠️ 请输入格式完美的电子邮件地址 (例如 name@example.com)。
                  </p>
                )}
                <p className="text-[10px] text-clay-200/80 pt-1 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 纯粹的工坊日历更新。极简安全，一键退出。
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Structural Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="footer-midsections">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          
          {/* Column A: Logo Brand and Description */}
          <div className="md:col-span-5 space-y-4 text-left">
            <h4 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <span className="p-1.5 bg-clay-700 text-white rounded-lg">❇️</span>
              玛赛克艺术空间
            </h4>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              这里是位于都市中心文化艺术街区的一隅静谧之地。专门从事纯手工彩色大教堂艺术玻璃、陶质石子、意式 Smalti 马赛克的传统贴附与现代化家装背景、餐桌等中大型美学构件的开发和心流慢学体验。
            </p>
            {/* Social handles */}
            <div className="flex gap-3">
              <a 
                href="#footer" 
                className="p-2 bg-slate-800 hover:bg-clay-700 text-slate-300 hover:text-white rounded-lg transition-colors border border-slate-700"
                aria-label="Find us on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="#footer" 
                className="p-2 bg-slate-800 hover:bg-clay-700 text-slate-300 hover:text-white rounded-lg transition-colors border border-slate-700"
                aria-label="Join our Facebook community group"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="#footer" 
                className="p-2 bg-slate-800 hover:bg-clay-700 text-slate-300 hover:text-white rounded-lg transition-colors border border-slate-700 font-sans text-[11px]"
                aria-label="See mosaic layout references on Pinterest"
              >
                <span>小红书</span>
              </a>
            </div>
          </div>

          {/* Column B: Local Workspace Coordinates */}
          <div className="md:col-span-4 space-y-3.5 text-left">
            <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono">工坊位置与物理导航</h5>
            <div className="space-y-4 text-xs text-slate-300 leading-normal font-sans">
              
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4.5 h-4.5 text-clay-500 mt-0.5 flex-shrink-0" />
                <p>
                  <strong>实体静修美学体验店：</strong><br />
                  流光彩嵌胡同 614 号，都市创意文化街区<br />
                  加利福尼亚，旧金山 94107
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <Watch className="w-4.5 h-4.5 text-clay-500 mt-0.5 flex-shrink-0" />
                <p>
                  <strong>日常营业及访店时间：</strong><br />
                  每周四 至 周日 • 上午 10:00 - 下午 18:00<br />
                  <span className="text-clay-500 font-medium">夜间创意课程仅针对企业包场或多人派对定制排开。</span>
                </p>
              </div>

            </div>
          </div>

          {/* Column C: Quick Link Navigation */}
          <div className="md:col-span-3 space-y-3 text-left">
            <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono">全站探索</h5>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="#workshops" className="hover:text-art-amber transition-colors">创意手创课程</a>
              </li>
              <li>
                <a href="#commissions" className="hover:text-art-amber transition-colors">私人作品定制</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-art-amber transition-colors">晶石画廊集</a>
              </li>
              <li>
                <a href="#about" className="hover:text-art-amber transition-colors">主创艺术家故事</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-art-amber transition-colors">预约服务政策解答</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower Legal Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-sans">
          <p>© {new Date().getFullYear()} 玛赛克艺术空间 (Mosaic Art Space) LLC. 版权所有。保留一切手艺和像素资产。</p>
          <div className="flex gap-4 border-slate-800">
            <a href="#footer" className="hover:text-slate-300">用户使用协议</a>
            <a href="#footer" className="hover:text-slate-300">隐私权政策声明</a>
            <a href="#footer" className="hover:text-slate-300 font-mono text-[9px] text-clay-500">时区：2026-05-29 UTC</a>
          </div>
        </div>

      </div>

    </footer>
  );
}
