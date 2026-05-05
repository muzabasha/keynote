"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ShorThreat() {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<{ p: number, q: number } | null>(null);

  // Example: N = 15, a = 7
  const N = 15;
  const a = 7;
  const period = 4; // 7^1=7, 7^2=4, 7^3=13, 7^4=1 (mod 15)
  
  const steps = [
    {
      title: "The Classical Wall",
      content: "Factoring N=15 is easy for us, but for N=2048-bit, it takes trillions of years. It's a math wall.",
      math: "N = p \\times q",
      analogy: "Trying to un-mix two colors of paint. Impossible for humans!",
    },
    {
      title: "The Quantum Rhythm (Period Finding)",
      content: "Shor's algorithm doesn't 'guess' factors. It finds the 'rhythm' of a special function.",
      math: "f(x) = a^x \\pmod{N}",
      analogy: "Like finding the repeating note in a very long song.",
    },
    {
      title: "The Period Discovery",
      content: `A quantum computer uses superposition to find that the sequence repeats every r=${period} steps.`,
      math: `7^1=7, 7^2=4, 7^3=13, 7^4=1 \\dots \\Rightarrow r=${period}`,
      analogy: "Finding the pattern in the chaos instantly!",
    },
    {
      title: "The Final Crack",
      content: "Once we have 'r', the factors are found using simple high-school math (GCD).",
      math: "gcd(a^{r/2} \\pm 1, N) \\Rightarrow gcd(7^2 \\pm 1, 15)",
      analogy: "The rhythm told us exactly where the crack in the safe was!",
    }
  ];

  const handleNext = () => {
    if (step === 3) {
      setResult({ p: 3, q: 5 });
    }
    setStep(step + 1);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-red-950/20 rounded-3xl border border-red-500/20 backdrop-blur-xl shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold text-red-400">
          Shor's Algorithm: The RSA Killer
        </h3>
        <span className="text-xs text-red-500/50 font-mono">QUANTUM_THREAT: EXTREME</span>
      </div>

      <div className="min-h-[350px] flex flex-col">
        <AnimatePresence mode="wait">
          {step < 4 ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-6 flex-grow"
            >
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-white">{steps[step].title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{steps[step].content}</p>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-red-500 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                <div className="relative p-6 bg-black/60 rounded-xl border border-red-500/30 text-red-400 font-mono text-center text-lg">
                  {steps[step].math}
                </div>
              </div>

              <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/10 text-red-300/80 italic text-sm">
                <span className="font-bold mr-2">Analogy:</span>
                "{steps[step].analogy}"
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] text-red-400/40 uppercase tracking-widest font-bold">
                 {step === 1 && <span>a: Random base<br/>x: Power index</span>}
                 {step === 1 && <span>N: RSA Modulus<br/>f(x): Period function</span>}
                 {step === 2 && <span>r: The Period (The rhythm)</span>}
              </div>

              <button
                onClick={handleNext}
                className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-900/40 mt-auto"
              >
                {step === 3 ? 'CRACK RSA NOW' : 'NEXT STEP'}
              </button>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-8 py-12"
            >
              <div className="relative inline-block">
                <div className="text-8xl animate-pulse">💥</div>
                <div className="absolute inset-0 flex items-center justify-center text-4xl">🔓</div>
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-white">RSA-15 BROKEN!</h2>
                <p className="text-red-400 font-mono">FACTORS FOUND: {result?.p} AND {result?.q}</p>
                <p className="text-gray-500 text-sm italic mt-4 max-w-sm mx-auto">
                  "If a quantum computer can do this for a 15, it can do it for a 2048-bit key in minutes."
                </p>
              </div>
              <button
                onClick={() => { setStep(0); setResult(null); }}
                className="px-8 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-all"
              >
                RETRY ATTACK
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
