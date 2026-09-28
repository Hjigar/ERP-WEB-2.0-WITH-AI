import { useState, useMemo } from 'react';
import { Search, Download, ArrowUpDown } from 'lucide-react';
import { useErp } from '@/context/ErpContext';
import { DEPARTMENTS } from '@/data';
import { getInitials, statusBadgeClasses } from '@/utils/ui';
import type { EmployeeStatus } from '@/types';

interface EmployeesViewProps {
  onInspect: (id: string) => void;
}

export function EmployeesView({ onInspect }: EmployeesViewProps) {
  const { employees, sortEmployees, showToast } = useErp();
  const [query, setQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return employees.filter(e => {
      const matchesQuery = !q || e.name.toLowerCase().includes(q) || e.id.toLowerCase().includes(q) || e.email.toLowerCase().includes(q) || e.role.toLowerCase().includes(q);
      const matchesDept = deptFilter === 'ALL' || e.dept === deptFilter;
      const matchesStatus = statusFilter === 'ALL' || e.status === statusFilter;
      return matchesQuery && matchesDept && matchesStatus;
    });
  }, [employees, query, deptFilter, statusFilter]);

  const toggleSort = () => {
    const next = !sortAsc;
    setSortAsc(next);
    sortEmployees(next);
    showToast('Sorted', `Employee directory sorted by ID in ${next ? 'ascending' : 'descending'} order.`, 'info');
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = (checked: boolean) => {
    if (checked) setSelectedIds(new Set(filtered.map(e => e.id)));
    else setSelectedIds(new Set());
  };

  const resetFilters = () => {
    setQuery('');
    setDeptFilter('ALL');
    setStatusFilter('ALL');
    showToast('Filters Reset', 'Showing complete employee roster.', 'info');
  };

  const exportCsv = () => {
    let csv = 'ID,Name,Email,Department,Designation,Shift,Status\n';
    employees.forEach(e => {
      csv += `"${e.id}","${e.name}","${e.email}","${e.dept}","${e.role}","${e.shift}","${e.status}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `SKEPL_Personnel_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('CSV Exported', 'Personnel records sheet saved to device.');
  };

  return (
    <section className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-token-border/60">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-token-textBody tracking-tight">Employee Directory & Compliance</h1>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-sm bg-token-bgForest text-token-accentMint border border-token-border">Unit-1 Master</span>
          </div>
          <p className="text-xs text-token-textSec1 mt-0.5">Biometric mapping, roster assignments, dynamic status updates, and dossier logs.</p>
        </div>
        <button onClick={exportCsv} className="flex items-center space-x-1.5 px-3 py-1.5 rounded-sm border border-token-border bg-token-darkCard hover:bg-token-darkHover text-xs text-token-textLight2 transition-colors focus-ring">
          <Download className="w-3.5 h-3.5 text-token-accentBlue" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-token-darkCard border border-token-border rounded-md p-4 shadow-erp-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-token-textSec2">Active Headcount</span>
            <span className="text-[10px] font-semibold text-token-accentGreen bg-[#103322] px-1.5 py-0.5 rounded-sm border border-token-bgForest">+12 this mo</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-token-textBody">1,428</span>
            <span className="text-xs text-token-textSec1">Enrolled</span>
          </div>
          <div className="mt-2 text-[11px] text-token-textSec1 border-t border-token-border/40 pt-2 flex justify-between">
            <span>Plant: 1,040</span><span>Corporate: 388</span>
          </div>
        </div>
        <div className="bg-token-darkCard border border-token-border rounded-md p-4 shadow-erp-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-token-textSec2">Present Today</span>
            <span className="text-[10px] font-semibold text-token-accentMint bg-[#103322] px-1.5 py-0.5 rounded-sm border border-token-bgForest">94.8%</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-token-accentMint">1,354</span>
            <span className="text-xs text-token-textSec1">Punched In</span>
          </div>
          <div className="w-full bg-token-darkInput h-1 rounded-sm mt-3 overflow-hidden">
            <div className="bg-token-accentMint h-full rounded-sm" style={{ width: '94.8%' }} />
          </div>
        </div>
        <div className="bg-token-darkCard border border-token-border rounded-md p-4 shadow-erp-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-token-textSec2">On Leave / Field</span>
            <span className="text-[10px] font-semibold text-token-accentCyan bg-[#102936] px-1.5 py-0.5 rounded-sm border border-[#1b4356]">Planned</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-token-textBody">74</span>
            <span className="text-xs text-token-textSec1">Unavailable</span>
          </div>
          <div className="mt-2 text-[11px] text-token-textSec1 border-t border-token-border/40 pt-2 flex justify-between">
            <span>Approved: 49</span><span className="text-token-accentCyan">Remote: 25</span>
          </div>
        </div>
        <div className="bg-token-darkCard border border-token-border rounded-md p-4 shadow-erp-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-token-textSec2">Biometric Anomalies</span>
            <span className="text-[10px] font-semibold text-token-accentRed bg-[#361515] px-1.5 py-0.5 rounded-sm border border-[#5c2424]">Requires Review</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-token-accentRed">2</span>
            <span className="text-xs text-token-textSec1">Single Punch</span>
          </div>
          <div className="mt-2 text-[11px] text-token-textSec1 border-t border-token-border/40 pt-2 flex justify-between">
            <span>Gate 2 Reader</span><span>Manual Audit</span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-token-darkCard border border-token-border rounded-md p-3 shadow-erp-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          <div className="relative min-w-[240px] flex-1 sm:flex-initial">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by ID, name, email or designation..."
              className="w-full bg-token-darkInput text-xs text-token-textBody placeholder-token-textSec1 py-1.5 pl-8 pr-3 rounded-sm border border-token-border focus:border-token-accentBlue focus:outline-none focus-ring"
            />
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-token-textSec1" />
          </div>
          <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} className="bg-token-darkInput text-xs text-token-textLight1 border border-token-border rounded-sm py-1.5 px-2.5 focus:border-token-accentBlue focus:outline-none focus-ring">
            <option value="ALL">All Departments</option>
            {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as EmployeeStatus | 'ALL')} className="bg-token-darkInput text-xs text-token-textLight1 border border-token-border rounded-sm py-1.5 px-2.5 focus:border-token-accentBlue focus:outline-none focus-ring">
            <option value="ALL">All Statuses</option>
            <option value="Present">Present</option>
            <option value="Remote">Remote</option>
            <option value="On Leave">On Leave</option>
            <option value="Probation">Probation</option>
          </select>
        </div>
        <button onClick={resetFilters} className="self-end md:self-auto px-2.5 py-1.5 rounded-sm border border-token-border bg-token-darkInput text-xs text-token-textSec1 hover:text-token-textBody transition-colors">
          Reset Filters
        </button>
      </div>

      {/* Table */}
      <div className="bg-token-darkCard border border-token-border rounded-md shadow-erp-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-token-border bg-token-darkBase/70 text-token-textSec2 uppercase font-semibold text-[10px] tracking-wider select-none">
                <th className="py-3 px-3.5 w-10 text-center">
                  <input type="checkbox" checked={selectedIds.size === filtered.length && filtered.length > 0} onChange={e => toggleSelectAll(e.target.checked)} className="rounded-sm bg-token-darkInput border-token-border text-token-accentGreen focus:ring-0 focus:outline-none cursor-pointer" />
                </th>
                <th className="py-3 px-3 cursor-pointer hover:text-white" onClick={toggleSort}>
                  <div className="flex items-center space-x-1">
                    <span>EMP ID</span>
                    <ArrowUpDown className="w-3 h-3 text-token-textSec1" />
                  </div>
                </th>
                <th className="py-3 px-3">Employee Details</th>
                <th className="py-3 px-3">Department & Role</th>
                <th className="py-3 px-3">Assigned Shift</th>
                <th className="py-3 px-3">Biometric Status</th>
                <th className="py-3 px-3">Joined</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-token-border/50 text-token-textLight1">
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="py-8 text-center text-token-textSec1">No matching employee records located.</td></tr>
              ) : filtered.map(emp => (
                <tr key={emp.id} className="hover:bg-token-darkHover/80 cursor-pointer transition-colors" onClick={() => onInspect(emp.id)}>
                  <td className="py-2.5 px-3.5 text-center" onClick={e => e.stopPropagation()}>
                    <input type="checkbox" checked={selectedIds.has(emp.id)} onChange={() => toggleSelect(emp.id)} className="rounded-sm bg-token-darkInput border-token-border text-token-accentGreen focus:ring-0 cursor-pointer" />
                  </td>
                  <td className="py-2.5 px-3 font-mono font-medium text-token-accentBlue">{emp.id}</td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-7 h-7 rounded-sm bg-token-darkInput border border-token-border flex items-center justify-center font-bold text-[10px] text-token-accentMint">
                        {getInitials(emp.name)}
                      </div>
                      <div className="truncate max-w-[170px]">
                        <p className="font-semibold text-token-textBody truncate">{emp.name}</p>
                        <p className="text-[10px] text-token-textSec1 font-mono truncate">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    <p className="text-token-textLight2 font-medium">{emp.dept}</p>
                    <p className="text-[10px] text-token-textSec1">{emp.role}</p>
                  </td>
                  <td className="py-2.5 px-3 text-[11px]">{emp.shift}</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold border ${statusBadgeClasses(emp.status)}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-token-textSec1 text-[11px]">{emp.joinDate}</td>
                  <td className="py-2.5 px-3 text-right" onClick={e => e.stopPropagation()}>
                    <button onClick={() => onInspect(emp.id)} className="px-2 py-1 rounded-sm border border-token-border bg-token-darkInput hover:border-token-accentBlue text-token-textLight2 hover:text-white transition-colors">
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-3 border-t border-token-border bg-token-darkBase/50 flex items-center justify-between text-xs text-token-textSec1">
          <div>Showing <span className="font-semibold text-token-textBody">{filtered.length}</span> matching personnel records</div>
          <div className="text-[11px] text-token-textSec2">Click any employee row to open side-inspection drawer</div>
        </div>
      </div>
    </section>
  );
}
