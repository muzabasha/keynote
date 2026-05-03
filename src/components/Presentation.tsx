"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, CheckCircle, Lightbulb, Activity, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import slidesData from '@/data/slides.json';
import { SlideData } from '@/types/slides';
import Superposition from './interactions/Superposition';
import Entanglement from './interactions/Entanglement';
import BlochSphere from './interactions/BlochSphere';
import BinaryShatter from './interactions/BinaryShatter';

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slides = slidesData as SlideData[];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const slide = slides[currentSlide];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <main className="presentation-container">
      {/* Conference Header */}
      <div className="absolute top-0 left-0 right-0 py-3 px-8 text-center border-b border-white/5 bg-black/40 backdrop-blur-md z-[101]">
        <div className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold mb-1">
          International Conference on Signal, Systems, and Computing for Next-Gen Automation (ICSSCNA - 2026)
        </div>
        <div className="text-[9px] text-gray-400 flex justify-center gap-6 font-mono">
          <span>📅 4-6 May 2026</span>
          <span>🏛️ Organized by: Ramachandra College of Engineering (RCE), Eluru Dt., A.P., India</span>
        </div>
      </div>

      <div className="progress-bar" style={{ width: `${((currentSlide + 1) / slides.length) * 100}%`, top: '56px' }} />
      
      <div className="absolute top-20 right-8 z-50 flex items-center gap-4">
        <a 
          href="https://scholar-sparkle-web.lovable.app/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm hover:bg-white/20 transition-all flex items-center gap-2 group"
          style={{ textDecoration: 'none' }}
        >
          <span className="opacity-70 group-hover:opacity-100 transition-opacity">Resource Person:</span>
          <span className="text-accent">Dr. Syed Muzamil Basha</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="slide-card"
        >
          <div className="slide-number">{String(currentSlide + 1).padStart(2, '0')}</div>
          <div className="slide-section">{slide.section}</div>
          <h1 className="slide-title">{slide.title}</h1>

          <div className="slide-content">
            <div className="left-pane">
              <ul className="bullets-list">
                {slide.bullets.map((bullet, i) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="bullet-item"
                  >
                    {bullet}
                  </motion.li>
                ))}
              </ul>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="story-box"
              >
                {slide.story}
              </motion.div>
            </div>

            <div className="right-pane">
              <div className="interactive-area">
                <InteractionRenderer type={slide.interactivity.type} data={slide.interactivity} />
              </div>
            </div>
          </div>

          <div className="footer-info">
            <div className="activity-box">
              <Activity className="inline-block mr-2" size={18} />
              TRY THIS: {slide.activity}
            </div>
            <div className="insight-box">
              <Lightbulb className="inline-block mr-2" size={18} />
              ENTERPRISE INSIGHT: {slide.enterpriseInsight}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="nav-controls">
        <button onClick={prevSlide} className="nav-btn" disabled={currentSlide === 0} style={{ opacity: currentSlide === 0 ? 0.3 : 1 }}>
          <ChevronLeft />
        </button>
        <button onClick={nextSlide} className="nav-btn" disabled={currentSlide === slides.length - 1} style={{ opacity: currentSlide === slides.length - 1 ? 0.3 : 1 }}>
          <ChevronRight />
        </button>
      </div>
    </main>
  );
}

function InteractionRenderer({ type, data }: { type: string, data: any }) {
  const [clicked, setClicked] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [pollSelected, setPollSelected] = useState<string | null>(null);

  const handleAction = () => {
    setClicked(true);
    if (type === 'pulse' || type === 'big_button') {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#a855f7', '#ffffff']
      });
    }
  };

  switch (type) {
    case 'pulse':
    case 'big_button':
      return (
        <button 
          onClick={handleAction}
          className={`px-8 py-4 rounded-full text-white font-bold text-xl transition-all hover:scale-110 active:scale-95 shadow-lg shadow-indigo-500/50 ${clicked ? 'bg-green-500' : 'bg-indigo-600'}`}
          style={{ background: clicked ? '#10b981' : '#6366f1', border: 'none', padding: '15px 30px', borderRadius: '30px', color: 'white', cursor: 'pointer' }}
        >
          {clicked ? <CheckCircle className="inline mr-2" /> : <Play className="inline mr-2" />}
          {clicked ? 'ACTION TRIGGERED' : (data.prompt || data.label || 'START INTERACTION')}
        </button>
      );
    
    case 'poll':
      return (
        <div className="flex flex-col gap-3 w-full">
          <p className="text-lg font-semibold mb-4 text-center">{data.question}</p>
          <div style={{ display: 'grid', gridTemplateColumns: data.options.length > 5 ? 'repeat(5, 1fr)' : `repeat(${data.options.length}, 1fr)`, gap: '10px' }}>
            {data.options.map((opt: string) => (
              <button
                key={opt}
                onClick={() => { setPollSelected(opt); confetti({ particleCount: 40, spread: 30, origin: { y: 0.8 } }); }}
                style={{ 
                  padding: '10px', 
                  borderRadius: '8px', 
                  border: '1px solid var(--glass-border)',
                  background: pollSelected === opt ? 'var(--accent)' : 'var(--glass)',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {opt}
              </button>
            ))}
          </div>
          {pollSelected && <p className="text-center mt-4 text-accent font-bold">You selected: {pollSelected}</p>}
        </div>
      );

    case 'input_feedback':
      return (
        <div className="w-full max-w-md">
          <p className="mb-4 text-center text-gray-400">{data.prompt}</p>
          <input 
            type="text" 
            placeholder="Type here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ width: '100%', padding: '15px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'white', marginBottom: '15px' }}
          />
          {inputValue && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-200 text-center">
              <CheckCircle className="inline-block mr-2 mb-1" />
              {data.feedback}
            </motion.div>
          )}
        </div>
      );

    case 'scenario':
      return (
        <div className="w-full">
          <p className="text-xl font-bold mb-6 text-center text-accent">{data.question}</p>
          <div className="flex flex-col gap-4">
            {data.options.map((opt: string) => (
              <button
                key={opt}
                onClick={() => { setPollSelected(opt); confetti(); }}
                className="p-4 rounded-xl border border-glass-border bg-glass hover:bg-accent/20 transition-all text-left flex items-center gap-4"
                style={{ background: pollSelected === opt ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255,255,255,0.05)', color: 'white', cursor: 'pointer', border: '1px solid var(--glass-border)', padding: '15px', width: '100%' }}
              >
                <div className={`w-6 h-6 rounded-full border-2 border-accent flex-shrink-0 ${pollSelected === opt ? 'bg-accent' : ''}`} />
                {opt}
              </button>
            ))}
          </div>
        </div>
      );

    case 'text_toggle':
      return (
        <div className="text-center">
          <div className="mb-8 text-2xl font-mono tracking-widest text-gray-400">
            {clicked ? data.after : data.before}
          </div>
          <button 
            onClick={() => setClicked(!clicked)}
            className="px-6 py-3 rounded-lg border border-accent text-accent font-bold hover:bg-accent hover:text-white transition-all"
            style={{ background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)', padding: '10px 20px', cursor: 'pointer' }}
          >
            {clicked ? 'REVEAL PLAIN TEXT' : 'ENCRYPT DATA'}
          </button>
        </div>
      );

    case 'step_thru':
      return (
        <div className="flex items-center gap-4 flex-wrap justify-center">
          {data.steps.map((step: string, i: number) => (
            <React.Fragment key={step}>
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center font-bold shadow-lg shadow-accent/20">
                  {i + 1}
                </div>
                <span className="text-[10px] uppercase tracking-tighter opacity-70 text-center max-w-[60px]">{step}</span>
              </motion.div>
              {i < data.steps.length - 1 && (
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 20 }}
                  transition={{ delay: i * 0.2 + 0.1 }}
                  className="h-[2px] bg-glass-border"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      );

    case 'timeline_thaw':
      return (
        <div className="w-full max-w-md flex flex-col items-center gap-6">
          <div className="relative w-full h-24 bg-blue-900/20 border border-blue-500/30 rounded-xl overflow-hidden flex items-center justify-center">
            <motion.div 
              style={{ opacity: (inputValue ? parseInt(inputValue) - data.range[0] : 0) / (data.range[1] - data.range[0]) }}
              className="absolute inset-0 bg-red-500/10 flex items-center justify-center font-mono text-red-400 text-sm p-4 text-center"
            >
              [DATA_DECRYPTED]: TOP_SECRET_PROTOCOL_EXPOSED
            </motion.div>
            {!inputValue || parseInt(inputValue) < data.range[1] - 2 ? (
              <div className="text-blue-300/50 font-mono italic">DATA_FROZEN_IN_ENCRYPTION</div>
            ) : null}
          </div>
          <input 
            type="range" 
            min={data.range[0]} 
            max={data.range[1]} 
            defaultValue={data.range[0]}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full accent-blue-500"
          />
          <p className="text-2xl font-black text-blue-400">{inputValue || data.range[0]}</p>
        </div>
      );

    case 'comparison_slider':
      return (
        <div className="w-full flex flex-col gap-4">
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
            <span>{data.left}</span>
            <span>{data.right}</span>
          </div>
          <div className="relative h-32 bg-glass border border-glass-border rounded-xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-3xl font-black opacity-10">RSA-2048</div>
            <motion.div 
              className="absolute inset-0 bg-accent/20 backdrop-blur-md border-r-2 border-accent"
              style={{ width: `${(inputValue ? parseInt(inputValue) : 50)}%` }}
            >
              <div className="h-full flex items-center justify-center text-3xl font-black text-accent overflow-hidden whitespace-nowrap px-4">
                QUANTUM_POWER
              </div>
            </motion.div>
          </div>
          <input 
            type="range" min="0" max="100" defaultValue="50"
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full accent-accent"
          />
        </div>
      );

    case 'vault_reveal':
      return (
        <div className="flex flex-col items-center gap-6">
          <motion.div 
            animate={clicked ? { rotateY: 110 } : { rotateY: 0 }}
            className="w-40 h-40 bg-gray-800 border-4 border-gray-700 rounded-xl relative flex items-center justify-center shadow-2xl"
            style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
          >
            <div className="w-24 h-24 border-8 border-gray-600 rounded-full flex items-center justify-center">
               <div className="w-4 h-4 bg-gray-500 rounded-full" />
            </div>
            {clicked && (
              <div className="absolute inset-0 bg-yellow-500/20 flex items-center justify-center font-black text-yellow-500" style={{ transform: 'translateZ(-10px) rotateY(-110deg)' }}>
                SECRET_KEY
              </div>
            )}
          </motion.div>
          <button 
            onClick={() => { setClicked(!clicked); confetti(); }}
            style={{ background: 'white', color: 'black', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {clicked ? 'CLOSE VAULT' : data.label}
          </button>
        </div>
      );

    case 'counter':
      return (
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">{data.label}</p>
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-6xl font-black text-accent tabular-nums"
          >
            {clicked ? '1,000,000' : '433'}
          </motion.div>
          <button 
            onClick={() => setClicked(true)}
            className="mt-6 text-xs text-accent hover:underline"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Simulate 5 Year Growth
          </button>
        </div>
      );

    case 'superposition':
      return <Superposition />;
    
    case 'entanglement':
      return <Entanglement />;
    
    case 'bloch_sphere':
      return <BlochSphere />;
    
    case 'binary_shatter':
      return <BinaryShatter />;

    case 'wave_interference':
    case 'jump_animation':
    case 'bubble_pop':
    case 'lattice_grid':
      return (
        <div className="relative w-48 h-48 flex items-center justify-center">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 180, 270, 360],
              borderRadius: ["20%", "50%", "20%"]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full bg-gradient-to-tr from-accent to-accent-secondary opacity-40 blur-xl"
          />
          <button 
            onClick={() => { setClicked(!clicked); confetti(); }}
            className="absolute z-10 p-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold hover:scale-110 transition-transform"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '20px', borderRadius: '50%', color: 'white', cursor: 'pointer' }}
          >
            {clicked ? <CheckCircle size={32} /> : <Play size={32} />}
          </button>
          <p className="absolute -bottom-12 text-xs uppercase tracking-widest text-accent font-bold">
            {clicked ? 'INTERACTION_ACTIVE' : 'START_SIMULATION'}
          </p>
        </div>
      );

    case 'photo_gallery':
    case 'logo_scroll':
    case 'image_fade':
      return (
        <div className="grid grid-cols-2 gap-4 w-full">
          {(data.images || data.items || ['Quantum-1', 'Quantum-2', 'Quantum-3', 'Quantum-4']).slice(0, 4).map((item: string, i: number) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.05 }}
              className="aspect-video bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-[10px] font-mono text-gray-500 text-center p-2"
            >
              {item.replace(/_/g, ' ')}
            </motion.div>
          ))}
        </div>
      );

    case 'drag_drop_sort':
    case 'drag_drop_engine':
    case 'roadmap_builder':
    case 'domino_sim':
      return (
        <div className="flex flex-col gap-4 w-full">
          {(data.items || data.steps || ['Step 1', 'Step 2', 'Step 3']).map((item: string, i: number) => (
            <motion.div 
              key={i}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              className="p-3 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between cursor-grab active:cursor-grabbing"
            >
              <span className="text-sm font-medium">{item}</span>
              <div className="w-2 h-2 bg-accent rounded-full" />
            </motion.div>
          ))}
          <p className="text-[10px] text-center text-gray-500 uppercase tracking-widest mt-2 italic">Drag to reorder or interact</p>
        </div>
      );

    case 'cheat_code_reveal':
    case 'vault_reveal':
    case 'check_signer':
    case 'mask_overlay':
    case 'burn_key':
    case 'hack_sim':
      return (
        <div className="flex flex-col items-center gap-6">
          <motion.div 
            animate={clicked ? { scale: 1.1, filter: 'brightness(1.5)' } : { scale: 1 }}
            className={`w-32 h-32 rounded-3xl flex items-center justify-center border-4 border-accent shadow-[0_0_30px_rgba(99,102,241,0.3)] ${clicked ? 'bg-accent/20' : 'bg-black'}`}
          >
            {clicked ? <CheckCircle size={48} className="text-accent" /> : <div className="text-4xl font-bold opacity-30 text-accent">?</div>}
          </motion.div>
          <button 
            onClick={() => { setClicked(true); confetti(); }}
            className="px-8 py-3 rounded-xl bg-accent text-white font-bold hover:scale-105 transition-transform"
            style={{ background: 'var(--accent)', border: 'none', padding: '12px 24px', borderRadius: '12px', color: 'white', cursor: 'pointer' }}
          >
            {clicked ? 'ACCESS_GRANTED' : (data.label || 'AUTHORIZE')}
          </button>
        </div>
      );

    case 'cloud_selector':
    case 'car_dashboard':
    case 'gear_spinner':
    case 'roi_calculator':
      return (
        <div className="w-full flex flex-col gap-6">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              animate={{ width: `${(inputValue ? parseInt(inputValue) : 50)}%` }}
              className="h-full bg-accent"
            />
          </div>
          <input 
            type="range" min="0" max="100" defaultValue="50"
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full accent-accent"
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
              <div className="text-2xl font-bold text-accent">{inputValue || 50}%</div>
              <div className="text-[10px] uppercase text-gray-500">Efficiency</div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-center">
              <div className="text-2xl font-bold text-accent-secondary">{100 - (inputValue ? parseInt(inputValue) : 50)}%</div>
              <div className="text-[10px] uppercase text-gray-500">Risk</div>
            </div>
          </div>
        </div>
      );

    case 'audio_clip':
    case 'flight_sim':
      return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <div className="flex gap-1 h-12 items-center">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div 
                key={i}
                animate={clicked ? { height: [10, 40, 10] } : { height: 10 }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                className="w-1 bg-accent rounded-full"
              />
            ))}
          </div>
          <button 
            onClick={() => setClicked(!clicked)}
            style={{ background: 'white', color: 'black', padding: '10px 20px', borderRadius: '30px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {clicked ? 'STOP_SIGNAL' : 'PLAY_SIGNAL'}
          </button>
        </div>
      );

    case 'checklist':
    case 'email_template':
      return (
        <div className="flex flex-col gap-2 w-full">
          {(data.items || ['Security Audit', 'Key Inventory', 'Vendor Policy', 'PQC Pilot']).map((item: string, i: number) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="w-4 h-4 rounded border border-accent flex items-center justify-center text-[10px]">
                {i < 2 ? '✓' : ''}
              </div>
              <span className="text-sm opacity-80">{item}</span>
            </div>
          ))}
          <p className="text-center text-[10px] text-accent mt-2 font-mono tracking-tighter cursor-pointer underline">Download Template.pdf</p>
        </div>
      );

    case 'multi_quiz':
    case 'branching_story':
    case 'credits_roll':
    case 'tool_evolution':
      return (
        <div className="w-full p-6 bg-accent/5 border border-accent/20 rounded-2xl flex flex-col items-center gap-6">
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
             <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 10, repeat: Infinity }} className="h-full bg-accent" />
          </div>
          <div className="text-center">
            <h4 className="text-lg font-bold mb-2">Simulation Engine 2.0</h4>
            <p className="text-xs text-gray-500 italic">Processing real-time enterprise data...</p>
          </div>
          <button 
            onClick={() => confetti()}
            style={{ background: 'var(--accent)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}
          >
            INTERACT
          </button>
        </div>
      );

    default:
      return (
        <div className="text-center text-gray-400">
          <div className="mb-4 opacity-50"><ArrowRight size={48} className="mx-auto" /></div>
          <p>{data.label || 'Interactive Simulation Active'}</p>
          <div className="mt-4 px-4 py-2 bg-white/5 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold text-accent border border-accent/20">
             {type.replace(/_/g, ' ')}
          </div>
        </div>
      );
  }
}
