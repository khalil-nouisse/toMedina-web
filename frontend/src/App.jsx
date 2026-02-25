import React, { useRef, useState, useEffect } from 'react';
import { Map, MessageCircle, Sliders, Play, Navigation, ChevronRight, Quote } from 'lucide-react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';

// Import Assets
import LogoPng from './assets/LOGO-toMedina.png';
import LogoBgJpeg from './assets/toMedinaLogo.jpg';
import RiadImg from './assets/Riad.jpg';
import AppScreenshotImg from './assets/app-screenshot.jpeg';

function App() {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Track scroll progress strictly for the central timeline axis
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    // Phase 1: Hold solid background state for 1.2 seconds before morphing
    const timer = setTimeout(() => {
      setIsLoaded(true);
      document.body.style.overflow = 'auto';
    }, 1200);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen font-sans overflow-x-hidden selection:bg-medina-green/20 selection:text-medina-green relative text-slate-800">

      {/* 0. CINEMATIC LOADER & FLOATING NAVBAR (Phase 2 & 3) */}
      {!isLoaded ? (
        <motion.div
          layoutId="navbar-container"
          className="fixed inset-0 z-50 bg-[#F5F2EB] flex flex-col items-center justify-center rounded-none"
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div layoutId="logo-group" className="flex items-center justify-center">
            <motion.img layoutId="logo-img" src={LogoPng} alt="toMedina Logo" className="h-40 md:h-56 w-auto object-contain drop-shadow-2xl" />
            {/* toMedina text is explicitly hidden in this state */}
          </motion.div>
        </motion.div>
      ) : (
        <motion.nav
          layoutId="navbar-container"
          className="fixed top-6 left-0 right-0 mx-auto z-50 w-[95%] max-w-5xl bg-white/70 backdrop-blur-xl border border-white/40 rounded-full shadow-lg px-6 md:px-8 py-3 flex items-center justify-between"
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div layoutId="logo-group" className="flex items-center gap-3">
            <motion.img layoutId="logo-img" src={LogoPng} alt="toMedina Logo" className="h-7 md:h-9 w-auto object-contain drop-shadow-sm" />

            {/* Text appears dynamically after navbar forms */}
            <motion.span
              initial={{ opacity: 0, width: 0, x: -10 }}
              animate={{ opacity: 1, width: "auto", x: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="font-bold text-xl text-medina-green tracking-tighter"
            >
              toMedina
            </motion.span>
          </motion.div>

          {/* Center Links (Fade-in after nav morph) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500 uppercase tracking-widest"
          >
            <a href="#journey" className="hover:text-medina-green transition-colors">The Journey</a>
            <a href="#impact" className="hover:text-medina-green transition-colors">Impact</a>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-medina-green text-medina-cream px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#093524] transition-all hover:scale-105 shadow-md shadow-medina-green/30 flex items-center gap-2"
          >
            <span>Get App</span>
          </motion.button>
        </motion.nav>
      )}

      {/* DELAYED PAGE CONTENT WRAPPER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
      >

        {/* 1. SECURE BASE64 SAND & MUTED DESERT BACKGROUND */}
        <div className="fixed inset-0 z-0 pointer-events-none bg-[#F5F2EB] overflow-hidden">
          {/* Muted Glowing Orbs for the Desert Gradient */}
          <div className="absolute top-[-15%] left-[-10%] w-[60vw] h-[60vw] bg-[#E2C792]/30 rounded-full mix-blend-multiply blur-[160px]"></div>
          <div className="absolute top-[40%] right-[-10%] w-[50vw] h-[50vw] bg-[#D2A78D]/20 rounded-full mix-blend-multiply blur-[160px]"></div>
          <div className="absolute bottom-[-10%] left-[30%] w-[50vw] h-[50vw] bg-[#DAB692]/20 rounded-full mix-blend-multiply blur-[160px]"></div>

          {/* Base64 Data-URI Sand/Grain Overlay */}
          <div className="pointer-events-none fixed inset-0 z-40 h-full w-full opacity-[0.25] mix-blend-color-burn" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        </div>

        {/* 3. HERO SECTION */}
        <section className="relative min-h-[90vh] flex flex-col justify-center items-center pt-32 px-6 z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 1, delay: 1 }}
              className="relative w-16 h-16 mx-auto bg-gradient-to-tr from-[#D4AF37]/20 to-[#D4AF37]/5 backdrop-blur-md rounded-full flex items-center justify-center border border-[#D4AF37]/40 mb-10 shadow-[0_8px_32px_rgba(212,175,55,0.25)] group cursor-pointer"
            >
              <div className="absolute inset-0 rounded-full border border-[#D4AF37]/40 animate-ping opacity-20 group-hover:opacity-0 transition-opacity duration-500"></div>
              <Navigation className="w-6 h-6 text-[#D4AF37] -mr-0.5 mt-0.5 drop-shadow-sm transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" style={{ strokeWidth: 2.5 }} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
              className="text-6xl md:text-7xl lg:text-8xl font-serif text-medina-green leading-[1.05] tracking-tight drop-shadow-sm"
            >
              Explore Not as a Tourist, <br /><span className="italic text-[#D4AF37] font-light">But as a Local.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="text-xl md:text-2xl text-slate-700 max-w-2xl mx-auto font-light leading-relaxed mix-blend-multiply"
            >
              The medina is a living story. Download the toMedina app to turn an overwhelming maze into a personalized, deeply engaging journey.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1, delay: 1.6 }}
              className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-10"
            >
              {/* Pro App Store Button */}
              <button className="relative flex items-center justify-center gap-4 bg-[#111111] text-white px-8 py-3.5 rounded-[1.25rem] hover:bg-black hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300 border border-white/10 w-full sm:w-auto group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg viewBox="0 0 384 512" className="w-[26px] h-[26px] fill-current text-white"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" /></svg>
                <div className="text-left relative z-10 hidden sm:block">
                  <div className="text-[10px] uppercase tracking-widest text-white/60 font-medium mb-[-2px]">Download on the</div>
                  <div className="text-[20px] font-medium tracking-tight mt-0.5">App Store</div>
                </div>
                <div className="text-left relative z-10 sm:hidden">
                  <div className="text-[18px] font-medium tracking-tight">App Store</div>
                </div>
              </button>

              {/* Pro Google Play Button */}
              <button className="relative flex items-center justify-center gap-4 bg-white/95 backdrop-blur-xl text-slate-900 px-8 py-3.5 rounded-[1.25rem] hover:bg-white hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 border border-black/5 w-full sm:w-auto group overflow-hidden ring-1 ring-slate-900/5">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg viewBox="0 0 512 512" className="w-[26px] h-[26px] fill-current text-slate-900"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" /></svg>
                <div className="text-left relative z-10 hidden sm:block">
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-[-2px]">GET IT ON</div>
                  <div className="text-[20px] font-medium tracking-tight mt-0.5">Google Play</div>
                </div>
                <div className="text-left relative z-10 sm:hidden">
                  <div className="text-[18px] font-medium tracking-tight">Google Play</div>
                </div>
              </button>
            </motion.div>
          </div>
        </section>

        {/* 4. PERFECTLY ALIGNED TIMELINE JOURNEY */}
        <section id="journey" className="relative w-full max-w-7xl mx-auto px-4 md:px-0 py-24 mb-12 z-10">

          {/* Timeline Origin Anchor (The Source) */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.8, delay: 2.0, type: "spring" }}
            className="absolute left-[13.5px] md:left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-4 h-4"
          >
            <div className="absolute inset-[-4px] rounded-full border border-[#D4AF37] animate-ping opacity-75"></div>
            <div className="w-3 h-3 bg-[#D4AF37] rounded-full shadow-[0_0_15px_rgba(212,175,55,0.8)] relative z-10"></div>
          </motion.div> */}

          {/* Timeline Lines Container with Top-Fade Mask */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.5, delay: 2.2 }}
            className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%)] md:[mask-image:linear-gradient(to_bottom,transparent_0%,black_8%)]"
          >
            {/* The Central Vertical Axis (Background Dashed Line) */}
            <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px border-l-[3px] border-dashed border-[#D4AF37]/30 md:-translate-x-1/2 -z-10"></div>

            {/* The Central Vertical Axis (Animated Solid Line) */}
            <motion.div
              className="absolute left-[15px] md:left-1/2 top-0 w-[4px] bg-gradient-to-b from-[#D4AF37] to-[#e6b981] md:-translate-x-1/2 origin-top rounded-full -z-10 shadow-[0_0_15px_rgba(212,175,55,0.6)]"
              style={{ scaleY: smoothProgress, height: '100%' }}
            />
          </motion.div>

          {/* STOP 01: Beyond the Maze (Left side) */}
          <div className="relative flex flex-col md:flex-row w-full mb-32 md:mb-48 group">
            {/* Node with Pulsing Animation */}
            <div className="absolute left-4 md:left-1/2 top-12 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-8 h-8 rounded-full bg-white border-[3px] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.5)] z-20 flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
              <div className="absolute inset-0 rounded-full border border-[#D4AF37] animate-ping opacity-75"></div>
              <div className="w-2.5 h-2.5 bg-medina-green rounded-full"></div>
            </div>

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2 pl-16 md:pl-0 md:pr-20 lg:pr-32 flex flex-col justify-center text-left md:text-right pt-8 md:pt-0"
            >
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 backdrop-blur-sm border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-widest shadow-sm mb-6">Stop 01</span>
                <h2 className="text-4xl md:text-5xl font-serif text-medina-green mb-6 leading-tight drop-shadow-sm">Beyond the Maze.</h2>
                <p className="text-xl md:text-2xl text-slate-700 font-light leading-relaxed mix-blend-multiply">
                  Navigation is generally overwhelming. We turn the stressful labyrinth and superficial checklists into the gateway to authenticity.
                </p>
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full md:w-1/2 pl-16 md:pl-20 mt-12 md:mt-0"
            >
              <div className="relative w-full aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/40 bg-white/50 backdrop-blur-[2px] p-2 hover:-translate-y-2 transition-transform duration-500">
                <img src={RiadImg} alt="Moroccan Medina Alleyway" className="w-full h-full object-cover rounded-[2rem]" />
              </div>
            </motion.div>
          </div>

          {/* STOP 02: Curated Roadmaps (Right side) */}
          <div className="relative flex flex-col md:flex-row-reverse w-full mb-32 md:mb-48 group">
            {/* Node with Pulsing Animation */}
            <div className="absolute left-4 md:left-1/2 top-12 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-8 h-8 rounded-full bg-medina-green border-[3px] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.5)] z-20 flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
              <div className="absolute inset-0 rounded-full border border-medina-green animate-ping opacity-75"></div>
              <Map className="w-3.5 h-3.5 text-white" />
            </div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2 pl-16 md:pr-0 md:pl-20 lg:pl-32 flex flex-col justify-center text-left pt-8 md:pt-0"
            >
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 backdrop-blur-sm border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-widest shadow-sm mb-6">Stop 02</span>
                <h2 className="text-4xl md:text-5xl font-serif text-medina-green mb-6 leading-tight drop-shadow-sm">Curated Roadmaps.</h2>
                <p className="text-xl md:text-2xl text-slate-700 font-light leading-relaxed mix-blend-multiply">
                  Emphasize routes based on budget, time, and themes. We craft paths that align with what you want to experience, so you never feel lost unless you choose to be.
                </p>
              </div>
            </motion.div>

            {/* Left Visual */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full md:w-1/2 pl-16 md:pl-0 md:pr-20 mt-12 md:mt-0"
            >
              <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/40 bg-white/50 backdrop-blur-[2px] p-2 hover:-translate-y-2 transition-transform duration-500">
                <img src="https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=1000&auto=format&fit=crop" alt="Moroccan Craftsmanship" className="w-full h-full object-cover rounded-[2rem]" />

                {/* Embedded Glassmorphic UI */}
                <div className="absolute bottom-6 left-6 right-6 backdrop-blur-2xl bg-white/80 p-5 rounded-[1.5rem] border border-white/60 shadow-xl">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-medina-green text-[10px] font-black uppercase tracking-widest mb-1 block">Live Navigation</span>
                      <h4 className="font-serif text-xl border-b border-medina-green/20 pb-1">Artisan Trail</h4>
                    </div>
                    <div className="w-10 h-10 bg-[#D4AF37] text-white rounded-full flex items-center justify-center shadow-lg">
                      <Play className="w-4 h-4 translate-x-0.5" />
                    </div>
                  </div>
                  <p className="text-xs font-bold text-slate-500 tracking-wide">2.4 km • ~3 hours</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* STOP 03: AI Local Friend (Left side) */}
          <div className="relative flex flex-col md:flex-row w-full mb-32 group">
            {/* Node with Pulsing Animation */}
            <div className="absolute left-4 md:left-1/2 top-12 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-8 h-8 rounded-full bg-white border-[3px] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.5)] z-20 flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
              <div className="absolute inset-0 rounded-full border border-[#D4AF37] animate-ping opacity-75"></div>
              <MessageCircle className="w-3.5 h-3.5 text-medina-green" />
            </div>

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2 pl-16 md:pl-0 md:pr-20 lg:pr-32 flex flex-col justify-center text-left md:text-right pt-8 md:pt-0"
            >
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 backdrop-blur-sm border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-widest shadow-sm mb-6">Stop 03</span>
                <h2 className="text-4xl md:text-5xl font-serif text-medina-green mb-6 leading-tight drop-shadow-sm">The AI-Powered Friend.</h2>
                <p className="text-xl md:text-2xl text-slate-700 font-light leading-relaxed mix-blend-multiply">
                  It walks by your side, tells stories, and adapts in real-time. Simply ask questions about the architecture or history, and get deep, culturally accurate insights.
                </p>
              </div>
            </motion.div>

            {/* Right Visual (Elevated High-End Phone Mockup) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full md:w-1/2 pl-16 md:pl-20 mt-12 md:mt-0 flex md:justify-start"
            >
              {/* Device Framing */}
              <div className="relative w-full max-w-[320px] aspect-[9/19] rounded-[3rem] shadow-2xl border-[6px] border-[#1a1a1a] bg-black ring-1 ring-slate-800 p-2 flex justify-center hover:-translate-y-2 transition-transform duration-500">

                {/* Inner Screen Area */}
                <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-white/90 backdrop-blur-md">

                  {/* Dynamic Island */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[35%] h-[28px] bg-black rounded-full z-30 flex items-center justify-end px-2">
                    <div className="w-2 h-2 rounded-full bg-[#222]"></div>
                  </div>

                  {/* Subtly angled glare effect over screen */}
                  <div className="absolute top-0 right-0 w-[150%] h-[150%] bg-gradient-to-tr from-transparent via-transparent to-white/10 origin-top-right -rotate-12 pointer-events-none z-40"></div>

                  {/* App Content */}
                  <img src={AppScreenshotImg} alt="toMedina App Screenshot" className="absolute inset-0 w-full h-full object-cover" />

                </div>
              </div>
            </motion.div>
          </div>

        </section>

        {/* 5. SMOOTH TRANSITION & IMPACT AREA */}
        <section id="impact" className="relative z-20 w-full">

          {/* Geometric Bridge Card (Replaces the muddy gradient) */}
          <div className="relative -mb-28 max-w-2xl mx-auto px-6 z-30">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 flex flex-col items-center text-center mx-auto"
            >
              <Quote className="w-10 h-10 text-[#D4AF37] mb-6 opacity-40 fill-current" />
              <h3 className="font-serif text-3xl md:text-4xl text-medina-green leading-tight mb-4">
                "The true beauty of the medina is found when you stop following the crowd."
              </h3>
              <div className="w-12 h-1 bg-[#D4AF37] rounded-full mt-4"></div>
            </motion.div>
          </div>

          <div className="relative pt-48 pb-32 bg-medina-green overflow-hidden">
            {/* Background Overlay */}
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1596728020475-68045610ec8c?q=80&w=1200&auto=format&fit=crop"
                alt="Artisan Background"
                className="w-full h-full object-cover opacity-20 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-medina-green/95"></div>
              <div className="absolute inset-0 pattern-zellige opacity-5"></div>
            </div>

            <div className="relative max-w-4xl mx-auto px-6 text-center text-white space-y-12 z-10">
              <h2 className="text-5xl md:text-7xl font-serif text-medina-cream tracking-tight drop-shadow-md">The Journey Ends at the Source.</h2>
              <p className="text-xl md:text-2xl text-medina-cream/80 leading-relaxed font-light max-w-3xl mx-auto">
                Sustainable economics shouldn't be an afterthought. We unlock heritage while ensuring tourism dollars directly benefit the host communities, preserving the soul of the medina.
              </p>

              <div className="bg-white/10 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/20 mt-16 shadow-2xl mx-auto max-w-xl">
                <h3 className="text-3xl font-serif mb-6 text-white drop-shadow-sm">Belong to the Story</h3>
                <button className="w-full bg-medina-cream text-medina-green font-bold text-lg py-5 rounded-2xl hover:bg-white transition-all hover:scale-[1.02] shadow-[0_0_30px_rgba(245,242,235,0.4)]">
                  Download toMedina Today
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 6. CLEAN FOOTER */}
        <footer className="bg-[#111111] py-16 px-6 md:px-12 relative z-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/10 pt-10">
            <div className="flex items-center gap-3">
              <img src={LogoPng} alt="toMedina Logo" className="h-8 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
              <span className="font-bold text-xl text-white/80">toMedina</span>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-slate-500 uppercase tracking-widest">
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Home</a>
              <a href="#journey" className="hover:text-[#D4AF37] transition-colors">The Journey</a>
              <a href="#impact" className="hover:text-[#D4AF37] transition-colors">Impact</a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Contact</a>
            </div>

            <div className="text-sm text-slate-600 font-medium">
              &copy; {new Date().getFullYear()} toMedina. All rights reserved.
            </div>
          </div>
        </footer>

      </motion.div>
    </div>
  );
}

export default App;
