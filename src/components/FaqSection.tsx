import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { VIBRA_FAQS } from '../data/legalContent';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(VIBRA_FAQS[0]?.id ?? null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative z-20 mx-auto max-w-[1280px] px-5 pt-6 pb-20 sm:px-10 sm:pb-28 lg:px-14"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left Editorial Column */}
        <div className="lg:col-span-4">
          <p className="text-[12px] font-normal text-[#6f6d6b]">FAQ /</p>
          <h2
            id="faq-heading"
            className="font-display mt-2 text-[28px] font-normal leading-[1.12] tracking-[-0.025em] text-[#f4f3f1] sm:text-[36px]"
          >
            Common questions, straight answers.
          </h2>
          <p className="mt-3.5 max-w-[300px] text-[14px] leading-[1.6] text-[#8a8784]">
            Everything you need to know about lossless playback, neural DSP Mix, privacy, and
            official signed builds.
          </p>
        </div>

        {/* Right Accordion List */}
        <div className="divide-y divide-white/[0.07] border-y border-white/[0.07] lg:col-span-8">
          {VIBRA_FAQS.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            return (
              <div key={item.id}>
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full min-h-[60px] items-center justify-between gap-4 py-5 text-left transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a855f7]"
                >
                  <span
                    className={`font-display text-[15.5px] font-medium leading-snug sm:text-[17px] ${
                      isOpen ? 'text-white' : 'text-[#dfddd9]'
                    }`}
                  >
                    {item.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                      isOpen
                        ? 'rotate-45 border-[#a855f7]/50 text-[#c084fc]'
                        : 'border-white/[0.1] text-[#8a8784]'
                    }`}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </span>
                </button>
                {isOpen && (
                  <div
                    id={panelId}
                    className="pb-6 pr-8 text-[14.5px] leading-[1.7] text-[#a7a4a1] sm:text-[15px]"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
