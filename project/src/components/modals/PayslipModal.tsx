import { Modal } from '../Modal';
import { useErp } from '@/context/ErpContext';

interface PayslipModalProps {
  employeeId: string | null;
  onClose: () => void;
}

export function PayslipModal({ employeeId, onClose }: PayslipModalProps) {
  const { employees } = useErp();
  const emp = employees.find(e => e.id === employeeId);

  return (
    <Modal open={!!emp} onClose={onClose} title="Salary Payslip — SKEPL Enterprises" subtitle="Official E-Voucher" maxWidth="max-w-lg">
      {emp && (
        <>
          <div className="p-5 space-y-4 text-xs font-mono">
            <div className="border-b border-token-border pb-3 flex justify-between">
              <div>
                <p className="font-bold text-sm text-token-textBody">{emp.name}</p>
                <p className="text-token-textSec1">{emp.role} • {emp.dept}</p>
              </div>
              <div className="text-right">
                <p className="text-token-accentBlue font-bold">{emp.id}</p>
                <p className="text-token-textSec1">Period: Oct 2026</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <p className="text-token-textSec1 uppercase text-[10px]">Earnings</p>
                <div className="flex justify-between py-1"><span>Basic Salary:</span><span>₹ {emp.basePay.toLocaleString()}</span></div>
                <div className="flex justify-between py-1"><span>HRA & Special:</span><span>₹ {emp.allowances.toLocaleString()}</span></div>
                <div className="flex justify-between py-1 font-bold border-t border-token-border/40 mt-1"><span>Total Gross:</span><span>₹ {(emp.basePay + emp.allowances).toLocaleString()}</span></div>
              </div>
              <div>
                <p className="text-token-textSec1 uppercase text-[10px]">Deductions</p>
                <div className="flex justify-between py-1"><span>Provident Fund (12%):</span><span>₹ {(emp.deductions * 0.6).toFixed(0)}</span></div>
                <div className="flex justify-between py-1"><span>TDS / Professional:</span><span>₹ {(emp.deductions * 0.4).toFixed(0)}</span></div>
                <div className="flex justify-between py-1 font-bold border-t border-token-border/40 mt-1 text-token-accentRed"><span>Total Deductions:</span><span>₹ {emp.deductions.toLocaleString()}</span></div>
              </div>
            </div>
            <div className="p-3 bg-token-darkInput border border-token-border rounded-sm flex items-center justify-between text-sm mt-3">
              <span className="font-bold">Net Salary Transferred:</span>
              <span className="font-bold text-token-accentMint text-base">₹ {(emp.basePay + emp.allowances - emp.deductions).toLocaleString()}</span>
            </div>
          </div>
          <div className="p-3 border-t border-token-border bg-token-darkBase/70 flex justify-end space-x-2">
            <button onClick={() => window.print()} className="px-3 py-1.5 rounded-sm border border-token-border bg-token-darkInput text-token-textLight2 hover:text-white">Print Slip</button>
            <button onClick={onClose} className="px-4 py-1.5 rounded-sm bg-token-bgForest text-white font-semibold">Done</button>
          </div>
        </>
      )}
    </Modal>
  );
}
