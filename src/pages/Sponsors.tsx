import Icon from "@/components/ui/icon";
import LogoSined from "@/components/logos/LogoSined";
import LogoLeaf from "@/components/logos/LogoLeaf";

const wantSponsor = [
  "Размещение логотипа и ссылки на сайте федерации",
  "Упоминание на соревнованиях и мероприятиях",
  "Логотип на форме спортсменов",
  "Публикации в сообществе ВКонтакте (vk.com/sumospb)",
  "Благодарственное письмо и диплом партнёра федерации",
  "Баннер на официальных мероприятиях СПб",
];

const orgPartners = [
  { name: "Федерация сумо России", url: "https://sumo-russia.ru", icon: "Trophy", color: "#C62828" },
  { name: "IFS — Мировая федерация сумо", url: "https://ifs-sumo.com", icon: "Globe", color: "#1A237E" },
  { name: "Правительство СПб", url: "https://gov.spb.ru", icon: "Building2", color: "#0D47A1" },
  { name: "Комитет по физкультуре и спорту СПб", url: "https://kfis.spb.ru", icon: "Medal", color: "#1B5E20" },
  { name: "РУСАДА", url: "https://rusada.ru", icon: "Shield", color: "#003087" },
];

// Монохромная версия LogoSined — оттенки серого
function LogoSinedMono({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bgGradM" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#444" />
          <stop offset="100%" stopColor="#111" />
        </radialGradient>
        <linearGradient id="ring1M" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#bbb" />
          <stop offset="100%" stopColor="#555" />
        </linearGradient>
        <linearGradient id="ring2M" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#999" />
          <stop offset="100%" stopColor="#333" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="52" r="46" fill="#333" />
      <circle cx="50" cy="50" r="44" fill="url(#bgGradM)" />
      <circle cx="50" cy="50" r="38" fill="none" stroke="url(#ring1M)" strokeWidth="10" strokeDasharray="190 50" strokeDashoffset="30" opacity="0.9" />
      <ellipse cx="50" cy="50" rx="30" ry="42" fill="none" stroke="url(#ring2M)" strokeWidth="9" strokeDasharray="170 60" strokeDashoffset="100" opacity="0.85" />
      <path d="M 45 20 C 55 22 62 30 58 42 C 54 54 44 58 46 68" fill="none" stroke="#ccc" strokeWidth="7" strokeLinecap="round" />
      <path d="M 54 80 C 44 78 37 70 41 58 C 45 46 56 42 54 32" fill="none" stroke="#888" strokeWidth="7" strokeLinecap="round" />
      <ellipse cx="35" cy="30" rx="10" ry="6" fill="white" opacity="0.07" transform="rotate(-30 35 30)" />
    </svg>
  );
}

// Монохромная версия LogoLeaf — одноцветная (тёмная)
function LogoLeafMono({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={Math.round(size * 1.1)} viewBox="0 0 90 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="rotate(-30 45 50)">
        <path d="M 45 5 C 65 10 80 30 80 50 C 80 70 65 90 45 95 C 25 90 10 70 10 50 C 10 30 25 10 45 5 Z" fill="#2a2a2a" />
        <path d="M 45 15 L 45 90" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
        <path d="M 43 35 L 25 28" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.65" />
        <path d="M 43 45 L 20 42" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.65" />
        <path d="M 43 55 L 22 56" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <path d="M 43 65 L 27 68" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
        <path d="M 44 75 L 32 79" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <path d="M 47 35 L 62 26" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.65" />
        <path d="M 47 45 L 68 40" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.65" />
        <path d="M 47 55 L 66 54" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <path d="M 47 65 L 62 66" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
        <path d="M 46 75 L 56 77" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <path d="M 45 5 C 58 10 72 25 74 42 C 60 20 48 10 45 5 Z" fill="white" opacity="0.1" />
      </g>
    </svg>
  );
}

export default function Sponsors() {
  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: "#F5F2EE" }}>

      {/* Hero */}
      <div className="py-16 sm:py-20" style={{ backgroundColor: "var(--sumo-black)" }}>
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="section-divider" />
            <span className="font-oswald text-xs tracking-[0.2em] uppercase" style={{ color: "var(--sumo-gold)" }}>Партнёрство</span>
            <span className="section-divider" />
          </div>
          <h1 className="font-oswald font-bold text-3xl sm:text-5xl text-white mb-5">СПОНСОРЫ И ПАРТНЁРЫ</h1>
          <p className="font-golos text-sm sm:text-base max-w-lg mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
            Федерация сумо Санкт-Петербурга — некоммерческая организация. Все тренировки бесплатны. Развитие спорта возможно благодаря поддержке партнёров.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl py-12 sm:py-16 space-y-10">

        {/* Место для спонсора */}
        <div className="bg-white rounded-2xl border-2 border-dashed p-10 sm:p-14 text-center" style={{ borderColor: "#E8E0D8" }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: "#F5F2EE" }}>
            <Icon name="Star" size={36} style={{ color: "var(--sumo-gold)" }} />
          </div>
          <div className="font-oswald font-bold text-2xl sm:text-3xl mb-3" style={{ color: "#ccc" }}>ЗДЕСЬ МОЖЕТ БЫТЬ ВАШ ЛОГОТИП</div>
          <p className="font-golos text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-6" style={{ color: "#aaa" }}>
            Станьте первым официальным спонсором Федерации сумо Санкт-Петербурга.
          </p>
          <a href="mailto:sumospb@mail.ru?subject=Предложение о спонсорстве"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-oswald font-bold text-sm text-white"
            style={{ backgroundColor: "var(--sumo-red)" }}>
            <Icon name="Mail" size={16} />Стать спонсором
          </a>
        </div>

        {/* === ВИТРИНА ЛОГОТИПОВ === */}
        <div className="rounded-2xl overflow-hidden border" style={{ backgroundColor: "white", borderColor: "#E8E0D8" }}>
          <div className="px-6 py-4 border-b" style={{ borderColor: "#E8E0D8" }}>
            <h2 className="font-oswald font-bold text-lg" style={{ color: "var(--sumo-black)" }}>
              ЛОГОТИПЫ ДЛЯ СКАЧИВАНИЯ
            </h2>
            <p className="font-golos text-sm mt-1" style={{ color: "#888" }}>
              SVG-логотипы без фона — цветные и монохромные версии
            </p>
          </div>

          <div className="p-6 space-y-8">

            {/* Логотип 1 — шар OOOSINED */}
            <div>
              <div className="font-golos text-xs font-semibold mb-4 tracking-widest uppercase" style={{ color: "#999" }}>
                Логотип 1 — Шар (OOOSINED)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Цветной — тёмный фон */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-full aspect-square rounded-xl flex items-center justify-center" style={{ backgroundColor: "#0d1220" }}>
                    <LogoSined size={80} />
                  </div>
                  <span className="font-golos text-xs" style={{ color: "#666" }}>Цветной / тёмный</span>
                </div>
                {/* Цветной — светлый фон */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-full aspect-square rounded-xl flex items-center justify-center" style={{ backgroundColor: "#f0f0f0" }}>
                    <LogoSined size={80} />
                  </div>
                  <span className="font-golos text-xs" style={{ color: "#666" }}>Цветной / светлый</span>
                </div>
                {/* Моно — тёмный фон */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-full aspect-square rounded-xl flex items-center justify-center" style={{ backgroundColor: "#1a1a1a" }}>
                    <LogoSinedMono size={80} />
                  </div>
                  <span className="font-golos text-xs" style={{ color: "#666" }}>Моно / тёмный</span>
                </div>
                {/* Моно — светлый фон */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-full aspect-square rounded-xl flex items-center justify-center" style={{ backgroundColor: "#f0f0f0" }}>
                    <LogoSinedMono size={80} />
                  </div>
                  <span className="font-golos text-xs" style={{ color: "#666" }}>Моно / светлый</span>
                </div>
              </div>
            </div>

            {/* Логотип 2 — листик */}
            <div>
              <div className="font-golos text-xs font-semibold mb-4 tracking-widest uppercase" style={{ color: "#999" }}>
                Логотип 2 — Золотой лист
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Цветной — тёмный */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-full aspect-square rounded-xl flex items-center justify-center" style={{ backgroundColor: "#0d0d0d" }}>
                    <LogoLeaf size={80} />
                  </div>
                  <span className="font-golos text-xs" style={{ color: "#666" }}>Цветной / тёмный</span>
                </div>
                {/* Цветной — светлый */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-full aspect-square rounded-xl flex items-center justify-center" style={{ backgroundColor: "#f5f0e8" }}>
                    <LogoLeaf size={80} />
                  </div>
                  <span className="font-golos text-xs" style={{ color: "#666" }}>Цветной / светлый</span>
                </div>
                {/* Моно — тёмный */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-full aspect-square rounded-xl flex items-center justify-center" style={{ backgroundColor: "#1a1a1a" }}>
                    <LogoLeafMono size={80} />
                  </div>
                  <span className="font-golos text-xs" style={{ color: "#666" }}>Моно / тёмный</span>
                </div>
                {/* Моно — светлый */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-full aspect-square rounded-xl flex items-center justify-center" style={{ backgroundColor: "#f0f0f0" }}>
                    <LogoLeafMono size={80} />
                  </div>
                  <span className="font-golos text-xs" style={{ color: "#666" }}>Моно / светлый</span>
                </div>
              </div>
            </div>

            {/* Крупные версии для просмотра */}
            <div className="pt-6 border-t" style={{ borderColor: "#F5F2EE" }}>
              <div className="font-golos text-xs font-semibold mb-4 tracking-widest uppercase" style={{ color: "#999" }}>
                Крупный просмотр
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-full aspect-square rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#080e1e" }}>
                    <LogoSined size={130} />
                  </div>
                  <span className="font-golos text-xs text-center" style={{ color: "#666" }}>Шар — цвет</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-full aspect-square rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#111" }}>
                    <LogoSinedMono size={130} />
                  </div>
                  <span className="font-golos text-xs text-center" style={{ color: "#666" }}>Шар — моно</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-full aspect-square rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#0d0d0d" }}>
                    <LogoLeaf size={120} />
                  </div>
                  <span className="font-golos text-xs text-center" style={{ color: "#666" }}>Лист — цвет</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-full aspect-square rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#111" }}>
                    <LogoLeafMono size={120} />
                  </div>
                  <span className="font-golos text-xs text-center" style={{ color: "#666" }}>Лист — моно</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl" style={{ backgroundColor: "#FFF8E1", border: "1px solid #FFE082" }}>
              <p className="font-golos text-xs leading-relaxed" style={{ color: "#7a5200" }}>
                💡 <strong>Как сохранить:</strong> Нажмите ПКМ на логотип → «Сохранить как» → SVG (или PNG). Для скачивания в высоком качестве используйте браузер Chrome/Firefox. Логотипы векторные — масштабируются без потери качества.
              </p>
            </div>
          </div>
        </div>

        {/* Блок «Стать спонсором» */}
        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "var(--sumo-black)" }}>
          <div className="h-1.5" style={{ background: "linear-gradient(90deg, var(--sumo-red), var(--sumo-gold), var(--sumo-red))" }} />
          <div className="p-6 sm:p-10">
            <div className="grid sm:grid-cols-2 gap-8 sm:gap-12 items-start">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(201,150,58,0.15)" }}>
                    <Icon name="Handshake" size={20} style={{ color: "var(--sumo-gold)" }} />
                  </div>
                  <h2 className="font-oswald font-bold text-xl sm:text-2xl text-white">Стать спонсором</h2>
                </div>
                <p className="font-golos text-sm sm:text-base leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.65)" }}>
                  Поддержите развитие сумо в Санкт-Петербурге — ваш бренд перед аудиторией спортсменов, родителей и болельщиков города.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="mailto:sumospb@mail.ru?subject=Предложение о спонсорстве"
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-oswald font-bold text-sm text-white"
                    style={{ backgroundColor: "var(--sumo-red)" }}>
                    <Icon name="Mail" size={16} />sumospb@mail.ru
                  </a>
                  <a href="https://vk.com/sumospb" target="_blank" rel="noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-oswald font-bold text-sm border text-white"
                    style={{ borderColor: "rgba(255,255,255,0.2)" }}>
                    <Icon name="Users" size={16} />ВКонтакте
                  </a>
                </div>
              </div>
              <div>
                <div className="font-oswald font-semibold text-sm mb-4 tracking-wide" style={{ color: "var(--sumo-gold)" }}>ЧТО ПОЛУЧАЕТ СПОНСОР:</div>
                <ul className="space-y-3">
                  {wantSponsor.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "rgba(201,150,58,0.2)" }}>
                        <Icon name="Check" size={12} style={{ color: "var(--sumo-gold)" }} />
                      </div>
                      <span className="font-golos text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Официальные партнёры */}
        <div>
          <h3 className="font-oswald font-bold text-xl mb-6 text-center" style={{ color: "var(--sumo-black)" }}>ОФИЦИАЛЬНЫЕ ПАРТНЁРЫ</h3>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {orgPartners.map((p) => (
              <a key={p.name} href={p.url} target="_blank" rel="noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border hover:shadow-md transition-all"
                style={{ borderColor: "#E8E0D8" }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: p.color + "18" }}>
                  <Icon name={p.icon} size={16} style={{ color: p.color }} />
                </div>
                <span className="font-golos text-sm" style={{ color: "#444" }}>{p.name}</span>
                <Icon name="ExternalLink" size={12} style={{ color: "#ccc" }} />
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
