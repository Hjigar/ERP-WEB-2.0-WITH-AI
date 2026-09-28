import { Banknote } from 'lucide-react';
import { useErp } from '@/context/ErpContext';

interface PayrollViewProps {
  onDisburse: () => void;
  onPayslip: (id: string) => void;
}

export function PayrollView({ onDisburse, onPayslip }: PayrollViewProps) {
  const { employees } = useErp();

  return (
    <section className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-token-border/60">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-token-textBody tracking-tight">Payroll & Compensation Register</h1>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-sm bg-token-bgForest text-token-accentMint border border-token-border">Cycle: Oct 2026</span>
          </div>
          <p className="text-xs text-token-textSec1 mt-0.5">Statutory deductions, Provident Fund (EPF), ESIC, Tax deduction (TDS), and one-click payslips.</p>
        </div>
        <button onClick={onDisburse} className="flex items-center space-x-1.5 px-3 py-1.5 rounded-sm bg-token-bgForest hover:bg-[#14492c] text-white font-semibold text-xs border border-token-accentMint/40 shadow-erp-sm transition-colors focus-ring">
          <Banknote className="w-3.5 h-3.5 text-token-accentMint" />
          <span>Disburse Batch</span>
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-token-darkCard border border-token-border rounded-md p-4 shadow-erp-sm">
          <span className="text-xs font-semibold uppercase text-token-textSec2">Gross Monthly Outflow</span>
          <div className="text-2xl font-bold text-token-textBody mt-1">₹ 46,24,000</div>
          <p className="text-[11px] text-token-accentMint mt-2">100% funds allocated</p>
        </div>
        <div className="bg-token-darkCard border border-token-border rounded-md p-4 shadow-erp-sm">
          <span className="text-xs font-semibold uppercase text-token-textSec2">Statutory EPF Transfer</span>
          <div className="text-2xl font-bold text-token-accentCyan mt-1">₹ 3,45,200</div>
          <p className="text-[11px] text-token-textSec1 mt-2">EPFO portal challan ready</p>
        </div>
        <div className="bg-token-darkCard border border-token-border rounded-md p-4 shadow-erp-sm">
          <span className="text-xs font-semibold uppercase text-token-textSec2">TDS Tax Deduction</span>
          <div className="text-2xl font-bold text-token-textBody mt-1">₹ 4,12,800</div>
          <p className="text-[11px] text-token-accentGreen mt-2">Form 24Q compliant</p>
        </div>
        <div className="bg-token-darkCard border border-token-border rounded-md p-4 shadow-erp-sm">
          <span className="text-xs font-semibold uppercase text-token-textSec2">Bank Transfer Batch</span>
          <div className="text-2xl font-bold text-token-accentMint mt-1">Ready</div>
          <p className="text-[11px] text-token-textSec1 mt-2">HDFC Bank Direct NEFT</p>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-token-darkCard border border-token-border rounded-md shadow-erp-md overflow-hidden">
        <div className="p-3 border-b border-token-border bg-token-darkBase/70 flex items-center justify-between">
          <h3 className="text-xs font-bold text-token-textBody uppercase tracking-wider">Master Salary Disbursement Sheet</h3>
          <span className="text-[11px] text-token-textSec1">Click 'Voucher' to preview payslip</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-token-border bg-token-darkBase/40 text-token-textSec2 uppercase font-semibold text-[10px] tracking-wider">
                <th className="py-3 px-4">EMP Code</th>
                <th className="py-3 px-4">Employee Name</th>
                <th className="py-3 px-4">Basic Pay</th>
                <th className="py-3 px-4">HRA & Allowances</th>
                <th className="py-3 px-4">PF & TDS Deductions</th>
                <th className="py-3 px-4">Net Payable</th>
                <th className="py-3 px-4">Disbursal State</th>
                <th className="py-3 px-4 text-right">Payslip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-token-border/50 text-token-textLight1">
              {employees.map(emp => {
                const net = emp.basePay + emp.allowances - emp.deductions;
                return (
                  <tr key={emp.id} className="hover:bg-token-darkHover/60 transition-colors">
                    <td className="py-2.5 px-4 font-mono font-medium text-token-accentBlue">{emp.id}</td>
                    <td className="py-2.5 px-4 font-semibold text-token-textBody">{emp.name}</td>
                    <td className="py-2.5 px-4 font-mono">₹ {emp.basePay.toLocaleString()}</td>
                    <td className="py-2.5 px-4 font-mono text-token-textLight2">+₹ {emp.allowances.toLocaleString()}</td>
                    <td className="py-2.5 px-4 font-mono text-token-accentRed">-₹ {emp.deductions.toLocaleString()}</td>
                    <td className="py-2.5 px-4 font-mono font-bold text-token-accentMint">₹ {net.toLocaleString()}</td>
                    <td className="py-2.5 px-4">
                      <span className="px-2 py-0.5 rounded-sm text-[10px] font-semibold bg-[#103322] text-token-accentMint border border-token-bgForest">Bank Cleared</span>
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      <button onClick={() => onPayslip(emp.id)} className="px-2 py-1 rounded-sm border border-token-border bg-token-darkInput hover:border-token-accentBlue text-token-accentCyan text-xs">
                        Voucher
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
