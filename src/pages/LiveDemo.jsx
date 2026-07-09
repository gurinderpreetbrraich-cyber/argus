import React, { useState } from 'react';

export default function LiveDemo() {
  const [input, setInput] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleAudit = () => {
    if (!input.trim()) return;
    setIsAuditing(true);
    // Mock the API call delay
    setTimeout(() => {
      setIsAuditing(false);
      setShowResult(true);
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-5xl px-6 pt-32 pb-24 md:px-12 lg:px-16">
      <div className="mb-12 text-center">
        <h1 className="animate-fade-rise font-display text-4xl sm:text-5xl font-medium tracking-tight">
          Audit a reasoning chain
        </h1>
        <p className="animate-fade-rise mt-4 text-lg text-muted-foreground" style={{ animationDelay: '0.2s' }}>
          Paste a chain from any domain. Watch Argus find the logical gaps.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Input Panel */}
        <div className="liquid-glass animate-fade-rise rounded-2xl p-6" style={{ animationDelay: '0.4s' }}>
          <h2 className="font-display text-2xl mb-4 text-white">Input</h2>
          <textarea 
            className="w-full h-64 bg-black/40 border border-white/10 rounded-xl p-4 text-white/90 placeholder:text-white/30 focus:outline-none focus:border-white/30 resize-none font-body"
            placeholder="paste a reasoning chain from medicine, law, devops, or anywhere else..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
          
          <div className="mt-4 flex flex-wrap gap-2 mb-6">
            <span className="text-sm text-muted-foreground mr-2 self-center">Examples:</span>
            <button onClick={() => setInput("Patient presents with severe hypotension. Administer standard dose of drug X. However, drug X is contraindicated in patients with low blood pressure.")} className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1 transition-colors text-white/70">Medical</button>
            <button onClick={() => setInput("The contract requires a 30-day notice for termination. The client sent notice on Oct 1st and terminated on Oct 15th, which satisfies the contract requirements.")} className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-3 py-1 transition-colors text-white/70">Legal</button>
          </div>

          <button 
            onClick={handleAudit}
            disabled={!input.trim() || isAuditing}
            className="w-full liquid-glass rounded-xl py-3 font-medium text-white hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAuditing ? 'Auditing...' : 'Run Audit'}
          </button>
        </div>

        {/* Result Panel */}
        <div className="liquid-glass animate-fade-rise rounded-2xl p-6 flex flex-col" style={{ animationDelay: '0.5s' }}>
          <h2 className="font-display text-2xl mb-4 text-white">Audit Result</h2>
          
          {!showResult && !isAuditing && (
            <div className="flex-1 flex items-center justify-center text-muted-foreground border border-dashed border-white/10 rounded-xl">
              Run an audit to see results here.
            </div>
          )}

          {isAuditing && (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground border border-dashed border-white/10 rounded-xl gap-4">
              <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              <span>Decomposing claims...</span>
            </div>
          )}

          {showResult && !isAuditing && (
            <div className="flex-1 flex flex-col gap-4">
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg p-3 text-sm font-medium flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  Contradiction Found
                </span>
                <span className="bg-red-500/20 px-2 py-0.5 rounded text-xs">High Severity</span>
              </div>

              <div className="space-y-4 mt-2">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">FLAGGED PAIR</div>
                  <div className="bg-black/40 border border-white/5 rounded-lg p-3 text-sm text-white/80 space-y-3">
                    <div>
                      <span className="text-white/40 mr-2 font-mono text-xs">CLAIM 2</span>
                      The contract requires a 30-day notice for termination.
                    </div>
                    <div className="h-px bg-white/5"></div>
                    <div>
                      <span className="text-white/40 mr-2 font-mono text-xs">CLAIM 4</span>
                      Terminating 14 days after notice satisfies the requirement.
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-muted-foreground mb-1">ANALYSIS</div>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Claim 4 asserts that a 14-day duration satisfies a condition defined as 30 days in Claim 2. These claims are logically incompatible.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
