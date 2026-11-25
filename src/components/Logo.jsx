import { useId } from "react";

const SIZES = {
  sm: { text: "text-3xl", icon: "w-4 h-4" },
  md: {
    text: "text-3xl sm:text-4xl md:text-5xl",
    icon: "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6",
  },
  lg: { text: "text-6xl", icon: "w-8 h-8" },
};

// Four-point sparkle, filled with the AI gradient
const Sparkle = ({ className }) => {
  const gradientId = useId();
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-ai-from)" />
          <stop offset="100%" stopColor="var(--color-ai-to)" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientId})`}
        d="M12 1.5c.6 4.9 2.6 6.9 8.5 8.5-5.9 1.6-7.9 3.6-8.5 8.5-.6-4.9-2.6-6.9-8.5-8.5 5.9-1.6 7.9-3.6 8.5-8.5Z"
      />
    </svg>
  );
};

const Logo = ({ size = "md", className = "" }) => {
  const { text, icon } = SIZES[size] ?? SIZES.md;

  return (
    <div
      className={`inline-flex items-start select-none font-display leading-none tracking-wide ${text} ${className}`}
      aria-label="NetflixGPT"
      role="img"
    >
      <span className="text-primary drop-shadow-[0_2px_8px_rgba(225,29,46,0.45)]">
        NETFLIX
      </span>
      <span className="ml-1 bg-linear-to-r from-ai-from to-ai-to bg-clip-text text-transparent">
        GPT
      </span>
      <Sparkle className={`-mt-1 ml-0.5 ${icon}`} />
    </div>
  );
};

export default Logo;
