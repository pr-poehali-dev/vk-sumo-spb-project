export default function LogoSined({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="bgGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#0a1a3a" />
          <stop offset="100%" stopColor="#03080f" />
        </radialGradient>
        <linearGradient id="blueRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00c8ff" />
          <stop offset="40%" stopColor="#1a6edb" />
          <stop offset="100%" stopColor="#0a3a8a" />
        </linearGradient>
        <linearGradient id="greenRingGrad" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c8f000" />
          <stop offset="40%" stopColor="#4ecb2d" />
          <stop offset="100%" stopColor="#1a7a10" />
        </linearGradient>
        <linearGradient id="swishBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#40e0ff" />
          <stop offset="100%" stopColor="#0a5fd0" />
        </linearGradient>
        <linearGradient id="swishGreenGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1a8a10" />
          <stop offset="50%" stopColor="#4ecb2d" />
          <stop offset="100%" stopColor="#a8f020" />
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* Внешнее кольцо тёмно-синее (обводка) */}
      <circle cx="50" cy="52" r="46" fill="#1a3060" />

      {/* Основной шар */}
      <circle cx="50" cy="50" r="44" fill="url(#bgGrad)" />

      {/* Синее внешнее кольцо */}
      <path
        d="M 50 8 A 42 42 0 0 1 92 50 A 42 42 0 0 0 50 8 Z"
        fill="none"
        stroke="url(#blueRingGrad)"
        strokeWidth="9"
        strokeLinecap="round"
        opacity="0.95"
        filter="url(#shadow)"
      />
      <path
        d="M 8 50 A 42 42 0 0 1 50 8 A 42 42 0 0 0 8 50 Z"
        fill="none"
        stroke="url(#blueRingGrad)"
        strokeWidth="9"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* Полное синее кольцо */}
      <circle
        cx="50"
        cy="50"
        r="38"
        fill="none"
        stroke="url(#blueRingGrad)"
        strokeWidth="10"
        strokeDasharray="190 50"
        strokeDashoffset="30"
        opacity="0.85"
      />

      {/* Зелёное кольцо повёрнутое */}
      <ellipse
        cx="50"
        cy="50"
        rx="30"
        ry="42"
        fill="none"
        stroke="url(#greenRingGrad)"
        strokeWidth="9"
        strokeDasharray="170 60"
        strokeDashoffset="100"
        opacity="0.9"
        filter="url(#shadow)"
      />

      {/* Синий завиток (верхний) */}
      <path
        d="M 45 20 C 55 22 62 30 58 42 C 54 54 44 58 46 68"
        fill="none"
        stroke="url(#swishBlueGrad)"
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* Зелёный завиток (нижний) */}
      <path
        d="M 54 80 C 44 78 37 70 41 58 C 45 46 56 42 54 32"
        fill="none"
        stroke="url(#swishGreenGrad)"
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* Блик на шаре */}
      <ellipse cx="35" cy="30" rx="10" ry="6" fill="white" opacity="0.07" transform="rotate(-30 35 30)" />
    </svg>
  );
}
