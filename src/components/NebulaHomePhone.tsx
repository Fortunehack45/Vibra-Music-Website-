import React from 'react';

export type HeroHighlightKey = 'lossless' | 'mix' | 'glass' | null;

interface NebulaHomePhoneProps {
  highlightedFeature: HeroHighlightKey;
}

const HERO_HAND_IMAGE_SRC =
  '/assets/aistudio/file_000000009af881f482d9a52c19e4f281_ab93d86b.png';

export const NebulaHomePhone: React.FC<NebulaHomePhoneProps> = ({ highlightedFeature }) => {
  const reflectionOpacity = highlightedFeature ? 'opacity-[0.52]' : 'opacity-[0.42]';

  return (
    <div
      data-testid="nebula-home-screen"
      className="relative mx-auto flex w-full max-w-[340px] items-center justify-center sm:max-w-[500px] lg:max-w-[610px] select-none"
    >
      {/* Hand + Phone Cutout Container: Pure Multi-Edge Feathered Fade with Zero Hard Edges */}
      <div className="relative z-10 w-full">
        {/* Main Layer with Generous Radial + Edge Feathering so Wrist/Cuff Dissolves Invisibly into #080707 */}
        <div
          className="relative w-full"
          style={{
            WebkitMaskImage:
              'linear-gradient(to bottom, rgba(0,0,0,1) 58%, rgba(0,0,0,0.72) 74%, rgba(0,0,0,0.18) 88%, rgba(0,0,0,0) 98%), linear-gradient(to right, rgba(0,0,0,1) 62%, rgba(0,0,0,0.68) 78%, rgba(0,0,0,0.14) 90%, rgba(0,0,0,0) 98%)',
            WebkitMaskComposite: 'source-in',
            maskImage:
              'linear-gradient(to bottom, rgba(0,0,0,1) 58%, rgba(0,0,0,0.72) 74%, rgba(0,0,0,0.18) 88%, rgba(0,0,0,0) 98%), linear-gradient(to right, rgba(0,0,0,1) 62%, rgba(0,0,0,0.68) 78%, rgba(0,0,0,0.14) 90%, rgba(0,0,0,0) 98%)',
            maskComposite: 'intersect',
          }}
        >
          {/* Base Hand & Phone Image */}
          <img
            src={HERO_HAND_IMAGE_SRC}
            alt="Hand holding smartphone displaying the Vibra Music Listen Now home screen"
            referrerPolicy="no-referrer"
            className="relative z-10 h-auto w-full object-contain"
          />

          {/* Gentle Purple Rim-Light Reflection Pass STRICTLY Masked to Hand Silhouette */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 z-20 mix-blend-color transition-opacity duration-300 ${reflectionOpacity}`}
            style={{
              background:
                'radial-gradient(ellipse 80% 80% at 56% 56%, rgba(167, 112, 245, 0.92) 0%, rgba(139, 92, 246, 0.85) 55%, rgba(109, 40, 217, 0.78) 100%)',
              WebkitMaskImage: `url(${HERO_HAND_IMAGE_SRC})`,
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskImage: `url(${HERO_HAND_IMAGE_SRC})`,
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
            }}
          />

          {/* Subtle Desaturation / Cool Softener Over Warm Orange Skin Highlights Strictly Inside Hand Silhouette */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 opacity-[0.14] mix-blend-screen"
            style={{
              background:
                'radial-gradient(circle at 68% 60%, rgba(196, 155, 255, 0.48) 0%, rgba(139, 92, 246, 0.14) 44%, rgba(0,0,0,0) 70%)',
              WebkitMaskImage: `url(${HERO_HAND_IMAGE_SRC})`,
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskImage: `url(${HERO_HAND_IMAGE_SRC})`,
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
            }}
          />

          {/* True-Color Phone Screen Restore Layer so Vibra UI & Artwork Stay 100% Crisp & Untinted */}
          <img
            src={HERO_HAND_IMAGE_SRC}
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="pointer-events-none absolute inset-0 z-30 h-full w-full object-contain"
            style={{
              clipPath: 'polygon(10% 6%, 42.5% 2.8%, 66.5% 63.5%, 32% 69.5%)',
            }}
          />
        </div>
      </div>
    </div>
  );
};
