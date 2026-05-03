"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Superposition() {
  const [observed, setObserved] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleObserve = () => {
    if (observed) {
      setObserved(false);
      setResult(null);
    } else {
      setObserved(true);
      setResult(Math.random() > 0.5 ? '0' : '1');
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative w-40 h-40">
        <motion.div
          animate={observed ? { rotateY: result === '0' ? 0 : 180 } : { rotateY: 360 }}
          transition={observed ? { duration: 0.5 } : { duration: 0.2, repeat: Infinity, ease: "linear" }}
          className="w-full h-full rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center border-4 border-white/20 shadow-2xl"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="text-6xl font-bold text-white backface-hidden">0</div>
          <div className="absolute text-6xl font-bold text-white backface-hidden" style={{ transform: 'rotateY(180deg)' }}>1</div>
        </motion.div>
        
        {!observed && (
          <div className="absolute inset-0 rounded-full bg-white/10 blur-xl animate-pulse" />
        )}
      </div>

      <button
        onClick={handleObserve}
        className="px-8 py-3 rounded-xl bg-white text-black font-bold hover:bg-indigo-100 transition-all"
        style={{ background: 'white', color: 'black', border: 'none', padding: '12px 24px', cursor: 'pointer', borderRadius: '12px' }}
      >
        {observed ? 'RESET QUBIT' : 'OBSERVE STATE'}
      </button>

      <p className="text-gray-400 text-sm max-w-[200px] text-center">
        {observed 
          ? `Wave function collapsed to state: |${result}⟩` 
          : "Qubit is in superposition of |0⟩ and |1⟩"}
      </p>
    </div>
  );
}
