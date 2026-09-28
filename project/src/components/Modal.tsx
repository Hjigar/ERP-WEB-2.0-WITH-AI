import type { ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  maxWidth?: string;
}

export function Modal({ open, onClose, title, subtitle, children, maxWidth = 'max-w-lg' }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 modal-backdrop-blur z-50 flex items-center justify-center p-4">
      <div className={`bg-token-darkCard border border-token-border rounded-md shadow-erp-md w-full ${maxWidth} overflow-hidden`}>
        <div className="p-4 border-b border-token-border flex items-center justify-between bg-token-darkBase/80">
          <div>
            {subtitle && (
              <span className="text-[10px] text-token-accentMint font-semibold uppercase">{subtitle}</span>
            )}
            <h3 className="text-sm font-bold text-token-textBody">{title}</h3>
          </div>
          <button onClick={onClose} className="text-token-textSec1 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
