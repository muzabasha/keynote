"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function HashDemo() {
  const [input, setInput] = useState("QUAN");
  
  // Fake hash function for demo
  const getHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(16).padStart(8, '0').toUpperCase();
  };

  const hashValue = getHash(input);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-amber-950/20 rounded-3xl border border-amber-500/20 backdrop-blur-xl shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-amber-400">Hash-Based: SLH-DSA</h3>
        <div className="px-3 py-1 bg-amber-500/10 rounded-full text-[10px] text-amber-300 font-mono">
          BASED ON SHA-3
        </div>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">The One-Way Fingerprint</h4>
            <p className="text-gray-400 text-xs leading-relaxed">
              Hash-based signatures rely on the fact that you can't reverse a hash. Quantum computers can't reverse them either!
            </p>
            <div className="p-3 bg-amber-500/5 rounded-lg border border-amber-500/10 italic text-amber-200/70 text-[11px]">
              <span className="font-bold">Analogy:</span> "It's like turning a cow into a burger. Easy to do, but nobody—not even a quantum computer—can turn the burger back into a cow."
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase text-gray-500 font-bold">Input Data (m)</label>
              <input 
                type="text" 
                maxLength={8}
                value={input}
                onChange={(e) => setInput(e.target.value.toUpperCase())}
                className="w-full p-4 bg-black/40 border border-white/10 rounded-xl text-amber-400 font-mono text-2xl text-center"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase text-gray-500 font-bold">Quantum-Safe Hash (H)</label>
              <motion.div 
                key={hashValue}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200 font-mono text-xl text-center break-all"
              >
                {hashValue}
              </motion.div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-[10px]">
          <div className="p-3 bg-green-500/10 border border-green-500/20 rounded text-green-400 space-y-1">
             <div className="font-bold uppercase tracking-tighter">Advantages</div>
             <p className="opacity-70">Highly trusted, math is simple and solid.</p>
          </div>
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 space-y-1">
             <div className="font-bold uppercase tracking-tighter">Disadvantages</div>
             <p className="opacity-70">Large signatures, limited uses per key.</p>
          </div>
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded text-blue-400 space-y-1">
             <div className="font-bold uppercase tracking-tighter">Application</div>
             <p className="opacity-70">Firmware updates, long-term archiving.</p>
          </div>
        </div>

        <div className="text-center font-mono text-[10px] text-amber-500/30">
          Equation: H(m) = h | Try changing one letter!
        </div>
      </div>
    </div>
  );
}
