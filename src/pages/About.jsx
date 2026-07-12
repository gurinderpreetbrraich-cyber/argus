import React from 'react';
import { Mail } from 'lucide-react';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

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
                <GithubIcon /> GitHub
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-2 rounded-lg transition-colors text-sm font-medium text-white"
              >
                <LinkedinIcon /> LinkedIn
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
