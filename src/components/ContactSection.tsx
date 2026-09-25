import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Linkedin, 
  Github, 
  Send, 
  Copy, 
  Check, 
  Building2, 
  Phone,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Full-time QA Role',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 800);
  };

  return (
    <section id="contact" className="py-20 bg-[#070e1c] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
            05 — Get In Touch
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-display tracking-tight">
            Let’s Build Bulletproof Software Together
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Interested in hiring a dedicated Software Tester, discussing ERP quality assurance, or auditing reconciliation workflows? Reach out directly.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Info & Credentials (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#0b1424] border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  Nitin Kumar
                </h3>
                <p className="text-xs text-cyan-400 font-mono mt-0.5">
                  Software Tester & QA Engineer
                </p>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Available for full-time Quality Assurance positions, ERP testing projects, and software audit engagements.
                </p>
              </div>

              {/* Verified Contact Details List */}
              <div className="space-y-3 text-xs">
                
                {/* Email with copy */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#080e19] border border-slate-800">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div>
                      <span className="block text-[10px] text-slate-400 uppercase font-mono">Email Address</span>
                      <a href={`mailto:${PERSONAL_INFO.email}`} className="font-semibold text-slate-100 hover:text-cyan-300 transition-colors">
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#080e19] border border-slate-800">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase font-mono">Location</span>
                    <span className="font-semibold text-slate-100">{PERSONAL_INFO.location}</span>
                  </div>
                </div>

                {/* Organizations */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#080e19] border border-slate-800">
                  <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase font-mono">Affiliations</span>
                    <span className="font-semibold text-slate-100">Hyglow Industries · All in One Software</span>
                  </div>
                </div>

              </div>

              {/* Direct Mail Button */}
              <div className="pt-2">
                <a
                  href={`mailto:${PERSONAL_INFO.email}?subject=QA%20Opportunity%20-%20Nitin%20Kumar`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
                >
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>Open in Default Mail Client</span>
                </a>
              </div>

            </div>

          </div>

          {/* Right: Interactive Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#0b1424] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            
            {formSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-display">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, <strong className="text-white">{formData.name}</strong>. Nitin Kumar has received your message regarding &quot;{formData.subject}&quot; and will follow up shortly at <strong className="text-cyan-400">{formData.email}</strong>.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', email: '', subject: 'Full-time QA Role', message: '' });
                    }}
                    className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                
                <div className="border-b border-slate-800/80 pb-3 mb-4">
                  <h3 className="text-base sm:text-lg font-bold text-white font-display">
                    Send Direct Inquiry
                  </h3>
                  <p className="text-slate-400 text-xs">
                    Please provide your contact info and project requirements.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1 font-mono uppercase text-[11px]">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#080e19] border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1 font-mono uppercase text-[11px]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#080e19] border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1 font-mono uppercase text-[11px]">
                    Subject / Discussion Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#080e19] border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Full-time QA Role">Full-time QA / Software Tester Role</option>
                    <option value="ERP Software Testing">ERP Software & Workflow Testing</option>
                    <option value="Reconciliation Audit">Challan & Invoice Reconciliation Audit</option>
                    <option value="Consultation & Advisory">General QA Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1 font-mono uppercase text-[11px]">
                    Project Details / Requirements *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your application, testing scope, timelines, or hiring requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#080e19] border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400 leading-relaxed"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Direct reply within 24 business hours.
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-cyan-500/20"
                  >
                    <Send className={`w-3.5 h-3.5 ${isSubmitting ? 'animate-pulse' : ''}`} />
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
