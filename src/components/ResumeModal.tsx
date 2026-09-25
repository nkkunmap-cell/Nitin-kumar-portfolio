import React from 'react';
import { X, Printer, Download, Mail, MapPin, Building, CheckCircle2, Award } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, EDUCATION_ITEMS, SKILL_CATEGORIES } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-white text-slate-900 rounded-2xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Modal Top Bar (Screen only, excluded in print) */}
        <div className="no-print flex items-center justify-between px-6 py-3.5 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Nitin_Kumar_Resume_QA.pdf</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-semibold rounded-lg transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 text-slate-800 bg-white font-sans text-xs sm:text-[13px] leading-relaxed">
          
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-4 mb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 font-display">
                NITIN KUMAR
              </h1>
              <div className="text-sm font-bold text-slate-700 font-mono mt-0.5">
                Software Tester & Quality Assurance Engineer
              </div>
              <div className="text-xs text-slate-500 mt-1">
                ERP Validation · Delivery Challan & GST Invoice Reconciliation · Manual Functional QA
              </div>
            </div>

            <div className="text-xs text-slate-600 sm:text-right space-y-0.5">
              <div>Email: <strong>{PERSONAL_INFO.email}</strong></div>
              <div>Location: {PERSONAL_INFO.location}</div>
              <div>Education: BCA + Diploma in IT</div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="mb-5">
            <h2 className="text-xs font-bold text-slate-950 uppercase tracking-wider font-mono border-b border-slate-300 pb-1 mb-2">
              Professional Summary
            </h2>
            <p className="text-slate-700 leading-relaxed text-xs">
              Quality Assurance Engineer with hands-on experience in manufacturing ERP applications, order-to-cash workflows, inventory dispatch management, and financial reconciliation. Proven ability to identify boundary defects, design rigorous test cases, and prevent billing variances between delivery challans and tax invoices.
            </p>
          </div>

          {/* Work Experience */}
          <div className="mb-5">
            <h2 className="text-xs font-bold text-slate-950 uppercase tracking-wider font-mono border-b border-slate-300 pb-1 mb-3">
              Work Experience
            </h2>

            <div className="space-y-4">
              {EXPERIENCES.map((exp) => (
                <div key={exp.company}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-950 text-xs sm:text-sm">
                      {exp.role} — <span className="text-slate-800">{exp.company}</span>
                    </span>
                    <span className="text-xs font-mono text-slate-500 font-medium">
                      {exp.period}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 italic mb-1.5">
                    {exp.department} · {exp.location}
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 text-xs">
                    {exp.keyResponsibilities.slice(0, 4).map((r, idx) => (
                      <li key={idx} className="leading-snug">{r}</li>
                    ))}
                  </ul>
                  <div className="mt-1.5 text-[11px] text-slate-600">
                    <strong>Key Achievement:</strong> {exp.achievements[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Technical & QA Competencies */}
          <div className="mb-5">
            <h2 className="text-xs font-bold text-slate-950 uppercase tracking-wider font-mono border-b border-slate-300 pb-1 mb-2">
              Core Competencies & Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              <div>
                <strong>Testing Methodologies:</strong> Manual Testing, Functional QA, Regression, Boundary Value Analysis, Smoke & Sanity Testing, Test Case Authoring, Defect Lifecycle.
              </div>
              <div>
                <strong>ERP & Business Systems:</strong> ERP Sales Orders, Delivery Challan Audits, GST Invoice Verification, BUSY Accounting, Inventory Ledger Reconciliation.
              </div>
              <div>
                <strong>Technical Tools:</strong> Microsoft Excel (VLOOKUP, Pivot Tables, Formulas), SQL Queries, Chrome DevTools, Postman, JIRA/Bug Reporting, HTML/CSS.
              </div>
              <div>
                <strong>Professional Attributes:</strong> Attention to Detail, Root-Cause Analysis, Cross-functional Developer Collaboration, High Reliability.
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="mb-5">
            <h2 className="text-xs font-bold text-slate-950 uppercase tracking-wider font-mono border-b border-slate-300 pb-1 mb-2">
              Education & Credentials
            </h2>
            <div className="space-y-2 text-xs">
              {EDUCATION_ITEMS.map((edu) => (
                <div key={edu.degree} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-950">{edu.degree}</span>
                    <span className="text-slate-600"> — {edu.institution}</span>
                    <div className="text-[11px] text-slate-500">{edu.focus}</div>
                  </div>
                  <span className="font-mono text-slate-500 text-xs shrink-0">{edu.period}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer note in print */}
          <div className="text-center pt-3 border-t border-slate-200 text-[10px] text-slate-400 font-mono">
            Nitin Kumar · Software Quality Assurance · References and verified test artifacts available upon request.
          </div>

        </div>

      </div>
    </div>
  );
};
