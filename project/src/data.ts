import type { Employee, AttendanceLog, LeaveRequest, Department, AuditLog } from '@/types';

export const initialEmployees: Employee[] = [
  { id: "EMP-2022-094", name: "Rahul S. Sharma", email: "r.sharma@skeplwebdata.in", phone: "+91 98251 04921", dept: "Engineering & IT", role: "Senior CNC Programmer", shift: "General Shift A", status: "Present", joinDate: "14-Mar-2022", bioId: "BIO-IN-0488", basePay: 64000, allowances: 16000, deductions: 6800 },
  { id: "EMP-2021-032", name: "Pooja Deshmukh", email: "p.deshmukh@skeplwebdata.in", phone: "+91 98240 18833", dept: "Plant Operations", role: "Operations Supervisor", shift: "Morning Shift B", status: "Present", joinDate: "19-Jan-2021", bioId: "BIO-IN-0112", basePay: 52000, allowances: 13000, deductions: 5400 },
  { id: "EMP-2023-118", name: "Karanveer Gill", email: "k.gill@skeplwebdata.in", phone: "+91 97120 44510", dept: "Quality Assurance", role: "Lead QA Inspector", shift: "General Shift A", status: "Remote", joinDate: "02-Aug-2023", bioId: "BIO-IN-0822", basePay: 48000, allowances: 11000, deductions: 4900 },
  { id: "EMP-2020-015", name: "Meenakshi Sundaram", email: "m.sundaram@skeplwebdata.in", phone: "+91 94080 33211", dept: "Supply Chain", role: "Logistics Coordinator", shift: "Night Shift C", status: "On Leave", joinDate: "10-Nov-2020", bioId: "BIO-IN-0045", basePay: 45000, allowances: 10500, deductions: 4200 },
  { id: "EMP-2024-201", name: "Amitav Goswami", email: "a.goswami@skeplwebdata.in", phone: "+91 99130 99824", dept: "Plant Operations", role: "Maintenance Technician", shift: "Morning Shift B", status: "Present", joinDate: "12-Feb-2024", bioId: "BIO-IN-0994", basePay: 36000, allowances: 8000, deductions: 3500 },
  { id: "EMP-2023-189", name: "Sneha Patel", email: "s.patel@skeplwebdata.in", phone: "+91 98254 77123", dept: "Human Resources", role: "Talent Partner", shift: "General Shift A", status: "Present", joinDate: "05-May-2023", bioId: "BIO-IN-0731", basePay: 58000, allowances: 14000, deductions: 5800 },
  { id: "EMP-2022-067", name: "Farhan Siddiqui", email: "f.siddiqui@skeplwebdata.in", phone: "+91 98791 22340", dept: "Finance & Accounts", role: "Senior Accounts Officer", shift: "General Shift A", status: "Probation", joinDate: "18-Oct-2022", bioId: "BIO-IN-0518", basePay: 62000, allowances: 15000, deductions: 6200 },
  { id: "EMP-2024-245", name: "Bhavna Trivedi", email: "b.trivedi@skeplwebdata.in", phone: "+91 99044 11209", dept: "Quality Assurance", role: "Metrology Analyst", shift: "General Shift A", status: "Present", joinDate: "04-Jun-2024", bioId: "BIO-IN-1044", basePay: 42000, allowances: 9500, deductions: 4100 }
];

export const initialAttendanceLogs: AttendanceLog[] = [
  { time: "Today 08:26:14", emp: "Rahul S. Sharma (#094)", gate: "Gate 1 - Turnstile Alpha", dir: "IN", auth: "Fingerprint 99% match", comp: "On Time" },
  { time: "Today 08:31:02", emp: "Pooja Deshmukh (#032)", gate: "Gate 2 - Turnstile Beta", dir: "IN", auth: "RFID Keycard", comp: "Grace Period" },
  { time: "Today 08:44:18", emp: "Amitav Goswami (#201)", gate: "Shop Floor East Terminal", dir: "IN", auth: "Optical Sensor", comp: "Late (+14m)" },
  { time: "Today 08:52:05", emp: "Sneha Patel (#189)", gate: "Admin Main Reception", dir: "IN", auth: "Facial ID Verified", comp: "On Time" },
  { time: "Yesterday 17:34:02", emp: "Rahul S. Sharma (#094)", gate: "Gate 1 - Turnstile Alpha", dir: "OUT", auth: "Fingerprint 100%", comp: "Regular Exit" },
  { time: "Yesterday 17:31:40", emp: "Farhan Siddiqui (#067)", gate: "Admin Main Reception", dir: "OUT", auth: "RFID Card", comp: "Regular Exit" }
];

export const initialLeaveRequests: LeaveRequest[] = [
  { id: "LV-801", name: "Meenakshi Sundaram", code: "EMP-2020-015", type: "Earned Leave (EL)", window: "28-Sep to 30-Sep (3 Days)", reason: "Family event in Vadodara", status: "Pending" },
  { id: "LV-802", name: "Bhavna Trivedi", code: "EMP-2024-245", type: "Casual Leave (CL)", window: "02-Oct (1 Day)", reason: "Personal administrative work", status: "Pending" }
];

export const initialDepartments: Department[] = [
  { name: "Engineering & IT", head: "Rahul S. Sharma", count: 48, budget: "₹ 18.5 L", tags: "Firmware, Line Automation, CNC" },
  { name: "Plant Operations", head: "Pooja Deshmukh", count: 84, budget: "₹ 24.0 L", tags: "Assembly, Stamping, Quality" },
  { name: "Quality Assurance", head: "Karanveer Gill", count: 26, budget: "₹ 8.2 L", tags: "ISO Compliance, Metrology" },
  { name: "Supply Chain", head: "Meenakshi Sundaram", count: 22, budget: "₹ 7.8 L", tags: "Procurement, Vendor Logistics" },
  { name: "Human Resources", head: "Sneha Patel", count: 12, budget: "₹ 4.5 L", tags: "Payroll, Talent, Leaves" },
  { name: "Finance & Accounts", head: "Farhan Siddiqui", count: 14, budget: "₹ 5.2 L", tags: "Taxation, Audit, Invoices" }
];

export const initialAuditLogs: AuditLog[] = [
  { time: "28-Sep 10:45:12", actor: "Anil K. Sharma (Admin)", action: "Biometric sync executed across 8 terminals", ip: "192.168.1.14", outcome: "SUCCESS" },
  { time: "28-Sep 09:12:04", actor: "System Daemon", action: "Automated gate attendance checksum", ip: "127.0.0.1", outcome: "OK" },
  { time: "27-Sep 18:22:45", actor: "Sneha Patel (HR)", action: "Generated draft payslips for October cycle", ip: "192.168.1.42", outcome: "SUCCESS" },
  { time: "27-Sep 14:10:09", actor: "SecOps Gateway", action: "Firewall rule check on biometric readers", ip: "192.168.1.1", outcome: "ALLOWED" }
];

export const DEPARTMENTS = [
  'Engineering & IT',
  'Plant Operations',
  'Quality Assurance',
  'Supply Chain',
  'Human Resources',
  'Finance & Accounts',
];

export const SHIFTS = ['General Shift A', 'Morning Shift B', 'Night Shift C'];

export const GATES = [
  'Gate 1 - Turnstile Alpha',
  'Gate 2 - Turnstile Beta',
  'Shop Floor East Terminal',
  'Admin Main Reception',
];

export const LEAVE_CATEGORIES = [
  'Casual Leave (CL)',
  'Earned Leave (EL)',
  'Sick / Medical Leave',
  'Maternity / Paternity Leave',
];
