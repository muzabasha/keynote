"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function CodeDemo() {
  const [step, setStep] = useState(0);
  const message = "HELLO";
  const noisy = "H#LL0";

  const steps = [
    {
      title: "Error Correction Codes",
      content: "Code-based crypto (McEliece) is the oldest PQC candidate. It works by adding 'spelling mistakes' to a message.",
      math: "\\mathbf{c} = \\mathbf{mG} + \\mathbf{e}",
      analogy: "It's like whispering a secret in a noisy room. Only your friend knows how to filter out the static.",
      adv: "Very fast, never broken in 40 years.",
      dis: "Huge keys (Megabytes!). Not good for small chips.",
      app: "Archival storage, high-security backbone."
    },
    {
      title: "Decoding the Noise",
      content: "The public sees the noisy message. Only you have the 'Syndrome Decoder' to find where the errors are.",
      math: "\\mathbf{m} = \\text{Decode}(\\mathbf{c})",
      analogy: "Like a teacher who can read a student's messy handwriting because they know the student's style.",
      adv: "Highest confidence in security.",
      dis: "Key size is the biggest barrier.",
      app: "Post-Quantum archiving."
    }
  ];

  const current = steps[step];

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-blue-950/20 rounded-3xl border border-blue-500/20 backdrop-blur-xl shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-blue-400">Code-Based: McEliece</h3>
        <button 
          onClick={() => setStep((step + 1) % steps.length)}
          className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-xs text-blue-300 transition-all font-bold"
        >
          {step === 0 ? 'DECODE' : 'RESET'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col gap-4">
          <div className="p-6 bg-black/40 rounded-2xl border border-white/5 space-y-6">
            <div className="text-center">
               <label className="text-[10px] text-gray-500 font-bold uppercase mb-2 block">The Payload (c)</label>
               <motion.div 
                 animate={step === 1 ? { color: '#60a5fa', scale: 1.1 } : { color: '#ef4444' }}
                 className="text-5xl font-mono font-black tracking-widest"
               >
                 {step === 0 ? noisy : message}
               </motion.div>
            </div>
            
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }} 
                 animate={step === 1 ? { width: '100%' } : { width: '30%' }}
                 className="h-full bg-blue-500" 
               />
            </div>
            
            <p className="text-[10px] text-center text-gray-500 italic">
               {step === 0 ? "Errors detected! Decoding..." : "Correction complete. Identity verified."}
            </p>
          </div>
          
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl text-center font-mono text-xs text-blue-300">
             {current.math}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-bold text-white">{current.title}</h4>
            <p className="text-gray-400 text-xs leading-relaxed">{current.content}</p>
          </div>

          <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/10 italic text-blue-200/70 text-[11px]">
            <span className="font-bold">Analogy:</span> "{current.analogy}"
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-[10px]">
               <span className="text-green-400 font-bold">PRO: {current.adv}</span>
            </div>
            <div className="flex justify-between text-[10px]">
               <span className="text-red-400 font-bold">CON: {current.dis}</span>
            </div>
            <div className="flex justify-between text-[10px]">
               <span className="text-blue-400 font-bold">USE: {current.app}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-4 gap-2 text-[9px] text-center">
         <div className="p-1 bg-white/5 rounded">m: Message</div>
         <div className="p-1 bg-white/5 rounded">G: Generator</div>
         <div className="p-1 bg-white/5 rounded">e: Error Vector</div>
         <div className="p-1 bg-white/5 rounded">c: Code Word</div>
      </div>
    </div>
  );
}
