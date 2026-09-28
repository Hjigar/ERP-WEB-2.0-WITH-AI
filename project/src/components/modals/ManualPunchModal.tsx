import { useState, type FormEvent } from 'react';
import { Modal } from '../Modal';
import { useErp } from '@/context/ErpContext';
import { GATES } from '@/data';
import type { AttendanceLog } from '@/types';

interface ManualPunchModalProps {
  open: boolean;
  onClose: () => void;
}

export function ManualPunchModal({ open, onClose }: ManualPunchModalProps) {
  const { employees, addAttendanceLog, showToast } = useErp();
  const [empName, setEmpName] = useState(employees[0]?.name ?? '');
  const [gate, setGate] = useState(GATES[0]);
  const [dir, setDir] = useState<'IN' | 'OUT'>('IN');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const log: AttendanceLog = {
      time: 'Just Now',
      emp: empName,
      gate,
      dir,
      auth: 'Supervisor Manual Stamp',
      comp: 'Override Stamped',
    };
    addAttendanceLog(log);
    showToast('Punch Overridden', `Recorded ${dir} entry for ${empName}`);
    setReason('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Manual Biometric Punch Override" maxWidth="max-w-md">
      <form onSubmit={handleSubmit} className="p-4 space-y-3 text-xs">
        <div>
          <label className="block text-token-textSec2 font-semibold mb-1">Select Employee</label>
          <select value={empName} onChange={e => setEmpName(e.target.value)} className="w-full bg-token-darkInput border border-token-border rounded-sm px-2.5 py-1.5 text-token-textBody">
            {employees.map(e => <option key={e.id} value={e.name}>{e.name} ({e.id})</option>)}
          </select>
        </div>
        <div>
          <label className="block text-token-textSec2 font-semibold mb-1">Terminal Scanner Gate</label>
          <select value={gate} onChange={e => setGate(e.target.value)} className="w-full bg-token-darkInput border border-token-border rounded-sm px-2.5 py-1.5 text-token-textBody">
            {GATES.map(g => <option key={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-token-textSec2 font-semibold mb-1">Direction</label>
          <select value={dir} onChange={e => setDir(e.target.value as 'IN' | 'OUT')} className="w-full bg-token-darkInput border border-token-border rounded-sm px-2.5 py-1.5 text-token-textBody">
            <option value="IN">IN (Entry Punch)</option>
            <option value="OUT">OUT (Exit Punch)</option>
          </select>
        </div>
        <div>
          <label className="block text-token-textSec2 font-semibold mb-1">Audit Reason</label>
          <input type="text" required value={reason} onChange={e => setReason(e.target.value)} placeholder="e.g. Card scanner failure / security clearance" className="w-full bg-token-darkInput border border-token-border rounded-sm px-3 py-1.5 text-token-textBody" />
        </div>
        <div className="pt-3 border-t border-token-border flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="px-3 py-1.5 rounded-sm border border-token-border bg-token-darkInput text-token-textLight2">Cancel</button>
          <button type="submit" className="px-4 py-1.5 rounded-sm bg-token-bgForest text-white font-semibold border border-token-accentMint/40">Record Override</button>
        </div>
      </form>
    </Modal>
  );
}
