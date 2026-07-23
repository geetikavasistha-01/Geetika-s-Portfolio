import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../lib/api';
import { ExternalLink } from 'lucide-react';
import { GitHubContributions } from '../../types';

// Helper to generate contributions for a specific year
const generateMockContributions = (year: number): GitHubContributions => {
  const weeks: GitHubContributions['weeks'] = [];
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);
  
  // Align start to the preceding Sunday
  const startDay = start.getDay();
  const startDate = new Date(start.getTime() - startDay * 24 * 60 * 60 * 1000);
  
  // Align end to the succeeding Saturday
  const endDay = end.getDay();
  const endDate = new Date(end.getTime() + (6 - endDay) * 24 * 60 * 60 * 1000);
  
  let totalContributions = 0;
  let currentDate = new Date(startDate);
  let currentWeekDays: any[] = [];
  
  while (currentDate <= endDate) {
    const isWithinYear = currentDate.getFullYear() === year;
    const rand = Math.random();
    let count = 0;
    let color = '0';
    
    if (isWithinYear) {
      if (rand > 0.8) {
        count = Math.floor(Math.random() * 3) + 1;
        color = count.toString();
      } else if (rand > 0.96) {
        count = Math.floor(Math.random() * 6) + 4;
        color = '4';
      }
    }
    
    totalContributions += count;
    currentWeekDays.push({
      contributionCount: count,
      date: currentDate.toISOString().split('T')[0],
      color
    });
    
    if (currentWeekDays.length === 7) {
      weeks.push({ contributionDays: currentWeekDays });
      currentWeekDays = [];
    }
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return { 
    totalContributions, 
    weeks, 
    years: [2026, 2025, 2024, 2023] 
  };
};

const transformJogruberDataForYear = (rawData: any, year: number): GitHubContributions => {
  const contributions = rawData.contributions || [];
  
  // Filter for the selected year
  const yearContributions = contributions.filter((day: any) => {
    return new Date(day.date).getFullYear() === year;
  });

  // Sort by date ascending
  yearContributions.sort((a: any, b: any) => a.date.localeCompare(b.date));

  const weeks: GitHubContributions['weeks'] = [];
  let totalContributions = 0;

  if (yearContributions.length > 0) {
    const firstDate = new Date(yearContributions[0].date);
    const firstDayOfWeek = firstDate.getDay();

    const initialDays = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      initialDays.push({
        contributionCount: 0,
        date: new Date(firstDate.getTime() - (firstDayOfWeek - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        color: '0'
      });
    }

    const allDays = [
      ...initialDays,
      ...yearContributions.map((day: any) => {
        totalContributions += day.count;
        return {
          contributionCount: day.count,
          date: day.date,
          color: day.level.toString()
        };
      })
    ];

    for (let i = 0; i < allDays.length; i += 7) {
      const chunk = allDays.slice(i, i + 7);
      while (chunk.length < 7) {
        const lastDay = new Date(chunk[chunk.length - 1].date);
        const nextDay = new Date(lastDay.getTime() + 24 * 60 * 60 * 1000);
        chunk.push({
          contributionCount: 0,
          date: nextDay.toISOString().split('T')[0],
          color: '0'
        });
      }
      weeks.push({ contributionDays: chunk });
    }
  }

  // Extract available unique years
  const yearsSet = new Set<number>();
  contributions.forEach((day: any) => {
    const y = new Date(day.date).getFullYear();
    if (y) yearsSet.add(y);
  });
  const years = Array.from(yearsSet).sort((a, b) => b - a);

  return { totalContributions, weeks, years };
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
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [hoveredDay, setHoveredDay] = useState<{ count: number; date: string } | null>(null);

  const { data, isLoading } = useQuery<GitHubContributions>({
    queryKey: ['github-contributions', selectedYear],
    queryFn: async () => {
      try {
        const res = await api.get(`/github/contributions?year=${selectedYear}`);
        return res.data;
      } catch {
        try {
          const res = await fetch('https://github-contributions-api.jogruber.de/v4/geetikavasistha-01');
          const rawData = await res.json();
          return transformJogruberDataForYear(rawData, selectedYear);
        } catch {
          return generateMockContributions(selectedYear);
        }
      }
    },
    initialData: generateMockContributions(selectedYear)
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

  const availableYears = data?.years && data.years.length > 0
    ? data.years
    : [2026, 2025, 2024, 2023];

  return (
    <div className="w-full mt-6 select-none relative">
      <div className="p-5 rounded-2xl border border-border bg-surface flex flex-col gap-4">
        {/* Title & Years Row */}
        <div className="flex items-center justify-between gap-4 mb-2 select-none">
          <div className="flex items-center gap-3 flex-grow">
            <span className="text-[10px] font-mono tracking-widest text-text3 uppercase">CONTRIBUTIONS</span>
            <div className="h-px bg-border/20 flex-grow" />
          </div>
          
          <div className="flex items-center gap-3">
            {/* Year selector */}
            <div className="flex items-center gap-1 bg-surface2/30 p-0.5 rounded-full border border-border/30">
              {availableYears.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-3 py-1 text-[9px] font-mono rounded-full transition-all ${
                    selectedYear === year
                      ? 'bg-text1 text-bg font-bold shadow-sm'
                      : 'text-text3 hover:text-text1'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
            
            {/* External Link */}
            <a 
              href="https://github.com/geetikavasistha-01" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-text3 hover:text-text1 transition-colors p-1"
            >
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Heatmap Grid Container */}
        <div className="overflow-x-auto w-full pb-2">
          {isLoading ? (
            <div className="h-[125px] w-full bg-surface2/60 animate-pulse rounded-md" />
          ) : (
            <div className="flex flex-col gap-2 min-w-[700px] relative">
              {/* Months Row */}
              <div className="flex relative h-4 text-[9px] text-text3/60 font-mono select-none">
                {data?.weeks.map((week, wIdx) => {
                  const dateStr = week.contributionDays[0]?.date;
                  if (!dateStr) return null;
                  
                  const date = new Date(dateStr);
                  const prevWeekDateStr = data.weeks[wIdx - 1]?.contributionDays[0]?.date;
                  const prevMonth = prevWeekDateStr ? new Date(prevWeekDateStr).getMonth() : -1;
                  const currentMonth = date.getMonth();
                  
                  if (currentMonth !== prevMonth) {
                    const monthName = date.toLocaleString('en-US', { month: 'short' });
                    return (
                      <span key={wIdx} className="absolute" style={{ left: `${wIdx * 13}px` }}>
                        {monthName}
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Grid block columns */}
              <div className="flex gap-[3px]">
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
            </div>
          )}
        </div>

        {/* Heatmap Footer Legend */}
        <div className="flex justify-between items-center text-[10px] text-text3 font-mono">
          <div>
            {data?.totalContributions} contributions in {selectedYear}
          </div>
          <div className="flex items-center gap-1.5">
            <span>Less</span>
            <div className="w-2.5 h-2.5 rounded-[1.5px] bg-surface2 border border-border/50" />
            <div className="w-2.5 h-2.5 rounded-[1.5px] bg-green-900/40 dark:bg-[#166534]" />
            <div className="w-2.5 h-2.5 rounded-[1.5px] bg-green-700/60 dark:bg-[#15803d]" />
            <div className="w-2.5 h-2.5 rounded-[1.5px] bg-green-500/80 dark:bg-[#22c55e]" />
            <div className="w-2.5 h-2.5 rounded-[1.5px] bg-green-400 dark:bg-[#4ade80]" />
            <span>More</span>
          </div>
        </div>

        {/* Hover Tooltip Overlay */}
        {hoveredDay && (
          <div className="absolute top-2 right-2 bg-surface2 border border-border text-[10px] font-mono text-text1 px-2.5 py-1 rounded-md shadow-md animate-fade-in z-20">
            {hoveredDay.count} contribution{hoveredDay.count !== 1 && 's'} · {formatDate(hoveredDay.date)}
          </div>
        )}
      </div>
    </div>
  );
}
