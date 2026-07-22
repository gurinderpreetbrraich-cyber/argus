import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Copy, Download, Code, Layout as LayoutIcon, CheckCircle2, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { EXAMPLES } from '../data/examples';

const MAX_CHARS = 2000;

export default function LiveDemo() {
  const location = useLocation();
  
  // Initialize state from route location if provided (e.g. from Domains page)
  const initialExample = location.state?.domain ? EXAMPLES.find(ex => ex.domain === location.state.domain) : null;
  
  const [input, setInput] = useState(initialExample?.text || '');
  const [activeExample, setActiveExample] = useState(initialExample);
  
  // Pipeline state: 'idle' | 'decomposing' | 'consistency' | 'faithfulness' | 'classifying' | 'complete' | 'error'
  const [auditState, setAuditState] = useState('idle');
  const [resultData, setResultData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [viewMode, setViewMode] = useState('ui'); // 'ui' | 'api'
  const [expandedFlags, setExpandedFlags] = useState({});

  const printableRef = useRef(null);

  const handleExampleSelect = (ex) => {
    setInput(ex.text);
    setActiveExample(ex);
    setAuditState('idle');
    setResultData(null);
  };

  const handleAudit = async () => {
    if (!input.trim() || input.length > MAX_CHARS) return;
    
    setAuditState('decomposing');
    setResultData(null);
    
    // Simulate pipeline for visual effect while request is pending
    const timers = [
      setTimeout(() => setAuditState('consistency'), 1500),
      setTimeout(() => setAuditState('faithfulness'), 3000),
      setTimeout(() => setAuditState('classifying'), 4500)
    ];

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chain: input, domain: activeExample?.domain || 'general' })
      });
      
      const resData = await response.json();
      
      if (!response.ok) {
        throw new Error(resData.error || 'API rate limit reached.');
      }

      setResultData(resData.data);
      setAuditState('complete');
    } catch (error) {
      console.error(error);
      setErrorMessage('Our demo API is currently experiencing heavy load. Please try again in a moment.');
      setAuditState('error');
    } finally {
      timers.forEach(clearTimeout);
    }
  };

  const toggleFlag = (flagId) => {
    setExpandedFlags(prev => ({...prev, [flagId]: !prev[flagId]}));
  };

  const handleCopyJSON = () => {
    if (!resultData) return;
    const apiResponse = {
      status: "success",
      data: {
        flags: resultData.flags,
        metadata: {
          total_claims_extracted: resultData.status === 'passed' ? 3 : resultData.flags[0].claims.length + 2,
          processing_time_ms: 3200
        }
      }
    };
    navigator.clipboard.writeText(JSON.stringify(apiResponse, null, 2));
    alert("Copied to clipboard!");
  };

  const handlePrint = () => {
    window.print();
  };

  // Helper to render text with highlights
  const renderHighlightedText = (text, patterns) => {
    if (!patterns || patterns.length === 0) return <span>{text}</span>;
    
    let parts = [{ text, highlight: false }];
    
    patterns.forEach(pattern => {
      let newParts = [];
      parts.forEach(part => {
        if (part.highlight) {
          newParts.push(part);
          return;
        }
        
        const idx = part.text.indexOf(pattern);
        if (idx !== -1) {
          if (idx > 0) newParts.push({ text: part.text.substring(0, idx), highlight: false });
          newParts.push({ text: pattern, highlight: true });
          if (idx + pattern.length < part.text.length) {
            newParts.push({ text: part.text.substring(idx + pattern.length), highlight: false });
          }
        } else {
          newParts.push(part);
        }
      });
      parts = newParts;
    });

    return (
      <div className="text-white/90 leading-relaxed p-4 bg-black/40 border border-white/10 rounded-xl font-body">
        {parts.map((p, i) => 
          p.highlight ? (
            <mark key={i} className="bg-red-500/30 text-white rounded px-1 -mx-1 border-b border-red-500/50">
              {p.text}
            </mark>
          ) : (
            <span key={i}>{p.text}</span>
          )
        )}
      </div>
    );
  };

  const isRunning = auditState !== 'idle' && auditState !== 'complete';

  return (
    <div className="mx-auto max-w-6xl px-6 pt-32 pb-24 md:px-12 lg:px-16 print:pt-10 print:px-0">
      
      {/* Header - Hidden on print */}
      <div className="mb-12 text-center print:hidden">
        <h1 className="animate-fade-rise font-display text-5xl md:text-6xl font-medium tracking-tight">
          Audit a reasoning chain
        </h1>
        <p className="animate-fade-rise mt-4 text-lg text-muted-foreground" style={{ animationDelay: '0.2s' }}>
          Paste a chain from any domain. Watch Argus find the logical gaps.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        
        {/* Input Panel - Hidden on print */}
        <div className="liquid-glass animate-fade-rise flex flex-col rounded-2xl p-6 print:hidden" style={{ animationDelay: '0.4s' }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-display text-2xl text-white">Input</h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-muted-foreground">4 audits remaining this hour</span>
            </div>
          </div>
          
          <div className="flex flex-col flex-1">
            <div className="flex overflow-x-auto gap-2 mb-4 pb-2 scrollbar-hide">
              {EXAMPLES.map(ex => (
                <button 
                  key={ex.name}
                  onClick={() => handleExampleSelect(ex)}
                  className={`whitespace-nowrap text-xs border rounded-full px-3 py-1 transition-colors ${
                    activeExample?.name === ex.name 
                      ? 'bg-white/20 border-white/30 text-white' 
                      : 'bg-white/5 hover:bg-white/10 border-white/10 text-white/70'
                  }`}
                >
                  {ex.name}
                </button>
              ))}
            </div>

            <textarea 
              className={`w-full flex-1 min-h-[200px] bg-black/40 border rounded-xl p-4 text-white/90 placeholder:text-white/30 focus:outline-none focus:border-white/30 resize-none font-body transition-colors ${
                input.length > MAX_CHARS ? 'border-red-500/50' : 'border-white/10'
              }`}
              placeholder="paste a reasoning chain from medicine, law, devops, or anywhere else..."
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setAuditState('idle');
              }}
              disabled={isRunning}
            ></textarea>
            
            <div className="flex justify-between items-center mt-2 mb-6">
              <span className={`text-xs ${input.length > MAX_CHARS ? 'text-red-400' : 'text-muted-foreground'}`}>
                {input.length} / {MAX_CHARS} characters
              </span>
            </div>

            <button 
              onClick={handleAudit}
              disabled={!input.trim() || input.length > MAX_CHARS || isRunning}
              className="w-full bg-white text-black rounded-xl py-3 font-medium hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-auto"
            >
              {isRunning ? 'Auditing...' : 'Run Audit'}
            </button>
          </div>
        </div>

        {/* Result Panel */}
        <div 
          ref={printableRef}
          className="liquid-glass animate-fade-rise flex flex-col rounded-2xl p-6 print:bg-white print:text-black print:border-none print:shadow-none" 
          style={{ animationDelay: '0.5s' }}
        >
          <div className="flex justify-between items-center mb-6 border-b border-white/10 print:border-black/10 pb-4">
            <h2 className="font-display text-2xl text-white print:text-black">Audit Result</h2>
            
            {/* Toolbar - Hidden on print */}
            {resultData && (
              <div className="flex gap-2 print:hidden">
                <div className="bg-black/40 rounded-lg p-1 flex border border-white/10">
                  <button 
                    onClick={() => setViewMode('ui')}
                    className={`p-1.5 rounded-md flex items-center justify-center transition-colors ${viewMode === 'ui' ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white/80'}`}
                    title="UI View"
                  >
                    <LayoutIcon size={16} />
                  </button>
                  <button 
                    onClick={() => setViewMode('api')}
                    className={`p-1.5 rounded-md flex items-center justify-center transition-colors ${viewMode === 'api' ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white/80'}`}
                    title="API View"
                  >
                    <Code size={16} />
                  </button>
                </div>
                
                <button 
                  onClick={handleCopyJSON}
                  className="p-1.5 bg-black/40 border border-white/10 rounded-lg text-white/50 hover:text-white transition-colors flex items-center justify-center"
                  title="Copy JSON"
                >
                  <Copy size={16} />
                </button>
                
                <button 
                  onClick={handlePrint}
                  className="p-1.5 bg-black/40 border border-white/10 rounded-lg text-white/50 hover:text-white transition-colors flex items-center justify-center"
                  title="Download PDF"
                >
                  <Download size={16} />
                </button>
              </div>
            )}
          </div>
          
          {/* Empty State */}
          {auditState === 'idle' && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border border-dashed border-white/10 rounded-xl bg-white/5">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                <LayoutIcon className="w-6 h-6 text-white/40" />
              </div>
              <h3 className="text-white font-medium mb-2">Awaiting Input</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Select an example from the left or paste your own reasoning chain to begin the audit pipeline.
              </p>
            </div>
          )}

          {/* Error State */}
          {auditState === 'error' && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border border-red-500/20 rounded-xl bg-red-500/5">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4 border border-red-500/20">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-white font-medium mb-2">Audit Failed</h3>
              <p className="text-sm text-muted-foreground max-w-xs mb-6">
                {errorMessage}
              </p>
              <button 
                onClick={handleAudit}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-colors border border-white/10"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Loading Pipeline & Skeleton */}
          {isRunning && auditState !== 'error' && (
            <div className="flex-1 flex flex-col h-full">
              {/* Progress Steps */}
              <div className="flex flex-col gap-5 mb-8 pb-6 border-b border-white/10">
                {[
                  { id: 'decomposing', label: 'Decompose' },
                  { id: 'consistency', label: 'Consistency' },
                  { id: 'faithfulness', label: 'Faithful' },
                  { id: 'classifying', label: 'Classify' }
                ].map((step) => {
                  const states = ['idle', 'decomposing', 'consistency', 'faithfulness', 'classifying', 'complete'];
                  const currentIndex = states.indexOf(auditState);
                  const stepIndex = states.indexOf(step.id);
                  
                  let status = 'waiting';
                  if (currentIndex > stepIndex) status = 'done';
                  if (currentIndex === stepIndex) status = 'active';

                  return (
                    <div key={step.id} className="flex items-center gap-4">
                      {status === 'done' && <CheckCircle2 className="text-green-500 w-5 h-5 shrink-0" />}
                      {status === 'active' && <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white animate-spin shrink-0"></div>}
                      {status === 'waiting' && <div className="w-5 h-5 rounded-full border-2 border-white/10 shrink-0"></div>}
                      <span className={`text-sm uppercase tracking-wider font-medium transition-colors ${status === 'active' ? 'text-white' : status === 'done' ? 'text-white/70' : 'text-white/30'}`}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Skeleton UI */}
              <div className="space-y-6 flex-1 opacity-50 animate-pulse">
                <div className="h-16 bg-white/5 rounded-lg border border-white/5 w-full"></div>
                <div>
                  <div className="h-3 bg-white/10 rounded w-24 mb-3"></div>
                  <div className="h-24 bg-white/5 rounded-xl border border-white/5 w-full"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-20 bg-white/5 rounded-xl border border-white/5 w-full"></div>
                  <div className="h-20 bg-white/5 rounded-xl border border-white/5 w-full"></div>
                </div>
              </div>
            </div>
          )}

          {/* Result Completed */}
          {auditState === 'complete' && resultData && (
            <div className="flex-1 flex flex-col h-full overflow-y-auto">
              {viewMode === 'ui' ? (
                <div className="space-y-6">
                  {/* Status Banner */}
                  {resultData.status === 'passed' ? (
                    <div className="bg-green-500/10 border border-green-500/20 text-green-400 print:bg-green-100 print:text-green-800 print:border-green-300 rounded-lg p-4 flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <div>
                        <div className="font-medium">No issues found</div>
                        <div className="text-xs opacity-80 mt-0.5">The reasoning chain is logically sound and faithful.</div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 print:bg-red-100 print:text-red-800 print:border-red-300 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 shrink-0" />
                        <div>
                          <div className="font-medium">{resultData.flags.length} Issue{resultData.flags.length > 1 ? 's' : ''} Detected</div>
                          <div className="text-xs opacity-80 mt-0.5">Logical fallacies found in the reasoning chain.</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Inline Highlights (Only shown if there are flags) */}
                  {resultData.status === 'flagged' && (
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Source Analysis</div>
                      {renderHighlightedText(input, resultData.flags.map(f => f.highlightPatterns).flat())}
                    </div>
                  )}

                  {/* Flag Details */}
                  {resultData.flags?.map((flag) => (
                    <div key={flag.id} className="border border-red-500/20 bg-red-500/5 print:border-red-300 rounded-xl overflow-hidden">
                      <button 
                        onClick={() => toggleFlag(flag.id)}
                        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors print:hidden"
                      >
                        <div className="flex items-center gap-3">
                          <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wider">
                            {flag.type}
                          </span>
                          <span className="bg-white/10 text-white/70 px-2 py-0.5 rounded text-xs font-medium capitalize">
                            {flag.severity} Severity
                          </span>
                        </div>
                        {expandedFlags[flag.id] ? <ChevronUp size={16} className="text-white/50" /> : <ChevronDown size={16} className="text-white/50" />}
                      </button>
                      
                      {/* Print view always shows expanded content */}
                      <div className={`${expandedFlags[flag.id] ? 'block' : 'hidden'} print:block p-4 border-t border-red-500/20 print:border-red-200 bg-black/20 print:bg-transparent`}>
                        <div className="text-sm text-white/90 print:text-black mb-4">
                          <span className="font-medium text-white print:text-black block mb-1">Reasoning:</span>
                          {flag.explanation}
                        </div>
                        
                        <div className="space-y-2">
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Conflicting Claims</span>
                          {flag.claims.map(c => (
                            <div key={c.id} className="flex gap-3 text-sm text-white/70 print:text-black bg-white/5 print:bg-gray-100 p-2 rounded">
                              <span className="font-mono text-xs text-white/40 print:text-black/50 shrink-0 mt-0.5">{c.id.toUpperCase()}</span>
                              <span>{c.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* API View */
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Request</div>
                    <div className="bg-black/60 border border-white/10 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-xs font-mono text-white/80">
{`POST /v1/audit
Content-Type: application/json

{
  "chain": "${input.substring(0, 50)}...",
  "domain": "${activeExample?.domain || 'general'}"
}`}
                      </pre>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Response</div>
                    <div className="bg-black/60 border border-white/10 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-xs font-mono text-white/80">
{JSON.stringify({
  status: "success",
  data: {
    flags: resultData.flags,
    metadata: {
      total_claims_extracted: resultData.status === 'passed' ? 3 : resultData.flags[0].claims.length + 2,
      processing_time_ms: 3200
    }
  }
}, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
