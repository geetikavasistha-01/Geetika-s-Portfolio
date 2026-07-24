import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface DropItem {
  time: string;
  name: string;
  collection: string;
  imageSrc: string;
}

export interface ProductDropCardProps {
  title: string;
  subtitle: string;
  items: DropItem[];
}

export const ProductDropCard = ({
  title,
  subtitle,
  items,
}: ProductDropCardProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [itemsToShow, setItemsToShow] = React.useState(5);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setItemsToShow(1.5);
      } else if (window.innerWidth < 768) {
        setItemsToShow(2.5);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(3.5);
      } else {
        setItemsToShow(5);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < items.length - Math.ceil(itemsToShow);

  const handlePrev = () => {
    if (canGoPrev) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const rotations = ['rotate-[-4deg]', 'rotate-[1deg]', 'rotate-[3deg]', 'rotate-[-2deg]', 'rotate-[2deg]'];

  return (
    <div className="w-full max-w-4xl mx-auto select-none">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-normal text-text1 uppercase tracking-wider">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-text3 italic mt-1 font-editorial leading-relaxed">
            {subtitle}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={!canGoPrev}
            className="inline-flex items-center justify-center rounded-lg border border-border/60 bg-surface2/30 hover:bg-surface2 text-text2 hover:text-[#34908B] disabled:opacity-30 disabled:hover:text-text2 transition-all duration-300 w-8 h-8"
            aria-label="Previous drop"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className="inline-flex items-center justify-center rounded-lg border border-border/60 bg-surface2/30 hover:bg-surface2 text-text2 hover:text-[#34908B] disabled:opacity-30 disabled:hover:text-text2 transition-all duration-300 w-8 h-8"
            aria-label="Next drop"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Carousel Viewport */}
      <div className="overflow-hidden py-6 px-6 -mx-6">
        <div
          className="flex gap-6 transition-transform duration-500 ease-in-out"
          style={{ 
            transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
          }}
        >
          {items.map((item, index) => {
            const rotationClass = rotations[index % rotations.length];
            return (
              <div
                key={index}
                className="flex-shrink-0 relative group"
                style={{ 
                  flexBasis: `calc((100% / ${itemsToShow}) - (${(itemsToShow - 1) * 24}px / ${itemsToShow}))` 
                }}
              >
                {/* Tape Strip */}
                <div 
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-4 bg-white/20 dark:bg-white/10 backdrop-blur-[2.5px] border border-white/20 shadow-sm z-20 transform -rotate-6 select-none pointer-events-none"
                  style={{ 
                    clipPath: 'polygon(5% 0%, 95% 5%, 90% 95%, 10% 100%)',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                  }} 
                />

                {/* Polaroid Frame Container */}
                <div 
                  className={`relative bg-zinc-50 dark:bg-zinc-100 p-2.5 pb-5 rounded shadow-md border border-zinc-200/80 hover:border-zinc-300 dark:border-zinc-300 transition-all duration-300 hover:rotate-0 hover:scale-[1.02] transform origin-bottom ${rotationClass}`}
                >
                  <div className="space-y-3">
                    {/* Time / Label */}
                    <p className="text-[9px] font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase select-none">
                      {item.time}
                    </p>

                    {/* Image Area */}
                    <div className="aspect-[3/4] w-full overflow-hidden bg-zinc-200/50 border border-zinc-300/40 rounded-sm">
                      <img
                        src={item.imageSrc}
                        alt={item.name}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>

                    {/* Name & Collection Info */}
                    <div className="select-none min-h-[48px] flex flex-col justify-start">
                      <h3 className="font-semibold text-zinc-800 dark:text-zinc-900 text-xs sm:text-sm truncate">
                        {item.name}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-zinc-500 italic mt-0.5 leading-relaxed line-clamp-2 font-editorial">
                        {item.collection}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
