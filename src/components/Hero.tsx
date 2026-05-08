import { useState } from "react";
import { Page } from "@/App";
import Icon from "@/components/ui/icon";
import SupportModal from "@/components/SupportModal";

const LOGO_URL = "https://cdn.poehali.dev/projects/a7adfde0-d5d3-47bd-abcd-7c5a055c4f82/bucket/7faf7e86-bd52-4506-ad94-567ea17e46d1.jpg";

const BG_IMAGES = [
  "https://cdn.poehali.dev/projects/a7adfde0-d5d3-47bd-abcd-7c5a055c4f82/bucket/c282dfa6-cf53-4d4e-a782-7cb5b623cf34.jpg",
  "https://cdn.poehali.dev/projects/a7adfde0-d5d3-47bd-abcd-7c5a055c4f82/bucket/765862c2-f20c-42f6-ba11-832e09ea47f0.jpg",
  "https://cdn.poehali.dev/projects/a7adfde0-d5d3-47bd-abcd-7c5a055c4f82/bucket/2ca149a0-77bf-4d56-a664-00deb51b0ddb.jpg",
];

interface HeroProps {
  navigate: (page: Page) => void;
}

export default function Hero({ navigate }: HeroProps) {
  const [supportOpen, setSupportOpen] = useState(false);
  const [bgIdx, setBgIdx] = useState(0);

  return (
    <>
      <SupportModal open={supportOpen} onClose={() => setSupportOpen(false)} />

      <section
        className="relative flex items-center overflow-hidden"
        style={{
          minHeight: "calc(100svh - 90px)",
          backgroundImage: `url(${BG_IMAGES[bgIdx]})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(105deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.82) 45%, rgba(10,10,10,0.45) 75%, rgba(10,10,10,0.2) 100%)",
          }}
        />
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: "var(--sumo-red)" }} />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-7xl py-12 sm:py-20">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <img
                src={LOGO_URL}
                alt="Логотип Федерации сумо Санкт-Петербурга"
                className="w-14 h-14 sm:w-20 sm:h-20 rounded-full object-cover border-2 shadow-2xl flex-shrink-0"
                style={{ borderColor: "var(--sumo-gold)" }}
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="section-divider" style={{ width: 24 }} />
                  <span className="font-oswald text-xs tracking-[0.2em] uppercase" style={{ color: "var(--sumo-gold)" }}>
                    Официальный сайт
                  </span>
                </div>
                <div className="font-golos text-xs sm:text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Аккредитована Федерацией сумо России
                </div>
              </div>
            </div>

            <h1
              className="font-oswald font-bold text-white leading-[0.92] mb-5 sm:mb-6"
              style={{ fontSize: "clamp(2.2rem, 9vw, 5rem)" }}
            >
              ФЕДЕРАЦИЯ<br />
              <span style={{ color: "var(--sumo-gold)" }}>СУМО</span><br />
              <span style={{ fontSize: "0.65em", letterSpacing: "0.05em" }}>САНКТ-ПЕТЕРБУРГА</span>
            </h1>

            <p className="font-golos text-sm sm:text-base mb-7 sm:mb-9 leading-relaxed" style={{ color: "rgba(255,255,255,0.78)", maxWidth: 420 }}>
              Секции сумо для детей от 5 лет и взрослых. Профессиональные тренеры, соревнования по всей России.
              Все тренировки — <span className="font-semibold text-white">бесплатно.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("programs")}
                className="flex items-center justify-center gap-2 px-6 py-3.5 font-oswald font-semibold text-white tracking-wide text-sm sm:text-base"
                style={{ backgroundColor: "var(--sumo-red)" }}
              >
                <Icon name="Dumbbell" size={16} />
                Записаться на тренировку
              </button>
              <button
                onClick={() => setSupportOpen(true)}
                className="flex items-center justify-center gap-2 px-6 py-3.5 font-oswald font-semibold tracking-wide border-2 text-sm sm:text-base"
                style={{ borderColor: "rgba(201,150,58,0.6)", color: "var(--sumo-gold)" }}
              >
                <Icon name="Heart" size={16} />
                Поддержать федерацию
              </button>
            </div>

            <div className="flex gap-6 sm:gap-10 mt-10 pt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
              {[
                { value: "20+", label: "лет в спорте" },
                { value: "500+", label: "воспитанников" },
                { value: "15+", label: "чемпионов России" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-oswald font-bold text-2xl sm:text-3xl" style={{ color: "var(--sumo-gold)" }}>
                    {stat.value}
                  </div>
                  <div className="font-golos text-xs sm:text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Переключатель фото */}
        <div className="absolute bottom-5 right-5 z-10 flex gap-2">
          {BG_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setBgIdx(i)}
              className="w-2 h-2 rounded-full transition-all"
              style={{ backgroundColor: i === bgIdx ? "var(--sumo-gold)" : "rgba(255,255,255,0.3)" }}
              aria-label={`Фото ${i + 1}`}
            />
          ))}
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <Icon name="ChevronDown" size={22} style={{ color: "rgba(255,255,255,0.35)" }} />
        </div>
      </section>
    </>
  );
}
