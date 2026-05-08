import { Page } from "@/App";
import Icon from "@/components/ui/icon";

const LOGO_URL = "https://cdn.poehali.dev/projects/a7adfde0-d5d3-47bd-abcd-7c5a055c4f82/bucket/7faf7e86-bd52-4506-ad94-567ea17e46d1.jpg";

interface HeroProps {
  navigate: (page: Page) => void;
}

export default function Hero({ navigate }: HeroProps) {
  return (
    <section
      className="relative min-h-[88vh] flex items-center overflow-hidden"
      style={{
        backgroundImage: `url(https://cdn.poehali.dev/projects/a7adfde0-d5d3-47bd-abcd-7c5a055c4f82/files/0a21860b-4b33-40c2-902a-30e881b25900.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-overlay absolute inset-0" />

      <div className="relative z-10 container mx-auto px-4 max-w-7xl py-20">
        <div className="max-w-2xl animate-fade-in">
          <div className="flex items-center gap-4 mb-8">
            <img
              src={LOGO_URL}
              alt="Логотип Федерации сумо Санкт-Петербурга"
              className="w-20 h-20 rounded-full object-cover border-2 shadow-xl"
              style={{ borderColor: "var(--sumo-gold)" }}
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="section-divider" />
                <span className="font-oswald text-xs tracking-[0.2em] uppercase" style={{ color: "var(--sumo-gold)" }}>
                  Санкт-Петербург
                </span>
              </div>
              <div className="font-golos text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                Официальный сайт федерации
              </div>
            </div>
          </div>

          <h1 className="font-oswald font-bold text-white leading-none mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
            ФЕДЕРАЦИЯ<br />
            <span style={{ color: "var(--sumo-gold)" }}>СУМО</span><br />
            САНКТ-ПЕТЕРБУРГА
          </h1>

          <p className="font-golos text-lg mb-10 leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
            Аккредитованная организация Федерации сумо России. Развиваем традиционное единоборство
            в Северной столице. Секции для детей от 5 лет и взрослых, профессиональные тренеры,
            официальные соревнования.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate("programs")}
              className="flex items-center gap-2 px-7 py-3.5 font-oswald font-semibold text-white tracking-wide transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--sumo-red)" }}
            >
              <Icon name="Dumbbell" size={17} />
              Записаться на тренировку
            </button>
            <button
              onClick={() => navigate("about")}
              className="flex items-center gap-2 px-7 py-3.5 font-oswald font-semibold tracking-wide border-2 transition-all hover:bg-white hover:text-black"
              style={{ borderColor: "rgba(255,255,255,0.4)", color: "white" }}
            >
              О федерации
              <Icon name="ArrowRight" size={17} />
            </button>
          </div>

          <div className="flex gap-10 mt-14 pt-10 border-t" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
            {[
              { value: "20+", label: "лет в спорте" },
              { value: "500+", label: "воспитанников" },
              { value: "15+", label: "чемпионов России" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-oswald font-bold text-3xl" style={{ color: "var(--sumo-gold)" }}>
                  {stat.value}
                </div>
                <div className="font-golos text-sm mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <Icon name="ChevronDown" size={28} style={{ color: "rgba(255,255,255,0.4)" }} />
      </div>
    </section>
  );
}
