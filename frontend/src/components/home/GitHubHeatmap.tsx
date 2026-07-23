import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { ExternalLink } from 'lucide-react';
import { GitHubContributions } from '../../types';

// Helper to generate 52 weeks of dummy contributions
const generateMockContributions = (): GitHubContributions => {
  const weeks: GitHubContributions['weeks'] = [];
  const today = new Date();
  let totalContributions = 0;

  for (let w = 51; w >= 0; w--) {
    const contributionDays = [];
    for (let d = 0; d < 7; d++) {
      const dayOffset = (w * 7) + d;
      const dayDate = new Date(today.getTime() - dayOffset * 24 * 60 * 60 * 1000);
      
      // Random count with weights (more 0s, 1s, occasional 4s)
      const rand = Math.random();
      let contributionCount = 0;
      let color = '0';
      
      if (rand > 0.8) {
        contributionCount = Math.floor(Math.random() * 3) + 1;
        color = contributionCount.toString();
      } else if (rand > 0.95) {
        contributionCount = Math.floor(Math.random() * 6) + 4;
        color = '4';
      }

      totalContributions += contributionCount;
      contributionDays.push({
        contributionCount,
        date: dayDate.toISOString(),
        color
      });
    }
    // Weeks should be rendered chronological
    weeks.unshift({ contributionDays });
  }

  return { totalContributions, weeks };
};

const transformJogruberData = (rawData: any): GitHubContributions => {
  const contributions = rawData.contributions || [];
  
  // Get the last 364 days (52 weeks * 7 days)
  const lastYearContributions = contributions.slice(-364);
  
  const weeks: GitHubContributions['weeks'] = [];
  let totalContributions = 0;
  
  for (let i = 0; i < lastYearContributions.length; i += 7) {
    const chunk = lastYearContributions.slice(i, i + 7);
    const contributionDays = chunk.map((day: any) => {
      totalContributions += day.count;
      return {
        contributionCount: day.count,
        date: day.date,
        color: day.level.toString()
      };
    });
    weeks.push({ contributionDays });
  }
  
  return { totalContributions, weeks };
};

const getLevel = (color: string, count: number): number => {
  if (color && !color.startsWith('#')) {
    const val = parseInt(color);
    if (!isNaN(val)) return Math.min(Math.max(val, 0), 4);
  }
  
  if (color) {
    const c = color.toLowerCase();
    if (c === '#ebedf0' || c === '#161b22' || c === '#21262d') return 0;
    if (c === '#9be9a8' || c === '#0e4429') return 1;
    if (c === '#40c463' || c === '#006d32') return 2;
    if (c === '#30a14e' || c === '#26a641') return 3;
    if (c === '#216e39' || c === '#39d353') return 4;
  }
  
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 4) return 2;
  if (count <= 7) return 3;
  return 4;
};

export default function GitHubHeatmap() {
  const [hoveredDay, setHoveredDay] = useState<{ count: number; date: string } | null>(null);

  const { data, isLoading } = useQuery<GitHubContributions>({
    queryKey: ['github-contributions'],
    queryFn: async () => {
      try {
        const res = await api.get('/github/contributions');
        return res.data;
      } catch {
        try {
          const res = await fetch('https://github-contributions-api.jogruber.de/v4/geetikavasistha-01');
          const rawData = await res.json();
          return transformJogruberData(rawData);
        } catch {
          return generateMockContributions();
        }
      }
    },
    initialData: generateMockContributions()
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  };

  const colorLevels = [
    'bg-surface2 border border-border/50',
    'bg-green-900/40 border border-green-800/10 dark:bg-[#166534]',
    'bg-green-700/60 border border-green-600/10 dark:bg-[#15803d]',
    'bg-green-500/80 border border-green-400/10 dark:bg-[#22c55e]',
    'bg-green-400 border border-green-300/10 dark:bg-[#4ade80]'
  ];

  return (
    <div className="w-full mt-6 select-none relative">
      <div className="p-5 rounded-2xl border border-border bg-surface flex flex-col gap-4">
        {/* Heatmap Grid Container */}
        <div className="overflow-x-auto w-full pb-2">
          {isLoading ? (
            <div className="h-[105px] w-full bg-surface2/60 animate-pulse rounded-md" />
          ) : (
            <div className="flex gap-[3px] min-w-[700px]">
              {data?.weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px]">
                  {week.contributionDays.map((day, dIdx) => {
                    const level = getLevel(day.color || '0', day.contributionCount || 0);
                    return (
                      <div
                        key={dIdx}
                        className={`w-[10px] h-[10px] rounded-[2px] transition-all hover:scale-125 cursor-pointer ${colorLevels[level]}`}
                        onMouseEnter={() => setHoveredDay({ count: day.contributionCount, date: day.date })}
                        onMouseLeave={() => setHoveredDay(null)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Heatmap Footer Legend */}
        <div className="flex justify-between items-center text-[10px] text-text3 font-mono">
          <div>
            {data?.totalContributions} contributions in the last year
          </div>
          <div className="flex items-center gap-1">
            <span>Less</span>
            <div className="w-2.5 h-2.5 rounded-[1px] bg-surface2 border border-border/50" />
            <div className="w-2.5 h-2.5 rounded-[1px] bg-green-900/40 dark:bg-[#166534]" />
            <div className="w-2.5 h-2.5 rounded-[1px] bg-green-700/60 dark:bg-[#15803d]" />
            <div className="w-2.5 h-2.5 rounded-[1px] bg-green-500/80 dark:bg-[#22c55e]" />
            <div className="w-2.5 h-2.5 rounded-[1px] bg-green-400 dark:bg-[#4ade80]" />
            <span>More</span>
          </div>
        </div>

        {/* Hover Tooltip Overlay */}
        {hoveredDay && (
          <div className="absolute top-0 right-0 bg-surface2 border border-border text-[10px] font-mono text-text1 px-2.5 py-1 rounded-md shadow-md animate-fade-in z-20">
            {hoveredDay.count} contribution{hoveredDay.count !== 1 && 's'} · {formatDate(hoveredDay.date)}
          </div>
        )}
      </div>
    </div>
  );
}
