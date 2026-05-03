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
      <div className="progress-bar" style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }} />
      
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
        <button onClick={prevSlide} className="nav-btn" disabled={currentSlide === 0}>
          <ChevronLeft />
        </button>
        <button onClick={nextSlide} className="nav-btn" disabled={currentSlide === slides.length - 1}>
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
        <div className="flex items-center gap-4">
          {data.steps.map((step: string, i: number) => (
            <React.Fragment key={step}>
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <span className="text-xs uppercase tracking-tighter opacity-70">{step}</span>
              </motion.div>
              {i < data.steps.length - 1 && (
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 40 }}
                  transition={{ delay: i * 0.2 + 0.1 }}
                  className="h-1 bg-glass-border"
                />
              )}
            </React.Fragment>
          ))}
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

    default:
      return (
        <div className="text-center text-gray-400">
          <div className="mb-4 opacity-50"><ArrowRight size={48} className="mx-auto" /></div>
          <p>{data.label || 'Interactive Component Pending...'}</p>
          <p className="text-xs mt-2 uppercase tracking-widest">{type.replace(/_/g, ' ')}</p>
        </div>
      );
  }
}
