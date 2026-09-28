import { Users, Clock, CalendarOff, Wallet, Building2, Settings, X } from 'lucide-react';
import { useErp } from '@/context/ErpContext';
import type { ViewName } from '@/types';

interface NavItem {
  view: ViewName;
  label: string;
  icon: typeof Users;
  badge?: string;
  badgeClass?: string;
  pulse?: boolean;
}

const navGroups: { category: string; items: NavItem[] }[] = [
  {
    category: 'Human Capital & Ops',
    items: [
      { view: 'employees', label: 'Employees', icon: Users },
      { view: 'attendance', label: 'Attendance & Biometrics', icon: Clock, pulse: true },
      { view: 'leaves', label: 'Leave Requests', icon: CalendarOff },
    ],
  },
  {
    category: 'Enterprise & Financials',
    items: [
      { view: 'payroll', label: 'Payroll & Compensation', icon: Wallet },
      { view: 'departments', label: 'Departments', icon: Building2 },
      { view: 'settings', label: 'Audit & System Settings', icon: Settings },
    ],
  },
];

export function Sidebar({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {
  const { activeView, setActiveView, employees, leaveRequests } = useErp();

  const pendingLeaves = leaveRequests.filter(r => r.status === 'Pending').length;

  const badgeMap: Partial<Record<ViewName, string>> = {
    employees: String(employees.length),
    leaves: `${pendingLeaves} Queued`,
  };

  const badgeClassMap: Partial<Record<ViewName, string>> = {
    employees: 'bg-[#143d26] text-token-accentMint',
    leaves: 'bg-[#3a1a1a] text-token-accentRed border border-[#552525]',
  };

  const handleNavClick = (view: ViewName) => {
    setActiveView(view);
    onClose();
  };

  return (
    <aside
      className={`w-[280px] bg-token-darkCard border-r border-token-border flex flex-col z-30 transition-transform duration-300 md:static fixed inset-y-0 left-0 shadow-erp-md ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-token-border flex items-center justify-between bg-token-darkBase/40">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-sm bg-token-bgForest flex items-center justify-center font-bold text-token-accentMint text-sm border border-token-border shadow-erp-sm">
              SK
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-token-textBody text-sm tracking-wide">SKEPL ERP</span>
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded-sm bg-[#163a24] text-token-accentMint border border-token-bgForest">v4.2</span>
              </div>
              <p className="text-[11px] text-token-textSec1 leading-none mt-0.5">erp.skeplwebdata.in</p>
            </div>
          </div>
          <button onClick={onClose} className="md:hidden text-token-textSec1 hover:text-white p-1 rounded-sm focus-ring">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1 overflow-y-auto flex-1">
          {navGroups.map(group => (
            <div key={group.category}>
              <div className="px-3 py-1.5 text-[10px] font-bold text-token-textSec1 uppercase tracking-wider">{group.category}</div>
              {group.items.map(item => {
                const isActive = activeView === item.view;
                const Icon = item.icon;
                const badge = badgeMap[item.view];
                const badgeClass = badgeClassMap[item.view];
                return (
                  <button
                    key={item.view}
                    onClick={() => handleNavClick(item.view)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-sm text-xs transition-all ${
                      isActive
                        ? 'bg-token-bgForest text-white font-semibold border-l-2 border-token-accentMint shadow-erp-sm'
                        : 'text-token-textLight1 hover:bg-token-darkHover hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-token-accentMint' : 'text-token-textSec2'}`} />
                      <span>{item.label}</span>
                    </div>
                    {badge && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-sm font-semibold ${badgeClass}`}>
                        {badge}
                      </span>
                    )}
                    {item.pulse && <span className="w-2 h-2 rounded-full bg-token-accentGreen animate-pulse" />}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* User Session Card */}
        <div className="p-3 border-t border-token-border bg-token-darkBase/70">
          <div className="flex items-center justify-between p-2 rounded-sm bg-token-darkCard border border-token-border">
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="w-8 h-8 rounded-sm bg-token-darkHover border border-token-accentMint flex items-center justify-center font-bold text-xs text-token-accentMint">
                AK
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-token-textBody truncate">Anil K. Sharma</p>
                <p className="text-[10px] text-token-textSec1 truncate">Enterprise SuperAdmin</p>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-token-accentGreen" title="Active WSS Session" />
          </div>
        </div>
      </div>
    </aside>
  );
}
