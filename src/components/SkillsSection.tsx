import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, Database, Wrench, Layers } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <section id="skills" className="py-20 bg-[#070e1c] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
            03 — Capabilities & Tooling
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-display tracking-tight">
            Testing Mindset & Technical Competencies
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            A balanced synthesis of functional manual testing rigor, ERP financial workflow knowledge, and technical auditing tools.
          </p>
        </div>

        {/* Category Tabs (Segmented Control - Allowed for interactive filters) */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.category}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap ${
                activeTab === idx
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Selected Category Skill Matrix */}
        <div className="bg-[#0b1322] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          
          <div className="mb-6 border-b border-slate-800/80 pb-4">
            <h3 className="text-lg sm:text-xl font-bold text-white font-display">
              {SKILL_CATEGORIES[activeTab].category}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {SKILL_CATEGORIES[activeTab].description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SKILL_CATEGORIES[activeTab].skills.map((skill) => (
              <div
                key={skill.name}
                className="p-4 rounded-xl bg-[#080e19] border border-slate-800/90 hover:border-slate-700 transition-colors flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-slate-100 text-xs leading-snug">
                      {skill.name}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] font-mono">
                  <span className="text-slate-400">Tenure: {skill.years}</span>
                  <span className="font-bold text-cyan-400">{skill.proficiency}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Quick Testing Philosophy Callouts */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-[#0b1322] border border-slate-800/80 space-y-2">
            <div className="text-xs font-mono font-bold text-cyan-400">
              01 · DEFECT PREVENTION
            </div>
            <h4 className="text-sm font-bold text-white">
              Shift-Left & Requirement Clarity
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Reviewing functional specifications early to clarify ambiguities in business rules before code is ever written.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0b1322] border border-slate-800/80 space-y-2">
            <div className="text-xs font-mono font-bold text-cyan-400">
              02 · BOUNDARY VIGILANCE
            </div>
            <h4 className="text-sm font-bold text-white">
              Extreme Limits & Edge Cases
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Applying boundary value analysis (BVA) and negative partitions to test what happens when users enter unexpected data.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0b1322] border border-slate-800/80 space-y-2">
            <div className="text-xs font-mono font-bold text-cyan-400">
              03 · FINANCIAL RECONCILIATION
            </div>
            <h4 className="text-sm font-bold text-white">
              Zero Tolerance for Variance
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ensuring warehouse physical dispatches, GST invoices, and financial ledger postings tie out to the exact rupee.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
