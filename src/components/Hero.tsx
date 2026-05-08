import { useState } from "react";
import { Page } from "@/App";
import Icon from "@/components/ui/icon";
import SupportModal from "@/components/SupportModal";

const LOGO_URL = "https://cdn.poehali.dev/projects/a7adfde0-d5d3-47bd-abcd-7c5a055c4f82/bucket/7faf7e86-bd52-4506-ad94-567ea17e46d1.jpg";

interface HeroProps {
  navigate: (page: Page) => void;
}

export default function Hero({ navigate }: HeroProps) {
  const [supportOpen, setSupportOpen] = useState(false);

  return (
    <>
      <SupportModal open={supportOpen} onClose={() => setSupportOpen(false)} />

      <section
        className="relative flex items-center overflow-hidden"
        style={{
          minHeight: "calc(100svh - 56px)",
          backgroundImage: `url(https://cdn.poehali.dev/projects/a7adfde0-d5d3-47bd-abcd-7c5a055c4f82/files/0a21860b-4b33-40c2-902a-30e881b25900.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-overlay absolute inset-0" />

        <div className="relative z-10 container mx-auto px-4 max-w-7xl py-12 sm:py-20">
          <div className="max-w-2xl animate-fade-in">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <img
                src={LOGO_URL}
                alt="Логотип Федерации сумо Санкт-Петербурга"
                className="w-14 h-14 sm:w-20 sm:h-20 rounded-full object-cover border-2 shadow-xl flex-shrink-0"
                style={{ borderColor: "var(--sumo-gold)" }}
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="section-divider" style={{ width: 30 }} />
                  <span className="font-oswald text-xs tracking-[0.2em] uppercase" style={{ color: "var(--sumo-gold)" }}>
                    Санкт-Петербург
                  </span>
                </div>
                <div className="font-golos text-xs sm:text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Официальный сайт федерации
                </div>
              </div>
            </div>

            <h1 className="font-oswald font-bold text-white leading-none mb-5 sm:mb-6" style={{ fontSize: "clamp(2rem, 8vw, 4.5rem)" }}>
              ФЕДЕРАЦИЯ<br />
              <span style={{ color: "var(--sumo-gold)" }}>СУМО</span><br />
              САНКТ-ПЕТЕРБУРГА
            </h1>

            <p className="font-golos text-sm sm:text-lg mb-8 sm:mb-10 leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
              Аккредитованная организация Федерации сумо России. Секции для детей от 5 лет и взрослых.
              Все тренировки — <span className="font-semibold text-white">бесплатно.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => navigate("programs")}
                className="flex items-center justify-center gap-2 px-6 py-3.5 font-oswald font-semibold text-white tracking-wide transition-opacity hover:opacity-90 text-sm sm:text-base"
                style={{ backgroundColor: "var(--sumo-red)" }}
              >
                <Icon name="Dumbbell" size={16} />
                Записаться на тренировку
              </button>
              <button
                onClick={() => setSupportOpen(true)}
                className="flex items-center justify-center gap-2 px-6 py-3.5 font-oswald font-semibold tracking-wide border-2 transition-all text-sm sm:text-base"
                style={{ borderColor: "rgba(201,150,58,0.6)", color: "var(--sumo-gold)" }}
              >
                <Icon name="Heart" size={16} />
                Поддержать федерацию
              </button>
            </div>

            <div className="flex gap-6 sm:gap-10 mt-10 sm:mt-14 pt-8 sm:pt-10 border-t" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
              {[
                { value: "20+", label: "лет в спорте" },
                { value: "500+", label: "воспитанников" },
                { value: "15+", label: "чемпионов России" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-oswald font-bold text-2xl sm:text-3xl" style={{ color: "var(--sumo-gold)" }}>
                    {stat.value}
                  </div>
                  <div className="font-golos text-xs sm:text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <Icon name="ChevronDown" size={24} style={{ color: "rgba(255,255,255,0.4)" }} />
        </div>
      </section>
    </>
  );
}
