import React, { useState, useMemo } from 'react';
import { 
  Bug, 
  CheckCircle2, 
  AlertTriangle, 
  Terminal, 
  RotateCcw, 
  Sparkles, 
  Eye, 
  Layers, 
  ShieldAlert, 
  Check, 
  ArrowRight,
  FileCheck2
} from 'lucide-react';

interface InteractiveQASandboxProps {
  onPreloadBugReport: (bug: {
    title: string;
    module: string;
    severity: 'Critical' | 'Major' | 'Minor';
    steps: string[];
    expected: string;
    actual: string;
  }) => void;
}

export const InteractiveQASandbox: React.FC<InteractiveQASandboxProps> = ({ onPreloadBugReport }) => {
  const [qaMode, setQaMode] = useState<boolean>(true);
  
  // Form State
  const [customer, setCustomer] = useState('Apex Industrial Supplies Ltd');
  const [gstin, setGstin] = useState('07AAACA1234A1Z5');
  const [sku, setSku] = useState('HY-VALVE-50');
  const [qty, setQty] = useState<number>(25);
  const [rate, setRate] = useState<number>(1450);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [deliveryDate, setDeliveryDate] = useState('2026-10-05');
  const [shippingState, setShippingState] = useState('07-Delhi (Intra-state)');
  
  // Stock limit
  const AVAILABLE_STOCK = 60;

  // Track discovered bugs
  const [foundBugs, setFoundBugs] = useState<Record<string, boolean>>({});

  // Active validation / calculations
  const {
    baseAmount,
    discountAmount,
    taxableAmount,
    cgst,
    sgst,
    igst,
    grandTotal,
    hasNegativeDiscount,
    hasStockExceeded,
    hasInvalidGstin,
    hasPastDate,
    hasZeroRate,
  } = useMemo(() => {
    const rawBase = qty * rate;
    
    // INTENTIONAL SIMULATED BUG #1: If discount is negative, standard system code adds it to amount!
    const discAmt = (rawBase * discountPercent) / 100;
    const taxable = rawBase - discAmt;
    
    const isInterState = shippingState.includes('Inter-state');
    const cgstAmt = isInterState ? 0 : taxable * 0.09;
    const sgstAmt = isInterState ? 0 : taxable * 0.09;
    const igstAmt = isInterState ? taxable * 0.18 : 0;
    const total = taxable + cgstAmt + sgstAmt + igstAmt;

    // Checks
    const negDisc = discountPercent < 0;
    const stockOver = qty > AVAILABLE_STOCK;
    const invGstin = gstin.trim().length > 0 && gstin.trim().length !== 15;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(deliveryDate);
    const pastDate = selectedDate < today;

    const zeroRt = qty > 0 && rate <= 0;

    return {
      baseAmount: rawBase,
      discountAmount: discAmt,
      taxableAmount: taxable,
      cgst: cgstAmt,
      sgst: sgstAmt,
      igst: igstAmt,
      grandTotal: total,
      hasNegativeDiscount: negDisc,
      hasStockExceeded: stockOver,
      hasInvalidGstin: invGstin,
      hasPastDate: pastDate,
      hasZeroRate: zeroRt,
    };
  }, [qty, rate, discountPercent, shippingState, gstin, deliveryDate]);

  // Check and register bugs when conditions occur
  const checkBugDiscovery = (bugKey: string) => {
    if (!foundBugs[bugKey]) {
      setFoundBugs(prev => ({ ...prev, [bugKey]: true }));
    }
  };

  const handleDiscountChange = (val: number) => {
    setDiscountPercent(val);
    if (val < 0) {
      checkBugDiscovery('negative_discount');
    }
  };

  const handleQtyChange = (val: number) => {
    setQty(val);
    if (val > AVAILABLE_STOCK) {
      checkBugDiscovery('stock_exceeded');
    }
  };

  const handleGstinChange = (val: string) => {
    setGstin(val);
    if (val.length > 0 && val.length !== 15) {
      checkBugDiscovery('invalid_gstin');
    }
  };

  const handleDateChange = (val: string) => {
    setDeliveryDate(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(val) < today) {
      checkBugDiscovery('past_date');
    }
  };

  const handleRateChange = (val: number) => {
    setRate(val);
    if (val <= 0 && qty > 0) {
      checkBugDiscovery('zero_rate');
    }
  };

  // Pre-load presets
  const loadPreset = (type: 'valid' | 'negative_discount' | 'oversell' | 'corrupt_tax') => {
    if (type === 'valid') {
      setCustomer('Apex Industrial Supplies Ltd');
      setGstin('07AAACA1234A1Z5');
      setSku('HY-VALVE-50');
      setQty(25);
      setRate(1450);
      setDiscountPercent(5);
      setDeliveryDate('2026-10-15');
      setShippingState('07-Delhi (Intra-state)');
    } else if (type === 'negative_discount') {
      setDiscountPercent(-15);
      checkBugDiscovery('negative_discount');
    } else if (type === 'oversell') {
      setQty(120);
      checkBugDiscovery('stock_exceeded');
    } else if (type === 'corrupt_tax') {
      setGstin('GST123');
      checkBugDiscovery('invalid_gstin');
    }
  };

  const totalBugsFound = Object.values(foundBugs).filter(Boolean).length;

  return (
    <section id="qa-sandbox" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
              Interactive QA Environment
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-display tracking-tight">
              ERP Sales Order & Dispatch Simulator
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Experience the actual validation work Nitin conducts at Hyglow Industries. Switch between standard user input and QA Inspector mode to hunt intentional boundary defects.
            </p>
          </div>

          {/* Mode Switch & Counter */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono">
              <Bug className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-300">Bugs Discovered:</span>
              <strong className="text-amber-400 font-bold tabular-nums">{totalBugsFound} / 5</strong>
            </div>

            <button
              onClick={() => setQaMode(!qaMode)}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                qaMode
                  ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{qaMode ? 'QA Inspector: Active' : 'Enable QA Inspector'}</span>
            </button>
          </div>
        </div>

        {/* Sandbox Core Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Interactive Form Simulation (7 cols) */}
          <div className="lg:col-span-7 bg-[#0b1322] border border-slate-800 rounded-2xl p-6 shadow-xl">
            
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <span className="text-xs font-semibold text-slate-200 font-mono">
                  ERP MODULE: SALES_ORDER_DISPATCH_v3
                </span>
              </div>

              {/* Preset Test Case Injection */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-400 hidden sm:inline">Inject Test Case:</span>
                <button
                  onClick={() => loadPreset('valid')}
                  className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px]"
                >
                  Valid Order
                </button>
                <button
                  onClick={() => loadPreset('negative_discount')}
                  className="px-2 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-[11px] border border-amber-500/20"
                >
                  Bug: -Disc %
                </button>
                <button
                  onClick={() => loadPreset('oversell')}
                  className="px-2 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-[11px] border border-rose-500/20"
                >
                  Bug: Overstock
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4 text-xs">
              
              {/* Row 1: Customer & GSTIN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">
                    Customer Account
                  </label>
                  <select
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    className="w-full bg-[#080e1a] border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Apex Industrial Supplies Ltd">Apex Industrial Supplies Ltd</option>
                    <option value="Hyglow Heavy Fabricators">Hyglow Heavy Fabricators</option>
                    <option value="Precision Steel & Tube Corp">Precision Steel & Tube Corp</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-slate-400 font-medium">Customer GSTIN</label>
                    {qaMode && (
                      <span className="text-[10px] text-slate-400 font-mono">
                        Rule: Exact 15 Chars
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    value={gstin}
                    onChange={(e) => handleGstinChange(e.target.value)}
                    placeholder="e.g. 07AAACA1234A1Z5"
                    className={`w-full bg-[#080e1a] border rounded-lg px-3 py-2 font-mono text-slate-200 focus:outline-none ${
                      hasInvalidGstin
                        ? 'border-amber-500/80 bg-amber-500/5'
                        : 'border-slate-700 focus:border-cyan-400'
                    }`}
                  />
                  {hasInvalidGstin && (
                    <div className="mt-1 text-[11px] text-amber-400 flex items-center gap-1 font-mono">
                      <AlertTriangle className="w-3 h-3 shrink-0" />
                      <span>Defect: GSTIN has {gstin.length} chars (Standard requires 15 chars).</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Row 2: Product SKU & Warehouse Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">
                    Product SKU
                  </label>
                  <select
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full bg-[#080e1a] border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="HY-VALVE-50">HY-VALVE-50 (Gate Valve)</option>
                    <option value="HY-PUMP-01">HY-PUMP-01 (Hydraulic Pump)</option>
                    <option value="HY-FLANGE-DN80">HY-FLANGE-DN80 (Forged Flange)</option>
                  </select>
                  <div className="mt-1 text-[11px] text-slate-400 font-mono">
                    Warehouse Physical Stock: <strong className="text-emerald-400">{AVAILABLE_STOCK} units</strong>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-slate-400 font-medium">Order Quantity</label>
                    {qaMode && (
                      <span className="text-[10px] text-slate-400 font-mono">
                        Max Stock: {AVAILABLE_STOCK}
                      </span>
                    )}
                  </div>
                  <input
                    type="number"
                    value={qty}
                    onChange={(e) => handleQtyChange(Number(e.target.value))}
                    className={`w-full bg-[#080e1a] border rounded-lg px-3 py-2 text-slate-200 font-mono focus:outline-none ${
                      hasStockExceeded
                        ? 'border-rose-500/80 bg-rose-500/5'
                        : 'border-slate-700 focus:border-cyan-400'
                    }`}
                  />
                  {hasStockExceeded && (
                    <div className="mt-1 text-[11px] text-rose-400 flex items-center gap-1 font-mono">
                      <AlertTriangle className="w-3 h-3 shrink-0" />
                      <span>Defect: Qty {qty} exceeds stock ({AVAILABLE_STOCK}) without backorder flag!</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">
                    Unit Rate (₹)
                  </label>
                  <input
                    type="number"
                    value={rate}
                    onChange={(e) => handleRateChange(Number(e.target.value))}
                    className={`w-full bg-[#080e1a] border rounded-lg px-3 py-2 text-slate-200 font-mono focus:outline-none ${
                      hasZeroRate
                        ? 'border-amber-500/80 bg-amber-500/5'
                        : 'border-slate-700 focus:border-cyan-400'
                    }`}
                  />
                  {hasZeroRate && (
                    <div className="mt-1 text-[11px] text-amber-400 flex items-center gap-1 font-mono">
                      <AlertTriangle className="w-3 h-3 shrink-0" />
                      <span>Boundary Defect: Zero rate line item with active quantity.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Row 3: Discount & Delivery Date */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-slate-400 font-medium">Trade Discount (%)</label>
                    <span className="text-[10px] text-amber-400 font-mono">
                      Test: Enter -10%
                    </span>
                  </div>
                  <input
                    type="number"
                    value={discountPercent}
                    onChange={(e) => handleDiscountChange(Number(e.target.value))}
                    placeholder="0"
                    className={`w-full bg-[#080e1a] border rounded-lg px-3 py-2 text-slate-200 font-mono focus:outline-none ${
                      hasNegativeDiscount
                        ? 'border-rose-500/80 bg-rose-500/5 text-rose-300'
                        : 'border-slate-700 focus:border-cyan-400'
                    }`}
                  />
                  {hasNegativeDiscount && (
                    <div className="mt-1 text-[11px] text-rose-400 flex items-center gap-1 font-mono">
                      <AlertTriangle className="w-3 h-3 shrink-0" />
                      <span>CRITICAL DEFECT: Negative discount increases order total!</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">
                    Dispatch Delivery Date
                  </label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className={`w-full bg-[#080e1a] border rounded-lg px-3 py-2 text-slate-200 font-mono focus:outline-none ${
                      hasPastDate
                        ? 'border-amber-500/80 bg-amber-500/5'
                        : 'border-slate-700 focus:border-cyan-400'
                    }`}
                  />
                  {hasPastDate && (
                    <div className="mt-1 text-[11px] text-amber-400 flex items-center gap-1 font-mono">
                      <AlertTriangle className="w-3 h-3 shrink-0" />
                      <span>Defect: System allowed historic delivery date.</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">
                    Place of Supply (GST)
                  </label>
                  <select
                    value={shippingState}
                    onChange={(e) => setShippingState(e.target.value)}
                    className="w-full bg-[#080e1a] border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="07-Delhi (Intra-state)">07-Delhi (CGST 9% + SGST 9%)</option>
                    <option value="06-Haryana (Inter-state)">06-Haryana (IGST 18%)</option>
                    <option value="08-Rajasthan (Inter-state)">08-Rajasthan (IGST 18%)</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Calculations Breakdown */}
            <div className="mt-6 pt-5 border-t border-slate-800 bg-[#080e19] rounded-xl p-4 space-y-2 font-mono text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Base Subtotal ({qty} units × ₹{rate.toLocaleString()}):</span>
                <span className="text-slate-200 tabular-nums">₹{baseAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>

              <div className="flex justify-between text-slate-400">
                <span className={hasNegativeDiscount ? 'text-rose-400 font-semibold' : ''}>
                  Discount ({discountPercent}%):
                </span>
                <span className={`tabular-nums ${hasNegativeDiscount ? 'text-rose-400 font-bold' : 'text-slate-300'}`}>
                  {discountAmount < 0 ? `+ ₹${Math.abs(discountAmount).toLocaleString('en-IN', { minimumFractionDigits: 2 })} (DEFECT: Surcharged)` : `- ₹${discountAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
                </span>
              </div>

              <div className="flex justify-between text-slate-400 border-t border-slate-800/80 pt-1.5">
                <span>Taxable Value:</span>
                <span className="text-slate-200 tabular-nums font-semibold">₹{taxableAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>

              {shippingState.includes('Intra-state') ? (
                <>
                  <div className="flex justify-between text-slate-400">
                    <span>CGST (9%):</span>
                    <span className="text-slate-300 tabular-nums">₹{cgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>SGST (9%):</span>
                    <span className="text-slate-300 tabular-nums">₹{sgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between text-slate-400">
                  <span>IGST (18% Inter-state):</span>
                  <span className="text-slate-300 tabular-nums">₹{igst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
              )}

              <div className="flex justify-between text-white font-bold text-sm border-t border-slate-700/80 pt-2">
                <span className="font-display">Grand Total (INR):</span>
                <span className="font-mono text-cyan-400 tabular-nums">
                  ₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => loadPreset('valid')}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Clean Order</span>
              </button>

              {hasNegativeDiscount && (
                <button
                  onClick={() =>
                    onPreloadBugReport({
                      title: 'Negative discount value inflates grand total in Sales Order creation form',
                      module: 'ERP Sales Order',
                      severity: 'Major',
                      steps: [
                        'Open Sales Order Form',
                        `Add SKU ${sku} (Qty: ${qty}, Rate: ₹${rate})`,
                        `Enter discount value "${discountPercent}%" in discount field`,
                        'Observe that line item adds money instead of subtracting discount',
                      ],
                      expected: 'System must reject negative inputs with validation: "Discount cannot be negative".',
                      actual: `Order total increased by ₹${Math.abs(discountAmount)} due to unhandled negative arithmetic.`,
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-lg text-xs font-semibold transition-all"
                >
                  <Bug className="w-3.5 h-3.5" />
                  <span>Log Defect BUG-402 in Report Generator</span>
                </button>
              )}
            </div>

          </div>

          {/* Right: QA Inspector & Bug Discovery Matrix (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Bug Discovery Checklist */}
            <div className="bg-[#0b1322] border border-slate-800 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white font-display">
                    QA Test Cases in this Form
                  </h3>
                </div>
                <span className="text-xs font-mono text-cyan-400 font-semibold">
                  {totalBugsFound}/5 Found
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                
                {/* Bug 1 */}
                <div className={`p-2.5 rounded-xl border transition-all ${
                  foundBugs.negative_discount
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-200'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">TC-01: Negative Discount Boundary</span>
                    {foundBugs.negative_discount ? (
                      <span className="text-[11px] text-rose-400 font-mono font-bold">DEFECT CAUGHT</span>
                    ) : (
                      <span className="text-[11px] text-slate-400">Try entering -10%</span>
                    )}
                  </div>
                  <p className="text-[11px] mt-1 text-slate-400">
                    Validates boundary value where arithmetic inverse causes revenue leakage.
                  </p>
                </div>

                {/* Bug 2 */}
                <div className={`p-2.5 rounded-xl border transition-all ${
                  foundBugs.stock_exceeded
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">TC-02: Physical Warehouse Over-Allocation</span>
                    {foundBugs.stock_exceeded ? (
                      <span className="text-[11px] text-amber-400 font-mono font-bold">DEFECT CAUGHT</span>
                    ) : (
                      <span className="text-[11px] text-slate-400">Try ordering &gt;60 units</span>
                    )}
                  </div>
                  <p className="text-[11px] mt-1 text-slate-400">
                    Disallow dispatching items without inventory allocation lock or manager authorization.
                  </p>
                </div>

                {/* Bug 3 */}
                <div className={`p-2.5 rounded-xl border transition-all ${
                  foundBugs.invalid_gstin
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">TC-03: GSTIN 15-Digit Format Mask</span>
                    {foundBugs.invalid_gstin ? (
                      <span className="text-[11px] text-amber-400 font-mono font-bold">DEFECT CAUGHT</span>
                    ) : (
                      <span className="text-[11px] text-slate-400">Enter partial GSTIN</span>
                    )}
                  </div>
                  <p className="text-[11px] mt-1 text-slate-400">
                    Validates statutory tax identification format before generation of e-way bills.
                  </p>
                </div>

                {/* Bug 4 */}
                <div className={`p-2.5 rounded-xl border transition-all ${
                  foundBugs.past_date
                    ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-200'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">TC-04: Historic Dispatch Date Validation</span>
                    {foundBugs.past_date ? (
                      <span className="text-[11px] text-cyan-400 font-mono font-bold">DEFECT CAUGHT</span>
                    ) : (
                      <span className="text-[11px] text-slate-400">Pick date in the past</span>
                    )}
                  </div>
                  <p className="text-[11px] mt-1 text-slate-400">
                    Prevents backdated challan issuance that violates GST e-invoice sequencing.
                  </p>
                </div>

                {/* Bug 5 */}
                <div className={`p-2.5 rounded-xl border transition-all ${
                  foundBugs.zero_rate
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">TC-05: Zero Rate Line Item Waiver</span>
                    {foundBugs.zero_rate ? (
                      <span className="text-[11px] text-amber-400 font-mono font-bold">DEFECT CAUGHT</span>
                    ) : (
                      <span className="text-[11px] text-slate-400">Set Rate to ₹0</span>
                    )}
                  </div>
                  <p className="text-[11px] mt-1 text-slate-400">
                    Commercial items cannot be booked at ₹0 without FOC (Free of Cost) sample approval.
                  </p>
                </div>

              </div>
            </div>

            {/* Live Payload Inspector (Real QA Debugging Experience) */}
            <div className="bg-[#0b1322] border border-slate-800 rounded-2xl p-4 font-mono text-xs shadow-lg">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-400 text-[11px]">
                <div className="flex items-center gap-1.5 text-cyan-400">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>PAYLOAD INSPECTION (REST API / FORM STATE)</span>
                </div>
                <span className="text-emerald-400 font-bold">200 OK</span>
              </div>
              <pre className="text-[11px] text-slate-300 overflow-x-auto max-h-44 p-2 rounded bg-[#070d17] border border-slate-800/80">
{JSON.stringify({
  orderType: "Commercial_Tax_Invoice",
  customer,
  gstin,
  lineItem: {
    sku,
    qty,
    rate,
    discountPercent,
    discountAmount: Math.round(discountAmount),
    taxableAmount: Math.round(taxableAmount),
  },
  taxBreakdown: {
    cgst: Math.round(cgst),
    sgst: Math.round(sgst),
    igst: Math.round(igst),
    grandTotal: Math.round(grandTotal),
  },
  inventoryStatus: qty > AVAILABLE_STOCK ? "INSUFFICIENT_STOCK_FLAG" : "ALLOCATED_OK",
  auditChecks: {
    bvaPassed: !hasNegativeDiscount && !hasZeroRate,
    gstFormatValid: !hasInvalidGstin,
    dateValid: !hasPastDate,
  }
}, null, 2)}
              </pre>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
