import React, { useState } from 'react';
import { Radio, X } from 'lucide-react';
import { LIVE_HOSTS } from '../data/nebulaData';

export const LiveDuoWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Toggle Vibra Music Discord Rich Presence preview"
        className="group relative inline-flex items-center rounded-full border border-white/15 bg-[#121111]/90 p-1 shadow-[0_12px_32px_rgba(0,0,0,0.75)] transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a855f7]"
      >
        <div className="flex items-center -space-x-2">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border border-[#1a2b22] bg-[#0e2018]">
            <img
              src={LIVE_HOSTS[0].avatar}
              alt="Vibra listener profile"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="relative h-10 w-10 overflow-hidden rounded-full border border-[#3d2514] bg-[#2a170b]">
            <img
              src={LIVE_HOSTS[1].avatar}
              alt="Vibra community listener"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <span className="absolute -top-1.5 -right-2 rounded-full bg-gradient-to-r from-[#ff4fa3] to-[#a855f7] px-2 py-[2px] text-[9px] font-semibold tracking-wide text-white shadow-[0_2px_10px_rgba(168,85,247,0.45)]">
          Live
        </span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Vibra Music Rich Presence"
          className="absolute left-0 top-full z-30 mt-3 w-64 rounded-2xl border border-white/10 bg-[#141313]/95 p-4 text-left shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-md"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#c084fc]">
              <Radio className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Discord Rich Presence</span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close Rich Presence preview"
              className="rounded-full p-1 text-[#8c8a88] transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="mt-2 text-xs font-medium text-white">Oh My (feat. Bnxn)</p>
          <p className="mt-0.5 text-[11px] text-[#9b9896]">Kidd Carder · Scrobbling to Last.fm</p>
          <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2.5 text-[11px] text-[#8a8886]">
            <span className="tabular-nums">FLAC · Gapless Mix</span>
            <span className="text-[#c084fc]">Vibra</span>
          </div>
        </div>
      )}
    </div>
  );
};
