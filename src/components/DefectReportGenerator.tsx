import React, { useState } from 'react';
import { 
  Bug, 
  Copy, 
  Check, 
  Terminal, 
  Sparkles, 
  AlertOctagon, 
  RotateCcw,
  CheckCircle2,
  FileCode2
} from 'lucide-react';
import { BUG_REPORTS } from '../data/portfolioData';
import { BugReport, TestSeverity } from '../types';

interface DefectReportGeneratorProps {
  initialBug?: {
    title: string;
    module: string;
    severity: TestSeverity;
    steps: string[];
    expected: string;
    actual: string;
  } | null;
}

export const DefectReportGenerator: React.FC<DefectReportGeneratorProps> = ({ initialBug }) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('BUG-402');
  
  // Custom or active editable bug fields
  const [title, setTitle] = useState(
    initialBug?.title || BUG_REPORTS[0].title
  );
  const [module, setModule] = useState(
    initialBug?.module || BUG_REPORTS[0].module
  );
  const [severity, setSeverity] = useState<TestSeverity>(
    initialBug?.severity || BUG_REPORTS[0].severity
  );
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>(
    BUG_REPORTS[0].priority
  );
  const [environment, setEnvironment] = useState(
    BUG_REPORTS[0].environment
  );
  const [steps, setSteps] = useState<string>(
    initialBug ? initialBug.steps.join('\n') : BUG_REPORTS[0].stepsToReproduce.join('\n')
  );
  const [expected, setExpected] = useState(
    initialBug?.expected || BUG_REPORTS[0].expectedBehavior
  );
  const [actual, setActual] = useState(
    initialBug?.actual || BUG_REPORTS[0].actualBehavior
  );
  
  const [copyFormat, setCopyFormat] = useState<'jira' | 'markdown' | 'slack'>('jira');
  const [copied, setCopied] = useState(false);

  // Sync if initialBug passed from QA sandbox
  React.useEffect(() => {
    if (initialBug) {
      setTitle(initialBug.title);
      setModule(initialBug.module);
      setSeverity(initialBug.severity);
      setSteps(initialBug.steps.join('\n'));
      setExpected(initialBug.expected);
      setActual(initialBug.actual);
    }
  }, [initialBug]);

  // Load a preset
  const handleLoadPreset = (bug: BugReport) => {
    setSelectedPresetId(bug.id);
    setTitle(bug.title);
    setModule(bug.module);
    setSeverity(bug.severity);
    setPriority(bug.priority);
    setEnvironment(bug.environment);
    setSteps(bug.stepsToReproduce.join('\n'));
    setExpected(bug.expectedBehavior);
    setActual(bug.actualBehavior);
  };

  // Generate output text based on format
  const generateFormattedText = () => {
    const stepsArray = steps.split('\n').filter(s => s.trim().length > 0);

    if (copyFormat === 'jira') {
      return `h3. [DEFECT] ${title}
*Module:* ${module}
*Severity:* ${severity} | *Priority:* ${priority}
*Environment:* ${environment}
*Detected By:* Nitin Kumar (Software QA)

h4. Steps to Reproduce:
${stepsArray.map((s, idx) => `# ${s}`).join('\n')}

h4. Expected Result:
${expected}

h4. Actual Result:
${actual}

h4. QA Sign-off Requirement:
Regression verification on Staging build required before production merge.`;
    }

    if (copyFormat === 'markdown') {
      return `### [DEFECT] ${title}
**Module:** ${module}  
**Severity:** \`${severity}\` | **Priority:** \`${priority}\`  
**Environment:** \`${environment}\`  
**Reported By:** Nitin Kumar (QA Engineer)

#### 📋 Steps to Reproduce:
${stepsArray.map((s, idx) => `${idx + 1}. ${s}`).join('\n')}

#### ✅ Expected Behavior:
${expected}

#### ❌ Actual Behavior:
${actual}

---
*Verified against ISTQB test standards & SDLC guidelines.*`;
    }

    // Slack format
    return `🚨 *BUG REPORT:* ${title}
• *Module:* ${module}
• *Severity:* ${severity} | *Priority:* ${priority}
• *Environment:* ${environment}
• *Steps:*
${stepsArray.map((s, idx) => `  ${idx + 1}. ${s}`).join('\n')}
• *Expected:* ${expected}
• *Actual:* ${actual}
_Reported by Nitin Kumar (QA)_`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateFormattedText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="defect-generator" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
              Defect Lifecycle & JIRA Standards
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-display tracking-tight">
              Defect Report & Jira Ticket Generator
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Nitin documents reproducible, high-context bug reports that eliminate back-and-forth communication between engineering and QA teams.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 mr-1">Load Real Bugs:</span>
            {BUG_REPORTS.map((b) => (
              <button
                key={b.id}
                onClick={() => handleLoadPreset(b)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  selectedPresetId === b.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                {b.id} ({b.module})
              </button>
            ))}
          </div>
        </div>

        {/* Generator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Form Editor (7 cols) */}
          <div className="lg:col-span-7 bg-[#0b1322] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 text-xs">
            
            {/* Title */}
            <div>
              <label className="block text-slate-400 font-medium mb-1 font-mono uppercase text-[11px]">
                Defect Title / Summary
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#080e19] border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-400 text-xs font-medium"
              />
            </div>

            {/* Row 2: Module, Severity, Priority */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-400 font-medium mb-1 font-mono text-[11px]">
                  Component / Module
                </label>
                <input
                  type="text"
                  value={module}
                  onChange={(e) => setModule(e.target.value)}
                  className="w-full bg-[#080e19] border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-400 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1 font-mono text-[11px]">
                  Severity
                </label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as TestSeverity)}
                  className="w-full bg-[#080e19] border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-400 text-xs"
                >
                  <option value="Critical">Critical (Blocker)</option>
                  <option value="Major">Major</option>
                  <option value="Minor">Minor</option>
                  <option value="Cosmetic">Cosmetic</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1 font-mono text-[11px]">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as 'High' | 'Medium' | 'Low')}
                  className="w-full bg-[#080e19] border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-400 text-xs"
                >
                  <option value="High">High (Immediate)</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            {/* Environment */}
            <div>
              <label className="block text-slate-400 font-medium mb-1 font-mono text-[11px]">
                Environment Details
              </label>
              <input
                type="text"
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
                className="w-full bg-[#080e19] border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-400 text-xs font-mono"
              />
            </div>

            {/* Steps to Reproduce */}
            <div>
              <label className="block text-slate-400 font-medium mb-1 font-mono text-[11px]">
                Steps to Reproduce (1 step per line)
              </label>
              <textarea
                rows={4}
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                className="w-full bg-[#080e19] border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-400 text-xs font-mono leading-relaxed"
              />
            </div>

            {/* Expected vs Actual */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-medium mb-1 font-mono text-[11px]">
                  Expected Behavior
                </label>
                <textarea
                  rows={3}
                  value={expected}
                  onChange={(e) => setExpected(e.target.value)}
                  className="w-full bg-[#080e19] border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-400 text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1 font-mono text-[11px]">
                  Actual Observed Behavior
                </label>
                <textarea
                  rows={3}
                  value={actual}
                  onChange={(e) => setActual(e.target.value)}
                  className="w-full bg-[#080e19] border border-slate-700 rounded-lg px-3 py-2 text-rose-300 focus:outline-none focus:border-cyan-400 text-xs leading-relaxed"
                />
              </div>
            </div>

          </div>

          {/* Formatted Output Preview (5 cols) */}
          <div className="lg:col-span-5 flex flex-col bg-[#0b1322] border border-slate-800 rounded-2xl p-6 shadow-xl">
            
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-white font-mono">
                  EXPORT FORMAT
                </span>
              </div>

              {/* Format Switcher */}
              <div className="flex items-center gap-1 p-0.5 bg-slate-900 rounded-lg border border-slate-800">
                <button
                  onClick={() => setCopyFormat('jira')}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
                    copyFormat === 'jira' ? 'bg-slate-800 text-cyan-300' : 'text-slate-400'
                  }`}
                >
                  Jira
                </button>
                <button
                  onClick={() => setCopyFormat('markdown')}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
                    copyFormat === 'markdown' ? 'bg-slate-800 text-cyan-300' : 'text-slate-400'
                  }`}
                >
                  Markdown
                </button>
                <button
                  onClick={() => setCopyFormat('slack')}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
                    copyFormat === 'slack' ? 'bg-slate-800 text-cyan-300' : 'text-slate-400'
                  }`}
                >
                  Slack
                </button>
              </div>
            </div>

            {/* Code Output Box */}
            <div className="flex-1 bg-[#070d17] border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 overflow-y-auto max-h-[380px] leading-relaxed whitespace-pre-wrap select-all">
              {generateFormattedText()}
            </div>

            {/* Copy CTA */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Ready to paste into Jira / GitHub / Slack
              </span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-md shadow-cyan-500/15"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-slate-950" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-950" />
                    <span>Copy Formatted Ticket</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
