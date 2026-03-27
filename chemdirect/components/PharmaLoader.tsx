import React from 'react';

export default function PharmaLoader() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center w-24 h-24 mb-4">
        {/* Core hexagon forming a molecule shape */}
        <div className="absolute w-12 h-12 border-4 border-primary/30 rounded-lg animate-spin" style={{ animationDuration: '3s' }}></div>
        <div className="absolute w-16 h-16 border-4 border-primary/20 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
        {/* Pulsing center node */}
        <div className="relative w-4 h-4 bg-primary rounded-full animate-pulse shadow-[0_0_15px_rgba(var(--primary),0.5)]"></div>
      </div>
      <h2 className="text-xl font-bold tracking-widest text-primary animate-pulse uppercase">Synthesizing</h2>
      <p className="text-sm text-muted-foreground mt-2">Checking CAS Purity Standards...</p>
    </div>
  );
}
