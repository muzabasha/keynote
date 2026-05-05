"use client";

import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export default function ComparisonTable() {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (tech: string) => {
    setSelected(tech);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#6366f1', '#a855f7', '#ffffff']
    });
  };

  const data = [
    {
      tech: "Lattice (ML-KEM)",
      challenge: "Math complexity",
      app: "TLS, VPN, SSH",
      adv: "Fast, Small keys",
      dis: "Newer math",
      exp: "NIST Finalist",
      plan: "Deploy 2025"
    },
    {
      tech: "Hash (SLH-DSA)",
      challenge: "Signature size",
      app: "Firmware, PKI",
      adv: "Most trusted",
      dis: "Large sigs",
      exp: "Proven SHA-3",
      plan: "Archive use"
    },
    {
      tech: "Code (McEliece)",
      challenge: "Key size",
      app: "Deep archive",
      adv: "40yr track record",
      dis: "MB sized keys",
      exp: "Hardware acceleration",
      plan: "Legacy backup"
    },
    {
      tech: "Isogeny (SIKE)",
      challenge: "Performance",
      app: "Embedded devices",
      adv: "Tiny keys",
      dis: "Slower speed",
      exp: "Ongoing research",
      plan: "Monitor status"
    }
  ];

  return (
    <div className="w-full overflow-x-auto bg-black/40 rounded-2xl border border-white/10 backdrop-blur-xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-white/5 text-[9px] uppercase tracking-widest text-accent font-bold">
            <th className="p-3 border-b border-white/10">Technique</th>
            <th className="p-3 border-b border-white/10">Challenges</th>
            <th className="p-3 border-b border-white/10">Applications</th>
            <th className="p-3 border-b border-white/10">Adv/Disadv</th>
            <th className="p-3 border-b border-white/10">Experimental</th>
            <th className="p-3 border-b border-white/10">Action</th>
          </tr>
        </thead>
        <tbody className="text-[10px] text-gray-300">
          {data.map((row, i) => (
            <tr key={i} className={`hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 ${selected === row.tech ? 'bg-accent/10' : ''}`}>
              <td className="p-3 font-bold text-white whitespace-nowrap">{row.tech}</td>
              <td className="p-3 opacity-70">{row.challenge}</td>
              <td className="p-3">{row.app}</td>
              <td className="p-3">
                <span className="text-green-400">+{row.adv}</span>
                <br/>
                <span className="text-red-400">-{row.dis}</span>
              </td>
              <td className="p-3 font-mono text-[8px] text-accent-secondary">{row.exp}</td>
              <td className="p-3">
                <button 
                  onClick={() => handleSelect(row.tech)}
                  className={`px-2 py-1 rounded-full text-[8px] font-bold transition-all ${selected === row.tech ? 'bg-green-500 text-white' : 'bg-white/10 hover:bg-white/20 text-accent'}`}
                >
                  {selected === row.tech ? 'PILOT' : 'START'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="p-4 bg-accent/5 border-t border-white/10">
        <h4 className="text-[10px] font-bold uppercase text-accent mb-2">Future Scope & Plan of Action</h4>
        {selected ? (
          <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20 text-green-300 text-[10px] mb-4">
             🚀 <strong>Pilot Phase Active:</strong> Transitioning your enterprise to {selected}. Hybrid handshake initialization complete.
          </div>
        ) : null}
        <div className="grid grid-cols-2 gap-4 text-[9px] text-gray-400">
          <div>• Transition to Hybrid (Classical + PQC) by 2026.</div>
          <div>• Continuous audit of cryptographic inventory.</div>
          <div>• Implement Crypto-Agility in all new firmware.</div>
          <div>• Monitor NIST Round 5 for next-gen candidates.</div>
        </div>
      </div>
    </div>
  );
}
