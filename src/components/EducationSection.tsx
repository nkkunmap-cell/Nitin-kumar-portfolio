import React from 'react';
import { GraduationCap, Award, BookOpen, CheckCircle } from 'lucide-react';
import { EDUCATION_ITEMS } from '../data/portfolioData';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
            04 — Academic Background
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-display tracking-tight">
            Education & Technical Foundations
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Formal degrees in computer applications and information technology providing the core principles behind software quality assurance.
          </p>
        </div>

        {/* Education Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EDUCATION_ITEMS.map((edu) => (
            <div
              key={edu.degree}
              className="bg-[#0b1322] border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl hover:border-slate-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 border-b border-slate-800/80 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white font-display">
                        {edu.degree}
                      </h3>
                      <div className="text-xs text-slate-400">
                        {edu.institution}
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md shrink-0">
                    {edu.period}
                  </span>
                </div>

                <div className="text-xs font-medium text-slate-300 mb-4 leading-relaxed">
                  <strong className="text-slate-400">Focus Areas:</strong> {edu.focus}
                </div>

                <div>
                  <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 font-mono">
                    Academic Milestones & Skills
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {edu.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
