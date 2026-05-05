"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { InlineMath, BlockMath } from 'react-katex';

interface Term {
  symbol: string;
  name: string;
  interpretation: string;
}

interface MathFocusProps {
  topic: string;
  equations: { latex: string; label: string }[];
  terms: Term[];
  concept: string;
}

export default function MathFocus({ topic, equations, terms, concept }: MathFocusProps) {
  const [scrollProgress, setScrollProgress] = React.useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const progress = (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;
    setScrollProgress(progress);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-black/80 border-l border-accent/30 h-full w-full flex flex-col relative"
    >
      {/* Scroll Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 z-20">
        <motion.div 
          className="h-full bg-accent shadow-[0_0_10px_#6366f1]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div 
        onScroll={handleScroll}
        id="math-scroll-container"
        className="flex-grow overflow-y-auto p-8 custom-scrollbar space-y-8 scroll-smooth"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/20 rounded-lg">
              <span className="text-xl">📐</span>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-widest text-accent font-black">Math Deep Dive</h4>
              <h3 className="text-xl font-bold text-white">{topic}</h3>
            </div>
          </div>
          
          <div className="flex gap-2">
            {['Concept', 'Equations', 'Terms'].map((section) => (
              <button 
                key={section}
                onClick={() => document.getElementById(`math-${section.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' })}
                className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-[8px] uppercase tracking-tighter text-gray-400 font-bold border border-white/5"
              >
                {section}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-12 pb-20">
          {/* Concept */}
          <div id="math-concept">
            <p className="text-sm text-gray-400 leading-relaxed italic border-l-2 border-accent/30 pl-4 py-2 bg-accent/5 rounded-r-xl">
              "{concept}"
            </p>
          </div>

          {/* Equations */}
          <div id="math-equations" className="space-y-4">
            <div className="text-[10px] uppercase text-gray-500 font-bold tracking-widest mb-2 flex items-center gap-2">
              <div className="w-4 h-[1px] bg-gray-500" /> Core Equations
            </div>
            {equations.map((eq, i) => (
              <div key={i} className="p-4 bg-black/40 rounded-xl border border-white/5 group hover:border-accent/30 transition-all">
                <div className="text-xs text-gray-500 mb-2 uppercase font-mono">{eq.label}</div>
                <div className="text-accent text-lg overflow-x-auto py-4">
                  <BlockMath math={eq.latex} />
                </div>
              </div>
            ))}
          </div>

          {/* Term Interpretations */}
          <div id="math-terms" className="space-y-3">
            <div className="text-[10px] uppercase text-gray-500 font-bold tracking-widest mb-2 flex items-center gap-2">
              <div className="w-4 h-[1px] bg-gray-500" /> Term Interpretation
            </div>
            <div className="grid grid-cols-1 gap-2">
              {terms.map((term, i) => (
                <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-xl items-start border border-transparent hover:border-accent/10 transition-all">
                  <div className="font-mono text-accent font-bold min-w-[50px] bg-accent/10 p-2 rounded text-center">
                    <InlineMath math={term.symbol} />
                  </div>
                  <div className="flex-grow pt-1">
                    <div className="text-xs font-bold text-white mb-1 uppercase tracking-tight">{term.name}</div>
                    <div className="text-[10px] text-gray-400 leading-relaxed">{term.interpretation}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
