import { Page } from "@/App";
import Icon from "@/components/ui/icon";

interface FooterProps {
  navigate: (page: Page) => void;
}

export default function Footer({ navigate }: FooterProps) {
  return (
    <footer style={{ backgroundColor: "#080808", borderTop: "1px solid #1a1a1a" }}>
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--sumo-red)" }}>
                <span className="font-oswald font-bold text-white text-sm">СУМ</span>
              </div>
              <div>
                <div className="font-oswald font-bold text-white text-sm">ФЕДЕРАЦИЯ СУМО</div>
                <div className="font-golos text-xs" style={{ color: "var(--sumo-gold)" }}>Санкт-Петербург</div>
              </div>
            </div>
            <p className="font-golos text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
              Региональная общественная организация «Федерация сумо Санкт-Петербурга».
              Развиваем традиционное единоборство с 2003 года.
            </p>
            <div className="flex gap-3">
              <a href="https://vk.com/sumo_spb" target="_blank" rel="noreferrer"
                className="w-8 h-8 rounded flex items-center justify-center transition-opacity hover:opacity-70"
                style={{ backgroundColor: "#0077ff" }}>
                <Icon name="Globe" size={14} style={{ color: "white" }} />
              </a>
              <a href="https://t.me/sumo_spb" target="_blank" rel="noreferrer"
                className="w-8 h-8 rounded flex items-center justify-center transition-opacity hover:opacity-70"
                style={{ backgroundColor: "#26a5e4" }}>
                <Icon name="MessageCircle" size={14} style={{ color: "white" }} />
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
              <div>+7 (812) 123-45-67</div>
              <div>info@sumo-spb.ru</div>
              <div className="pt-2">Пн–Пт: 9:00 – 21:00</div>
              <div>Сб: 9:00 – 15:00</div>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t" style={{ borderColor: "#1a1a1a" }}>
          <div className="font-golos text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            © 2003–2026 Федерация сумо Санкт-Петербурга. Все права защищены.
          </div>
          <div className="flex items-center gap-4 font-golos text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            <span>Политика конфиденциальности</span>
            <span>·</span>
            <span>Устав федерации</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
