export default function LogoLeaf({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 1.1)}
      viewBox="0 0 90 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="leafGold" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#f5d060" />
          <stop offset="30%" stopColor="#d4a017" />
          <stop offset="60%" stopColor="#c8940a" />
          <stop offset="85%" stopColor="#a07008" />
          <stop offset="100%" stopColor="#7a5200" />
        </linearGradient>
      </defs>

      {/* Контур листа — заострённый овал, повёрнутый под ~30° */}
      <g transform="rotate(-30 45 50)">
        {/* Основная форма листа */}
        <path
          d="M 45 5 C 65 10 80 30 80 50 C 80 70 65 90 45 95 C 25 90 10 70 10 50 C 10 30 25 10 45 5 Z"
          fill="url(#leafGold)"
        />

        {/* Центральная жилка (прожилка) — белая прорезь */}
        <path
          d="M 45 15 L 45 90"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Жилки левые */}
        <path d="M 43 35 L 25 28" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        <path d="M 43 45 L 20 42" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        <path d="M 43 55 L 22 56" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
        <path d="M 43 65 L 27 68" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        <path d="M 44 75 L 32 79" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />

        {/* Жилки правые */}
        <path d="M 47 35 L 62 26" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        <path d="M 47 45 L 68 40" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        <path d="M 47 55 L 66 54" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
        <path d="M 47 65 L 62 66" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        <path d="M 46 75 L 56 77" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />

        {/* Блик — светлее в верхней части */}
        <path
          d="M 45 5 C 58 10 72 25 74 42 C 60 20 48 10 45 5 Z"
          fill="white"
          opacity="0.12"
        />
      </g>
    </svg>
  );
}
