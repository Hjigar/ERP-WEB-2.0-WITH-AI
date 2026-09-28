import { Info } from 'lucide-react';
import { useErp } from '@/context/ErpContext';
import { toastBorderClass, toastIconClass } from '@/utils/ui';

export function ToastContainer() {
  const { toasts } = useErp();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`pointer-events-auto bg-token-darkCard border ${toastBorderClass(toast.type)} p-3 rounded-sm shadow-erp-md flex items-start space-x-2.5 w-72 text-xs transition-all duration-200`}
        >
          <div className={toastIconClass(toast.type)}>
            <Info className="w-4 h-4 mt-0.5" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-token-textBody">{toast.title}</p>
            <p className="text-[11px] text-token-textSec1 mt-0.5">{toast.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
