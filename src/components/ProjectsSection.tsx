import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ShieldCheck, 
  Bug, 
  ExternalLink, 
  CheckCircle2, 
  X, 
  Layers, 
  BarChart3,
  Calendar,
  Building2
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { ProjectItem } from '../types';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="py-20 bg-[#070e1c] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
            01 — Selected QA Projects & Audits
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-display tracking-tight">
            Production Case Studies & Verification Work
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Real enterprise software quality assurance engagements. From multi-ton industrial ERP dispatch flows to commercial client web applications.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="group bg-[#0b1424] border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-300 flex flex-col shadow-xl"
            >
              {/* Project Image Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-900 border-b border-slate-800">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                
                {/* Organization tag unboxed */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#070e1a]/90 backdrop-blur-md border border-slate-700/80 text-[11px] font-medium text-slate-200 flex items-center gap-1.5">
                  <Building2 className="w-3 h-3 text-cyan-400" />
                  <span>{project.company}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                
                <div>
                  {/* Category text (unboxed) */}
                  <div className="text-xs font-semibold text-cyan-400 font-mono mb-1">
                    {project.category}
                  </div>

                  <h3 className="text-lg font-bold text-white font-display leading-snug group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>
                </div>

                {/* Proof Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                  {project.impactMetrics.slice(0, 2).map((m, idx) => (
                    <div key={idx} className="bg-slate-900/60 p-2 rounded-lg border border-slate-800/60">
                      <span className="block text-[10px] text-slate-400">{m.label}</span>
                      <strong className="text-xs font-mono font-bold text-slate-200 tabular-nums">
                        {m.value}
                      </strong>
                    </div>
                  ))}
                </div>

                {/* Tools (Clean text line, no pills) */}
                <div className="text-[11px] text-slate-400 truncate border-t border-slate-800/80 pt-2">
                  <span className="text-slate-400 font-medium">Stack: </span>
                  {project.toolsUsed.join(' · ')}
                </div>

                {/* Trigger Modal CTA */}
                <div className="pt-2">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/70 rounded-xl transition-colors group-hover:border-cyan-500/50"
                  >
                    <span>Read Full QA Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Full Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl bg-[#0b1424] border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            {/* Modal Top Bar */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4 mb-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                  <span>{selectedProject.company}</span>
                  <span aria-hidden="true" className="text-slate-600">/</span>
                  <span className="text-slate-300">{selectedProject.category}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                  {selectedProject.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {selectedProject.subtitle}
                </p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Impact Metric Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {selectedProject.impactMetrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="block text-[11px] text-slate-400">{m.label}</span>
                  <strong className="text-base sm:text-lg font-bold font-mono text-cyan-400 tabular-nums">
                    {m.value}
                  </strong>
                </div>
              ))}
            </div>

            {/* Challenge & Solution Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs">
              <div className="p-4 rounded-xl bg-[#080e19] border border-slate-800">
                <h4 className="font-bold text-slate-200 font-mono uppercase text-[11px] mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span>The Business Challenge</span>
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  {selectedProject.challenge}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#080e19] border border-slate-800">
                <h4 className="font-bold text-slate-200 font-mono uppercase text-[11px] mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>QA Strategy & Implementation</span>
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  {selectedProject.solution}
                </p>
              </div>
            </div>

            {/* Testing Scope */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2 font-mono">
                Verification Scope & Test Scenarios Covered
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                {selectedProject.testingScope.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>

            {/* Sample Defects Caught */}
            <div className="mb-6 p-4 rounded-xl bg-rose-500/5 border border-rose-500/20">
              <h4 className="text-xs font-bold text-rose-300 font-mono uppercase mb-2 flex items-center gap-2">
                <Bug className="w-3.5 h-3.5" />
                <span>Critical Anomalies Uncovered Prior to Production</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                {selectedProject.sampleBugsUncovered.map((bug, idx) => (
                  <li key={idx} className="leading-relaxed">{bug}</li>
                ))}
              </ul>
            </div>

            {/* Tools Used */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="text-slate-400">
                <strong className="text-slate-200">Tools & Frameworks:</strong>{' '}
                {selectedProject.toolsUsed.join(', ')}
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors"
              >
                Close Case Study
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
