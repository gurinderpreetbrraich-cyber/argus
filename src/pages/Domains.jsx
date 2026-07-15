import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search, Code2, CheckCircle2, FlaskConical } from 'lucide-react';
import { EXAMPLES } from '../data/examples';

export default function Domains() {
  const navigate = useNavigate();
  const [customDomain, setCustomDomain] = useState('');

  const handleDomainTest = (domainId) => {
    navigate('/demo', { state: { domain: domainId } });
  };

  const handleCustomDomainSubmit = (e) => {
    e.preventDefault();
    if (customDomain.trim()) {
      navigate('/demo');
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 pt-32 pb-24 md:px-12 lg:px-16 font-body">
      <div className="mb-16 text-center max-w-3xl mx-auto">
        <h1 className="animate-fade-rise font-display text-4xl sm:text-5xl font-medium tracking-tight text-white mb-6">
          Built for any domain, tuned for none
        </h1>
        <p className="animate-fade-rise text-lg text-white/70 leading-relaxed" style={{ animationDelay: '0.2s' }}>
          Adding a domain lens is a configuration change, not a model rebuild. A lens simply provides a glossary, calibration examples, and severity weighting for a specific audience.
        </p>
      </div>

      {/* Domain Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
        {EXAMPLES.map((domain, index) => (
          <div 
            key={domain.name}
            onClick={() => handleDomainTest(domain.domain)}
            className="liquid-glass group animate-fade-rise cursor-pointer flex flex-col rounded-2xl p-6 transition-all hover:-translate-y-1 hover:bg-white/10"
            style={{ animationDelay: `${0.3 + index * 0.05}s` }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-2xl text-white">{domain.name}</h3>
              {domain.benchmarked ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 size={12} /> Benchmarked
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-400 border border-blue-500/20">
                  <FlaskConical size={12} /> Zero-shot
                </span>
              )}
            </div>
            
            <div className="flex-grow">
              <p className="text-sm text-white/80 leading-relaxed italic border-l-2 border-white/20 pl-3 mb-4 line-clamp-4">
                "{domain.text}"
              </p>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-white/50 mb-1">Common Failure</span>
                <span className="text-xs font-medium text-white/90">{domain.commonFailure}</span>
              </div>
              <ArrowRight size={16} className="text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-white" />
            </div>
          </div>
        ))}
      </div>

      {/* Free-text Domain Tester */}
      <div className="animate-fade-rise max-w-2xl mx-auto mb-24" style={{ animationDelay: '0.8s' }}>
        <div className="liquid-glass rounded-2xl p-8 text-center">
          <h3 className="text-xl font-display text-white mb-2">Don't see your domain?</h3>
          <p className="text-white/60 text-sm mb-6">Test the domain-agnostic engine on any unlisted field.</p>
          
          <form onSubmit={handleCustomDomainSubmit} className="relative flex items-center">
            <Search className="absolute left-4 text-white/40" size={18} />
            <input 
              type="text" 
              placeholder="e.g. Supply Chain, Cybersecurity, Agronomy..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-32 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
            />
            <button 
              type="submit"
              className="absolute right-2 bg-white text-black hover:bg-white/90 px-6 py-2.5 rounded-full text-sm font-medium transition-colors"
            >
              Test It
            </button>
          </form>
        </div>
      </div>

      {/* Under the Hood / Developer Snippet */}
      <div className="animate-fade-rise max-w-4xl mx-auto" style={{ animationDelay: '0.9s' }}>
        <div className="flex items-center gap-3 mb-6 pl-2">
          <div className="bg-white/10 p-2 rounded-lg">
            <Code2 size={20} className="text-white" />
          </div>
          <h2 className="text-2xl font-display text-white">Under the Hood: Domain Lenses</h2>
        </div>
        
        <div className="liquid-glass rounded-2xl overflow-hidden border border-white/10">
          <div className="bg-black/40 px-4 py-3 border-b border-white/5 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
            </div>
            <span className="text-xs text-white/40 font-mono ml-2">argus-medical-lens.json</span>
          </div>
          <div className="p-6 overflow-x-auto">
            <pre className="text-sm font-mono leading-relaxed">
              <code className="text-white/80">
<span className="text-pink-400">{"{"}</span>
<br/>  <span className="text-blue-300">"domain"</span>: <span className="text-green-300">"medical"</span>,
<br/>  <span className="text-blue-300">"overrides"</span>: <span className="text-pink-400">{"{"}</span>
<br/>    <span className="text-blue-300">"glossary"</span>: <span className="text-yellow-300">[</span>
<br/>      <span className="text-pink-400">{"{"}</span> <span className="text-blue-300">"term"</span>: <span className="text-green-300">"hypotension"</span>, <span className="text-blue-300">"implies"</span>: <span className="text-green-300">"low blood pressure"</span> <span className="text-pink-400">{"}"}</span>,
<br/>      <span className="text-pink-400">{"{"}</span> <span className="text-blue-300">"term"</span>: <span className="text-green-300">"contraindicated"</span>, <span className="text-blue-300">"implies"</span>: <span className="text-green-300">"harmful / must not be used"</span> <span className="text-pink-400">{"}"}</span>
<br/>    <span className="text-yellow-300">]</span>,
<br/>    <span className="text-blue-300">"severity_weights"</span>: <span className="text-pink-400">{"{"}</span>
<br/>      <span className="text-blue-300">"contradiction"</span>: <span className="text-purple-300">1.0</span>, <span className="text-white/40">// Fatal in medical context</span>
<br/>      <span className="text-blue-300">"unsupported_leap"</span>: <span className="text-purple-300">0.8</span>
<br/>    <span className="text-pink-400">{"}"}</span>,
<br/>    <span className="text-blue-300">"calibration_prompts"</span>: <span className="text-yellow-300">[</span>
<br/>      <span className="text-green-300">"Assume clinical setting. Prioritize patient safety over efficacy."</span>
<br/>    <span className="text-yellow-300">]</span>
<br/>  <span className="text-pink-400">{"}"}</span>
<br/><span className="text-pink-400">{"}"}</span>
              </code>
            </pre>
          </div>
        </div>
        <p className="mt-4 text-sm text-white/50 pl-2">
          The core engine remains identical across domains. A domain lens is just a JSON configuration injected at inference time to calibrate the underlying taxonomy.
        </p>
      </div>

    </div>
  );
}
