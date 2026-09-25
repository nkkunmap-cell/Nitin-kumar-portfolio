/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveQASandbox } from './components/InteractiveQASandbox';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ReconciliationTool } from './components/ReconciliationTool';
import { TestCaseMatrix } from './components/TestCaseMatrix';
import { DefectReportGenerator } from './components/DefectReportGenerator';
import { SkillsSection } from './components/SkillsSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { TestSeverity } from './types';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [preloadedBug, setPreloadedBug] = useState<{
    title: string;
    module: string;
    severity: TestSeverity;
    steps: string[];
    expected: string;
    actual: string;
  } | null>(null);

  const handlePreloadBug = (bug: {
    title: string;
    module: string;
    severity: TestSeverity;
    steps: string[];
    expected: string;
    actual: string;
  }) => {
    setPreloadedBug(bug);
    // Smooth scroll down to defect generator
    const el = document.getElementById('defect-generator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#060b14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Top 3-Zone Bar */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenResume={() => setIsResumeOpen(true)} />

        {/* Interactive QA Sandbox & Bug Lab */}
        <InteractiveQASandbox onPreloadBugReport={handlePreloadBug} />

        {/* Selected QA Case Studies */}
        <ProjectsSection />

        {/* Professional Experience at Hyglow & All in One */}
        <ExperienceSection />

        {/* Signature Hyglow Workflow: Challan vs Invoice Reconciliation Tool */}
        <ReconciliationTool />

        {/* Production Test Case Matrix & Repository */}
        <TestCaseMatrix />

        {/* Defect Lifecycle & JIRA Ticket Generator */}
        <DefectReportGenerator initialBug={preloadedBug} />

        {/* Testing Mindset & Skills Matrix */}
        <SkillsSection />

        {/* Academic Credentials (BCA & Diploma) */}
        <EducationSection />

        {/* Contact & Inquiry */}
        <ContactSection />
      </main>

      {/* Clean Footer */}
      <Footer onOpenResume={() => setIsResumeOpen(true)} />

      {/* Printable / Downloadable Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
