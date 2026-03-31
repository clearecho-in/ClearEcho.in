import React, { useState, FormEvent, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from 'motion/react';
import { Toaster, toast } from 'sonner';

const ClearEchoLogo = ({ className }: { className?: string }) => (
  <img 
    src={`${import.meta.env.BASE_URL}logo.png`}
    alt="ClearEcho Logo" 
    className={className} 
    style={{ objectFit: 'contain' }}
  />
);

import { 
  MessageSquare, 
  Zap, 
  Shield, 
  ArrowRight, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2,
  Menu,
  X,
  ChevronRight,
  Share2,
  BarChart3,
  TrendingUp,
  Globe,
  Users,
  ThumbsUp,
  ShieldCheck,
  History,
  Target,
  Award,
  ArrowUpRight,
  ArrowUp,
  Loader2,
  Plus,
  Minus,
  ChevronDown
} from 'lucide-react';

const SectionLabel = ({ number, text }: { number: string; text: string }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex items-center justify-between mb-8 md:mb-16"
  >
    <div className="flex items-center gap-4 md:gap-6">
      <div className="flex flex-col">
        <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500/60 mb-1">Index</span>
        <span className="text-xl md:text-2xl font-display font-extrabold tracking-tighter text-white/90 leading-none">{number}</span>
      </div>
      <div className="h-8 md:h-12 w-[1px] bg-white/10" />
      <div className="flex flex-col">
        <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-1">System Module</span>
        <span className="text-[10px] md:text-xs uppercase tracking-[0.1em] text-white font-bold">{text}</span>
      </div>
    </div>
    <div className="hidden sm:flex items-center gap-3 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/5 bg-white/[0.02]">
      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
      <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-white/40">Status: Operational</span>
    </div>
  </motion.div>
);

const CornerAccent = () => (
  <>
    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20" />
    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20" />
    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20" />
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20" />
  </>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const handleBookNow = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsBooking(true);
    
    // Simulate a quick preparation/loading state
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setIsBooking(false);
    const element = document.getElementById('appointment');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: "Features", href: "#features", id: "01" },
    { name: "FAQ", href: "#faq", id: "02" },
    { name: "About", href: "#about", id: "03" },
    { name: "How It Works", href: "#appointment", id: "04" },
    { name: "Get Started", href: "#contact", id: "05" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "py-4" : "py-6"
      }`}
    >
      <div className={`max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between transition-all duration-500 ${
        isScrolled 
          ? "bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)] mx-2 sm:mx-4 md:mx-auto" 
          : "bg-transparent border-transparent"
      }`}>
        <div className="flex items-center gap-3 pl-2">
          <div className="relative">
            <ClearEchoLogo className="w-11 h-11 md:w-14 md:h-14" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl md:text-3xl font-display font-extrabold tracking-tight text-white leading-none">ClearEcho</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-4 lg:gap-8">
          {navLinks.map((link) => (
            <motion.a 
              key={link.id} 
              href={link.href} 
              whileHover={{ 
                scale: 1.05,
                y: -2,
                color: "rgb(255, 255, 255)",
                textShadow: "0 0 8px rgba(255, 69, 0, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="group relative flex items-center gap-1.5 lg:gap-2 text-xs lg:text-sm font-bold text-white/90 hover:text-white transition-colors"
            >
              <span className="text-[9px] lg:text-[10px] font-black text-orange-500 group-hover:text-orange-400 transition-colors tracking-tighter">{link.id}</span>
              <span>{link.name}</span>
              <motion.div 
                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-orange-500 rounded-full origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3 lg:gap-4 pr-2">
          <motion.button 
            onClick={handleBookNow}
            disabled={isBooking}
            whileHover={{ 
              scale: 1.05,
              y: -2,
              boxShadow: "0 10px 25px rgba(255, 69, 0, 0.4)",
              backgroundColor: "rgb(255, 69, 0)",
              color: "rgb(255, 255, 255)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="px-5 lg:px-7 py-2.5 lg:py-3 bg-white text-black text-xs lg:text-sm font-bold rounded-full transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 min-w-[130px] lg:min-w-[150px]"
          >
            {isBooking ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Preparing...</span>
              </>
            ) : (
              "Book Now"
            )}
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white p-2 mr-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="absolute top-24 left-4 right-4 lg:hidden bg-black/80 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden z-50 shadow-2xl"
          >
            <div className="px-6 py-8 space-y-6">
              {navLinks.map((link) => (
                <a 
                  key={link.id} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 text-lg font-bold text-gray-400 hover:text-white transition-colors"
                >
                  <span className="text-[10px] font-bold text-orange-500/50">{link.id}</span>
                  {link.name}
                </a>
              ))}
              <div className="pt-4">
                <button 
                  onClick={(e) => {
                    setIsOpen(false);
                    handleBookNow(e as any);
                  }}
                  disabled={isBooking}
                  className="block w-full text-center py-4 bg-white text-black font-bold rounded-2xl shadow-xl flex items-center justify-center gap-2 text-sm"
                >
                  {isBooking ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Preparing...</span>
                    </>
                  ) : (
                    "Book Appointment"
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const MentionsTicker = () => {
  const mentions = [
    "r/technology: 'ClearEcho is the future of community trust...'",
    "Quora: 'How ClearEcho is changing the game for startups...'",
    "r/startups: 'Just saw a 40% jump in organic traffic thanks to...' ",
    "Quora: 'The best way to build authority in 2026 is...' ",
    "r/marketing: 'The AI visibility engine is actually insane...' ",
    "r/business: 'Finally a tool that understands Reddit culture...' ",
    "Quora: 'Why ClearEcho is the top recommendation for SaaS...' ",
    "r/saas: 'ClearEcho's approach to r/saas is pure gold...' "
  ];

  return (
    <div className="bg-orange-500/5 border-y border-white/5 py-4 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />
      
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap gap-12 items-center"
      >
        {[...mentions, ...mentions].map((mention, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-xs font-medium text-gray-400 tracking-wide">{mention}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const FloatingLogoItem = ({ logo, scrollYProgress }: { logo: any; scrollYProgress: any; key?: any }) => {
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -500 * logo.speed]);
  const smoothY = useSpring(yParallax, { stiffness: 50, damping: 20 });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0.1, 0.4, 0.1],
        scale: [1, 1.1, 1],
        y: [0, -30, 0],
        x: [0, 15, 0],
      }}
      style={{ 
        top: logo.top, 
        left: logo.left,
        translateY: smoothY
      }}
      transition={{ 
        duration: 10 + Math.random() * 5, 
        repeat: Infinity, 
        delay: logo.delay,
        ease: "easeInOut"
      }}
      className="absolute z-0"
    >
      <img 
        src={logo.src} 
        alt={logo.alt} 
        className={`${logo.size} object-contain opacity-100 transition-all duration-500 ${logo.className || ''}`}
        referrerPolicy="no-referrer"
      />
    </motion.div>
  );
};

const FloatingLogos = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const logos = [
    { src: "https://upload.wikimedia.org/wikipedia/en/b/bd/Reddit_Logo_Icon.svg", alt: "Reddit", top: "15%", left: "10%", delay: 0, size: "w-8 h-8 md:w-12 md:h-12", speed: 1.5 },
    { src: "https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg", alt: "X", top: "25%", left: "85%", delay: 1, size: "w-6 h-6 md:w-10 md:h-10", className: "invert", speed: 2.2 },
    { src: "https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg", alt: "Facebook", top: "65%", left: "5%", delay: 2, size: "w-8 h-8 md:w-12 md:h-12", speed: 1.8 },
    { src: "https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg", alt: "LinkedIn", top: "75%", left: "90%", delay: 3, size: "w-6 h-6 md:w-10 md:h-10", speed: 2.5 },
    { src: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg", alt: "YouTube", top: "10%", left: "75%", delay: 4, size: "w-8 h-8 md:w-12 md:h-12", speed: 1.2 },
    { src: "https://upload.wikimedia.org/wikipedia/commons/9/91/Quora_logo_2015.svg", alt: "Quora", top: "55%", left: "80%", delay: 5, size: "w-8 h-8 md:w-12 md:h-12", speed: 2.0 },
    { src: "https://upload.wikimedia.org/wikipedia/en/b/bd/Reddit_Logo_Icon.svg", alt: "Reddit", top: "40%", left: "15%", delay: 2, size: "w-6 h-6 md:w-10 md:h-10", speed: 1.4 },
    { src: "https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg", alt: "X", top: "80%", left: "20%", delay: 4, size: "w-6 h-6 md:w-8 md:h-8", className: "invert", speed: 2.8 },
    { src: "https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg", alt: "Facebook", top: "20%", left: "40%", delay: 6, size: "w-6 h-6 md:w-10 md:h-10", speed: 1.6 },
    { src: "https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg", alt: "LinkedIn", top: "70%", left: "45%", delay: 1, size: "w-8 h-8 md:w-12 md:h-12", speed: 2.1 },
    { src: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg", alt: "YouTube", top: "35%", left: "60%", delay: 3, size: "w-6 h-6 md:w-10 md:h-10", speed: 1.3 },
    { src: "https://upload.wikimedia.org/wikipedia/commons/9/91/Quora_logo_2015.svg", alt: "Quora", top: "85%", left: "65%", delay: 5, size: "w-6 h-6 md:w-8 md:h-8", speed: 2.4 },
    { src: "https://upload.wikimedia.org/wikipedia/en/b/bd/Reddit_Logo_Icon.svg", alt: "Reddit", top: "15%", left: "90%", delay: 7, size: "w-8 h-8 md:w-12 md:h-12", speed: 1.7 },
    { src: "https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg", alt: "X", top: "50%", left: "5%", delay: 2, size: "w-6 h-6 md:w-10 md:h-10", className: "invert", speed: 2.6 },
  ];

  // Filter logos for mobile to reduce clutter
  const visibleLogos = isMobile ? logos.slice(0, 6) : logos;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {visibleLogos.map((logo, i) => (
        <FloatingLogoItem key={i} logo={logo} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  );
};

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const smoothY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const smoothY2 = useSpring(y2, { stiffness: 100, damping: 30 });
  const smoothY3 = useSpring(y3, { stiffness: 100, damping: 30 });

  return (
    <section 
      ref={containerRef}
      className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden atmospheric-bg min-h-screen flex flex-col items-center justify-center p-4 md:p-6"
    >
      <FloatingLogos scrollYProgress={scrollYProgress} />
      
      <motion.div 
        style={{ y: smoothY1, opacity, scale }}
        className="max-w-4xl mx-auto px-6 text-center relative z-10"
      >
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-orange-400 text-xs font-bold uppercase tracking-widest mb-10 backdrop-blur-md">
            <Zap size={14} />
            <span>Community Authority Engine</span>
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight leading-[1.1] md:leading-[1.05] mb-6 md:mb-8 text-gradient break-words"
          >
            Dominate the web <br className="hidden sm:block" />
            Starting with Reddit
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-sm sm:text-base md:text-xl text-gray-400 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0"
          >
            We turn community trust into brand authority. Scale your presence from Reddit to the entire social web and ensure AI models like ChatGPT recommend you first.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-4 md:gap-6 mt-8 md:mt-12"
          >
            <motion.a 
              href="#appointment" 
              whileHover={{ 
                scale: 1.05,
                y: -2,
                boxShadow: "0 10px 25px rgba(255, 69, 0, 0.4)",
                backgroundColor: "rgb(255, 69, 0)",
                color: "rgb(255, 255, 255)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="px-8 md:px-10 py-3.5 md:py-4 bg-white text-black font-bold rounded-full transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] text-sm md:text-base"
            >
              Get Started
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Floating Glass Cards */}
        <div className="mt-12 md:mt-24 grid sm:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div 
            style={{ y: typeof window !== 'undefined' && window.innerWidth > 768 ? smoothY2 : 0 }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="glass-card p-5 sm:p-8 rounded-[2rem] md:rounded-[2.5rem] text-left relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-3xl rounded-full -mr-10 -mt-10 group-hover:bg-orange-500/20 transition-all" />
            <div className="text-[10px] md:text-sm text-gray-400 font-medium mb-1 md:mb-2 uppercase tracking-wider">AI Visibility Score</div>
            <div className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-white">94.8%</div>
            <div className="flex items-center gap-2 text-green-400 text-xs md:text-sm font-bold mb-6 md:mb-8">
              <TrendingUp size={14} className="md:w-4 md:h-4" />
              +12.4% this month
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3">
              <button className="flex-1 min-w-fit px-3 md:px-4 py-1.5 md:py-2 bg-white/10 rounded-full text-[10px] md:text-xs font-bold hover:bg-white/20 transition-all text-white whitespace-nowrap">View Audit</button>
              <button className="flex-1 min-w-fit px-3 md:px-4 py-1.5 md:py-2 bg-white/10 rounded-full text-[10px] md:text-xs font-bold hover:bg-white/20 transition-all text-white whitespace-nowrap">Optimize</button>
              <button className="flex-1 min-w-fit px-3 md:px-4 py-1.5 md:py-2 bg-orange-500/20 text-orange-400 rounded-full text-[10px] md:text-xs font-bold hover:bg-orange-500/30 transition-all whitespace-nowrap">Scale Now</button>
            </div>
          </motion.div>

          <motion.div 
            style={{ y: typeof window !== 'undefined' && window.innerWidth > 768 ? smoothY3 : 0 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
            className="glass-card p-5 sm:p-8 rounded-[2rem] md:rounded-[2.5rem] text-left relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full -mr-10 -mt-10 group-hover:bg-purple-500/20 transition-all" />
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-purple-500 rounded-full flex items-center justify-center text-white">
                  <MessageSquare size={14} className="md:w-4 md:h-4" />
                </div>
                <div>
                  <div className="text-[8px] md:text-[9px] text-gray-400 uppercase font-bold tracking-wider">Reddit Reach</div>
                  <div className="text-xs md:text-sm font-bold text-white">1.2M Impressions</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs md:text-sm font-bold text-white">High Trust</div>
                <div className="text-[8px] md:text-[9px] text-gray-400 uppercase font-bold tracking-wider">92% Sentiment</div>
              </div>
            </div>
            <div className="flex justify-center my-3 md:my-4">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                <Share2 size={14} className="md:w-4 md:h-4 text-white" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="flex -space-x-2">
                  <img src="https://upload.wikimedia.org/wikipedia/en/b/bd/Reddit_Logo_Icon.svg" className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white p-1 border border-white/10" alt="Reddit" referrerPolicy="no-referrer" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Quora_logo_2015.svg" className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white p-1 border border-white/10" alt="Quora" referrerPolicy="no-referrer" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg" className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white p-1 border border-white/10" alt="X" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <div className="text-[8px] md:text-[9px] text-gray-400 uppercase font-bold tracking-wider break-words max-w-[80px] sm:max-w-none">Cross-Platform Scale</div>
                  <div className="text-[10px] sm:text-xs md:text-sm font-bold text-white break-words max-w-[80px] sm:max-w-none">X, FB, LinkedIn, Quora</div>
                </div>
              </div>
              <div className="text-right shrink-0 pl-2">
                <div className="text-xs md:text-sm font-bold text-white">+450% Growth</div>
                <div className="text-[8px] md:text-[9px] text-gray-400 uppercase font-bold tracking-wider">Organic Authority</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Horizon Glow */}
      <motion.div 
        style={{ y: smoothY3, opacity: useTransform(scrollYProgress, [0, 0.5], [0.6, 0]) }}
        className="absolute bottom-0 left-0 right-0 h-[50vh] horizon-glow -z-10" 
      />
    </section>
  );
};

const AIVisibility = () => {
  const [activeTab, setActiveTab] = useState('analysis');

  const analysisSteps = [
    { label: "Ingesting Feedback", status: "complete", time: "0.2s" },
    { label: "Semantic Mapping", status: "complete", time: "0.5s" },
    { label: "Sentiment Scoring", status: "active", time: "0.8s" },
    { label: "Actionable Extraction", status: "pending", time: "--" },
  ];

  return (
    <section id="ai-visibility" className="py-32 bg-[#0A0A0A] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel number="05" text="AI Visibility" />
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 leading-tight text-white">
              Get Recommended by <span className="text-orange-400">AI Models</span>. <br className="hidden md:block" />
              Be the Top Choice.
            </h2>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
              When people ask AI for advice, they trust the answers they get. We make sure your brand is the one AI recommends by building your authority on Reddit.
            </p>
            
            <div className="space-y-5 md:space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 shrink-0">
                  <Globe size={18} className="md:w-5 md:h-5" />
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-white text-sm md:text-base">AI Visibility Seeding</h4>
                  <p className="text-gray-400 text-xs md:text-sm">We place your brand in the discussions that AI models use to learn and give recommendations.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                  <BarChart3 size={18} className="md:w-5 md:h-5" />
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-white text-sm md:text-base">Competitor & Site Tracking</h4>
                  <p className="text-gray-400 text-xs md:text-sm">Monitor your own growth and see exactly what your competitors are doing to stay ahead.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative mt-8 md:mt-0"
          >
            <div className="glass-card rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6 md:mb-8 border-b border-gray-800 pb-4">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500" />
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500" />
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500" />
                </div>
                <div className="px-2 md:px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-[8px] md:text-[10px] font-bold uppercase tracking-widest">
                  AI Engine v4.2 Active
                </div>
              </div>

              {/* Analysis Feed */}
              <div className="space-y-3 md:space-y-4">
                {analysisSteps.map((step, i) => (
                  <div key={i} className="flex items-center justify-between p-3 md:p-4 rounded-xl bg-white/5 border border-white/10 relative">
                    <CornerAccent />
                    <div className="flex items-center gap-2 md:gap-3">
                      {step.status === 'complete' ? (
                        <CheckCircle2 size={16} className="text-green-500 md:w-[18px] md:h-[18px]" />
                      ) : step.status === 'active' ? (
                        <div className="w-3.5 h-3.5 md:w-4 md:h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <div className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full border-2 border-gray-700" />
                      )}
                      <span className={`text-xs md:text-sm font-medium ${step.status === 'pending' ? 'text-gray-500' : 'text-white'}`}>
                        {step.label}
                      </span>
                    </div>
                    <span className="text-[8px] md:text-[10px] font-bold text-gray-500">{step.time}</span>
                  </div>
                ))}
              </div>

              {/* Live Graph Simulation */}
              <div className="mt-6 md:mt-8 p-3 md:p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 relative">
                <CornerAccent />
                <div className="flex justify-between items-end h-16 md:h-24 gap-1">
                  {[40, 70, 45, 90, 65, 80, 50, 85, 95, 60].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 1, delay: i * 0.1, repeat: Infinity, repeatType: 'reverse' }}
                      className="flex-1 bg-orange-500/40 rounded-t-sm"
                    />
                  ))}
                </div>
                <div className="mt-2 md:mt-3 flex justify-between text-[8px] md:text-[10px] font-bold text-orange-400/60">
                  <span>08:00</span>
                  <span>LIVE FEED</span>
                  <span>09:30</span>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2 md:gap-3"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <Zap size={16} className="md:w-[20px] md:h-[20px]" />
              </div>
              <div>
                <div className="text-[8px] md:text-[9px] text-gray-500 font-bold uppercase tracking-wider">Visibility Score</div>
                <div className="text-lg md:text-xl font-bold text-gray-900">98.4%</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const WhyReddit = () => {
  const reasons = [
    {
      title: "Reddit is the Foundation",
      description: "Reddit is where real people talk. It's the most trusted place to build your brand's reputation before moving to other platforms.",
      icon: <Shield className="text-orange-400" />
    },
    {
      title: "The AI Secret Sauce",
      description: "AI models like ChatGPT learn from Reddit. We make sure they see your brand so they recommend you to their users.",
      icon: <Zap className="text-orange-400" />
    },
    {
      title: "Google Search Power",
      description: "Reddit threads rank incredibly well on Google. We help you capture that traffic and send it to your website.",
      icon: <TrendingUp className="text-green-400" />
    },
    {
      title: "Multi-Platform Scale",
      description: "Once we win on Reddit, we take that momentum to Facebook, X, LinkedIn, and YouTube to find even more customers.",
      icon: <Globe className="text-purple-400" />
    }
  ];

  return (
    <section id="about" className="py-16 md:py-32 bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel number="01" text="The Strategy" />
        <div className="flex flex-col md:flex-row gap-12 lg:gap-16 items-center">
          <div className="md:w-1/2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold mb-4 md:mb-6 leading-tight text-white">
              Why We Start With <span className="text-orange-400">Reddit</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-lg mb-8 md:mb-10 leading-relaxed">
              Reddit is the only place where you can build deep trust with your audience. We use Reddit as your launchpad, then expand your reach across the entire social web.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              {reasons.map((reason, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group glass-card p-5 md:p-6 rounded-2xl border-white/5 hover:border-orange-500/20 relative"
                >
                  <CornerAccent />
                  <motion.div 
                    whileHover={{ scale: 1.15, rotate: 8, boxShadow: "0 0 20px rgba(255, 69, 0, 0.3)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-orange-500/20 transition-colors cursor-pointer"
                  >
                    {React.cloneElement(reason.icon as React.ReactElement, { size: 18, className: "md:w-6 md:h-6" })}
                  </motion.div>
                  <h4 className="font-bold mb-1.5 md:mb-2 text-white text-sm md:text-base">{reason.title}</h4>
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed">{reason.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="md:w-1/2 relative mt-8 md:mt-0">
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden glass-card">
              <img 
                src="https://picsum.photos/seed/social-media-marketing/1000/1200" 
                alt="Social Media Marketing Strategy" 
                className="w-full h-auto opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-5 md:p-8">
                <div className="flex items-center gap-2 text-white mb-2">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Live Subreddit Activity</span>
                </div>
                <p className="text-white text-sm md:text-base font-medium italic leading-relaxed">"Reddit is the only place where you can find 100,000 people talking about your specific niche right now."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const RedditShowcase = () => {
  const subreddits = [
    {
      name: "r/technology",
      members: "14.2M",
      active: "12.4K",
      trending: true,
      color: "bg-orange-500"
    },
    {
      name: "r/startups",
      members: "1.2M",
      active: "2.1K",
      trending: true,
      color: "bg-orange-500"
    },
    {
      name: "r/marketing",
      members: "850K",
      active: "1.5K",
      trending: false,
      color: "bg-purple-500"
    },
    {
      name: "r/business",
      members: "2.4M",
      active: "3.8K",
      trending: true,
      color: "bg-green-500"
    }
  ];

  return (
    <section id="intelligence" className="py-16 md:py-32 bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel number="02" text="Intelligence" />
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white p-2">Real-Time Reddit Intelligence</h2>
            <p className="text-gray-400 max-w-2xl mx-auto break-words p-2">
              We monitor thousands of subreddits to find the exact moments your brand should join the conversation.
            </p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subreddits.map((sub, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-3xl hover:border-white/20 transition-all group cursor-default relative"
            >
              <CornerAccent />
              <div className="flex items-center justify-between mb-6">
                <div className={`w-12 h-12 rounded-2xl ${sub.color} flex items-center justify-center text-white shadow-lg`}>
                  <MessageSquare size={24} />
                </div>
                {sub.trending && (
                  <span className="px-2 py-1 rounded-md bg-orange-500/10 text-orange-500 text-[10px] font-bold uppercase tracking-tighter">
                    Trending
                  </span>
                )}
              </div>
              
              <h3 className="text-xl font-bold mb-1 text-white group-hover:text-orange-400 transition-colors">{sub.name}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  <span>{sub.members}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span>{sub.active} online</span>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-gray-400">Engagement Rate</span>
                  <span className="text-green-400">+18.4%</span>
                </div>
                <div className="mt-2 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '75%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-orange-500 to-purple-500"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 p-6 sm:p-8 rounded-[2.5rem] bg-gradient-to-r from-orange-500/10 to-orange-500/10 border border-white/5 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-16 h-16 rounded-full bg-orange-500 flex-shrink-0 flex items-center justify-center text-white shadow-[0_0_30px_rgba(249,115,22,0.3)]">
              <Zap size={32} />
            </div>
            <div>
              <h4 className="text-xl md:text-2xl font-display font-extrabold text-white mb-1">Ready to start your Reddit campaign?</h4>
              <p className="text-gray-400">Our AI is already analyzing 50,000+ subreddits for your niche.</p>
            </div>
          </div>
          <a href="#appointment" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all whitespace-nowrap">
            Analyze My Niche
          </a>
        </div>
      </div>
    </section>
  );
};

const RedditThreadSimulation = () => {
  const comments = [
    {
      user: "tech_enthusiast_99",
      time: "2h ago",
      content: "Does anyone know a good tool for scaling community trust? I've tried everything but nothing seems to stick.",
      upvotes: "1.2k",
      replies: [
        {
          user: "growth_hacker_pro",
          time: "1h ago",
          content: "Honestly, you should check out ClearEcho. They helped us dominate r/startups last month. Their approach to Reddit is on another level.",
          upvotes: "850",
          isHighlighted: true
        },
        {
          user: "marketing_guru",
          time: "45m ago",
          content: "Second this. ClearEcho's AI visibility engine is a game changer for Reddit marketing.",
          upvotes: "420"
        }
      ]
    }
  ];

  return (
    <section id="simulation" className="py-16 md:py-32 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <SectionLabel number="03" text="The Conversation" />
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold mb-4 text-white p-2">The Art of the Conversation</h2>
            <p className="text-gray-400">
              We don't just post; we participate. See how we naturally weave your brand into high-authority discussions.
            </p>
          </motion.div>
        </div>

        <div className="glass-card rounded-[2rem] overflow-hidden border-white/5">
          <div className="bg-white/5 p-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white">
                <MessageSquare size={16} />
              </div>
              <span className="text-sm font-bold text-white">r/marketing • Posted by u/ClearEcho_Bot</span>
            </div>
            <button className="px-4 py-1.5 bg-orange-500 text-white text-xs font-bold rounded-full hover:bg-orange-600 transition-all">
              Join Discussion
            </button>
          </div>

        <div className="p-4 sm:p-8 space-y-6 md:space-y-8">
            {comments.map((comment, i) => (
              <div key={i} className="space-y-4 md:space-y-6">
                <div className="flex gap-3 md:gap-4">
                  <div className="flex flex-col items-center gap-1 pt-1">
                    <button className="text-gray-500 hover:text-orange-500 transition-colors"><ThumbsUp size={16} className="md:w-[18px] md:h-[18px]" /></button>
                    <span className="text-[10px] md:text-xs font-bold text-gray-400">{comment.upvotes}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 md:mb-2">
                      <span className="text-xs md:text-sm font-bold text-white">u/{comment.user}</span>
                      <span className="text-[10px] md:text-xs text-gray-500">• {comment.time}</span>
                    </div>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">{comment.content}</p>
                  </div>
                </div>

                <div className="ml-3 sm:ml-8 md:ml-12 space-y-4 md:space-y-6 border-l-2 border-white/5 pl-3 md:pl-6">
                  {comment.replies.map((reply, j) => (
                    <motion.div 
                      key={j}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: j * 0.2 }}
                      viewport={{ once: true }}
                      className={`p-3 md:p-4 rounded-xl md:rounded-2xl transition-all ${reply.isHighlighted ? 'bg-orange-500/10 border border-orange-500/20' : 'bg-white/5 border border-white/5'}`}
                    >
                      <div className="flex gap-2.5 md:gap-4">
                        <div className="flex flex-col items-center gap-1 pt-1">
                          <button className="text-gray-500 hover:text-orange-500 transition-colors"><ThumbsUp size={12} className="md:w-[16px] md:h-[16px]" /></button>
                          <span className="text-[9px] md:text-xs font-bold text-gray-400">{reply.upvotes}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
                            <span className="text-[11px] md:text-sm font-bold text-white">u/{reply.user}</span>
                            {reply.isHighlighted && <span className="px-1 py-0.5 rounded bg-orange-500/20 text-orange-400 text-[7px] md:text-[10px] font-bold uppercase">Brand Advocate</span>}
                            <span className="text-[9px] md:text-xs text-gray-500">• {reply.time}</span>
                          </div>
                          <p className="text-gray-300 text-[10px] md:text-sm leading-relaxed">{reply.content}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const RedditAuthoritySection = () => {
  const cards = [
    {
      icon: <History className="text-orange-400" />,
      title: "Aged Accounts",
      description: "We use aged accounts. On Reddit, age equals trust. New accounts are immediately flagged as suspicious."
    },
    {
      icon: <Award className="text-orange-400" />,
      title: "High Karma",
      description: "Our accounts have high karma, earned through years of genuine participation. This gives our posts instant authority."
    },
    {
      icon: <Users className="text-purple-400" />,
      title: "Real Human Activity",
      description: "No bots. These are real accounts with diverse posting histories, making every recommendation feel authentic and earned."
    }
  ];

  return (
    <section id="authority" className="py-16 md:py-32 bg-[#0A0A0A] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel number="04" text="Authority" />
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold mb-4 md:mb-6 text-white leading-tight">
                The <span className="text-orange-500">Authority Barrier</span>: Why Most Reddit Marketing Fails
              </h2>
              <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
                Reddit is a community-driven platform with a zero-tolerance policy for bots and obvious marketing. "Normal" people find it impossible to promote their products because they lack the reputation required to be heard.
              </p>
              <div className="space-y-4 md:space-y-6">
                {cards.map((card, i) => (
                  <div key={i} className="flex gap-3 md:gap-4 p-4 md:p-6 rounded-xl md:rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all relative">
                    <CornerAccent />
                    <div className="mt-1 shrink-0">{React.cloneElement(card.icon as React.ReactElement, { size: 18, className: "md:w-6 md:h-6" })}</div>
                    <div>
                      <h4 className="font-bold text-white mb-1 text-sm md:text-base">{card.title}</h4>
                      <p className="text-[11px] md:text-sm text-gray-400 leading-relaxed">{card.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          <div className="md:w-1/2 relative mt-8 md:mt-0">
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden glass-card p-6 sm:p-8 border-orange-500/20">
              <CornerAccent />
              <div className="absolute top-0 right-0 p-4">
                <ShieldCheck className="text-orange-500 w-10 h-10 md:w-12 md:h-12 opacity-20" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6">Account Trust Profile</h3>
              <div className="space-y-5 md:space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-gray-400">Account Age</span>
                    <span className="text-orange-400">Aged</span>
                  </div>
                  <div className="w-full h-1.5 md:h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 w-[90%]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-gray-400">Total Karma</span>
                    <span className="text-orange-400">High Karma</span>
                  </div>
                  <div className="w-full h-1.5 md:h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 w-[85%]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-gray-400">Community Trust Score</span>
                    <span className="text-green-400">98/100</span>
                  </div>
                  <div className="w-full h-1.5 md:h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[98%]" />
                  </div>
                </div>
              </div>
              <div className="mt-8 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <p className="text-[10px] md:text-xs text-orange-300 italic leading-relaxed">
                  "This account has been a member of r/technology, r/startups, and r/marketing for years with consistent high-value contributions."
                </p>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 md:w-32 md:h-32 bg-orange-500/20 blur-3xl rounded-full" />
            <div className="absolute -top-6 -left-6 w-24 h-24 md:w-32 md:h-32 bg-purple-500/20 blur-3xl rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

const RedditVsAds = () => {
  const comparisons = [
    {
      feature: "Trust Level",
      reddit: "Extremely High (Peer-to-Peer)",
      ads: "Low (Paid Placement)"
    },
    {
      feature: "Longevity",
      reddit: "Permanent (SEO Value)",
      ads: "Ephemeral (Stops when budget ends)"
    },
    {
      feature: "Engagement",
      reddit: "Deep Discussions",
      ads: "Passive Impressions"
    },
    {
      feature: "Cost Efficiency",
      reddit: "Strategic ROI",
      ads: "Expensive PPC"
    }
  ];

  return (
    <section id="comparison" className="py-16 md:py-32 bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel number="06" text="The Edge" />
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold mb-4 text-white p-2">Reddit vs. Traditional Ads</h2>
          <p className="text-gray-400">Why the world's smartest brands are shifting their budget to community authority.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {comparisons.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-3xl border-white/5 hover:border-orange-500/30 transition-all relative"
            >
              <CornerAccent />
              <h4 className="text-orange-400 font-bold mb-4 uppercase tracking-widest text-xs">{item.feature}</h4>
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase font-bold">ClearEcho Strategy</span>
                  <p className="text-white font-medium">{item.reddit}</p>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <span className="text-[10px] text-gray-500 uppercase font-bold">Traditional Ads</span>
                  <p className="text-gray-400 text-sm">{item.ads}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SuccessStats = () => {
  const stats = [
    { label: "User Trust", value: "85%", sub: "Prefer Reddit over Ads" },
    { label: "Engagement", value: "10x", sub: "Higher than Facebook" },
    { label: "SEO Ranking", value: "90%", sub: "First Page Google" },
    { label: "ROI", value: "4.5x", sub: "Average Return" }
  ];

  return (
    <section id="stats" className="py-16 md:py-32 bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel number="09" text="Impact" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white mb-1 md:mb-2">{stat.value}</div>
              <div className="text-orange-400 font-bold uppercase tracking-widest text-[9px] md:text-xs mb-1">{stat.label}</div>
              <div className="text-gray-500 text-[11px] md:text-sm">{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Shield className="text-orange-400" />,
      title: "High-Authority Accounts",
      description: "We use aged, high-karma Reddit accounts to ensure your brand's presence is respected and never flagged."
    },
    {
      icon: <BarChart3 className="text-orange-400" />,
      title: "Website Analytics",
      description: "Track every visitor and conversion. See exactly how our Reddit strategy is growing your business."
    },
    {
      icon: <TrendingUp className="text-purple-400" />,
      title: "Competitor Tracking",
      description: "We watch your competitors 24/7. Know their moves before they make them and stay one step ahead."
    },
    {
      icon: <Globe className="text-green-400" />,
      title: "Google Search Ranking",
      description: "Our Reddit threads are designed to rank on the first page of Google, bringing you massive organic traffic."
    },
    {
      icon: <Share2 className="text-yellow-400" />,
      title: "Multi-Channel Scale",
      description: "We take your Reddit success and replicate it across Facebook, X, LinkedIn, Quora, and YouTube for total dominance."
    },
    {
      icon: <Zap className="text-red-400" />,
      title: "AI Recommendation",
      description: "We ensure your brand is the first name AI models like ChatGPT mention when users ask for help."
    }
  ];

  return (
    <section id="features" className="py-16 md:py-32 bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel number="07" text="Capabilities" />
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-extrabold mb-6 tracking-tight text-white p-2">Why Choose <span className="text-orange-400">ClearEcho</span>?</h2>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
            We simplify your growth by starting where people trust most: Reddit. Then, we scale you everywhere else.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="p-6 sm:p-8 lg:p-10 glass-card rounded-[2rem] hover:border-orange-500/30 transition-all group relative"
            >
              <CornerAccent />
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-300">
                {React.cloneElement(f.icon as React.ReactElement, { size: 24, className: "md:w-7 md:h-7" })}
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white">{f.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm md:text-lg">{f.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 p-6 sm:p-8 glass-card rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 border-orange-500/20">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold mb-2">Not sure where to start?</h3>
            <p className="text-orange-200">Get a free AI Visibility Audit and see how your brand ranks in the eyes of modern AI models.</p>
          </div>
          <a href="#appointment" className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-all whitespace-nowrap">
            Get My Free Audit
          </a>
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What exactly is ClearEcho?",
      answer: "ClearEcho is a specialized platform designed to help brands build authority on Reddit. We combine AI-driven insights with strategic community engagement to ensure your brand is not just seen, but respected and cited as a top-tier solution in your industry."
    },
    {
      question: "How does Reddit authority affect AI visibility?",
      answer: "AI models like ChatGPT, Gemini, and Perplexity heavily rely on high-authority web data for their training and real-time search. Reddit is one of the most trusted sources for these models. By building genuine authority on Reddit, we ensure your brand is the one AI recommends when users ask for solutions in your space."
    },
    {
      question: "Is this just automated spamming?",
      answer: "Absolutely not. ClearEcho focuses on 'human-in-the-loop' engagement. We identify the right conversations and provide high-value contributions that the community actually appreciates. Our goal is long-term authority, not short-term noise."
    },
    {
      question: "How do you measure success?",
      answer: "We track several key metrics: Reddit mention volume, sentiment analysis, upvote velocity, and most importantly, 'AI Citation Rate'—how often your brand appears in AI-generated answers for relevant queries."
    },
    {
      question: "Can ClearEcho help with crisis management?",
      answer: "Yes. If your brand is facing negative sentiment on Reddit, we help pivot the conversation by building positive authority and addressing community concerns through transparent, value-driven engagement."
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-32 bg-[#050505] border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <SectionLabel number="08" text="FAQ" />
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold mb-8 md:mb-12 text-white text-center p-2">
          Common Questions
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl md:rounded-3xl overflow-hidden border-white/5"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 md:p-8 flex items-center justify-between text-left transition-colors hover:bg-white/5"
              >
                <span className="text-lg md:text-xl font-bold text-white pr-8">
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openIndex === i ? 'bg-orange-500 text-white rotate-180' : 'bg-white/5 text-gray-400'}`}>
                  <ChevronDown size={20} />
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8 text-gray-400 text-sm md:text-lg leading-relaxed border-t border-white/5 pt-6">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AppointmentSection = () => {
  const [formState, setFormState] = useState({ name: '', email: '', date: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${API_URL}/api/appointment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error('Failed to submit appointment request.');
      }

      setIsSubmitting(false);
      setSubmitted(true);
      toast.success("Appointment requested successfully!", {
        description: "We'll get back to you within 24 hours.",
      });
      
      // Reset form state
      setFormState({ name: '', email: '', date: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting appointment:', error);
      setIsSubmitting(false);
      toast.error("Failed to send request.", {
        description: "Please try again or contact us directly.",
      });
    }
  };

  return (
    <section id="appointment" className="py-16 md:py-32 bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel number="10" text="Growth" />
        <div className="glass-card rounded-[2rem] md:rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row border-white/5">
          <div className="md:w-1/2 p-6 sm:p-10 lg:p-20 text-white flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-extrabold mb-4 md:mb-6">Ready to scale your brand?</h2>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-6 md:mb-8">
              Book a 15-minute strategy session to learn how we can dominate Reddit and boost your AI visibility across the web.
            </p>
            <ul className="space-y-3 md:space-y-4">
              {['Reddit growth roadmap', 'AI visibility audit', 'Multi-channel content plan'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300 text-xs sm:text-sm md:text-base">
                  <CheckCircle2 size={16} className="text-orange-400 md:w-[20px] md:h-[20px]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="md:w-1/2 p-4 sm:p-8 lg:p-12 bg-white/5">
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
              {submitted ? (
                <div className="text-center py-8 md:py-12">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                    <CheckCircle2 size={24} className="md:w-[32px] md:h-[32px]" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-black">Appointment Requested!</h3>
                  <p className="text-sm md:text-base text-gray-600">We'll get back to you within 24 hours to confirm your slot.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                  <div>
                    <label className="block text-xs md:text-sm font-semibold mb-1.5 md:mb-2 text-black">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="John Doe"
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-black text-sm md:text-base"
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-semibold mb-1.5 md:mb-2 text-black">Work Email</label>
                    <input 
                      required
                      type="email" 
                      placeholder="john@company.com"
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-black text-sm md:text-base"
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-semibold mb-1.5 md:mb-2 text-black">Preferred Date</label>
                    <input 
                      required
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-black text-sm md:text-base"
                      value={formState.date}
                      onChange={(e) => setFormState({...formState, date: e.target.value})}
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-3.5 md:py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-sm md:text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin md:w-[18px] md:h-[18px]" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Calendar size={16} className="md:w-[18px] md:h-[18px]" />
                        Book My Slot
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [formState, setFormState] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error('Failed to send message.');
      }

      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ firstName: '', lastName: '', email: '', message: '' });
      
      toast.success("Message sent successfully!", {
        description: "We'll get back to you shortly.",
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsSubmitting(false);
      toast.error("Failed to send message.", {
        description: "Please try again later.",
      });
    }
  };

  return (
    <section id="contact" className="py-16 md:py-32 bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <SectionLabel number="11" text="Support" />
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold mb-4 md:mb-6 text-white leading-tight">Get in touch</h2>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-8 md:mb-10">
              Have questions about our platform or enterprise solutions? Our team is here to help.
            </p>
            
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center text-orange-400 shrink-0">
                  <Mail size={18} className="md:w-[24px] md:h-[24px]" />
                </div>
                <div>
                  <h4 className="font-bold mb-0.5 md:mb-1 text-white text-sm md:text-base">Email us</h4>
                  <p className="text-gray-400 text-xs md:text-base">contact@clearecho.in</p>
                </div>
              </div>

            </div>
          </div>
          
          <div className="glass-card p-6 md:p-8 rounded-2xl md:rounded-3xl relative">
            <CornerAccent />
            {submitted ? (
              <div className="text-center py-8 md:py-12">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <CheckCircle2 size={24} className="md:w-[32px] md:h-[32px]" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">Message Sent!</h3>
                <p className="text-sm md:text-base text-gray-400">Thank you for reaching out. We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-xs md:text-sm font-semibold mb-1.5 md:mb-2 text-white">First Name</label>
                    <input 
                      required
                      type="text" 
                      value={formState.firstName}
                      onChange={(e) => setFormState({...formState, firstName: e.target.value})}
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500 text-white text-sm md:text-base" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-semibold mb-1.5 md:mb-2 text-white">Last Name</label>
                    <input 
                      required
                      type="text" 
                      value={formState.lastName}
                      onChange={(e) => setFormState({...formState, lastName: e.target.value})}
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500 text-white text-sm md:text-base" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-semibold mb-1.5 md:mb-2 text-white">Email</label>
                  <input 
                    required
                    type="email" 
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    className="w-full px-4 py-2.5 md:py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500 text-white text-sm md:text-base" 
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-semibold mb-1.5 md:mb-2 text-white">Message</label>
                  <textarea 
                    required
                    rows={4} 
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    className="w-full px-4 py-2.5 md:py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500 text-white text-sm md:text-base"
                  ></textarea>
                </div>
                <button 
                  disabled={isSubmitting}
                  className="w-full py-3.5 md:py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-sm md:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin md:w-[18px] md:h-[18px]" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  return (
    <footer className="bg-[#050505] border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <ClearEchoLogo className="w-11 h-11" />
            <span className="text-xl font-display font-extrabold text-white tracking-tight">ClearEcho</span>
          </div>
          
          <div className="flex items-center gap-8 text-sm text-gray-500">
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <button 
              onClick={() => setShowPrivacy(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy
            </button>
            <button 
              onClick={() => setShowTerms(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms
            </button>
          </div>
          
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} ClearEcho.
          </p>
        </div>
      </div>

      <PrivacyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
      <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
    </footer>
  );
};

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl max-h-[90vh] md:max-h-[80vh] bg-[#0A0A0A] border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        >
          <div className="p-4 md:p-6 border-b border-white/5 flex items-center justify-between bg-[#0D0D0D]">
            <h3 className="text-lg md:text-xl font-bold text-white">{title}</h3>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-all"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-5 md:p-8 overflow-y-auto custom-scrollbar text-gray-400 leading-relaxed space-y-6 text-sm md:text-base">
            {children}
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const PrivacyModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Privacy Policy">
    <div className="space-y-6">
      <p>
        At ClearEcho, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our platform and services.
      </p>
      <p>
        By using ClearEcho, you agree to the practices outlined below.
      </p>

      <section>
        <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-sm">1. Information We Collect</h4>
        <p className="mb-4">We collect only the data necessary to provide and improve our services. This includes:</p>
        <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Account & Contact Information:</strong> Name, email address, and details provided during appointment bookings or audit requests.</li>
          <li><strong>Platform Usage:</strong> AI Visibility Audit history, Reddit authority tracking data, and interaction logs.</li>
          <li><strong>Payment Information:</strong> We do not store payment details. All transactions are securely processed via third-party providers (e.g., Stripe).</li>
          <li><strong>Technical Data:</strong> Browser type, device info, and IP address for security and platform optimization.</li>
        </ul>
      </section>

      <section>
        <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-sm">2. How We Use Your Information</h4>
        <p className="mb-4">We use your data to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Generate and deliver your <strong>AI Visibility Audits</strong>.</li>
          <li>Execute and monitor <strong>Reddit Authority Seeding</strong> campaigns.</li>
          <li>Provide real-time <strong>Competitor Tracking</strong> and sentiment analysis.</li>
          <li>Manage appointment schedules and provide customer support.</li>
          <li>Improve our AI Engine's accuracy and platform performance.</li>
        </ul>
        <p className="mt-4">We do not sell your personal information to third-party marketers.</p>
      </section>

      <section>
        <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-sm">3. Legal Basis for Processing (GDPR)</h4>
        <p>If you are located in the European Economic Area (EEA), our legal basis for processing your personal data includes your consent, the performance of a contract (providing ClearEcho services), and legitimate interests such as platform security.</p>
      </section>

      <section>
        <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-sm">4. Your Rights (GDPR)</h4>
        <p className="mb-4">If you are in the EEA, you have the right to access, correct, or delete your data. To exercise these rights, contact us at contact@clearecho.in.</p>
      </section>

      <section>
        <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-sm">5. Data Retention</h4>
        <p>We retain your information only as long as necessary to fulfill the purposes of providing our AI visibility and authority services, or as required by law.</p>
      </section>

      <section>
        <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-sm">6. Data Security</h4>
        <p>We implement industry-standard encryption and access controls to protect your brand's data. However, no system is 100% secure.</p>
      </section>

      <section>
        <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-sm">7. Third-Party Services</h4>
        <p>We use trusted third-party tools like Stripe (payments), Google Analytics (usage), and Calendly (scheduling). These services have their own privacy policies.</p>
      </section>

      <section>
        <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-sm">8. Cookies</h4>
        <p>We use cookies to remember your preferences and analyze platform traffic to improve our AI recommendations.</p>
      </section>

      <section>
        <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-sm">12. Contact Us</h4>
        <p>If you have any questions regarding your privacy, please contact: contact@clearecho.in</p>
      </section>
    </div>
  </Modal>
);

const TermsModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Terms of Service">
    <div className="space-y-6">
      <p>By accessing ClearEcho, you agree to the following terms. Please read them carefully.</p>
      
      <section>
        <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-sm">1. Service Description</h4>
        <p>ClearEcho provides AI visibility auditing, Reddit authority building, and competitor tracking services. We do not guarantee specific rankings but use industry-best practices to improve your brand's AI visibility.</p>
      </section>

      <section>
        <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-sm">2. User Conduct</h4>
        <p>You agree not to use our services for any illegal activities or to manipulate community platforms in violation of their respective terms of service (e.g., Reddit's Content Policy).</p>
      </section>

      <section>
        <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-sm">3. Intellectual Property</h4>
        <p>All content, AI models, and technology used on the ClearEcho platform are the property of ClearEcho or its licensors.</p>
      </section>

      <section>
        <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-sm">4. Limitation of Liability</h4>
        <p>ClearEcho is not liable for any indirect, incidental, or consequential damages arising from your use of the platform or changes in third-party platform algorithms.</p>
      </section>

      <section>
        <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-sm">5. Termination</h4>
        <p>We reserve the right to terminate or suspend access to our service immediately, without prior notice, for any reason whatsoever.</p>
      </section>

      <p className="text-sm italic pt-4 border-t border-white/5">For full legal inquiries, please contact contact@clearecho.in.</p>
    </div>
  </Modal>
);

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsVisible(latest > 300);
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50 p-3 md:p-4 rounded-full bg-orange-500 text-white shadow-[0_0_20px_rgba(255, 69, 0,0.5)] border border-orange-400/20 backdrop-blur-md transition-shadow hover:shadow-[0_0_30px_rgba(255, 69, 0,0.7)]"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-orange-500 origin-left z-[100]"
      style={{ scaleX }}
    />
  );
};

export default function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data fetching
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isInitialLoading) {
    return (
      <div className="fixed inset-0 bg-[#050505] flex flex-col items-center justify-center z-[100]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <ClearEchoLogo className="w-20 h-20 mb-8" />
          <div className="absolute inset-0 blur-2xl bg-orange-500/20 rounded-full animate-pulse" />
        </motion.div>
        <div className="flex flex-col items-center gap-4">
          <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-orange-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 animate-pulse">
            Initializing ClearEcho
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-orange-500/30 dot-grid overflow-x-hidden relative w-full">
      <ScrollProgress />
      <Navbar />
      <main className="relative">
        <Hero />
        <MentionsTicker />
        <WhyReddit />
        <RedditShowcase />
        <RedditThreadSimulation />
        <RedditAuthoritySection />
        <AIVisibility />
        <RedditVsAds />
        <Features />
        <FAQSection />
        <SuccessStats />
        <AppointmentSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
      <Toaster position="bottom-right" theme="dark" richColors />
    </div>
  );
}
