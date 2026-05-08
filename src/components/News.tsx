import { Page } from "@/App";
import Icon from "@/components/ui/icon";

interface NewsProps {
  navigate: (page: Page) => void;
  full?: boolean;
}

const news = [
  {
    id: 1,
    date: "05 мая 2026",
    category: "Соревнования",
    title: "Итоги Первенства Санкт-Петербурга по сумо 2026",
    text: "В минувшие выходные в зале «Динамо» состоялось Первенство Санкт-Петербурга по сумо. Наши воспитанники завоевали 8 медалей: 3 золотых, 3 серебряных и 2 бронзовых.",
    tag: "success",
  },
  {
    id: 2,
    date: "28 апреля 2026",
    category: "Расписание",
    title: "Изменение расписания в майские праздники",
    text: "Информируем о временных изменениях расписания тренировок с 1 по 10 мая 2026 года. Уточнённое расписание доступно в личном кабинете.",
    tag: "info",
  },
  {
    id: 3,
    date: "15 апреля 2026",
    category: "Набор",
    title: "Открыт набор в группу начинающих на лето 2026",
    text: "Мы приглашаем всех желающих от 18 лет попробовать себя в сумо! Первое пробное занятие бесплатно. Запись по телефону или через форму обратной связи.",
    tag: "new",
  },
  {
    id: 4,
    date: "02 апреля 2026",
    category: "Достижения",
    title: "Воспитанники федерации на Чемпионате России",
    text: "Поздравляем Александра Новикова и Дмитрия Кузнецова с бронзовыми медалями Чемпионата России по сумо в категориях до 85 кг и свыше 115 кг!",
    tag: "success",
  },
  {
    id: 5,
    date: "20 марта 2026",
    category: "Мероприятия",
    title: "День открытых дверей — 12 апреля",
    text: "Приглашаем всех желающих на день открытых дверей. Можно посмотреть тренировки, познакомиться с тренерами и записать ребёнка в секцию.",
    tag: "info",
  },
  {
    id: 6,
    date: "05 марта 2026",
    category: "Соревнования",
    title: "Анонс соревнований весенне-летнего сезона 2026",
    text: "Публикуем календарь соревновательного сезона: Первенство СПб, Кубок СЗФО, Чемпионат России. Проверьте расписание и начните подготовку заранее.",
    tag: "info",
  },
];

const tagColors: Record<string, { bg: string; text: string }> = {
  success: { bg: "#E8F5E9", text: "#2E7D32" },
  info: { bg: "#E3F2FD", text: "#1565C0" },
  new: { bg: "#FFF3E0", text: "#E65100" },
};

export default function News({ navigate, full }: NewsProps) {
  const display = full ? news : news.slice(0, 3);

  return (
    <section className={`py-20 bg-white ${full ? "pt-24" : ""}`}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="section-divider" />
            <span className="font-oswald text-xs tracking-[0.2em] uppercase" style={{ color: "var(--sumo-gold)" }}>Актуальное</span>
            <span className="section-divider" />
          </div>
          <h2 className="font-oswald font-bold text-4xl" style={{ color: "var(--sumo-black)" }}>
            НОВОСТИ И СОБЫТИЯ
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {display.map((item) => (
            <article key={item.id} className="rounded border card-hover overflow-hidden" style={{ borderColor: "#E8E0D8" }}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="font-golos text-xs font-semibold px-2.5 py-1 rounded"
                    style={{ backgroundColor: tagColors[item.tag].bg, color: tagColors[item.tag].text }}
                  >
                    {item.category}
                  </span>
                  <span className="font-golos text-xs" style={{ color: "#999" }}>{item.date}</span>
                </div>
                <h3 className="font-oswald font-semibold text-base mb-3 leading-snug" style={{ color: "var(--sumo-black)" }}>
                  {item.title}
                </h3>
                <p className="font-golos text-sm leading-relaxed" style={{ color: "#666" }}>
                  {item.text}
                </p>
              </div>
              <div className="px-6 py-3 border-t flex items-center justify-between" style={{ borderColor: "#f0e8e0", backgroundColor: "#fafafa" }}>
                <button className="flex items-center gap-1.5 font-oswald text-xs font-semibold tracking-wide" style={{ color: "var(--sumo-red)" }}>
                  Читать далее
                  <Icon name="ArrowRight" size={13} />
                </button>
                <div className="flex items-center gap-1 font-golos text-xs" style={{ color: "#bbb" }}>
                  <Icon name="Clock" size={12} />
                  3 мин
                </div>
              </div>
            </article>
          ))}
        </div>

        {!full && (
          <div className="text-center mt-10">
            <button
              onClick={() => navigate("news")}
              className="inline-flex items-center gap-2 px-8 py-3 font-oswald font-semibold tracking-wide text-white"
              style={{ backgroundColor: "var(--sumo-red)" }}
            >
              Все новости
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
