import React from 'react';
import { motion } from 'framer-motion';

export default function StickyNote({ text, className = '' }) {
  return (
    <motion.div 
      className={`bg-tertiary-fixed text-on-tertiary-fixed p-3 w-32 h-32 manga-border manga-shadow font-note-handwritten text-note-handwritten flex items-center justify-center text-center origin-center ${className}`}
      whileHover={{ scale: 1.1 }}
      animate={{ 
        y: [0, -5, 0]
      }}
      transition={{ 
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    >
      <span dangerouslySetInnerHTML={{ __html: text }} />
    </motion.div>
  );
}
