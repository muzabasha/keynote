"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BinaryShatter() {
  const [shattered, setShattered] = useState(false);
  const [digits, setDigits] = useState<string[]>([]);

  useEffect(() => {
    const d = Array.from({ length: 40 }).map(() => (Math.random() > 0.5 ? '0' : '1'));
    setDigits(d);
  }, []);

  return (
    <div className="relative w-full h-64 flex items-center justify-center overflow-hidden bg-black/40 rounded-2xl border border-red-500/20">
      <AnimatePresence>
        {!shattered ? (
          <motion.div
            key="lock"
            exit={{ scale: 2, opacity: 0, filter: 'blur(10px)' }}
            className="text-4xl font-black text-white tracking-widest flex flex-col items-center gap-4"
          >
            <div className="p-8 border-4 border-white rounded-3xl">RSA-2048</div>
            <button 
              onClick={() => setShattered(true)}
              className="px-6 py-2 bg-red-600 rounded-lg text-sm font-bold animate-pulse hover:scale-110 transition-transform"
              style={{ background: '#dc2626', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer', borderRadius: '8px' }}
            >
              RUN SHOR'S
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-10 gap-2 w-full p-4">
            {digits.map((digit, i) => (
              <motion.div
                key={i}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.02, type: 'spring' }}
                className="text-red-500 font-mono text-xl"
              >
                {digit}
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-red-900/20 backdrop-blur-sm"
            >
              <div className="text-2xl font-bold text-red-500 text-center">
                SECURITY BARRIER <br/> COLLAPSED
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
