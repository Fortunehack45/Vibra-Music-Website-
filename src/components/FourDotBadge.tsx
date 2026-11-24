import React from 'react';

interface FourDotBadgeProps {
  className?: string;
}

export const FourDotBadge: React.FC<FourDotBadgeProps> = ({ className = '' }) => {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.02] ${className}`}
    >
      <span className="grid grid-cols-2 gap-[3px]">
        <span className="h-[2.5px] w-[2.5px] rounded-full bg-[#8c8a88]" />
        <span className="h-[2.5px] w-[2.5px] rounded-full bg-[#8c8a88]" />
        <span className="h-[2.5px] w-[2.5px] rounded-full bg-[#8c8a88]" />
        <span className="h-[2.5px] w-[2.5px] rounded-full bg-[#8c8a88]" />
      </span>
    </span>
  );
};
