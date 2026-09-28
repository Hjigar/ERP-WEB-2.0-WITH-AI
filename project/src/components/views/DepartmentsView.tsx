import { useErp } from '@/context/ErpContext';

export function DepartmentsView() {
  const { departments } = useErp();

  return (
    <section className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-token-border/60">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-token-textBody tracking-tight">Organization Structure & Hierarchy</h1>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-sm bg-token-bgForest text-token-accentMint border border-token-border">{departments.length} Operational Units</span>
          </div>
          <p className="text-xs text-token-textSec1 mt-0.5">Departmental heads, cost centres, headcounts, and quarterly OPEX allocations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map(d => (
          <div key={d.name} className="p-4 rounded-md bg-token-darkCard border border-token-border shadow-erp-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-token-textBody">{d.name}</h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-sm bg-token-darkHover text-token-accentCyan border border-token-border">{d.count} Members</span>
              </div>
              <p className="text-xs text-token-textSec1 mt-1">Head: <span className="text-token-textLight2 font-medium">{d.head}</span></p>
              <p className="text-[11px] text-token-textSec2 mt-2">{d.tags}</p>
            </div>
            <div className="border-t border-token-border/60 pt-3 flex items-center justify-between text-xs">
              <span className="text-token-textSec1">Quarterly OPEX</span>
              <span className="font-mono font-bold text-token-accentMint">{d.budget}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
