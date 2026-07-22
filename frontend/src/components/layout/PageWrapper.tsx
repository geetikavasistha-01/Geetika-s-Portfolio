import React from 'react';
import { motion } from 'framer-motion';
import { useUIStore } from '../../store/uiStore';

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const clockDialogOpen = useUIStore((state) => state.clockDialogOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{
        opacity: clockDialogOpen ? 0 : 1,
        y: 0
      }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className={`max-w-[880px] mx-auto px-6 pt-32 pb-20 w-full z-10 relative flex flex-col transition-all duration-300 ${
        clockDialogOpen ? 'pointer-events-none filter blur-[2px]' : ''
      }`}
    >
      {children}
    </motion.div>
  );
}
