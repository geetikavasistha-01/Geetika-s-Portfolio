import React from 'react';
import { motion } from 'framer-motion';
import PagePagination from '../ui/PagePagination';

interface PageWrapperProps {
  children: React.ReactNode;
  maxClassName?: string;
}

export default function PageWrapper({ children, maxClassName }: PageWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`${maxClassName || 'max-w-[880px]'} mx-auto px-6 pt-44 pb-8 w-full z-10 relative flex flex-col`}
    >
      {children}
      <PagePagination />
    </motion.div>
  );
}
