import React from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-20 max-w-full bg-secondary border-b-4 border-outline shadow-[4px_4px_0px_0px_rgba(43,71,137,1)] transition-all">
      <motion.div 
        className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg font-black text-on-secondary tracking-tighter cursor-pointer flex items-center"
        whileHover={{ scale: 1.05, rotate: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        GEEKY KUNOICHI
      </motion.div>
      <nav className="hidden md:flex gap-8 items-center font-nav-bold text-nav-bold uppercase">
        <motion.a whileHover={{ scale: 1.05, rotate: 1 }} className="text-primary-container font-bold border-b-2 border-primary-container pb-1 transition-all duration-200" href="#">ABOUT</motion.a>
        <motion.a whileHover={{ scale: 1.05, rotate: 1 }} className="text-on-secondary hover:text-secondary-fixed pb-1 transition-colors duration-200" href="#">PROJECTS</motion.a>
        <motion.a whileHover={{ scale: 1.05, rotate: 1 }} className="text-on-secondary hover:text-secondary-fixed pb-1 transition-colors duration-200" href="#">SKILLS</motion.a>
        <motion.a whileHover={{ scale: 1.05, rotate: 1 }} className="text-on-secondary hover:text-secondary-fixed pb-1 transition-colors duration-200" href="#">CONTACT</motion.a>
      </nav>
      <motion.button 
        className="bg-primary-container text-on-primary-container font-nav-bold text-nav-bold uppercase px-6 py-2 manga-border manga-shadow transition-colors duration-200"
        whileHover={{ scale: 1.05, rotate: -2, x: -2, y: -2, boxShadow: "6px 6px 0px 0px #1a1c1c" }}
        whileTap={{ scale: 0.95 }}
      >
        Hire Me
      </motion.button>
    </header>
  );
}
