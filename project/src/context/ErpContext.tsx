import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Employee, AttendanceLog, LeaveRequest, AuditLog, Toast, ToastType, ViewName } from '@/types';
import { initialEmployees, initialAttendanceLogs, initialLeaveRequests, initialAuditLogs, initialDepartments } from '@/data';
import type { Department } from '@/types';

interface ErpContextValue {
  // Navigation
  activeView: ViewName;
  setActiveView: (v: ViewName) => void;

  // Data
  employees: Employee[];
  attendanceLogs: AttendanceLog[];
  leaveRequests: LeaveRequest[];
  departments: Department[];
  auditLogs: AuditLog[];

  // Employee actions
  addEmployee: (e: Employee) => void;
  toggleEmployeeStatus: (id: string) => void;
  deactivateEmployee: (id: string) => void;
  sortEmployees: (asc: boolean) => void;

  // Attendance actions
  addAttendanceLog: (log: AttendanceLog) => void;

  // Leave actions
  addLeaveRequest: (r: LeaveRequest) => void;
  approveLeave: (id: string) => void;
  denyLeave: (id: string) => void;

  // Audit
  addAuditLog: (log: AuditLog) => void;

  // Toasts
  toasts: Toast[];
  showToast: (title: string, message: string, type?: ToastType) => void;
  dismissToast: (id: number) => void;
}

const ErpContext = createContext<ErpContextValue | null>(null);

let toastIdCounter = 0;

export function ErpProvider({ children }: { children: ReactNode }) {
  const [activeView, setActiveView] = useState<ViewName>('employees');
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [attendanceLogs, setAttendanceLogs] = useState<AttendanceLog[]>(initialAttendanceLogs);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(initialLeaveRequests);
  const [departments] = useState<Department[]>(initialDepartments);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialAuditLogs);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((title: string, message: string, type: ToastType = 'success') => {
    const id = ++toastIdCounter;
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addEmployee = useCallback((e: Employee) => {
    setEmployees(prev => [e, ...prev]);
  }, []);

  const toggleEmployeeStatus = useCallback((id: string) => {
    setEmployees(prev => prev.map(e => {
      if (e.id !== id) return e;
      return { ...e, status: e.status === 'Present' ? 'On Leave' as const : 'Present' as const };
    }));
  }, []);

  const deactivateEmployee = useCallback((id: string) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
  }, []);

  const sortEmployees = useCallback((asc: boolean) => {
    setEmployees(prev => [...prev].sort((a, b) => asc ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)));
  }, []);

  const addAttendanceLog = useCallback((log: AttendanceLog) => {
    setAttendanceLogs(prev => [log, ...prev]);
  }, []);

  const addLeaveRequest = useCallback((r: LeaveRequest) => {
    setLeaveRequests(prev => [r, ...prev]);
  }, []);

  const approveLeave = useCallback((id: string) => {
    setLeaveRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Approved' as const } : r));
  }, []);

  const denyLeave = useCallback((id: string) => {
    setLeaveRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Denied' as const } : r));
  }, []);

  const addAuditLog = useCallback((log: AuditLog) => {
    setAuditLogs(prev => [log, ...prev]);
  }, []);

  return (
    <ErpContext.Provider value={{
      activeView, setActiveView,
      employees, attendanceLogs, leaveRequests, departments, auditLogs,
      addEmployee, toggleEmployeeStatus, deactivateEmployee, sortEmployees,
      addAttendanceLog,
      addLeaveRequest, approveLeave, denyLeave,
      addAuditLog,
      toasts, showToast, dismissToast,
    }}>
      {children}
    </ErpContext.Provider>
  );
}

export function useErp() {
  const ctx = useContext(ErpContext);
  if (!ctx) throw new Error('useErp must be used within ErpProvider');
  return ctx;
}
