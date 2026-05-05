"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LatticeDemo() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "The Lattice Grid (Public Key)",
      content: "Lattice-based crypto (ML-KEM) uses high-dimensional grids. Even for a computer, finding the shortest vector is like finding a needle in a 500-D haystack.",
      math: "\\mathbf{b} = \\mathbf{A}\\mathbf{s} + \\mathbf{e} \\pmod{q}",
      analogy: "Imagine a giant honeycomb, but it's 500-dimensional and floating in a thick fog.",
      adv: "Fast, small keys, very versatile.",
      dis: "Relatively new compared to RSA; complex math.",
      app: "Browser security (TLS), general encryption."
    },
    {
      title: "Adding the Noise (The Trapdoor)",
      content: "We take a point on the grid (A*s) and move it just a tiny bit (e). Without the secret, you can't tell which grid point it came from!",
      math: "\\text{Secret: } \\mathbf{s}, \\quad \\text{Error: } \\mathbf{e}",
      analogy: "It's like taking a perfectly straight road and adding thousands of tiny, random bumps.",
      adv: "Quantum-resistant because 'Shortest Vector Problem' is hard for Qubits.",
      dis: "Key sizes are larger than ECC (but smaller than RSA).",
      app: "NIST standard (ML-KEM)."
    }
  ];

  const current = steps[step];

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-teal-950/20 rounded-3xl border border-teal-500/20 backdrop-blur-xl shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-teal-400">Lattice-Based: ML-KEM</h3>
        <button 
          onClick={() => setStep((step + 1) % steps.length)}
          className="px-4 py-2 bg-teal-500/20 hover:bg-teal-500/30 rounded-lg text-xs text-teal-300 transition-all font-bold"
        >
          {step === 0 ? 'ADD NOISE' : 'RESET GRID'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="relative aspect-square bg-black/40 rounded-2xl border border-white/5 overflow-hidden p-4">
           {/* Lattice Visualization */}
           <div className="grid grid-cols-8 grid-rows-8 h-full w-full gap-2 opacity-20">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="w-1 h-1 bg-teal-500 rounded-full" />
              ))}
           </div>
           
           <AnimatePresence>
             {step === 0 ? (
               <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 className="absolute inset-0 flex items-center justify-center"
               >
                 <div className="w-4 h-4 bg-teal-400 rounded-full shadow-[0_0_20px_#2dd4bf]" />
                 <span className="absolute mt-10 text-[10px] text-teal-400 font-mono">POINT (As)</span>
               </motion.div>
             ) : (
               <motion.div 
                 initial={{ scale: 0 }} animate={{ scale: 1 }}
                 className="absolute inset-0 flex items-center justify-center"
               >
                  <motion.div 
                    animate={{ x: [0, 5, -5, 0], y: [0, -5, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-4 h-4 bg-red-400 rounded-full blur-[2px] shadow-[0_0_20px_#f87171]" 
                  />
                  <span className="absolute mt-10 text-[10px] text-red-400 font-mono">NOISY POINT (As + e)</span>
               </motion.div>
             )}
           </AnimatePresence>

           <div className="absolute bottom-4 left-4 font-mono text-[10px] text-teal-500/50">
              {current.math}
           </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-bold text-white">{current.title}</h4>
            <p className="text-gray-400 text-xs leading-relaxed">{current.content}</p>
          </div>

          <div className="p-3 bg-teal-500/5 rounded-lg border border-teal-500/10 italic text-teal-200/70 text-[11px]">
            <span className="font-bold">Analogy:</span> "{current.analogy}"
          </div>

          <div className="grid grid-cols-1 gap-2 text-[10px]">
            <div className="p-2 bg-green-500/10 border border-green-500/20 rounded text-green-400">
               <strong>Pros:</strong> {current.adv}
            </div>
            <div className="p-2 bg-red-500/10 border border-red-500/20 rounded text-red-400">
               <strong>Cons:</strong> {current.dis}
            </div>
            <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded text-blue-400">
               <strong>App:</strong> {current.app}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex gap-2">
        <div className="px-2 py-1 bg-white/5 rounded text-[8px] text-gray-500">A: Matrix</div>
        <div className="px-2 py-1 bg-white/5 rounded text-[8px] text-gray-500">s: Secret</div>
        <div className="px-2 py-1 bg-white/5 rounded text-[8px] text-gray-500">e: Noise</div>
        <div className="px-2 py-1 bg-white/5 rounded text-[8px] text-gray-500">b: Result</div>
      </div>
    </div>
  );
}
