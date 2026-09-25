import React from 'react';
import { Briefcase, Building, Calendar, CheckCircle2, ChevronRight, Award } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
            02 — Career Journey & Impact
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-display tracking-tight">
            Professional Experience
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Demonstrated track record of delivering defect-free ERP software releases and business-critical workflow verifications.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-8 max-w-4xl">
          {EXPERIENCES.map((exp, index) => (
            <div
              key={exp.company}
              className="relative bg-[#0b1322] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl hover:border-slate-700 transition-colors"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-800/80 pb-5 mb-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono mb-1">
                    {exp.isCurrent ? (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                        CURRENT POSITION
                      </span>
                    ) : (
                      <span className="text-slate-400">PREVIOUS TENURE</span>
                    )}
                    <span aria-hidden="true" className="text-slate-700">·</span>
                    <span className="text-slate-400">{exp.location}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                    {exp.role}
                  </h3>

                  <div className="text-sm font-semibold text-cyan-400 mt-0.5">
                    {exp.company} <span className="text-slate-400 font-normal">({exp.department})</span>
                  </div>
                </div>

                <div className="text-xs font-mono font-medium text-slate-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 shrink-0 self-start">
                  {exp.period}
                </div>
              </div>

              {/* Summary Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                {exp.description}
              </p>

              {/* Key Responsibilities */}
              <div className="mb-5">
                <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3 font-mono">
                  Core Responsibilities & Workflows
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {exp.keyResponsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Achievements */}
              <div className="mb-5 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <h4 className="text-xs font-bold text-emerald-400 font-mono uppercase mb-2 flex items-center gap-2">
                  <Award className="w-3.5 h-3.5" />
                  <span>Key Measurable Outcomes</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {exp.achievements.map((ach, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Domain & Tool tags (Unboxed metadata with separators) */}
              <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-y-1 gap-x-2 text-[11px] text-slate-400">
                <span className="font-semibold text-slate-300">Domains & Tools:</span>
                {exp.toolsAndDomains.map((t, idx) => (
                  <React.Fragment key={t}>
                    <span className="text-slate-400">{t}</span>
                    {idx < exp.toolsAndDomains.length - 1 && (
                      <span aria-hidden="true" className="text-slate-700">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
