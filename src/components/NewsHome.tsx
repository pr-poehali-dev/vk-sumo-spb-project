import { Page } from "@/App";
import Icon from "@/components/ui/icon";

interface NewsHomeProps {
  navigate: (page: Page) => void;
}

const latestNews = [
  {
    id: 1,
    date: "05 мая 2026",
    category: "Соревнования",
    title: "Итоги Первенства Санкт-Петербурга по сумо 2026",
    text: "Наши воспитанники завоевали 8 медалей: 3 золотых, 3 серебряных и 2 бронзовых. Поздравляем спортсменов и тренеров!",
    tag: "success",
    icon: "Trophy",
  },
  {
    id: 2,
    date: "28 апреля 2026",
    category: "Расписание",
    title: "Изменение расписания в майские праздники",
    text: "Временные изменения в расписании тренировок с 1 по 10 мая 2026 года. Уточнённое расписание — в личном кабинете.",
    tag: "warning",
    icon: "CalendarClock",
  },
  {
    id: 3,
    date: "15 апреля 2026",
    category: "Набор",
    title: "Открыт набор в группу начинающих на лето 2026",
    text: "Приглашаем всех желающих от 18 лет! Первое пробное занятие — бесплатно. Запись по телефону и через ВКонтакте.",
    tag: "new",
    icon: "UserPlus",
  },
];

const tagStyles: Record<string, { bg: string; text: string; border: string }> = {
  success: { bg: "#E8F5E9", text: "#2E7D32", border: "#A5D6A7" },
  warning: { bg: "#FFF8E1", text: "#F57F17", border: "#FFE082" },
  new: { bg: "#FFF3E0", text: "#E65100", border: "#FFCC80" },
  info: { bg: "#E3F2FD", text: "#1565C0", border: "#90CAF9" },
};

export default function NewsHome({ navigate }: NewsHomeProps) {
  return (
    <section className="py-20" style={{ backgroundColor: "var(--sumo-black)" }}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="section-divider" />
              <span className="font-oswald text-xs tracking-[0.2em] uppercase" style={{ color: "var(--sumo-gold)" }}>
                Актуальное
              </span>
            </div>
            <h2 className="font-oswald font-bold text-4xl text-white">
              ПОСЛЕДНИЕ НОВОСТИ
            </h2>
          </div>
          <button
            onClick={() => navigate("news")}
            className="flex items-center gap-2 font-oswald text-sm font-semibold tracking-wide border-b-2 pb-0.5"
            style={{ color: "var(--sumo-gold)", borderColor: "var(--sumo-gold)" }}
          >
            Все новости
            <Icon name="ArrowRight" size={15} />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {latestNews.map((item, idx) => (
            <article
              key={item.id}
              className="rounded overflow-hidden flex flex-col card-hover"
              style={{ backgroundColor: idx === 0 ? "var(--sumo-red)" : "#1a1a1a" }}
            >
              {idx === 0 && (
                <div className="px-6 pt-6 pb-2">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
                    <Icon name={item.icon} size={22} style={{ color: "white" }} />
                  </div>
                </div>
              )}
              <div className={`px-6 ${idx === 0 ? "pb-6" : "py-6"} flex flex-col flex-1`}>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="font-golos text-xs font-semibold px-2.5 py-1 rounded"
                    style={idx === 0
                      ? { backgroundColor: "rgba(255,255,255,0.2)", color: "white" }
                      : { backgroundColor: tagStyles[item.tag].bg, color: tagStyles[item.tag].text }
                    }
                  >
                    {item.category}
                  </span>
                  <span className="font-golos text-xs" style={{ color: idx === 0 ? "rgba(255,255,255,0.6)" : "#666" }}>
                    {item.date}
                  </span>
                </div>
                <h3
                  className="font-oswald font-bold text-base mb-3 leading-snug flex-1"
                  style={{ color: idx === 0 ? "white" : "#eee" }}
                >
                  {item.title}
                </h3>
                <p className="font-golos text-sm leading-relaxed mb-5" style={{ color: idx === 0 ? "rgba(255,255,255,0.8)" : "#999" }}>
                  {item.text}
                </p>
                <button
                  className="flex items-center gap-1.5 font-oswald text-xs font-semibold tracking-wide mt-auto"
                  style={{ color: idx === 0 ? "rgba(255,255,255,0.7)" : "var(--sumo-gold)" }}
                >
                  Читать далее
                  <Icon name="ArrowRight" size={13} />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div
          className="mt-8 flex items-center gap-4 p-5 rounded"
          style={{ backgroundColor: "rgba(201,150,58,0.08)", border: "1px solid rgba(201,150,58,0.2)" }}
        >
          <Icon name="Bell" size={20} style={{ color: "var(--sumo-gold)", flexShrink: 0 }} />
          <p className="font-golos text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
            Подпишитесь на уведомления в{" "}
            <a href="https://vk.com/sumospb" target="_blank" rel="noreferrer" className="underline" style={{ color: "var(--sumo-gold)" }}>
              группе ВКонтакте
            </a>{" "}
            или войдите в личный кабинет, чтобы получать уведомления об отмене и переносе тренировок.
          </p>
        </div>
      </div>
    </section>
  );
}
