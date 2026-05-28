import React from 'react';
import { motion } from 'framer-motion';

export default function Sticker({ text, colorClass, rotateClass = '', className = '' }) {
  return (
    <motion.span 
      className={`font-label-sm text-label-sm px-3 py-1 manga-border cursor-pointer inline-block ${colorClass} ${rotateClass} ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {text}
    </motion.span>
  );
}
