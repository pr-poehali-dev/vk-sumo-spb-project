import { Page } from "@/App";
import Icon from "@/components/ui/icon";

const LOGO_URL = "https://cdn.poehali.dev/projects/a7adfde0-d5d3-47bd-abcd-7c5a055c4f82/bucket/7faf7e86-bd52-4506-ad94-567ea17e46d1.jpg";

interface FooterProps {
  navigate: (page: Page) => void;
}

const partners = [
  {
    name: "Федерация сумо России",
    url: "https://sumo-russia.ru",
    logo: "https://static.tildacdn.com/tild6436-3937-4334-b132-656136393438/__--__.png",
    fallbackText: "ФСР",
    fallbackColor: "#C62828",
  },
  {
    name: "Международная федерация сумо (IFS)",
    url: "https://ifs-sumo.com",
    logo: "",
    fallbackText: "IFS",
    fallbackColor: "#1A237E",
  },
  {
    name: "Правительство Санкт-Петербурга",
    url: "https://gov.spb.ru",
    logo: "https://www.gov.spb.ru/static/assets/gov-spb-logo.png",
    fallbackText: "СПб",
    fallbackColor: "#0D47A1",
  },
  {
    name: "Комитет по физкультуре и спорту СПб",
    url: "https://kfis.spb.ru",
    logo: "",
    fallbackText: "КФиС",
    fallbackColor: "#004D40",
  },
];

export default function Footer({ navigate }: FooterProps) {
  return (
    <footer style={{ backgroundColor: "#080808", borderTop: "1px solid #1a1a1a" }}>
      {/* Partners strip */}
      <div className="border-b py-8" style={{ borderColor: "#1a1a1a" }}>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-6">
            <span className="font-oswald text-xs tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
              При поддержке и в сотрудничестве
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {partners.map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noreferrer"
                title={partner.name}
                className="flex flex-col items-center gap-2 group transition-opacity hover:opacity-80"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center overflow-hidden border-2"
                  style={{ borderColor: "rgba(255,255,255,0.1)", backgroundColor: partner.logo ? "white" : partner.fallbackColor }}
                >
                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const t = e.currentTarget as HTMLImageElement;
                        t.style.display = "none";
                        const span = t.nextSibling as HTMLElement;
                        if (span) span.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <span
                    className="font-oswald font-bold text-white text-xs"
                    style={{ display: partner.logo ? "none" : "flex" }}
                  >
                    {partner.fallbackText}
                  </span>
                </div>
                <span className="font-golos text-xs text-center max-w-[100px] leading-tight" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {partner.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={LOGO_URL}
                alt="Федерация сумо СПб"
                className="w-12 h-12 rounded-full object-cover border-2"
                style={{ borderColor: "var(--sumo-gold)" }}
              />
              <div>
                <div className="font-oswald font-bold text-white text-sm tracking-wide">ФЕДЕРАЦИЯ СУМО</div>
                <div className="font-golos text-xs" style={{ color: "var(--sumo-gold)" }}>Санкт-Петербург</div>
              </div>
            </div>
            <p className="font-golos text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
              Санкт-Петербургская региональная общественная организация «Федерация сумо Санкт-Петербурга».
              Развиваем и популяризируем традиционное единоборство в Северо-Западном регионе.
            </p>
            <div className="flex gap-3">
              <a
                href="https://sumospb.ru"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded flex items-center justify-center transition-opacity hover:opacity-70"
                style={{ backgroundColor: "var(--sumo-red)" }}
                title="Официальный сайт"
              >
                <Icon name="Globe" size={14} style={{ color: "white" }} />
              </a>
              <a
                href="https://vk.com/sumospb"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded flex items-center justify-center transition-opacity hover:opacity-70"
                style={{ backgroundColor: "#0077ff" }}
                title="ВКонтакте"
              >
                <Icon name="Users" size={14} style={{ color: "white" }} />
              </a>
            </div>
          </div>

          <div>
            <div className="font-oswald font-semibold text-sm mb-4 tracking-wide" style={{ color: "var(--sumo-gold)" }}>
              РАЗДЕЛЫ
            </div>
            <div className="space-y-2">
              {[
                { label: "О федерации", page: "about" as Page },
                { label: "Программы", page: "programs" as Page },
                { label: "Расписание", page: "schedule" as Page },
                { label: "Тренеры", page: "coaches" as Page },
                { label: "Новости", page: "news" as Page },
                { label: "Галерея", page: "gallery" as Page },
                { label: "Контакты", page: "contacts" as Page },
              ].map((item) => (
                <button
                  key={item.page}
                  onClick={() => navigate(item.page)}
                  className="block font-golos text-sm transition-colors hover:text-white"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="font-oswald font-semibold text-sm mb-4 tracking-wide" style={{ color: "var(--sumo-gold)" }}>
              КОНТАКТЫ
            </div>
            <div className="space-y-2 font-golos text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              <div>
                <a href="https://sumospb.ru" target="_blank" rel="noreferrer" className="hover:text-white">sumospb.ru</a>
              </div>
              <div>
                <a href="https://vk.com/sumospb" target="_blank" rel="noreferrer" className="hover:text-white">vk.com/sumospb</a>
              </div>
              <div>
                <a href="mailto:sumospb@mail.ru" className="hover:text-white">sumospb@mail.ru</a>
              </div>
              <div className="pt-2">г. Санкт-Петербург</div>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t" style={{ borderColor: "#1a1a1a" }}>
          <div className="font-golos text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            © Федерация сумо Санкт-Петербурга. Все права защищены.
          </div>
          <div className="flex items-center gap-4 font-golos text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            <a href="https://sumospb.ru" target="_blank" rel="noreferrer" className="hover:text-white">sumospb.ru</a>
            <span>·</span>
            <a href="https://vk.com/sumospb" target="_blank" rel="noreferrer" className="hover:text-white">ВКонтакте</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
