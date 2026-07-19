import React, { useState } from 'react';
import { NavLink, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LiquidButton } from "./ui/liquid-glass-button";
import { Starfield } from "./ui/starfield";
import { Menu, X } from 'lucide-react';

import Footer from "./Footer";

const GithubIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
  </svg>
);

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'How It Works', path: '/how-it-works' },
  { name: 'Domains', path: '/domains' },
  { name: 'Benchmark', path: '/benchmark' },
  { name: 'Docs', path: '/docs' },
  { name: 'About', path: '/about' },
];

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <div className="relative min-h-screen w-full bg-background font-body text-foreground overflow-hidden">
      {!isHome && <Starfield />}
      {/* Navbar */}
      <nav className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12 lg:px-16">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-display text-2xl tracking-tight text-white sm:text-3xl">
            Argus
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `text-[14px] transition-colors hover:text-white ${
                    isActive ? 'text-white' : 'text-muted-foreground'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
        
        {/* Desktop CTA */}
        <div className="hidden md:block">
          <LiquidButton 
            size="default"
            onClick={() => window.open('https://github.com/gurinderpreetbrraich-cyber/argus', '_blank')}
          >
            <div className="flex items-center gap-2">
              <GithubIcon size={16} />
              <span>GitHub</span>
            </div>
          </LiquidButton>
        </div>

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
        className={`fixed inset-x-0 top-0 z-40 flex flex-col justify-center bg-black/98 px-8 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen ? 'h-screen opacity-100' : 'pointer-events-none h-0 opacity-0'
        }`}
      >
        <div
          className={`flex flex-col items-start gap-6 transition-all delay-100 duration-500 ${
            mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={closeMenu}
              className="font-body text-3xl font-medium text-white/90 hover:text-white"
            >
              {item.name}
            </Link>
          ))}
          <div className="mt-6">
            <LiquidButton 
              size="lg"
              onClick={() => {
                closeMenu();
                window.open('https://github.com/gurinderpreetbrraich-cyber/argus', '_blank');
              }}
            >
              <div className="flex items-center gap-2">
                <GithubIcon size={18} />
                <span>GitHub</span>
              </div>
            </LiquidButton>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <main className="relative z-10 min-h-screen">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
