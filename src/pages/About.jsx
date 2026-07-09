import React from 'react';

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-32 pb-24 md:px-12 lg:px-16 font-body">
      <div className="mb-12">
        <h1 className="animate-fade-rise font-display text-4xl sm:text-5xl font-medium tracking-tight mb-4">
          About Argus
        </h1>
      </div>

      <div className="liquid-glass animate-fade-rise rounded-2xl p-8 sm:p-12" style={{ animationDelay: '0.2s' }}>
        <div className="space-y-6 text-white/80 leading-relaxed text-lg">
          <p>
            Argus audits the reasoning chains produced by large language models, flagging contradictions, unfaithful conclusions, and deceptive reasoning patterns. It was built on the premise that in high-stakes settings like medicine or law, trusting the final answer isn't enough—the reasoning path to that answer must be verifiable.
          </p>
          
          <div className="pt-6 border-t border-white/10 mt-8">
            <h3 className="text-white font-medium mb-2 text-xl font-display">Author</h3>
            <p className="mb-6">
              Built by CodeHolic, a first-year Computer Science student at Thapar Institute of Engineering and Technology (TIET).
            </p>
            
            <div className="flex gap-4">
              <a href="https://github.com/CodeHolic" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg transition-colors text-sm font-medium text-white">
                GitHub
              </a>
              <a href="mailto:contact@example.com" className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg transition-colors text-sm font-medium text-white">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
