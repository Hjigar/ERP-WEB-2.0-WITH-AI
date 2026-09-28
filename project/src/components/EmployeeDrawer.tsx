import { X, CheckCircle, Trash2 } from 'lucide-react';
import { useErp } from '@/context/ErpContext';
import { getInitials, statusBadgeClasses } from '@/utils/ui';

interface EmployeeDrawerProps {
  employeeId: string | null;
  onClose: () => void;
}

export function EmployeeDrawer({ employeeId, onClose }: EmployeeDrawerProps) {
  const { employees, toggleEmployeeStatus, deactivateEmployee, showToast } = useErp();
  const emp = employees.find(e => e.id === employeeId);

  const open = emp !== null && emp !== undefined;

  const handleToggle = () => {
    if (!emp) return;
    toggleEmployeeStatus(emp.id);
    showToast('Status Changed', `${emp.name} is now ${emp.status === 'Present' ? 'On Leave' : 'Present'}.`);
  };

  const handleDeactivate = () => {
    if (!emp) return;
    deactivateEmployee(emp.id);
    showToast('Record Archived', 'Employee marked inactive.', 'danger');
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 modal-backdrop-blur z-40 transition-opacity duration-200 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-token-darkCard border-l border-token-border shadow-erp-drawer z-50 transform transition-transform duration-300 flex flex-col justify-between ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {emp && (
          <>
            <div>
              <div className="p-4 border-b border-token-border flex items-center justify-between bg-token-darkBase/80">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-sm bg-token-darkHover border border-token-accentMint flex items-center justify-center font-bold text-sm text-token-accentMint">
                    {getInitials(emp.name)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-bold text-token-textBody">{emp.name}</h3>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-sm border ${statusBadgeClasses(emp.status)}`}>
                        {emp.status}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-token-textSec1">{emp.id}</p>
                  </div>
                </div>
                <button onClick={onClose} className="text-token-textSec1 hover:text-white p-1 rounded-sm border border-token-border bg-token-darkInput focus-ring">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-140px)] text-xs">
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-2.5 rounded-sm bg-token-darkInput border border-token-border">
                    <span className="text-[10px] text-token-textSec1 uppercase block">Department</span>
                    <span className="font-semibold text-token-textBody">{emp.dept}</span>
                  </div>
                  <div className="p-2.5 rounded-sm bg-token-darkInput border border-token-border">
                    <span className="text-[10px] text-token-textSec1 uppercase block">Designation</span>
                    <span className="font-semibold text-token-textBody">{emp.role}</span>
                  </div>
                  <div className="p-2.5 rounded-sm bg-token-darkInput border border-token-border">
                    <span className="text-[10px] text-token-textSec1 uppercase block">Shift Schedule</span>
                    <span className="font-semibold text-token-accentCyan">{emp.shift}</span>
                  </div>
                  <div className="p-2.5 rounded-sm bg-token-darkInput border border-token-border">
                    <span className="text-[10px] text-token-textSec1 uppercase block">Joining Date</span>
                    <span className="font-semibold text-token-textLight2">{emp.joinDate}</span>
                  </div>
                </div>

                <div className="p-3 rounded-sm bg-token-darkInput border border-token-border space-y-2">
                  <h4 className="font-bold text-token-textSec2 uppercase text-[10px] tracking-wider">Contact & Device Profile</h4>
                  <div className="flex justify-between">
                    <span className="text-token-textSec1">Official Email:</span>
                    <span className="font-mono text-token-textBody">{emp.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-token-textSec1">Phone:</span>
                    <span className="text-token-textBody">{emp.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-token-textSec1">Biometric Hash ID:</span>
                    <span className="font-mono text-token-accentMint">{emp.bioId}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-token-textSec2 uppercase text-[10px] tracking-wider">Recent Biometric Punch Activity</h4>
                  <div className="p-3 rounded-sm bg-token-darkInput border border-token-border space-y-2 font-mono text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-token-textLight2">Today Gate 1 Punch-In</span>
                      <span className="text-token-accentGreen">08:26:14 IST</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-token-textLight2">Yesterday Punch-Out</span>
                      <span className="text-token-textSec1">17:34:02 IST</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 border-t border-token-border bg-token-darkBase/70 flex items-center justify-between">
              <button
                onClick={handleToggle}
                className="px-3 py-1.5 rounded-sm border border-token-border bg-token-darkInput text-xs text-token-textLight2 hover:text-white hover:bg-token-darkHover transition-colors"
              >
                Toggle Status
              </button>
              <div className="flex space-x-2">
                <button
                  onClick={handleDeactivate}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-sm border border-token-accentRed/50 bg-[#361515] text-xs text-token-accentRed hover:bg-[#481c1c] transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Deactivate</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex items-center space-x-1 px-3.5 py-1.5 rounded-sm bg-token-bgForest text-white text-xs font-semibold hover:bg-[#14492c] border border-token-accentMint/40 transition-colors"
                >
                  <CheckCircle className="w-3 h-3" />
                  <span>Done</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
