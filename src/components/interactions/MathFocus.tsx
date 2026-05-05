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
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-accent/5 border border-accent/20 rounded-2xl p-6 backdrop-blur-md"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-accent/20 rounded-lg">
          <span className="text-xl">📐</span>
        </div>
        <div>
          <h4 className="text-[10px] uppercase tracking-widest text-accent font-black">Math Deep Dive</h4>
          <h3 className="text-xl font-bold text-white">{topic}</h3>
        </div>
      </div>

      <div className="space-y-8">
        {/* Concept */}
        <div>
          <p className="text-sm text-gray-400 leading-relaxed italic">
            "{concept}"
          </p>
        </div>

        {/* Equations */}
        <div className="space-y-4">
          {equations.map((eq, i) => (
            <div key={i} className="p-4 bg-black/40 rounded-xl border border-white/5 group hover:border-accent/30 transition-all">
              <div className="text-xs text-gray-500 mb-2 uppercase font-mono">{eq.label}</div>
              <div className="text-accent text-lg overflow-x-auto">
                <BlockMath math={eq.latex} />
              </div>
            </div>
          ))}
        </div>

        {/* Term Interpretations */}
        <div className="space-y-3">
          <div className="text-[10px] uppercase text-gray-500 font-bold tracking-tighter">Term Interpretations</div>
          <div className="grid grid-cols-1 gap-2">
            {terms.map((term, i) => (
              <div key={i} className="flex gap-4 p-3 bg-white/5 rounded-lg items-start border border-transparent hover:border-white/10 transition-all">
                <div className="font-mono text-accent font-bold min-w-[40px]">
                  <InlineMath math={term.symbol} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white mb-1">{term.name}</div>
                  <div className="text-[10px] text-gray-400 leading-tight">{term.interpretation}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
