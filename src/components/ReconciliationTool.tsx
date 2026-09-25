import React, { useState, useMemo } from 'react';
import { 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Download, 
  Copy, 
  Check, 
  ArrowRight,
  TrendingDown,
  Info
} from 'lucide-react';
import { SAMPLE_RECONCILIATION_DATA } from '../data/portfolioData';
import { ReconciliationItem } from '../types';

export const ReconciliationTool: React.FC = () => {
  const [items, setItems] = useState<ReconciliationItem[]>(SAMPLE_RECONCILIATION_DATA);
  const [activeFilter, setActiveFilter] = useState<'all' | 'discrepancies' | 'matched'>('all');
  const [isAuditing, setIsAuditing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Filter items
  const filteredItems = useMemo(() => {
    if (activeFilter === 'discrepancies') {
      return items.filter(item => item.mismatchType !== 'Matched');
    }
    if (activeFilter === 'matched') {
      return items.filter(item => item.mismatchType === 'Matched');
    }
    return items;
  }, [items, activeFilter]);

  // Aggregate statistics
  const stats = useMemo(() => {
    let totalChallanVal = 0;
    let totalInvoiceVal = 0;
    let qtyMismatches = 0;
    let rateMismatches = 0;
    let taxMismatches = 0;

    items.forEach(item => {
      const cVal = item.challanQty * item.challanRate;
      const iVal = item.invoiceQty * item.invoiceRate;
      totalChallanVal += cVal;
      totalInvoiceVal += iVal;

      if (item.challanQty !== item.invoiceQty) qtyMismatches++;
      if (item.challanRate !== item.invoiceRate) rateMismatches++;
      if (item.mismatchType === 'HSN Error') taxMismatches++;
    });

    const netVariance = totalChallanVal - totalInvoiceVal;

    return {
      totalChallanVal,
      totalInvoiceVal,
      netVariance,
      totalItems: items.length,
      discrepancyCount: items.filter(i => i.mismatchType !== 'Matched').length,
      qtyMismatches,
      rateMismatches,
      taxMismatches,
      isCleared: netVariance === 0 && items.every(i => i.mismatchType === 'Matched')
    };
  }, [items]);

  // Run audit simulation
  const handleRunAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
    }, 600);
  };

  // Reset to initial
  const handleReset = () => {
    setItems(SAMPLE_RECONCILIATION_DATA);
  };

  // Copy report
  const handleCopyReport = () => {
    const reportText = `HYGLOW INDUSTRIES - DISPATCH CHALLAN VS TAX INVOICE RECONCILIATION AUDIT
Date: ${new Date().toISOString().split('T')[0]}
Audited By: Nitin Kumar (Software QA & ERP Reconciliation)

SUMMARY:
Total Items Checked: ${stats.totalItems}
Matched Items: ${stats.totalItems - stats.discrepancyCount}
Discrepancies Flagged: ${stats.discrepancyCount}
Total Dispatched Challan Value: ₹${stats.totalChallanVal.toLocaleString('en-IN')}
Total Billed Invoice Value: ₹${stats.totalInvoiceVal.toLocaleString('en-IN')}
Net Financial Discrepancy: ₹${stats.netVariance.toLocaleString('en-IN')}

FLAGGED EXCEPTIONS:
${items
  .filter(i => i.mismatchType !== 'Matched')
  .map(
    i =>
      `• [${i.mismatchType}] Item ${i.itemCode} (${i.description}): Challan ${i.challanQty} ${i.unit} @ ₹${i.challanRate} vs Invoice ${i.invoiceQty} ${i.unit} @ ₹${i.invoiceRate}. Reason: ${i.notes}`
  )
  .join('\n')}`;

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="reconciliation" className="py-20 bg-[#070e1c] border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
              Real-World QA Workflow at Hyglow Industries
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-display tracking-tight">
              Challan vs. Invoice Reconciliation Tool
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Compare warehouse physical Delivery Challan records against accounts Tax Invoices. Nitin catches unbilled dispatches, pricing discrepancies, and GST bracket errors before orders leave the plant.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleRunAudit}
              disabled={isAuditing}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 rounded-lg transition-all shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
              <span>{isAuditing ? 'Auditing Rows...' : 'Re-Run Automated Audit'}</span>
            </button>

            <button
              onClick={handleCopyReport}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-lg transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copied ? 'Report Copied!' : 'Copy Audit Log'}</span>
            </button>
          </div>
        </div>

        {/* Audit Metric Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-[#0b1424] border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Challan Dispatch Value</span>
            <div className="text-lg sm:text-xl font-bold font-mono text-white tabular-nums">
              ₹{stats.totalChallanVal.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-slate-400">Physical gate passes audited</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0b1424] border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Invoiced Billing Value</span>
            <div className="text-lg sm:text-xl font-bold font-mono text-white tabular-nums">
              ₹{stats.totalInvoiceVal.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-slate-400">Accounts ledger posted</span>
          </div>

          <div className={`p-4 rounded-xl border space-y-1 ${
            stats.netVariance !== 0
              ? 'bg-rose-500/10 border-rose-500/30'
              : 'bg-emerald-500/10 border-emerald-500/30'
          }`}>
            <span className="text-xs font-medium text-slate-300">Net Unreconciled Variance</span>
            <div className={`text-lg sm:text-xl font-bold font-mono tabular-nums ${
              stats.netVariance !== 0 ? 'text-rose-400' : 'text-emerald-400'
            }`}>
              ₹{Math.abs(stats.netVariance).toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-slate-300">
              {stats.netVariance !== 0 ? 'Variance requiring credit/debit note' : 'Fully balanced'}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#0b1424] border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Audited Item Status</span>
            <div className="text-lg sm:text-xl font-bold font-mono text-cyan-400 tabular-nums">
              {stats.totalItems - stats.discrepancyCount} / {stats.totalItems} Matched
            </div>
            <span className="text-[11px] text-amber-400 font-semibold">
              {stats.discrepancyCount} Exceptions Flagged
            </span>
          </div>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeFilter === 'all'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Items ({items.length})
            </button>
            <button
              onClick={() => setActiveFilter('discrepancies')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeFilter === 'discrepancies'
                  ? 'bg-rose-500/20 text-rose-300 shadow-sm border border-rose-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Flagged Discrepancies ({stats.discrepancyCount})
            </button>
            <button
              onClick={() => setActiveFilter('matched')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeFilter === 'matched'
                  ? 'bg-emerald-500/20 text-emerald-300 shadow-sm border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Matched ({stats.totalItems - stats.discrepancyCount})
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs text-slate-400 font-mono">
            <span>Reference: Challan #CH-2026-889</span>
            <span aria-hidden="true">·</span>
            <span>Invoice #INV-2026-441</span>
          </div>
        </div>

        {/* Reconciliation Table */}
        <div className="bg-[#0b1424] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#080f1d] border-b border-slate-800 text-slate-400 font-medium font-mono text-[11px]">
                <tr>
                  <th className="py-3 px-4">Item SKU / Description</th>
                  <th className="py-3 px-4">HSN Code</th>
                  <th className="py-3 px-4 text-right">Challan Qty</th>
                  <th className="py-3 px-4 text-right">Invoice Qty</th>
                  <th className="py-3 px-4 text-right">Challan Rate</th>
                  <th className="py-3 px-4 text-right">Invoice Rate</th>
                  <th className="py-3 px-4 text-center">Status / Exception</th>
                  <th className="py-3 px-4">QA Auditor Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredItems.map((item) => {
                  const isQtyError = item.challanQty !== item.invoiceQty;
                  const isRateError = item.challanRate !== item.invoiceRate;
                  const isMatched = item.mismatchType === 'Matched';

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        !isMatched ? 'bg-amber-500/[0.02]' : ''
                      }`}
                    >
                      {/* Item SKU & description */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-100 font-mono text-xs">
                          {item.itemCode}
                        </div>
                        <div className="text-slate-400 text-[11px] truncate max-w-xs">
                          {item.description}
                        </div>
                      </td>

                      {/* HSN code */}
                      <td className="py-3.5 px-4 font-mono text-slate-300">
                        {item.hsnCode}
                      </td>

                      {/* Challan Qty */}
                      <td className="py-3.5 px-4 text-right font-mono font-semibold text-slate-200 tabular-nums">
                        {item.challanQty} {item.unit}
                      </td>

                      {/* Invoice Qty */}
                      <td className={`py-3.5 px-4 text-right font-mono font-semibold tabular-nums ${
                        isQtyError ? 'text-rose-400 font-bold bg-rose-500/10 px-2 rounded' : 'text-slate-200'
                      }`}>
                        {item.invoiceQty} {item.unit}
                      </td>

                      {/* Challan Rate */}
                      <td className="py-3.5 px-4 text-right font-mono text-slate-300 tabular-nums">
                        ₹{item.challanRate.toLocaleString('en-IN')}
                      </td>

                      {/* Invoice Rate */}
                      <td className={`py-3.5 px-4 text-right font-mono tabular-nums ${
                        isRateError ? 'text-rose-400 font-bold bg-rose-500/10 px-2 rounded' : 'text-slate-300'
                      }`}>
                        ₹{item.invoiceRate.toLocaleString('en-IN')}
                      </td>

                      {/* Status / Exception Tag (Unboxed clean text) */}
                      <td className="py-3.5 px-4 text-center">
                        {isMatched ? (
                          <span className="text-emerald-400 font-semibold text-[11px] inline-flex items-center gap-1 font-mono">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>100% MATCHED</span>
                          </span>
                        ) : (
                          <span className="text-rose-400 font-bold text-[11px] inline-flex items-center gap-1 font-mono">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>{item.mismatchType}</span>
                          </span>
                        )}
                      </td>

                      {/* Auditor notes */}
                      <td className="py-3.5 px-4 text-[11px] text-slate-300 max-w-xs leading-relaxed">
                        {item.notes}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer Summary */}
          <div className="bg-[#080f1d] border-t border-slate-800 p-4 flex flex-wrap items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                Reconciliation verified per Section 31 of CGST Act (Tax Invoice on Dispatch).
              </span>
            </div>
            <div className="font-mono text-slate-300">
              Verified by: <strong className="text-white">Nitin Kumar (Hyglow Industries QA)</strong>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
