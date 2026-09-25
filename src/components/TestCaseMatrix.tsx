import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Search, 
  Filter, 
  Download, 
  ExternalLink, 
  Layers, 
  Terminal, 
  FileText, 
  X, 
  Copy, 
  Check, 
  AlertTriangle,
  Play
} from 'lucide-react';
import { TEST_CASES } from '../data/portfolioData';
import { TestCase, TestSeverity, TestStatus, TestModule } from '../types';

export const TestCaseMatrix: React.FC = () => {
  const [testCases, setTestCases] = useState<TestCase[]>(TEST_CASES);
  const [selectedModule, setSelectedModule] = useState<string>('All');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalCase, setActiveModalCase] = useState<TestCase | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter logic
  const filteredCases = useMemo(() => {
    return testCases.filter((tc) => {
      const matchModule = selectedModule === 'All' || tc.module === selectedModule;
      const matchSeverity = selectedSeverity === 'All' || tc.severity === selectedSeverity;
      const query = searchQuery.toLowerCase().trim();
      const matchQuery =
        !query ||
        tc.id.toLowerCase().includes(query) ||
        tc.title.toLowerCase().includes(query) ||
        tc.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchModule && matchSeverity && matchQuery;
    });
  }, [testCases, selectedModule, selectedSeverity, searchQuery]);

  // Modules list
  const modules = ['All', 'ERP Sales Orders', 'Challan & Invoicing', 'Web App QA', 'Data Reconciliation'];

  // Export to JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(filteredCases, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Nitin_Kumar_QA_Test_Cases_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Copy Test Case Markdown
  const handleCopyMarkdown = (tc: TestCase) => {
    const md = `### [${tc.id}] ${tc.title}
**Module:** ${tc.module} | **Severity:** ${tc.severity} | **Status:** ${tc.status}
**Tester:** ${tc.testedBy} (${tc.executionDate})

#### Preconditions:
${tc.preconditions.map((p) => `- ${p}`).join('\n')}

#### Test Steps:
${tc.steps.map((s, idx) => `${idx + 1}. ${s}`).join('\n')}

#### Test Data:
\`\`\`json
${JSON.stringify(tc.testData, null, 2)}
\`\`\`

#### Expected Result:
${tc.expectedResult}

#### Actual Result:
${tc.actualResult}
${tc.defectId ? `\n**Linked Defect:** ${tc.defectId}` : ''}
`;
    navigator.clipboard.writeText(md);
    setCopiedId(tc.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Toggle simulate run
  const handleSimulateRun = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTestCases((prev) =>
      prev.map((tc) => {
        if (tc.id === id) {
          const nextStatus: TestStatus = tc.status === 'Passed' ? 'Failed' : 'Passed';
          return { ...tc, status: nextStatus };
        }
        return tc;
      })
    );
  };

  return (
    <section id="test-matrix" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
              Quality Engineering Artifacts
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-display tracking-tight">
              Test Case Repository & Execution Matrix
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Production-grade test specifications authored by Nitin Kumar. Covers positive journeys, negative boundary tests, statutory GST validation, and database reconciliations.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJSON}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export Suite (.JSON)</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#0b1322] border border-slate-800 rounded-2xl p-4 mb-6 shadow-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search test ID, title, SKU or keywords..."
                className="w-full bg-[#080e19] border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 overflow-x-auto max-w-full">
                {modules.map((mod) => (
                  <button
                    key={mod}
                    onClick={() => setSelectedModule(mod)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                      selectedModule === mod
                        ? 'bg-slate-800 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {mod}
                  </button>
                ))}
              </div>

              {/* Severity filter */}
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                aria-label="Filter by Severity"
                className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
              >
                <option value="All">All Severities</option>
                <option value="Critical">Critical</option>
                <option value="Major">Major</option>
                <option value="Minor">Minor</option>
              </select>
            </div>

          </div>
        </div>

        {/* Test Cases Table / List */}
        <div className="bg-[#0b1322] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#080f1d] border-b border-slate-800 text-slate-400 font-medium font-mono text-[11px]">
                <tr>
                  <th className="py-3 px-4 w-28">Test ID</th>
                  <th className="py-3 px-4 w-44">Module</th>
                  <th className="py-3 px-4">Test Specification & Objectives</th>
                  <th className="py-3 px-4 w-28">Severity</th>
                  <th className="py-3 px-4 w-28 text-center">Status</th>
                  <th className="py-3 px-4 w-32 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredCases.map((tc) => (
                  <tr
                    key={tc.id}
                    onClick={() => setActiveModalCase(tc)}
                    className="hover:bg-slate-800/40 cursor-pointer transition-colors group"
                  >
                    {/* ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-cyan-400 text-xs">
                      {tc.id}
                    </td>

                    {/* Module (Unboxed text) */}
                    <td className="py-3.5 px-4 text-slate-300 font-medium text-[11px]">
                      {tc.module}
                    </td>

                    {/* Title & tags */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                        {tc.title}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                        {tc.tags.map((t, idx) => (
                          <React.Fragment key={t}>
                            <span>{t}</span>
                            {idx < tc.tags.length - 1 && <span aria-hidden="true">·</span>}
                          </React.Fragment>
                        ))}
                        {tc.defectId && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-rose-400 font-mono font-bold">
                              Linked Defect: {tc.defectId}
                            </span>
                          </>
                        )}
                      </div>
                    </td>

                    {/* Severity (Unboxed clean text) */}
                    <td className="py-3.5 px-4 font-mono text-xs">
                      <span
                        className={
                          tc.severity === 'Critical'
                            ? 'text-rose-400 font-bold'
                            : tc.severity === 'Major'
                            ? 'text-amber-400 font-semibold'
                            : 'text-slate-400'
                        }
                      >
                        {tc.severity}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 text-center">
                      {tc.status === 'Passed' ? (
                        <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>PASSED</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-rose-400">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>FAILED</span>
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={(e) => handleSimulateRun(tc.id, e)}
                          title="Simulate Test Run Toggle"
                          className="p-1.5 rounded-md hover:bg-slate-700 text-slate-400 hover:text-cyan-400 transition-colors"
                        >
                          <Play className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyMarkdown(tc);
                          }}
                          title="Copy Markdown"
                          className="p-1.5 rounded-md hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                        >
                          {copiedId === tc.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCases.length === 0 && (
            <div className="py-12 text-center text-slate-400 text-xs">
              No test cases matched your filter criteria. Try resetting the search or module filter.
            </div>
          )}

          {/* Table Footer */}
          <div className="bg-[#080f1d] border-t border-slate-800 p-3.5 flex items-center justify-between text-xs text-slate-400">
            <span>Showing {filteredCases.length} of {testCases.length} Test Specifications</span>
            <span className="font-mono text-[11px]">Click any test row to inspect full procedure & payload</span>
          </div>

        </div>

      </div>

      {/* Full Test Case Modal */}
      {activeModalCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-[#0b1424] border border-slate-700 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono mb-1">
                  <span className="font-bold text-cyan-400">{activeModalCase.id}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-slate-400">{activeModalCase.module}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className={activeModalCase.severity === 'Critical' ? 'text-rose-400 font-bold' : 'text-amber-400 font-semibold'}>
                    {activeModalCase.severity} Severity
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white font-display">
                  {activeModalCase.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalCase(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {activeModalCase.description}
            </p>

            {/* Preconditions */}
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                Preconditions
              </h4>
              <ul className="space-y-1 text-xs text-slate-400 list-disc list-inside">
                {activeModalCase.preconditions.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul>
            </div>

            {/* Steps */}
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                Execution Steps
              </h4>
              <ol className="space-y-1.5 text-xs text-slate-300 list-decimal list-inside">
                {activeModalCase.steps.map((s, idx) => (
                  <li key={idx} className="leading-relaxed">
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Test Data */}
            <div className="mb-4 font-mono">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Test Data Payload
              </h4>
              <pre className="p-3 bg-[#070d17] border border-slate-800 rounded-xl text-[11px] text-cyan-300 overflow-x-auto">
                {JSON.stringify(activeModalCase.testData, null, 2)}
              </pre>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="block font-semibold text-slate-400 text-[11px] mb-1 font-mono uppercase">
                  Expected Result
                </span>
                <p className="text-slate-200 leading-relaxed">
                  {activeModalCase.expectedResult}
                </p>
              </div>

              <div className={`p-3 rounded-xl border ${
                activeModalCase.status === 'Passed'
                  ? 'bg-emerald-500/10 border-emerald-500/30'
                  : 'bg-rose-500/10 border-rose-500/30'
              }`}>
                <span className="block font-semibold text-[11px] mb-1 font-mono uppercase">
                  Actual Result ({activeModalCase.status})
                </span>
                <p className="text-slate-200 leading-relaxed">
                  {activeModalCase.actualResult}
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                Executed by <strong className="text-slate-200">{activeModalCase.testedBy}</strong> on {activeModalCase.executionDate}
              </span>
              <button
                onClick={() => handleCopyMarkdown(activeModalCase)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-400 text-slate-950 font-semibold rounded-lg hover:bg-cyan-300 transition-colors"
              >
                {copiedId === activeModalCase.id ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy as Markdown</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
