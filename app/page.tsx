"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { CheckCircle, TrendingUp, Mail, Phone, User, Globe, ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ElifSelenLanding() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [notification, setNotification] = useState<any>(null);

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwy_ReoSB8KkLdjTkiTY8Rj34pwb1zGMtLFW7xMptMi6Yr0m4s_LLcsuZ10mHrBJoNO/exec";

  // Animasyon Varyantları (Hata çözümü için eklendi)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] // "easeOut" yerine daha güvenli olan cubic-bezier değerini ekledik
      }
    }
  };

  // Kazanç Bildirimleri (10 Kişi)
  const notifications = [
    { name: "Sercan S.", instrument: "XAUUSD", profit: "5.120₺", action: "kazandı" },
    { name: "Ayşe L.", instrument: "BTCUSD", profit: "12.400₺", action: "çekim yaptı" },
    { name: "Kadir G.", instrument: "EURUSD", profit: "3.250₺", action: "kazandı" },
    { name: "Mehmet T.", instrument: "USDTRY", profit: "8.750₺", action: "kazandı" },
    { name: "Buse A.", instrument: "ETHUSD", profit: "15.200₺", action: "çekim yaptı" },
    { name: "Caner D.", instrument: "NAS100", profit: "6.340₺", action: "kazandı" },
    { name: "Selin K.", instrument: "GBPUSD", profit: "4.180₺", action: "kazandı" },
    { name: "Arda M.", instrument: "XAGUSD", profit: "2.950₺", action: "çekim yaptı" },
    { name: "Deniz H.", instrument: "SOLUSD", profit: "9.100₺", action: "kazandı" },
    { name: "Murat E.", instrument: "GER40", profit: "7.600₺", action: "kazandı" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomItem = notifications[Math.floor(Math.random() * notifications.length)];
      setNotification(randomItem);
      setTimeout(() => setNotification(null), 4000);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const currentDateTime = new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    }).format(new Date());

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: `${currentDateTime} tarihinde form onaylandı.`
    };

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      setStatus('success');
      setFormData({ name: '', email: '', phone: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error("Gönderim Hatası:", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#020617] overflow-hidden font-sans text-slate-200">

      {/* --- DİNAMİK ARKA PLAN --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: `linear-gradient(#444cf7 1px, transparent 1px), linear-gradient(90deg, #444cf7 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />

        {/* Candlestick Animasyonları */}
        <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[15%] left-[8%] flex gap-4 items-end opacity-20">
          {[40, 70, 45, 90].map((h, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-[1px] h-24 bg-emerald-500 rounded-full opacity-50" />
              <div className="w-4 bg-emerald-500 rounded-sm -mt-12" style={{ height: `${h}px` }} />
            </div>
          ))}
        </motion.div>

        <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-[20%] right-[10%] flex gap-4 items-start opacity-20 rotate-12">
          {[60, 40, 80, 50].map((h, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-4 bg-red-500 rounded-sm" style={{ height: `${h}px` }} />
              <div className="w-[1px] h-20 bg-red-500 rounded-full -mt-4 opacity-50" />
            </div>
          ))}
        </motion.div>

        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <motion.main
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 max-w-4xl mx-auto px-6 py-12 flex flex-col items-center"
      >

        {/* PROFİL */}
        <motion.div variants={itemVariants} className="flex flex-col items-center mb-12 text-center">
          <div className="relative mb-8">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute -inset-4 rounded-full bg-gradient-to-tr from-blue-600 via-emerald-400 to-blue-600 opacity-30 blur-xl" />
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-[4px] border-white/10 p-2 bg-slate-900/40 backdrop-blur-md relative z-10 shadow-2xl">
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-slate-700/50">
                <Image src="/elifselenyilmaz.png" alt="Elif Selen Yılmaz" fill className="object-cover scale-110" priority />
              </div>
            </div>
            <div className="absolute bottom-3 right-3 bg-white rounded-full p-1.5 shadow-2xl z-20">
              <CheckCircle className="w-8 h-8 text-blue-500 fill-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">Elif Selen Yılmaz</h1>
          <div className="flex gap-3">
            <span className="px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <TrendingUp size={14} /> Kıdemli Analist
            </span>
            <span className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <Globe size={14} /> Global Strateji
            </span>
          </div>
        </motion.div>

        {/* VURUCU MESAJ BÖLÜMÜ */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-8 max-w-sm"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-slate-400">
            Finansal Özgürlüğe <br /> Bir Adım Kaldı
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed font-medium">
            Global piyasalarda Elif Selen Yılmaz'ın <span className="text-blue-400">özel sinyalleriyle</span> kazanmaya başlayan <span className="text-emerald-400 font-bold">5.000+</span> yatırımcı arasına katılın.
          </p>
        </motion.div>

        {/* FORM KARTI */}
        <motion.div variants={itemVariants} className="w-full max-w-md bg-white/[0.98] backdrop-blur-2xl rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.7)] overflow-hidden border border-white/20">
          <div className="bg-[#0f172a] py-5 px-8 flex justify-between items-center border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 text-[11px] font-black tracking-widest uppercase">Erişim Açık</span>
            </div>
            <span className="text-slate-500 text-[10px] font-bold tracking-tighter">BAŞARI: %94</span>
          </div>

          <div className="p-10">
            {status === 'success' ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Başarıyla Gönderildi!</h3>
                <p className="text-slate-500">Analiz grubumuza kaydınız alınmıştır. Sizinle en kısa sürede iletişime geçeceğiz.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                  <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} type="text" placeholder="Adınız Soyadınız" className="w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-100 outline-none text-slate-900 transition-all font-medium" />
                </div>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                  <input required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" placeholder="E-posta Adresiniz" className="w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-100 outline-none text-slate-900 transition-all font-medium" />
                </div>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                  <input required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} type="tel" placeholder="Telefon Numaranız" className="w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-100 outline-none text-slate-900 transition-all font-medium" />
                </div>

                <button disabled={status === 'sending'} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-5 rounded-2xl shadow-xl flex items-center justify-center gap-3 text-lg transition-all active:scale-95 disabled:opacity-70">
                  {status === 'sending' ? <Loader2 className="animate-spin" /> : <>Kazanmaya Başla <ArrowRight size={22} /></>}
                </button>
                {status === 'error' && <p className="text-red-500 text-center text-sm font-medium">Bir hata oluştu, lütfen tekrar deneyin.</p>}
              </form>
            )}
          </div>
        </motion.div>

        <motion.p variants={itemVariants} className="mt-16 text-slate-500 text-[10px] text-center max-w-xs leading-relaxed uppercase tracking-[0.4em] font-bold opacity-50">
          © 2026 Elif Selen Yılmaz Analiz Grubu. Tüm hakları saklıdır. Verilen bilgiler yatırım tavsiyesi değildir.
        </motion.p>
      </motion.main>

      {/* CANLI BİLDİRİM */}
      <AnimatePresence>
        {notification && (
          <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 24 }} exit={{ opacity: 0, x: -50 }} className="fixed bottom-10 left-0 z-50 p-5 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl flex items-center gap-4 max-w-[300px]">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center shrink-0 border border-emerald-500/20">
              <TrendingUp className="text-emerald-400 w-6 h-6" />
            </div>
            <div>
              <p className="text-white text-xs font-black truncate">{notification.name}</p>
              <p className="text-slate-400 text-[11px] leading-tight mt-0.5">{notification.instrument} üzerinden <span className="text-emerald-400 font-bold">{notification.profit}</span> {notification.action}!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}