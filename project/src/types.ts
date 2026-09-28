export type ViewName = 'employees' | 'attendance' | 'leaves' | 'payroll' | 'departments' | 'settings';

export type EmployeeStatus = 'Present' | 'Remote' | 'On Leave' | 'Probation';

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  dept: string;
  role: string;
  shift: string;
  status: EmployeeStatus;
  joinDate: string;
  bioId: string;
  basePay: number;
  allowances: number;
  deductions: number;
}

export interface AttendanceLog {
  time: string;
  emp: string;
  gate: string;
  dir: 'IN' | 'OUT';
  auth: string;
  comp: string;
}

export type LeaveStatus = 'Pending' | 'Approved' | 'Denied';

export interface LeaveRequest {
  id: string;
  name: string;
  code: string;
  type: string;
  window: string;
  reason: string;
  status: LeaveStatus;
}

export interface Department {
  name: string;
  head: string;
  count: number;
  budget: string;
  tags: string;
}

export interface AuditLog {
  time: string;
  actor: string;
  action: string;
  ip: string;
  outcome: string;
}

export type ToastType = 'success' | 'danger' | 'info';

export interface Toast {
  id: number;
  title: string;
  message: string;
  type: ToastType;
}
