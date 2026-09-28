import type { EmployeeStatus, LeaveStatus } from '@/types';

export function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('');
}

export function statusBadgeClasses(status: EmployeeStatus): string {
  switch (status) {
    case 'Present':
      return 'bg-[#103322] text-token-accentMint border-token-bgForest';
    case 'Remote':
      return 'bg-[#102936] text-token-accentCyan border-[#1b4356]';
    case 'On Leave':
      return 'bg-[#361515] text-token-accentRed border-[#5c2424]';
    case 'Probation':
      return 'bg-token-darkHover text-token-textLight2 border-token-border';
  }
}

export function leaveStatusClasses(status: LeaveStatus): string {
  switch (status) {
    case 'Approved':
      return 'bg-[#103322] text-token-accentMint';
    case 'Denied':
      return 'bg-[#361515] text-token-accentRed';
    case 'Pending':
      return 'bg-[#292211] text-[#f2c94c] border border-[#52441f]';
  }
}

export function toastBorderClass(type: string): string {
  if (type === 'danger') return 'border-token-accentRed';
  if (type === 'info') return 'border-token-accentBlue';
  return 'border-token-accentMint';
}

export function toastIconClass(type: string): string {
  if (type === 'danger') return 'text-token-accentRed';
  if (type === 'info') return 'text-token-accentBlue';
  return 'text-token-accentMint';
}
