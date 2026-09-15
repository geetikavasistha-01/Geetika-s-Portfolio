import React from 'react';

export default function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 select-none">
      {/* Accent Bar */}
      <div className="w-1 h-6 bg-accent rounded-full" />
      {/* Serif Title */}
      <h2 className="text-xl sm:text-2xl font-editorial font-normal text-text1">
        {title}
      </h2>
    </div>
  );
}
