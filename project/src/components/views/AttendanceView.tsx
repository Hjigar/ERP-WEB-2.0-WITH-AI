import { PlusCircle } from 'lucide-react';
import { useErp } from '@/context/ErpContext';

const terminals = [
  { name: 'Gate 1 - Turnstile Alpha', status: 'Online (99.8% Sync)', ip: '192.168.1.101', color: 'mint' },
  { name: 'Gate 2 - Turnstile Beta', status: 'Online (100% Sync)', ip: '192.168.1.102', color: 'mint' },
  { name: 'Shop Floor East Terminal', status: 'Online (Optical Reader)', ip: '192.168.1.108', color: 'mint' },
  { name: 'Admin Main Reception', status: 'Online (Facial Biometric)', ip: '192.168.1.115', color: 'cyan' },
];

interface AttendanceViewProps {
  onManualPunch: () => void;
}

export function AttendanceView({ onManualPunch }: AttendanceViewProps) {
  const { attendanceLogs } = useErp();

  return (
    <section className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-token-border/60">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-token-textBody tracking-tight">Biometric Stream & Terminal Logs</h1>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-sm bg-[#163a24] text-token-accentMint border border-token-bgForest">Real-Time WSS</span>
          </div>
          <p className="text-xs text-token-textSec1 mt-0.5">Live optical and RFID gate logs, in/out discrepancy checks, and manual shift overrides.</p>
        </div>
        <button onClick={onManualPunch} className="flex items-center space-x-1.5 px-3 py-1.5 rounded-sm border border-token-border bg-token-darkCard hover:bg-token-darkHover text-xs text-token-accentMint transition-colors focus-ring">
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Manual Punch Override</span>
        </button>
      </div>

      {/* Terminal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5">
        {terminals.map(t => (
          <div key={t.name} className="p-3.5 rounded-md bg-token-darkCard border border-token-border flex items-center justify-between shadow-erp-sm">
            <div>
              <p className="text-[11px] font-semibold text-token-textSec2">{t.name}</p>
              <p className={`text-xs font-bold mt-0.5 ${t.color === 'cyan' ? 'text-token-accentCyan' : 'text-token-accentMint'}`}>{t.status}</p>
              <p className="text-[10px] text-token-textSec1 mt-1">IP: {t.ip}</p>
            </div>
            <span className={`w-3 h-3 rounded-full ${t.color === 'cyan' ? 'bg-token-accentCyan' : 'bg-token-accentMint'}`} />
          </div>
        ))}
      </div>

      {/* Punch Table */}
      <div className="bg-token-darkCard border border-token-border rounded-md shadow-erp-md overflow-hidden">
        <div className="p-3 border-b border-token-border bg-token-darkBase/70 flex items-center justify-between">
          <h3 className="text-xs font-bold text-token-textBody uppercase tracking-wider">Live Punch Capture Ledger</h3>
          <span className="text-[11px] text-token-textSec1">Auto-refresh active</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-token-border bg-token-darkBase/40 text-token-textSec2 uppercase font-semibold text-[10px] tracking-wider">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4">Terminal Scanner</th>
                <th className="py-3 px-4">Direction</th>
                <th className="py-3 px-4">Auth Method</th>
                <th className="py-3 px-4">Shift Compliance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-token-border/50 text-token-textLight1">
              {attendanceLogs.map((log, i) => (
                <tr key={i} className="hover:bg-token-darkHover/60 transition-colors">
                  <td className="py-2.5 px-4 font-mono text-token-textSec1">{log.time}</td>
                  <td className="py-2.5 px-4 font-semibold text-token-textBody">{log.emp}</td>
                  <td className="py-2.5 px-4 text-token-textLight2">{log.gate}</td>
                  <td className="py-2.5 px-4">
                    <span className={`px-2 py-0.5 rounded-sm text-[10px] font-bold border ${log.dir === 'IN' ? 'bg-[#103322] text-token-accentMint border-token-bgForest' : 'bg-[#182836] text-token-accentCyan border-[#23425a]'}`}>
                      {log.dir}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 font-mono text-[11px] text-token-textSec1">{log.auth}</td>
                  <td className="py-2.5 px-4">
                    <span className={`text-[11px] font-medium ${log.comp.includes('Late') ? 'text-token-accentRed' : 'text-token-accentGreen'}`}>{log.comp}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
