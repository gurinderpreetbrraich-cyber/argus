import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-white/10 bg-transparent py-12 px-6 md:px-12 lg:px-16 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="flex flex-col gap-4">
          <Link to="/" className="font-display text-2xl tracking-tight text-white hover:text-white/80 transition-colors">
            Argus
          </Link>
          <p className="text-muted-foreground text-sm max-w-xs">
            Every reasoning chain, watched closely. A domain-blind auditing pipeline for LLM outputs.
          </p>
        </div>

        <div className="flex flex-wrap gap-8 md:gap-16">
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-white">Product</h3>
            <Link to="/how-it-works" className="text-sm text-muted-foreground hover:text-white transition-colors">How it works</Link>
            <Link to="/domains" className="text-sm text-muted-foreground hover:text-white transition-colors">Domains</Link>
            <Link to="/benchmark" className="text-sm text-muted-foreground hover:text-white transition-colors">Benchmark</Link>
            <Link to="/demo" className="text-sm text-muted-foreground hover:text-white transition-colors">Live demo</Link>
          </div>
          
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-white">Developers</h3>
            <Link to="/docs" className="text-sm text-muted-foreground hover:text-white transition-colors">Documentation</Link>
            <a href="https://github.com/gurinderpreetbrraich-cyber/argus" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:text-white transition-colors">GitHub</a>
          </div>
          
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-white">Company</h3>
            <Link to="/about" className="text-sm text-muted-foreground hover:text-white transition-colors">About</Link>
            <a href="#" className="text-sm text-muted-foreground hover:text-white transition-colors">Twitter / X</a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Argus. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a href="#" className="text-xs text-muted-foreground hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="text-xs text-muted-foreground hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
