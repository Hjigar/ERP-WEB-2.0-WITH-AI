import { Menu, RefreshCw, Plus } from 'lucide-react';
import { useErp } from '@/context/ErpContext';
import type { ViewName } from '@/types';

const viewMeta: Record<ViewName, { cat: string; title: string; action: string }> = {
  employees: { cat: 'Human Capital', title: 'Employees', action: 'Add Employee' },
  attendance: { cat: 'Operations', title: 'Attendance & Biometrics', action: 'Manual Override' },
  leaves: { cat: 'Human Capital', title: 'Leave Requests', action: 'Apply Leave' },
  payroll: { cat: 'Financials', title: 'Payroll & Compensation', action: 'Disburse Batch' },
  departments: { cat: 'Organization', title: 'Departments', action: 'New Department' },
  settings: { cat: 'System', title: 'Audit & System Settings', action: 'Save Config' },
};

interface HeaderProps {
  onOpenSidebar: () => void;
  onPrimaryAction: () => void;
  onSync: () => void;
  syncing: boolean;
}

export function Header({ onOpenSidebar, onPrimaryAction, onSync, syncing }: HeaderProps) {
  const { activeView } = useErp();
  const meta = viewMeta[activeView];

  return (
    <header className="h-16 bg-token-darkCard border-b border-token-border flex items-center justify-between px-4 sm:px-6 z-20 shadow-erp-sm">
      <div className="flex items-center space-x-3">
        <button onClick={onOpenSidebar} className="md:hidden text-token-textSec1 hover:text-white p-1 rounded-sm focus-ring">
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-token-textSec1 font-medium">SKEPL ERP</span>
          <span className="text-token-border">/</span>
          <span className="text-token-textSec2 font-medium">{meta.cat}</span>
          <span className="text-token-border">/</span>
          <span className="text-token-textBody font-semibold">{meta.title}</span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="hidden lg:flex items-center space-x-2 px-2.5 py-1 rounded-sm bg-token-darkInput border border-token-border text-xs text-token-textLight2">
          <span className="w-2 h-2 rounded-full bg-token-accentGreen animate-pulse" />
          <span>Gateway: Online (8 Readers Synced)</span>
        </div>

        <button
          onClick={onSync}
          className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-sm border border-token-border bg-token-darkInput hover:bg-token-darkHover text-xs text-token-textLight2 transition-colors focus-ring"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-token-accentMint ${syncing ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Sync Data</span>
        </button>

        <button
          onClick={onPrimaryAction}
          className="flex items-center space-x-1.5 bg-token-bgForest hover:bg-[#14492c] text-white px-3 py-1.5 rounded-sm text-xs font-semibold border border-token-accentMint/40 shadow-erp-sm transition-colors focus-ring"
        >
          <Plus className="w-3.5 h-3.5 text-token-accentMint" />
          <span>{meta.action}</span>
        </button>
      </div>
    </header>
  );
}
