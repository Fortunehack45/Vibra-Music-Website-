import React from 'react';

interface ShowcasePhoneFrameProps {
  imageSrc: string;
  alt: string;
  label: string;
  testId: string;
  onInspect: () => void;
}

export const ShowcasePhoneFrame: React.FC<ShowcasePhoneFrameProps> = ({
  imageSrc,
  alt,
  label,
  testId,
  onInspect,
}) => {
  return (
    <button
      type="button"
      onClick={onInspect}
      data-testid={testId}
      aria-label={`Inspect ${label} full screen`}
      className="group relative w-[256px] max-w-[82vw] sm:w-[276px] shrink-0 rounded-[42px] sm:rounded-[44px] border border-[#2d2b2a] bg-[#0a0909] p-[8px] sm:p-[9px] text-left shadow-[0_28px_80px_rgba(0,0,0,0.9)] transition-colors duration-300 hover:border-[#4f4c4a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a855f7]"
    >
      {/* Subtle metallic titanium inner highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[44px] ring-1 ring-inset ring-white/[0.08]"
      />

      {/* Exact 9:20 Smartphone Display Container matching 1080x2400 Vibra Music screenshots */}
      <div className="relative aspect-[9/20] w-full overflow-hidden rounded-[36px] bg-[#090808]">
        <img
          src={imageSrc}
          alt={alt}
          width={540}
          height={1200}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-top"
        />
      </div>
    </button>
  );
};
