import React from 'react';

interface PhoneStatusBarProps {
  compact?: boolean;
}

export const PhoneStatusBar: React.FC<PhoneStatusBarProps> = ({ compact = false }) => {
  return (
    <div
      className={`flex items-center justify-between text-white/95 select-none ${
        compact ? 'px-4 pt-2 pb-1 text-[9px]' : 'px-5 pt-2.5 pb-1.5 text-[10px]'
      }`}
    >
      <span className="font-semibold tracking-tight tabular-nums">9:41</span>
      <div className="flex items-center gap-1.5" aria-hidden="true">
        {/* Signal bars */}
        <svg className={compact ? 'h-2 w-3' : 'h-2.5 w-3.5'} viewBox="0 0 16 12" fill="currentColor">
          <rect x="0" y="7" width="2.5" height="5" rx="0.8" />
          <rect x="4" y="5" width="2.5" height="7" rx="0.8" />
          <rect x="8" y="2.5" width="2.5" height="9.5" rx="0.8" />
          <rect x="12" y="0" width="2.5" height="12" rx="0.8" />
        </svg>
        {/* Wi-Fi */}
        <svg className={compact ? 'h-2 w-2.5' : 'h-2.5 w-3'} viewBox="0 0 16 12" fill="none">
          <path
            d="M1.5 4.2C5.2 0.8 10.8 0.8 14.5 4.2M4 6.8C6.3 4.7 9.7 4.7 12 6.8M6.6 9.4C7.4 8.7 8.6 8.7 9.4 9.4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
        {/* Battery */}
        <svg className={compact ? 'h-2 w-4' : 'h-2.5 w-5'} viewBox="0 0 24 12" fill="none">
          <rect x="0.8" y="1" width="19" height="10" rx="2.6" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.2" />
          <rect x="2.4" y="2.6" width="14.2" height="6.8" rx="1.4" fill="currentColor" />
          <path d="M21.2 4.2V7.8C22 7.4 22.4 6.8 22.4 6C22.4 5.2 22 4.6 21.2 4.2Z" fill="currentColor" fillOpacity="0.5" />
        </svg>
      </div>
    </div>
  );
};
