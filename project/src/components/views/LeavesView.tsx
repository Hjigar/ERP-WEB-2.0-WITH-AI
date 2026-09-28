import { Plus } from 'lucide-react';
import { useErp } from '@/context/ErpContext';
import { leaveStatusClasses } from '@/utils/ui';

interface LeavesViewProps {
  onApplyLeave: () => void;
}

export function LeavesView({ onApplyLeave }: LeavesViewProps) {
  const { leaveRequests, approveLeave, denyLeave, showToast } = useErp();
  const pendingCount = leaveRequests.filter(r => r.status === 'Pending').length;

  return (
    <section className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-token-border/60">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-token-textBody tracking-tight">Leave Approvals & Entitlements</h1>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-sm bg-token-bgForest text-token-accentMint border border-token-border">Policy 2026-R2</span>
          </div>
          <p className="text-xs text-token-textSec1 mt-0.5">Manage employee leave applications, quota balances, medical certificates, and approvals.</p>
        </div>
        <button onClick={onApplyLeave} className="flex items-center space-x-1.5 px-3 py-1.5 rounded-sm bg-token-bgForest text-white font-semibold text-xs border border-token-accentMint/40 shadow-erp-sm hover:bg-[#14492c] transition-colors focus-ring">
          <Plus className="w-3.5 h-3.5 text-token-accentMint" />
          <span>Apply For Leave</span>
        </button>
      </div>

      {/* Quota Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="p-4 rounded-md bg-token-darkCard border border-token-border shadow-erp-sm">
          <span className="text-xs text-token-textSec2 font-semibold uppercase">Casual Leave (CL) Pool</span>
          <div className="text-2xl font-bold text-token-textBody mt-1">12.5 <span className="text-xs text-token-textSec1">days avg / emp</span></div>
          <p className="text-[11px] text-token-accentMint mt-2">Annual reset on 31-Dec</p>
        </div>
        <div className="p-4 rounded-md bg-token-darkCard border border-token-border shadow-erp-sm">
          <span className="text-xs text-token-textSec2 font-semibold uppercase">Earned / Privilege Leave</span>
          <div className="text-2xl font-bold text-token-accentCyan mt-1">18.0 <span className="text-xs text-token-textSec1">days accrued</span></div>
          <p className="text-[11px] text-token-textSec1 mt-2">Encashment eligible (&gt;30)</p>
        </div>
        <div className="p-4 rounded-md bg-token-darkCard border border-token-border shadow-erp-sm">
          <span className="text-xs text-token-textSec2 font-semibold uppercase">Sick / Medical Pool</span>
          <div className="text-2xl font-bold text-token-textBody mt-1">8.0 <span className="text-xs text-token-textSec1">days remaining</span></div>
          <p className="text-[11px] text-token-accentGreen mt-2">Doctor note required for &gt;2 days</p>
        </div>
      </div>

      {/* Leave Table */}
      <div className="bg-token-darkCard border border-token-border rounded-md shadow-erp-md overflow-hidden">
        <div className="p-3 border-b border-token-border bg-token-darkBase/70 flex items-center justify-between">
          <h3 className="text-xs font-bold text-token-textBody uppercase tracking-wider">Leave Applications Review Queue</h3>
          <span className="text-[11px] text-token-accentMint">{pendingCount} Pending • SLA: Under 24h</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-token-border bg-token-darkBase/40 text-token-textSec2 uppercase font-semibold text-[10px] tracking-wider">
                <th className="py-3 px-4">Applicant</th>
                <th className="py-3 px-4">Leave Category</th>
                <th className="py-3 px-4">Duration & Dates</th>
                <th className="py-3 px-4">Reason & Justification</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4 text-right">Approval Decisions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-token-border/50 text-token-textLight1">
              {leaveRequests.length === 0 ? (
                <tr><td colSpan={6} className="py-8 text-center text-token-textSec1">No pending leave applications in queue.</td></tr>
              ) : leaveRequests.map(req => (
                <tr key={req.id} className="hover:bg-token-darkHover/60 transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-semibold text-token-textBody">{req.name}</p>
                    <p className="text-[10px] font-mono text-token-textSec1">{req.code}</p>
                  </td>
                  <td className="py-3 px-4 font-medium text-token-textLight2">{req.type}</td>
                  <td className="py-3 px-4 text-[11px] text-token-textBody font-mono">{req.window}</td>
                  <td className="py-3 px-4 text-token-textSec1">{req.reason}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold ${leaveStatusClasses(req.status)}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {req.status === 'Pending' ? (
                      <div className="inline-flex space-x-1">
                        <button onClick={() => { approveLeave(req.id); showToast('Leave Approved', `Application ${req.id} for ${req.name} approved.`); }} className="px-2.5 py-1 rounded-sm bg-token-bgForest text-white hover:bg-[#14492c] border border-token-accentMint/40 transition-colors">Approve</button>
                        <button onClick={() => { denyLeave(req.id); showToast('Leave Rejected', `Application ${req.id} denied.`, 'danger'); }} className="px-2.5 py-1 rounded-sm border border-token-accentRed/50 bg-[#361515] text-token-accentRed hover:bg-[#481c1c] transition-colors">Deny</button>
                      </div>
                    ) : (
                      <span className="text-[11px] text-token-textSec1 font-mono">Processed</span>
                    )}
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
