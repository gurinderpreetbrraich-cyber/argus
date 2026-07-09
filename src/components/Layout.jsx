import React, { useState } from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'How it works', path: '/how-it-works' },
  { name: 'Domains', path: '/domains' },
  { name: 'Benchmark', path: '/benchmark' },
  { name: 'Docs', path: '/docs' },
];

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <div className="relative min-h-screen w-full bg-background font-body text-foreground">
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
        <Link 
          to="/demo"
          className="hidden liquid-glass rounded-full px-5 py-2 text-sm font-medium text-white transition-transform hover:scale-[1.03] md:block"
        >
          Try the demo
        </Link>

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
          <Link
            to="/demo"
            onClick={closeMenu}
            className="liquid-glass mt-6 rounded-full px-8 py-3.5 text-base font-medium text-white hover:scale-[1.03]"
          >
            Try the demo
          </Link>
        </div>
      </div>

      {/* Page Content */}
      <main className="relative z-10 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
