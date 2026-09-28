import { useState, type FormEvent } from 'react';
import { Modal } from '../Modal';
import { useErp } from '@/context/ErpContext';
import { LEAVE_CATEGORIES } from '@/data';
import type { LeaveRequest } from '@/types';

interface ApplyLeaveModalProps {
  open: boolean;
  onClose: () => void;
}

export function ApplyLeaveModal({ open, onClose }: ApplyLeaveModalProps) {
  const { employees, addLeaveRequest, showToast } = useErp();
  const [empName, setEmpName] = useState(employees[0]?.name ?? '');
  const [category, setCategory] = useState(LEAVE_CATEGORIES[0]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const emp = employees.find(e => e.name === empName) ?? employees[0];
    if (!emp) return;
    const req: LeaveRequest = {
      id: `LV-${Math.floor(820 + Math.random() * 100)}`,
      name: emp.name,
      code: emp.id,
      type: category,
      window: `${fromDate} to ${toDate}`,
      reason,
      status: 'Pending',
    };
    addLeaveRequest(req);
    showToast('Application Queued', 'Leave submitted to department head for review.');
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setCategory(LEAVE_CATEGORIES[0]);
    setFromDate('');
    setToDate('');
    setReason('');
  };

  return (
    <Modal open={open} onClose={onClose} title="Submit Leave Application" maxWidth="max-w-md">
      <form onSubmit={handleSubmit} className="p-4 space-y-3 text-xs">
        <div>
          <label className="block text-token-textSec2 font-semibold mb-1">Employee Name</label>
          <select value={empName} onChange={e => setEmpName(e.target.value)} className="w-full bg-token-darkInput border border-token-border rounded-sm px-2.5 py-1.5 text-token-textBody">
            {employees.map(e => <option key={e.id} value={e.name}>{e.name} ({e.id})</option>)}
          </select>
        </div>
        <div>
          <label className="block text-token-textSec2 font-semibold mb-1">Leave Category</label>
          <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-token-darkInput border border-token-border rounded-sm px-2.5 py-1.5 text-token-textBody">
            {LEAVE_CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-token-textSec2 font-semibold mb-1">From Date</label>
            <input type="date" required value={fromDate} onChange={e => setFromDate(e.target.value)} className="w-full bg-token-darkInput border border-token-border rounded-sm px-2.5 py-1.5 text-token-textBody" />
          </div>
          <div>
            <label className="block text-token-textSec2 font-semibold mb-1">To Date</label>
            <input type="date" required value={toDate} onChange={e => setToDate(e.target.value)} className="w-full bg-token-darkInput border border-token-border rounded-sm px-2.5 py-1.5 text-token-textBody" />
          </div>
        </div>
        <div>
          <label className="block text-token-textSec2 font-semibold mb-1">Reason / Remarks</label>
          <textarea required value={reason} onChange={e => setReason(e.target.value)} rows={2} placeholder="e.g. Attending family function" className="w-full bg-token-darkInput border border-token-border rounded-sm p-2 text-token-textBody" />
        </div>
        <div className="pt-3 border-t border-token-border flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="px-3 py-1.5 rounded-sm border border-token-border bg-token-darkInput text-token-textLight2">Cancel</button>
          <button type="submit" className="px-4 py-1.5 rounded-sm bg-token-bgForest text-white font-semibold border border-token-accentMint/40">Submit Request</button>
        </div>
      </form>
    </Modal>
  );
}
