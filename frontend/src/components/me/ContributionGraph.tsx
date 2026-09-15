import React, { useMemo } from 'react';

interface ContributionData {
  date: string;
  count: number;
}

interface ContributionGraphProps {
  handle?: string;
  data?: ContributionData[];
}

export default function ContributionGraph({ handle = 'geekykunoichi', data }: ContributionGraphProps) {
  // Generate 3 rows (Mon, Wed, Fri) x 40 columns for a clean card-fitting display
  const columnsCount = 38; 
  const rows = ['Mon', 'Wed', 'Fri'];

  const cells = useMemo(() => {
    // Generate pseudorandom contributions for visual variation
    const result: number[][] = [];
    for (let r = 0; r < 3; r++) {
      const rowCells: number[] = [];
      for (let c = 0; c < columnsCount; c++) {
        // Create random intensity: 0 to 4
        let val = 0;
        const seed = Math.random();
        if (seed > 0.85) val = 4; // High
        else if (seed > 0.65) val = 3; // Med-High
        else if (seed > 0.4) val = 2; // Med
        else if (seed > 0.15) val = 1; // Low
        // Scatter some special blue tags (value 5)
        if (seed > 0.97) val = 5;
        rowCells.push(val);
      }
      result.push(rowCells);
    }
    return result;
  }, [columnsCount]);

  const getColorClass = (val: number) => {
    switch (val) {
      case 1: return 'bg-accent/20 border border-accent/20';
      case 2: return 'bg-accent/40 border border-accent/30';
      case 3: return 'bg-accent/65 border border-accent/50';
      case 4: return 'bg-accent shadow-sm';
      case 5: return 'bg-accent shadow-md';
      default: return 'bg-surface2/60 border border-border/40'; // Empty
    }
  };

  // Basic month labels spaced out across columns
  const months = ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'];

  return (
    <div className="w-full bg-surface border border-border rounded-2xl p-5 select-none">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] tracking-wider uppercase font-semibold text-text3 font-mono">
          Contributions @{handle}
        </span>
        <div className="flex items-center gap-1.5 text-[8px] text-text4 font-mono">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded bg-surface2/60 border border-border/40" />
          <div className="w-2.5 h-2.5 rounded bg-accent/20" />
          <div className="w-2.5 h-2.5 rounded bg-accent/40" />
          <div className="w-2.5 h-2.5 rounded bg-accent/65" />
          <div className="w-2.5 h-2.5 rounded bg-accent shadow-sm" />
          <span>More</span>
        </div>
      </div>

      <div className="flex flex-col overflow-x-auto pb-1 scrollbar-none">
        {/* Month headers row */}
        <div className="flex pl-8 mb-1.5 text-[9px] font-mono text-text4 gap-x-12 select-none">
          {months.map(m => (
            <span key={m} className="w-8">{m}</span>
          ))}
        </div>

        {/* Heatmap grid */}
        <div className="flex flex-col gap-1.5">
          {rows.map((rowLabel, rIdx) => (
            <div key={rowLabel} className="flex items-center gap-1.5">
              {/* Day label */}
              <span className="w-6 text-[9px] font-mono text-text4 pr-2 text-right">
                {rowLabel}
              </span>
              {/* Columns */}
              <div className="flex gap-1.5">
                {cells[rIdx].map((val, cIdx) => (
                  <div
                    key={cIdx}
                    className={`w-3 h-3 rounded-[3px] transition-all duration-300 ${getColorClass(val)}`}
                    title={`Intensity: ${val}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
