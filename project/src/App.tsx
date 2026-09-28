import { useState, useEffect } from 'react';
import { ErpProvider, useErp } from '@/context/ErpContext';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { ToastContainer } from '@/components/ToastContainer';
import { EmployeeDrawer } from '@/components/EmployeeDrawer';
import { AddEmployeeModal } from '@/components/modals/AddEmployeeModal';
import { ManualPunchModal } from '@/components/modals/ManualPunchModal';
import { ApplyLeaveModal } from '@/components/modals/ApplyLeaveModal';
import { PayslipModal } from '@/components/modals/PayslipModal';
import { EmployeesView } from '@/components/views/EmployeesView';
import { AttendanceView } from '@/components/views/AttendanceView';
import { LeavesView } from '@/components/views/LeavesView';
import { PayrollView } from '@/components/views/PayrollView';
import { DepartmentsView } from '@/components/views/DepartmentsView';
import { SettingsView } from '@/components/views/SettingsView';

function ErpApp() {
  const { activeView, showToast, addAuditLog } = useErp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [drawerEmpId, setDrawerEmpId] = useState<string | null>(null);
  const [payslipEmpId, setPayslipEmpId] = useState<string | null>(null);

  const [addEmpOpen, setAddEmpOpen] = useState(false);
  const [manualPunchOpen, setManualPunchOpen] = useState(false);
  const [applyLeaveOpen, setApplyLeaveOpen] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      showToast('Synchronized', 'All 8 biometric gate readers & registers updated.');
    }, 700);
  };

  const handlePrimaryAction = () => {
    switch (activeView) {
      case 'employees': setAddEmpOpen(true); break;
      case 'attendance': setManualPunchOpen(true); break;
      case 'leaves': setApplyLeaveOpen(true); break;
      case 'payroll':
        showToast('Batch Disbursed', 'NEFT Instruction batch created for all 1,428 employees.');
        break;
      case 'departments':
        showToast('Department Manager', 'Department provisioning wizard ready.', 'info');
        break;
      case 'settings':
        addAuditLog({
          time: 'Just Now',
          actor: 'Anil K. Sharma (Admin)',
          action: 'Configuration saved from topbar action',
          ip: '192.168.1.14',
          outcome: 'SUCCESS',
        });
        showToast('Settings Deployed', 'ERP Daemon settings saved to secure cluster.');
        break;
    }
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDrawerEmpId(null);
        setPayslipEmpId(null);
        setAddEmpOpen(false);
        setManualPunchOpen(false);
        setApplyLeaveOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="bg-token-darkBase text-token-textBody flex h-screen overflow-hidden antialiased select-none">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          onOpenSidebar={() => setSidebarOpen(true)}
          onPrimaryAction={handlePrimaryAction}
          onSync={handleSync}
          syncing={syncing}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeView === 'employees' && <EmployeesView onInspect={setDrawerEmpId} />}
          {activeView === 'attendance' && <AttendanceView onManualPunch={() => setManualPunchOpen(true)} />}
          {activeView === 'leaves' && <LeavesView onApplyLeave={() => setApplyLeaveOpen(true)} />}
          {activeView === 'payroll' && <PayrollView onDisburse={() => showToast('Batch Disbursed', 'NEFT Instruction batch created for all 1,428 employees.')} onPayslip={setPayslipEmpId} />}
          {activeView === 'departments' && <DepartmentsView />}
          {activeView === 'settings' && <SettingsView />}
        </main>
      </div>

      <EmployeeDrawer employeeId={drawerEmpId} onClose={() => setDrawerEmpId(null)} />

      <AddEmployeeModal open={addEmpOpen} onClose={() => setAddEmpOpen(false)} />
      <ManualPunchModal open={manualPunchOpen} onClose={() => setManualPunchOpen(false)} />
      <ApplyLeaveModal open={applyLeaveOpen} onClose={() => setApplyLeaveOpen(false)} />
      <PayslipModal employeeId={payslipEmpId} onClose={() => setPayslipEmpId(null)} />

      <ToastContainer />
    </div>
  );
}

function App() {
  return (
    <ErpProvider>
      <ErpApp />
    </ErpProvider>
  );
}

export default App;
