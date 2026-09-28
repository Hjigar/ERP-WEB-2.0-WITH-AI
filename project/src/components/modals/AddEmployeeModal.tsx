import { useState, type FormEvent } from 'react';
import { Modal } from '../Modal';
import { useErp } from '@/context/ErpContext';
import { DEPARTMENTS, SHIFTS } from '@/data';
import type { Employee, EmployeeStatus } from '@/types';

interface AddEmployeeModalProps {
  open: boolean;
  onClose: () => void;
}

export function AddEmployeeModal({ open, onClose }: AddEmployeeModalProps) {
  const { addEmployee, showToast } = useErp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dept, setDept] = useState(DEPARTMENTS[0]);
  const [role, setRole] = useState('');
  const [shift, setShift] = useState(SHIFTS[0]);
  const [status, setStatus] = useState<EmployeeStatus>('Present');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newEmp: Employee = {
      id: `EMP-2024-${Math.floor(250 + Math.random() * 200)}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || '+91 98000 00000',
      dept,
      role: role.trim(),
      shift,
      status,
      joinDate: '28-Sep-2026',
      bioId: `BIO-IN-${Math.floor(1000 + Math.random() * 9000)}`,
      basePay: 45000,
      allowances: 10000,
      deductions: 4500,
    };
    addEmployee(newEmp);
    showToast('Employee Enrolled', `${newEmp.name} added to master records.`);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setDept(DEPARTMENTS[0]);
    setRole('');
    setShift(SHIFTS[0]);
    setStatus('Present');
  };

  return (
    <Modal open={open} onClose={onClose} title="Enroll New Employee" maxWidth="max-w-lg">
      <form onSubmit={handleSubmit} className="p-4 space-y-3 text-xs">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className="block text-token-textSec2 font-semibold mb-1">Full Legal Name *</label>
            <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Vikramaditya Rathore" className="w-full bg-token-darkInput border border-token-border rounded-sm px-3 py-1.5 text-token-textBody focus:border-token-accentBlue focus:outline-none" />
          </div>
          <div>
            <label className="block text-token-textSec2 font-semibold mb-1">Official Email *</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="v.rathore@skeplwebdata.in" className="w-full bg-token-darkInput border border-token-border rounded-sm px-3 py-1.5 text-token-textBody focus:border-token-accentBlue focus:outline-none" />
          </div>
          <div>
            <label className="block text-token-textSec2 font-semibold mb-1">Phone Number</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98000 00000" className="w-full bg-token-darkInput border border-token-border rounded-sm px-3 py-1.5 text-token-textBody focus:border-token-accentBlue focus:outline-none" />
          </div>
          <div>
            <label className="block text-token-textSec2 font-semibold mb-1">Department</label>
            <select value={dept} onChange={e => setDept(e.target.value)} className="w-full bg-token-darkInput border border-token-border rounded-sm px-2.5 py-1.5 text-token-textBody focus:border-token-accentBlue focus:outline-none">
              {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-token-textSec2 font-semibold mb-1">Designation</label>
            <input type="text" required value={role} onChange={e => setRole(e.target.value)} placeholder="e.g. Senior QA Inspector" className="w-full bg-token-darkInput border border-token-border rounded-sm px-3 py-1.5 text-token-textBody focus:border-token-accentBlue focus:outline-none" />
          </div>
          <div>
            <label className="block text-token-textSec2 font-semibold mb-1">Shift</label>
            <select value={shift} onChange={e => setShift(e.target.value)} className="w-full bg-token-darkInput border border-token-border rounded-sm px-2.5 py-1.5 text-token-textBody focus:border-token-accentBlue focus:outline-none">
              {SHIFTS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-token-textSec2 font-semibold mb-1">Initial Status</label>
            <select value={status} onChange={e => setStatus(e.target.value as EmployeeStatus)} className="w-full bg-token-darkInput border border-token-border rounded-sm px-2.5 py-1.5 text-token-textBody focus:border-token-accentBlue focus:outline-none">
              <option value="Present">Present (Active)</option>
              <option value="Probation">On Probation</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
        </div>
        <div className="pt-3 border-t border-token-border flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="px-3 py-1.5 rounded-sm border border-token-border bg-token-darkInput text-token-textLight2">Cancel</button>
          <button type="submit" className="px-4 py-1.5 rounded-sm bg-token-bgForest text-white font-semibold border border-token-accentMint/40">Enroll Employee</button>
        </div>
      </form>
    </Modal>
  );
}
