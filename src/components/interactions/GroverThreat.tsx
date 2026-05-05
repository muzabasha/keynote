"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function GroverThreat() {
  const [iter, setIter] = useState(0);
  const [amplitude, setAmplitude] = useState([0.1, 0.1, 0.1, 0.1, 0.8, 0.1, 0.1, 0.1]); // 8 items, index 4 is target
  const [searching, setSearching] = useState(false);

  const steps = [
    {
      title: "The Needle in the Haystack",
      content: "Classical computers check each key one-by-one. For AES-128, that's 2^128 tries. Good luck!",
      math: "O(N) \\text{ complexity}",
      analogy: "Like checking every single locked door in a skyscraper one-by-one.",
    },
    {
      title: "Amplitude Amplification",
      content: "Grover's algorithm uses 'Quantum Interference' to flip the right answer and then boost its volume.",
      math: "O(\\sqrt{N}) \\text{ complexity}",
      analogy: "Instead of walking to doors, you yell 'WHO HAS THE KEY?' and the right door yells back louder each time.",
    },
    {
      title: "The Quadratic Speedup",
      content: "What took 1,000,000 steps now takes only 1,000. It effectively halves the bit-security.",
      math: "AES\\text{-}128 \\rightarrow AES\\text{-}64 \\text{ (Effective)}",
      analogy: "A million-mile journey suddenly becomes a 1000-mile stroll.",
    }
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const startGrover = () => {
    setSearching(true);
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setIter(count);
      // Simulate amplitude boosting for index 4
      setAmplitude(prev => prev.map((a, i) => {
        if (i === 4) return Math.min(1, a + 0.15);
        return Math.max(0.01, a - 0.05);
      }));
      if (count >= 5) {
        clearInterval(interval);
        setSearching(false);
      }
    }, 800);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-orange-950/20 rounded-3xl border border-orange-500/20 backdrop-blur-xl shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-orange-400">
          Grover's Algorithm: The Search Booster
        </h3>
        <div className="px-3 py-1 bg-orange-500/10 rounded-full text-[10px] text-orange-300 font-mono">
          IMPACT: SYMMETRIC KEYS
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-lg font-bold text-white">{steps[currentStep].title}</h4>
            <p className="text-gray-400 text-sm">{steps[currentStep].content}</p>
          </div>

          <div className="p-4 bg-black/40 rounded-xl border border-orange-500/30 text-orange-400 font-mono text-sm text-center">
            {steps[currentStep].math}
          </div>

          <div className="p-3 bg-orange-500/5 rounded-lg border border-orange-500/10 italic text-orange-200/70 text-xs">
            "{steps[currentStep].analogy}"
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white text-xs transition-all"
            >
              PREVIOUS
            </button>
            <button 
              onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
              className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white text-xs transition-all"
            >
              NEXT
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="h-48 bg-black/40 rounded-2xl border border-white/5 p-4 flex items-end justify-between gap-1">
            {amplitude.map((h, i) => (
              <motion.div
                key={i}
                animate={{ height: `${h * 100}%`, backgroundColor: i === 4 ? '#f97316' : '#444' }}
                className="w-full rounded-t-sm relative group"
              >
                {i === 4 && h > 0.7 && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="absolute -top-8 left-1/2 -translate-x-1/2 text-orange-400 font-bold text-[10px]"
                  >
                    FOUND!
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
          
          <button
            disabled={searching}
            onClick={startGrover}
            className={`w-full py-3 rounded-xl font-bold transition-all ${searching ? 'bg-gray-700 text-gray-400' : 'bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-900/20'}`}
          >
            {searching ? `AMPLIFYING (Step ${iter}/5)...` : 'START GROVER SEARCH'}
          </button>
          
          <div className="grid grid-cols-2 gap-2 text-[10px] text-orange-400/40 uppercase tracking-widest font-bold">
             <div className="p-2 bg-white/5 rounded"><strong>N:</strong> Total possible keys (e.g. 2¹²⁸)</div>
             <div className="p-2 bg-white/5 rounded"><strong>√N:</strong> Quantum steps to find it</div>
          </div>

          <div className="text-[10px] text-center text-gray-500 font-mono uppercase tracking-tighter mt-4">
             Searching N items in √N time
          </div>
        </div>
      </div>
    </div>
  );
}
