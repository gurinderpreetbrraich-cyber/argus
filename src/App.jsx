import React, { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black font-geist">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: '70% center' }}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4"
      />

      {/* Navbar */}
      <nav className="relative z-30 flex items-center justify-between px-6 py-5 md:px-12 lg:px-16">
        <div className="flex items-center gap-8">
          <span className="text-lg font-semibold tracking-tight text-white sm:text-xl">
            Argus
          </span>
          <div className="hidden items-center gap-6 md:flex">
            {['Home', 'Features', 'Domains', 'Demo'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm text-white/80 transition-colors hover:text-white"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
        
        {/* Desktop CTA */}
        <button className="hidden rounded-lg bg-white px-5 py-2 text-sm font-medium text-black transition-transform hover:scale-105 md:block">
          Try Live Demo
        </button>

        {/* Mobile Toggle Button */}
        <button
          onClick={toggleMenu}
          className="relative z-50 flex h-10 w-10 items-center justify-center text-white active:scale-90 md:hidden"
          aria-label="Toggle Menu"
        >
          <Menu
            className={`absolute transition-all duration-300 ${
              mobileMenuOpen ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'
            }`}
          />
          <X
            className={`absolute transition-all duration-300 ${
              mobileMenuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`absolute inset-x-0 top-0 z-20 flex flex-col justify-center bg-black/98 px-8 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen ? 'h-screen opacity-100' : 'pointer-events-none h-0 opacity-0'
        }`}
      >
        <div
          className={`flex flex-col items-start gap-6 transition-all delay-100 duration-500 ${
            mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {['Home', 'Features', 'Domains', 'Demo'].map((item) => (
            <a
              key={item}
              href="#"
              onClick={closeMenu}
              className="text-3xl font-medium text-white/90 hover:text-white"
            >
              {item}
            </a>
          ))}
          <button
            onClick={closeMenu}
            className="mt-6 rounded-full bg-white px-8 py-3.5 text-base font-medium text-black hover:scale-105"
          >
            Try Live Demo
          </button>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex h-[calc(100vh-80px)] flex-col justify-between px-6 pb-10 pt-12 sm:pb-12 sm:pt-16 md:px-12 md:pb-16 md:pt-20 lg:px-16">
        <div className="max-w-3xl">
          <div className="mb-4 inline-block animate-[fadeSlideUp_0.8s_ease_0.2s_both] text-xs text-white/90 sm:mb-6 sm:text-sm">
            Reasoning Integrity Auditor
          </div>
          <h1 className="animate-[fadeSlideUp_0.8s_ease_0.4s_both] text-3xl font-medium leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Auditing reasoning chains, <br />
            one claim at a time.
          </h1>
        </div>

        <div>
          <p className="mb-5 max-w-sm animate-[fadeSlideUp_0.8s_ease_0.7s_both] text-sm leading-relaxed text-white/60 sm:mb-6 sm:max-w-lg sm:text-base md:text-lg">
            Argus audits the reasoning chains produced by large language models — flagging contradictions, unfaithful conclusions, and deceptive patterns without domain-specific tuning.
          </p>
          <button className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform hover:scale-105 sm:px-6 sm:py-3 animate-[fadeSlideUp_0.8s_ease_0.9s_both]">
            Try Live Demo
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
