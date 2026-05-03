"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, CheckCircle, Lightbulb, Activity, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import slidesData from '@/data/slides.json';
import { SlideData } from '@/types/slides';

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
          className={`px-8 py-4 rounded-full bg-indigo-600 text-white font-bold text-xl transition-all hover:scale-110 active:scale-95 shadow-lg shadow-indigo-500/50 ${clicked ? 'bg-green-500' : ''}`}
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
            {data.options.map((opt: string) => (
              <button
                key={opt}
                onClick={() => setPollSelected(opt)}
                style={{ 
                  padding: '10px', 
                  borderRadius: '8px', 
                  border: '1px solid var(--glass-border)',
                  background: pollSelected === opt ? 'var(--accent)' : 'var(--glass)',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      );

    case 'input_feedback':
      return (
        <div className="w-full max-w-md">
          <input 
            type="text" 
            placeholder={data.prompt}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ width: '100%', padding: '15px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'white', marginBottom: '15px' }}
          />
          {inputValue && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-200">
              {data.feedback}
            </motion.div>
          )}
        </div>
      );

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
