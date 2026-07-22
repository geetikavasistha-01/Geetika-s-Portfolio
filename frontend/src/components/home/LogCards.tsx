import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { api } from '../../lib/api';
import { Log } from '../../types';
import { useUIStore } from '../../store/uiStore';

const colorStyles = {
  amber: {
    borderClass: "border-l-amber-500 dark:border-l-amber-400",
    textAccent: "text-amber-600 dark:text-amber-400",
    dotClass: "bg-amber-500 dark:bg-amber-400"
  },
  teal: {
    borderClass: "border-l-[#34908B] dark:border-l-[#34908B]",
    textAccent: "text-[#34908B] dark:text-[#34908B]",
    dotClass: "bg-[#34908B] dark:bg-[#34908B]"
  },
  rose: {
    borderClass: "border-l-rose-500 dark:border-l-rose-400",
    textAccent: "text-rose-600 dark:text-rose-400",
    dotClass: "bg-rose-500 dark:bg-rose-400"
  }
};

const defaultLogs: Log[] = [
  {
    content: "Training sequence models at 2am. The LSTM network shows stable loss convergence. Climate AQI datasets have massive noise but clean spatial signals.",
    accentColor: 'amber',
    date: '2026-06-24T00:00:00.000Z',
    published: true
  },
  {
    content: "Refactoring the robot locomotion scripts. Thread-safe IPC pipelines are harder than they look. OpenCV pipeline runs smoothly now.",
    accentColor: 'teal',
    date: '2026-06-18T00:00:00.000Z',
    published: true
  },
  {
    content: "Writing is a lot like modeling. You start with unstructured thoughts, filter the noise, test hypotheses, and output narrative.",
    accentColor: 'rose',
    date: '2026-06-12T00:00:00.000Z',
    published: true
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 20
    }
  }
};

export default function LogCards() {
  const { recruiterMode } = useUIStore();

  const { data: logs } = useQuery<Log[]>({
    queryKey: ['logs'],
    queryFn: async () => {
      try {
        const res = await api.get('/logs');
        return res.data;
      } catch {
        return defaultLogs;
      }
    },
    initialData: defaultLogs
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const month = months[date.getMonth()];
    return `${day} ${month}`;
  };

  // Logs are hidden in recruiter mode
  if (recruiterMode) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-6"
    >
      {logs.slice(0, 3).map((log, index) => {
        const color = log.accentColor || 'amber';
        const style = colorStyles[color] || colorStyles.amber;
        return (
          <motion.div
            key={log._id || index}
            variants={itemVariants}
            className={`rounded-xl p-5 border border-border border-l-[3px] ${style.borderClass} bg-surface transition-all duration-300 relative select-none flex flex-col justify-between min-h-[160px] hover:-translate-y-1 hover:shadow-md hover:shadow-zinc-200/50 dark:hover:shadow-zinc-950/40 hover:border-zinc-300 dark:hover:border-zinc-700`}
          >
            {/* Opening Quote flourish background */}
            <span className={`absolute top-2 left-3 text-5xl font-serif select-none pointer-events-none opacity-[0.08] dark:opacity-[0.15] ${style.textAccent}`}>
              “
            </span>

            {/* Header Row */}
            <div className="flex items-center justify-between w-full relative z-10">
              <span className="text-[9px] tracking-[0.25em] font-mono font-bold text-text3 uppercase select-none">
                LOG
              </span>
              {/* Small accent dot */}
              <div className={`w-1.5 h-1.5 rounded-full ${style.dotClass}`} />
            </div>

            {/* Content text (without literal quote marks) */}
            <p className="my-4 text-[12px] leading-relaxed text-text2 font-sans font-normal relative z-10">
              {log.content}
            </p>

            {/* Date at the bottom-right */}
            <div className="flex justify-end w-full mt-auto relative z-10">
              <span className="text-[9px] font-mono text-text3 font-medium select-none">
                {formatDate(log.date)}
              </span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
