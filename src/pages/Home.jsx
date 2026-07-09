import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover"
        style={{ objectPosition: '70% center' }}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4"
      />

      {/* Hero Content */}
      <div className="relative z-10 w-full px-6 pt-32 pb-40 md:px-12 lg:px-16 flex flex-col justify-center h-full">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <h1 className="animate-fade-rise font-display text-5xl font-medium leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Every reasoning chain, <br className="hidden sm:block" />
            <span className="text-muted-foreground">watched closely.</span>
          </h1>

          <p className="mt-6 mb-10 max-w-2xl animate-fade-rise text-base leading-relaxed text-white/80 sm:text-lg md:text-xl" style={{ animationDelay: '0.2s' }}>
            Argus audits the reasoning behind every AI-generated answer - surfacing contradictions, unfaithful conclusions, and quietly misleading logic, in any domain, without retraining.
          </p>
          
          <Link 
            to="/demo"
            className="liquid-glass animate-fade-rise inline-flex items-center justify-center rounded-full px-14 py-5 text-base font-medium text-white transition-transform hover:scale-[1.03]"
            style={{ animationDelay: '0.4s' }}
          >
            Try the demo
          </Link>
        </div>
      </div>
    </div>
  );
}
