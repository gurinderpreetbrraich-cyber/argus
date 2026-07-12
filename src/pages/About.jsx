import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-32 pb-24 md:px-12 lg:px-16 font-body">
      <div className="mb-12">
        <h1 className="animate-fade-rise font-display text-4xl sm:text-5xl font-medium tracking-tight mb-4">
          About Argus
        </h1>
      </div>

      <div className="liquid-glass animate-fade-rise rounded-2xl p-8 sm:p-12 space-y-10" style={{ animationDelay: '0.2s' }}>
        
        {/* Why I Built This */}
        <section className="space-y-4">
          <h2 className="text-white font-medium text-2xl font-display">The Origin</h2>
          <div className="space-y-4 text-white/80 leading-relaxed text-lg">
            <p>
              I built Argus after noticing a recurring, dangerous pattern in modern AI: even the most advanced LLMs can confidently output logically flawed reasoning. In critical fields like medicine, law, or infrastructure, trusting a correct-sounding conclusion isn't enough—the reasoning path leading to that conclusion must be strictly verifiable.
            </p>
            <p className="font-medium text-white/90">
              Most reasoning-audit tools are built for one specific domain. Argus was built to prove that a single engine could handle any of them.
            </p>
          </div>
        </section>

        {/* Status */}
        <section className="space-y-4">
          <h2 className="text-white font-medium text-2xl font-display">Project Status</h2>
          <p className="text-white/80 leading-relaxed text-lg">
            Argus is a solo project and is actively being built. It is still in its early days—formal benchmark datasets are being finalized, and some API components are currently in development. Feedback, stress-testing, and suggestions are heavily welcomed as the pipeline matures.
          </p>
        </section>
        
        {/* Author & Contact */}
        <section className="pt-8 border-t border-white/10">
          <h2 className="text-white font-medium mb-3 text-2xl font-display">The Author</h2>
          <p className="mb-6 text-white/80 text-lg">
            Built by <span className="text-white font-medium">CodeHolic</span>, a first-year Computer Science student at Thapar Institute of Engineering and Technology (TIET).
          </p>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-8">
            <p className="text-white/90 font-medium mb-4">
              I am actively open to software engineering internships, collaborations, or technical feedback on this project.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://github.com/gurinderpreetbrraich-cyber/argus" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-2 rounded-lg transition-colors text-sm font-medium text-white"
              >
                <Github size={16} /> GitHub
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-2 rounded-lg transition-colors text-sm font-medium text-white"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
              <a 
                href="mailto:contact@example.com" 
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-2 rounded-lg transition-colors text-sm font-medium text-white"
              >
                <Mail size={16} /> Contact
              </a>
            </div>
          </div>

          {/* Built With */}
          <div className="text-sm text-white/40 mt-12 flex flex-wrap gap-x-2">
            <span>Built with React, Vite, Tailwind CSS, Lucide Icons.</span>
            <span>Audited by Google Gemini via Vercel Serverless Functions.</span>
          </div>
        </section>

      </div>
    </div>
  );
}
