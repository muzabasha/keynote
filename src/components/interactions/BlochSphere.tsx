"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function BlochSphere() {
  const [coords, setCoords] = useState({ x: 45, y: 45 });

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-64 h-64 border-2 border-white/10 rounded-full flex items-center justify-center">
        {/* Sphere Outlines */}
        <div className="absolute inset-0 border-2 border-white/5 rounded-full rotate-x-90" style={{ transform: 'rotateX(80deg)' }} />
        <div className="absolute inset-0 border-2 border-white/5 rounded-full" style={{ transform: 'rotateY(80deg)' }} />
        
        {/* Axis */}
        <div className="absolute w-[2px] h-full bg-white/20" />
        <div className="absolute h-[2px] w-full bg-white/20" />
        
        {/* The Vector */}
        <motion.div
          animate={{ rotateZ: coords.x, rotateX: coords.y }}
          className="absolute w-1 h-32 origin-bottom bg-gradient-to-t from-transparent via-indigo-400 to-indigo-500 shadow-[0_0_15px_rgba(99,102,241,1)]"
          style={{ bottom: '50%' }}
        >
          <div className="absolute -top-2 -left-[6px] w-4 h-4 bg-white rounded-full shadow-lg" />
        </motion.div>

        {/* Labels */}
        <div className="absolute -top-8 font-mono text-xs text-gray-400">|0⟩</div>
        <div className="absolute -bottom-8 font-mono text-xs text-gray-400">|1⟩</div>
      </div>

      <div className="flex gap-4 mt-8">
        <input 
          type="range" min="0" max="360" value={coords.x} 
          onChange={(e) => setCoords({...coords, x: parseInt(e.target.value)})}
          className="accent-indigo-500"
        />
        <input 
          type="range" min="0" max="360" value={coords.y} 
          onChange={(e) => setCoords({...coords, y: parseInt(e.target.value)})}
          className="accent-purple-500"
        />
      </div>
      
      <p className="text-xs text-gray-500 uppercase tracking-widest">Adjust θ (theta) and φ (phi)</p>
    </div>
  );
}
