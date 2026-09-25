import React from 'react';
import { ArrowDown, CheckCircle, ShieldCheck, Bug, Sparkles, Download, ArrowUpRight, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  return (
    <section id="home" className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden">
      {/* Subtle atmospheric ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-gradient-to-tr from-cyan-600/10 via-sky-500/10 to-indigo-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle hairline technical grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Narrative & Intent (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status & Focus Kicker (Unboxed clean text) */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 font-semibold">Available for QA Opportunities</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300">Hyglow Industries</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300">All in One Software Solution</span>
            </div>

            {/* Dominant Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display leading-[1.08] text-balance">
                High-precision software testing &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300">
                  ERP workflow validation.
                </span>
              </h1>
            </div>

            {/* Concise Bio / Proposition */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Hi, I’m <strong className="text-white font-semibold">Nitin Kumar</strong>. I specialize in finding boundary defects, auditing complex dispatch reconciliations, and ensuring manufacturing ERP software behaves reliably under real-world pressure.
            </p>

            {/* Unboxed Metadata Highlights (No pills) */}
            <div className="pt-1 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-400 border-l-2 border-cyan-500/40 pl-3">
              <span>BCA Graduate</span>
              <span aria-hidden="true" className="text-slate-700">/</span>
              <span>Diploma in Information Technology</span>
              <span aria-hidden="true" className="text-slate-700">/</span>
              <span>Manual & Functional QA</span>
              <span aria-hidden="true" className="text-slate-700">/</span>
              <span>Challan & GST Invoice Reconciliation</span>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <a
                href="#qa-sandbox"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 rounded-xl transition-all shadow-md shadow-cyan-500/15"
              >
                <Bug className="w-4 h-4 text-slate-950" />
                <span>Test Live QA Simulator</span>
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 rounded-xl transition-colors"
              >
                <span>View Case Studies</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Resume Preview</span>
              </button>
            </div>

            {/* Proof Metrics (Strictly adjacent to claims) */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {PERSONAL_INFO.metrics.map((metric, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-xl sm:text-2xl font-bold text-white font-mono tabular-nums tracking-tight">
                    {metric.value}
                  </div>
                  <div className="text-xs font-medium text-slate-400 leading-snug">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Visual Portrait & Engineering Profile Card (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Card Container with subtle hairline border and single elevation */}
              <div className="relative rounded-2xl bg-gradient-to-b from-[#0d1627] to-[#090f1d] border border-slate-800/90 p-5 shadow-2xl shadow-black/50">
                
                {/* Generated High-Resolution Photo Container */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                  <img
                    src="/src/assets/images/hero_nitin_profile_1790321167174.jpg"
                    alt="Nitin Kumar - Software Tester & QA Engineer"
                    className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback styled container if image ever encounters an issue
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  
                  {/* Bottom Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090f1d] via-transparent to-transparent opacity-60 pointer-events-none" />

                  {/* Corner QA Badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-lg bg-[#070e1c]/90 backdrop-blur-md border border-slate-700/60 text-xs">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="font-semibold text-slate-200">ISTQB & SDLC / STLC Standards</span>
                    </div>
                    <span className="font-mono text-[11px] text-cyan-400 font-semibold tabular-nums">QA 100%</span>
                  </div>
                </div>

                {/* Quick Info Grid */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="block text-[11px] font-medium text-slate-400">Current Organization</span>
                    <strong className="text-slate-100 font-semibold">Hyglow Industries</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="block text-[11px] font-medium text-slate-400">Past Experience</span>
                    <strong className="text-slate-100 font-semibold">All in One Software</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="block text-[11px] font-medium text-slate-400">Academic Credential</span>
                    <strong className="text-slate-100 font-semibold">BCA + Diploma IT</strong>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                    <span className="block text-[11px] font-medium text-slate-400">Primary Discipline</span>
                    <strong className="text-slate-100 font-semibold">ERP & Functional QA</strong>
                  </div>
                </div>

                {/* Direct quick action */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Verified Test Artifacts</span>
                  </span>
                  <a
                    href="#test-matrix"
                    className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1"
                  >
                    <span>Browse 16+ Test Cases</span>
                    <ArrowDown className="w-3 h-3" />
                  </a>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
