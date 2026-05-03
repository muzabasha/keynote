"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Entanglement() {
  const [rotation, setRotation] = useState(0);

  const handleRotate = () => {
    setRotation(prev => prev + 90);
  };

  return (
    <div className="flex flex-col items-center gap-12 w-full">
      <div className="flex justify-between items-center w-full max-w-md relative">
        {/* Particle 1 */}
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: rotation }}
            className="w-24 h-24 rounded-2xl bg-indigo-500 flex items-center justify-center border-2 border-white/20 shadow-[0_0_20px_rgba(99,102,241,0.5)]"
          >
            <div className="w-1 h-12 bg-white rounded-full" />
          </motion.div>
          <span className="text-xs font-mono text-indigo-300">QUBIT A</span>
        </div>

        {/* The Entanglement Thread */}
        <div className="absolute top-12 left-24 right-24 h-[2px] overflow-hidden">
          <motion.div 
            animate={{ x: [0, 100] }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
          />
          <div className="absolute inset-0 bg-white/20 blur-[2px]" />
        </div>

        {/* Particle 2 */}
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: rotation }}
            className="w-24 h-24 rounded-2xl bg-purple-500 flex items-center justify-center border-2 border-white/20 shadow-[0_0_20px_rgba(168,85,247,0.5)]"
          >
            <div className="w-1 h-12 bg-white rounded-full" />
          </motion.div>
          <span className="text-xs font-mono text-purple-300">QUBIT B</span>
        </div>
      </div>

      <button
        onClick={handleRotate}
        className="px-6 py-3 rounded-lg border border-white/30 hover:bg-white/10 transition-all text-white"
        style={{ background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.3)', padding: '10px 20px', cursor: 'pointer', borderRadius: '8px' }}
      >
        INTERACT WITH A
      </button>

      <p className="text-center text-sm text-gray-400 italic">
        "Spooky action at a distance." <br/> Change A, and B reacts instantly.
      </p>
    </div>
  );
}
