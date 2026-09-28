import { useState } from 'react';
import { useErp } from '@/context/ErpContext';

export function SettingsView() {
  const { auditLogs, addAuditLog, showToast } = useErp();
  const [apiUrl, setApiUrl] = useState('https://erp.skeplwebdata.in/api/v4');

  const saveSettings = () => {
    addAuditLog({
      time: 'Just Now',
      actor: 'Anil K. Sharma (Admin)',
      action: `Gateway updated to: ${apiUrl}`,
      ip: '192.168.1.14',
      outcome: 'SUCCESS',
    });
    showToast('Settings Deployed', 'ERP Daemon settings saved to secure cluster.');
  };

  return (
    <section className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-token-border/60">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-token-textBody tracking-tight">Audit Trail & System Configuration</h1>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-sm bg-[#163a24] text-token-accentMint border border-token-bgForest">ISO 27001</span>
          </div>
          <p className="text-xs text-token-textSec1 mt-0.5">Biometric sync daemon controls, network bindings, and administrative event loggers.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="bg-token-darkCard border border-token-border rounded-md p-4 shadow-erp-sm space-y-4">
          <h3 className="text-xs font-bold text-token-textBody uppercase tracking-wider border-b border-token-border pb-2">ERP Gateway Binding</h3>
          <div className="space-y-1">
            <label className="block text-[11px] text-token-textSec2 font-semibold">Master API Base URL</label>
            <input type="text" value={apiUrl} onChange={e => setApiUrl(e.target.value)} className="w-full bg-token-darkInput border border-token-border rounded-sm px-2.5 py-1.5 text-xs text-token-textBody font-mono focus:border-token-accentBlue focus:outline-none" />
          </div>
          <div className="space-y-1">
            <label className="block text-[11px] text-token-textSec2 font-semibold">WSS Biometric Stream</label>
            <input type="text" value="wss://erp.skeplwebdata.in/gateways/biometric" readOnly className="w-full bg-token-darkInput/50 border border-token-border rounded-sm px-2.5 py-1.5 text-xs text-token-textSec1 font-mono" />
          </div>
          <div className="space-y-1">
            <label className="block text-[11px] text-token-textSec2 font-semibold">Biometric Terminal Poll Interval</label>
            <select className="w-full bg-token-darkInput border border-token-border rounded-sm px-2 py-1.5 text-xs text-token-textBody focus:border-token-accentBlue focus:outline-none">
              <option>Real-Time Push (Default)</option>
              <option>Poll every 10 seconds</option>
              <option>Poll every 60 seconds</option>
            </select>
          </div>
          <button onClick={saveSettings} className="w-full bg-token-bgForest hover:bg-[#14492c] text-white py-2 rounded-sm text-xs font-semibold border border-token-accentMint/40 transition-colors focus-ring">
            Save Configuration
          </button>
        </div>

        <div className="lg:col-span-2 bg-token-darkCard border border-token-border rounded-md shadow-erp-sm overflow-hidden flex flex-col">
          <div className="p-3 border-b border-token-border bg-token-darkBase/70 flex items-center justify-between">
            <h3 className="text-xs font-bold text-token-textBody uppercase tracking-wider">Immutable Security & Audit Trail</h3>
            <span className="text-[10px] bg-token-darkHover text-token-accentCyan px-2 py-0.5 rounded-sm">Cryptographically Signed</span>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-token-border bg-token-darkBase/40 text-token-textSec2 uppercase font-semibold text-[10px] tracking-wider">
                  <th className="py-2.5 px-3">Event Timestamp</th>
                  <th className="py-2.5 px-3">Actor</th>
                  <th className="py-2.5 px-3">Action Description</th>
                  <th className="py-2.5 px-3">Source IP</th>
                  <th className="py-2.5 px-3">Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-token-border/50 text-token-textLight1 font-mono text-[11px]">
                {auditLogs.map((l, i) => (
                  <tr key={i} className="hover:bg-token-darkHover/40">
                    <td className="py-2.5 px-3 text-token-textSec1">{l.time}</td>
                    <td className="py-2.5 px-3 text-token-textLight2">{l.actor}</td>
                    <td className="py-2.5 px-3 text-token-textBody">{l.action}</td>
                    <td className="py-2.5 px-3 text-token-accentCyan">{l.ip}</td>
                    <td className="py-2.5 px-3 text-token-accentMint">{l.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
