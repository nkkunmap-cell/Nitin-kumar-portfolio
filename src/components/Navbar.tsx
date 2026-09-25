import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'QA Lab', href: '#qa-sandbox' },
    { name: 'Test Matrix', href: '#test-matrix' },
    { name: 'Reconciliation', href: '#reconciliation' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#070d18]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-3'
          : 'bg-transparent border-b border-slate-800/40 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Zone 1: Single text element Brand Zone */}
          <a
            href="#home"
            className="text-xl font-bold tracking-tight text-white hover:text-cyan-400 transition-colors flex items-center gap-2 group font-display"
          >
            <span>Nitin Kumar</span>
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" />
          </a>

          {/* Zone 2: Clean 4-6 text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-cyan-400 transition-colors relative py-1 text-[13px] tracking-wide"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Resume</span>
            </button>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 rounded-lg transition-all shadow-sm shadow-cyan-500/20 whitespace-nowrap"
            >
              <span>Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenResume}
              className="p-1.5 text-xs text-slate-300 bg-slate-800/80 rounded-md border border-slate-700"
              aria-label="View Resume"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#070e1b] border-b border-slate-800 px-4 pt-3 pb-6 mt-3 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-900/60 rounded-md transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-800/80 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="flex-1 py-2 text-center text-xs font-semibold text-slate-200 bg-slate-800 rounded-lg border border-slate-700"
            >
              View Resume
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2 text-center text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg"
            >
              Get In Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
