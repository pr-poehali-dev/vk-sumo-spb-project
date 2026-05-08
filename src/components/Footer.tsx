import { Page } from "@/App";
import Icon from "@/components/ui/icon";

const LOGO_URL = "https://cdn.poehali.dev/projects/a7adfde0-d5d3-47bd-abcd-7c5a055c4f82/bucket/7faf7e86-bd52-4506-ad94-567ea17e46d1.jpg";

interface FooterProps {
  navigate: (page: Page) => void;
}

// Партнёры с текстовыми эмблемами вместо битых внешних картинок
const partners = [
  {
    name: "ООО «САЙНЭД» — Генеральный спонсор",
    url: "https://ooosined.ru",
    initials: "САЙНЭД",
    sub: "ooosined.ru",
    bg: "#1a3a5c",
    emoji: "⛽",
  },
  {
    name: "Федерация сумо России",
    url: "https://sumo-russia.ru",
    initials: "ФСР",
    sub: "суморосия.рф",
    bg: "#C62828",
    emoji: "🏆",
  },
  {
    name: "IFS — Международная федерация сумо",
    url: "https://ifs-sumo.com",
    initials: "IFS",
    sub: "ifs-sumo.com",
    bg: "#1A237E",
    emoji: "🌍",
  },
  {
    name: "Правительство Санкт-Петербурга",
    url: "https://gov.spb.ru",
    initials: "СПб",
    sub: "gov.spb.ru",
    bg: "#0D47A1",
    emoji: "🏛",
  },
  {
    name: "Комитет по физкультуре и спорту СПб",
    url: "https://kfis.spb.ru",
    initials: "КФиС",
    sub: "kfis.spb.ru",
    bg: "#1B5E20",
    emoji: "🏅",
  },
  {
    name: "РУСАДА",
    url: "https://rusada.ru",
    initials: "РУСАДА",
    sub: "rusada.ru",
    bg: "#003087",
    emoji: "🛡",
  },
];

export default function Footer({ navigate }: FooterProps) {
  return (
    <footer style={{ backgroundColor: "#080808", borderTop: "1px solid #1a1a1a" }}>

      {/* Партнёры */}
      <div className="border-b py-8 sm:py-10" style={{ borderColor: "#1a1a1a" }}>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-6">
            <span className="font-oswald text-xs tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
              При поддержке и в сотрудничестве
            </span>
          </div>
          <div className="flex flex-wrap items-start justify-center gap-6 sm:gap-10">
            {partners.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                title={p.name}
                className="flex flex-col items-center gap-2 transition-opacity hover:opacity-80"
              >
                <div
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex flex-col items-center justify-center border-2"
                  style={{ backgroundColor: p.bg, borderColor: "rgba(255,255,255,0.12)" }}
                >
                  <span className="text-base leading-none">{p.emoji}</span>
                  <span className="font-oswald font-bold text-white leading-tight mt-0.5" style={{ fontSize: 9 }}>
                    {p.initials}
                  </span>
                </div>
                <span className="font-golos text-xs text-center leading-tight" style={{ color: "rgba(255,255,255,0.35)", maxWidth: 88 }}>
                  {p.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-8 sm:py-12">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-10">
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
              Все тренировки бесплатны.
            </p>
            <div className="flex gap-3 flex-wrap">
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
              <a
                href="https://rusada.ru"
                target="_blank"
                rel="noreferrer"
                className="h-8 px-2 rounded flex items-center justify-center transition-opacity hover:opacity-70"
                style={{ backgroundColor: "#003087" }}
                title="РУСАДА"
              >
                <span className="font-oswald font-bold text-white" style={{ fontSize: 10, letterSpacing: 1 }}>РУСАДА</span>
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
                { label: "Спонсоры", page: "sponsors" as Page },
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
                <a href="tel:+78121234567" className="flex items-center gap-1.5 hover:text-white">
                  <Icon name="Phone" size={12} />
                  +7 (812) 123-45-67
                </a>
              </div>
              <div><a href="https://sumospb.ru" target="_blank" rel="noreferrer" className="hover:text-white">sumospb.ru</a></div>
              <div><a href="https://vk.com/sumospb" target="_blank" rel="noreferrer" className="hover:text-white">vk.com/sumospb</a></div>
              <div><a href="mailto:sumospb@mail.ru" className="hover:text-white">sumospb@mail.ru</a></div>
              <div className="pt-1">г. Санкт-Петербург</div>
            </div>
          </div>
        </div>

        <div className="pt-5 border-t" style={{ borderColor: "#1a1a1a" }}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-3">
            <div className="font-golos text-xs text-center sm:text-left" style={{ color: "rgba(255,255,255,0.3)" }}>
              © Федерация сумо Санкт-Петербурга. Все права защищены.
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 font-golos text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
              <a href="tel:+78121234567" className="hover:text-white flex items-center gap-1">
                <Icon name="Phone" size={11} />+7 (812) 123-45-67
              </a>
              <span>·</span>
              <a href="https://vk.com/sumospb" target="_blank" rel="noreferrer" className="hover:text-white">ВКонтакте</a>
              <span>·</span>
              <a href="https://rusada.ru" target="_blank" rel="noreferrer" className="hover:text-white">РУСАДА</a>
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={() => navigate("privacy")}
              className="font-golos text-xs hover:text-white transition-colors"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Политика конфиденциальности · Персональные данные не собираются
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}