"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RSAInteractive() {
  const [step, setStep] = useState(0);
  const [message, setMessage] = useState(7);
  const [cipher, setCipher] = useState(0);
  const [decrypted, setDecrypted] = useState(0);

  // Small values for illustration
  const p = 3;
  const q = 11;
  const n = p * q; // 33
  const phi = (p - 1) * (q - 1); // 20
  const e = 3;
  const d = 7; // (3 * 7) % 20 = 1

  const steps = [
    {
      title: "Step 1: The Secret Primes",
      content: `Pick two secret primes: p=${p} and q=${q}.`,
      math: `n = p \\times q = ${p} \\times ${q} = ${n}`,
      analogy: "Like picking two secret ingredients for a recipe.",
      action: () => setStep(1)
    },
    {
      title: "Step 2: The Lock & Key",
      content: `Calculate n=${n} (Public) and d=${d} (Private).`,
      math: `e=${e}, d=${d} \\text{ where } (e \\times d) \\pmod{\\phi(n)} = 1`,
      analogy: "n is the padlock on your mailbox; d is your personal key.",
      action: () => setStep(2)
    },
    {
      title: "Step 3: Encrypting Message",
      content: `Someone sends you the number ${message}. We raise it to power e.`,
      math: `C = M^e \\pmod{n} = ${message}^3 \\pmod{33} = 343 \\pmod{33}`,
      analogy: "Snapping the padlock shut. Easy for anyone!",
      action: () => {
        setCipher(Math.pow(message, e) % n);
        setStep(3);
      }
    },
    {
      title: "Step 4: Decrypting Message",
      content: `You use your private key d=${d} to unlock the secret.`,
      math: `M = C^d \\pmod{n} = ${Math.pow(message, e) % n}^7 \\pmod{33}`,
      analogy: "Only you have the key to open the padlock!",
      action: () => {
        // Simple modPow for small numbers
        let res = 1;
        let base = Math.pow(message, e) % n;
        for(let i=0; i<d; i++) res = (res * base) % n;
        setDecrypted(res);
        setStep(4);
      }
    }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-slate-900/50 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          RSA: The Magic Padlock
        </h3>
        <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/50">
          Step {step + 1} of 5
        </span>
      </div>

      <div className="min-h-[300px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {step < steps.length ? (
              <>
                <div className="space-y-2">
                  <p className="text-xl text-white font-medium">{steps[step].title}</p>
                  <p className="text-gray-400">{steps[step].content}</p>
                </div>

                <div className="p-4 bg-black/40 rounded-xl border border-white/5 font-mono text-cyan-300 overflow-x-auto">
                  {steps[step].math}
                </div>

                {step === 0 && (
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-white/5 rounded"><strong>p, q:</strong> Secret Prime Numbers</div>
                    <div className="p-2 bg-white/5 rounded"><strong>n:</strong> Modulus (Publicly shared)</div>
                  </div>
                )}
                {step === 1 && (
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-white/5 rounded"><strong>e:</strong> Public Exponent (Encryption)</div>
                    <div className="p-2 bg-white/5 rounded"><strong>d:</strong> Private Exponent (Decryption)</div>
                  </div>
                )}
                {step === 2 && (
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-white/5 rounded"><strong>M:</strong> Message (Your secret)</div>
                    <div className="p-2 bg-white/5 rounded"><strong>C:</strong> Ciphertext (Locked data)</div>
                  </div>
                )}

                <div className="flex items-center gap-3 p-3 bg-indigo-500/10 rounded-lg text-indigo-300 text-sm italic">
                  <span className="text-lg">💡</span>
                  "{steps[step].analogy}"
                </div>

                <button
                  onClick={steps[step].action}
                  className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-900/20"
                >
                  {step === 2 ? 'ENCRYPT NOW' : step === 3 ? 'DECRYPT NOW' : 'NEXT STEP'}
                </button>
              </>
            ) : (
              <div className="text-center space-y-6 py-8">
                <div className="text-6xl animate-bounce">🔐 ✨ 🔓</div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-white">Success! Message Recovered</p>
                  <p className="text-gray-400">Original: {message} → Encrypted: {cipher} → Decrypted: {decrypted}</p>
                </div>
                <button
                  onClick={() => { setStep(0); setDecrypted(0); setCipher(0); }}
                  className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 transition-all"
                >
                  RESTART DEMO
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
