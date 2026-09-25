import React from 'react';
import { ArrowUp, Mail, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050912] border-t border-slate-800/80 py-12 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/60">
          
          {/* Brand & summary */}
          <div className="space-y-1 text-center md:text-left">
            <div className="text-base font-bold text-white font-display flex items-center justify-center md:justify-start gap-2">
              <span>Nitin Kumar</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </div>
            <p className="text-xs text-slate-400">
              Software Tester & QA Engineer · Hyglow Industries & All in One Software Solution
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-300">
            <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
            <a href="#experience" className="hover:text-cyan-400 transition-colors">Experience</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#qa-sandbox" className="hover:text-cyan-400 transition-colors">QA Sandbox</a>
            <a href="#reconciliation" className="hover:text-cyan-400 transition-colors">Reconciliation</a>
            <button
              onClick={onOpenResume}
              className="hover:text-cyan-400 transition-colors"
            >
              Resume
            </button>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-xs"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} Nitin Kumar. Software Tester Portfolio & QA Test Lab.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tested & Verified UI Components</span>
            </span>
            <span>Email: {PERSONAL_INFO.email}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
