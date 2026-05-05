"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ECCInteractive() {
  const [step, setStep] = useState(0);

  // Simple Elliptic Curve simulation points (y^2 = x^3 - 3x + 5)
  // We'll just draw a static curve and animate points for illustration
  
  const curvePath = "M 50,150 Q 100,50 200,150 T 350,150"; // Simplified visual representation
  
  const steps = [
    {
      title: "The Wavy Table (Curve)",
      content: "ECC works on a special curve: y² = x³ + ax + b. It's symmetrical and smooth.",
      math: "y^2 = x^3 - 4x + 4",
      analogy: "Imagine a billiard table with a very strange, wavy shape.",
      highlight: "curve"
    },
    {
      title: "Point Addition (The Bounce)",
      content: "Take point P and point Q. Draw a line through them; where it hits the curve again is our 'sum'.",
      math: "P + Q = R",
      analogy: "Hit a ball from P through Q. It bounces off the wall to point R.",
      highlight: "addition"
    },
    {
      title: "Point Doubling",
      content: "If you only have one point P, draw a tangent. The bounce point is 2P.",
      math: "P + P = 2P",
      analogy: "Spinning the ball perfectly so it hits the curve and comes back to you.",
      highlight: "doubling"
    },
    {
      title: "The Trapdoor (Scalar Mult)",
      content: "Do this 'k' times. kP is your Public Key. Finding 'k' is the 'Discrete Log Problem'.",
      math: "Q = k \\cdot P \\quad (k \\text{ is hard to find!})",
      analogy: "After 1 million bounces, nobody can guess where you started or how many times you hit it!",
      highlight: "scalar"
    }
  ];

  const current = steps[step];

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-slate-900/50 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
          ECC: The Billiard Bounce
        </h3>
        <button 
          onClick={() => setStep((step + 1) % steps.length)}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white transition-all"
        >
          Next Lesson
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Visualizer */}
        <div className="relative aspect-square bg-black/40 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center">
          <svg width="100%" height="100%" viewBox="0 0 400 400" className="opacity-80">
            {/* Grid */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.1"/>
              </pattern> pattern
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Curve */}
            <motion.path
              d="M 200,50 C 250,50 300,150 300,200 C 300,250 250,350 200,350 C 150,350 100,250 100,200 C 100,150 150,50 200,50"
              fill="none"
              stroke="url(#grad)"
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2 }}
            />
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>

            {/* Points Animation */}
            {step >= 1 && (
              <>
                <motion.circle cx="120" cy="150" r="6" fill="#f472b6" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                   <title>P</title>
                </motion.circle>
                <motion.circle cx="280" cy="250" r="6" fill="#a855f7" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                   <title>Q</title>
                </motion.circle>
                <motion.line 
                  x1="120" y1="150" x2="280" y2="250" 
                  stroke="white" strokeWidth="2" strokeDasharray="4 4"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                />
              </>
            )}

            {step === 3 && (
              <motion.circle 
                cx="200" cy="50" r="8" fill="white"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            )}
          </svg>
          
          <div className="absolute bottom-4 left-4 text-[10px] text-white/30 font-mono">
            {current.math}
          </div>
          
          <div className="absolute top-4 right-4 text-[9px] text-white/20 bg-black/40 p-2 rounded">
            {step === 0 && <span>y, x: Coordinates<br/>a, b: Curve Parameters</span>}
            {step === 1 && <span>P, Q: Points on curve<br/>R: Resulting sum</span>}
            {step === 3 && <span>k: Secret scalar<br/>kP: Public Point</span>}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-xl font-semibold text-white">{current.title}</h4>
            <p className="text-gray-400 leading-relaxed">{current.content}</p>
          </div>

          <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20 italic text-indigo-300 text-sm">
             <span className="font-bold mr-2">Analogy:</span>
             "{current.analogy}"
          </div>

          <div className="flex gap-2">
            {steps.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 flex-1 rounded-full transition-all ${i === step ? 'bg-purple-500' : 'bg-white/10'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
