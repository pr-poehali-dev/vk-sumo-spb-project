import { Page } from "@/App";
import Icon from "@/components/ui/icon";

interface ProgramsProps {
  navigate: (page: Page) => void;
  full?: boolean;
}

const programs = [
  {
    title: "Сумо для дошкольников",
    age: "5–7 лет",
    schedule: "Вт, Чт — 16:00",
    price: "3 500 ₽/мес",
    desc: "Мягкое введение в единоборство через игровые упражнения. Развитие координации, дисциплины и уважения к сопернику.",
    icon: "Baby",
  },
  {
    title: "Детская группа",
    age: "8–12 лет",
    schedule: "Пн, Ср, Пт — 16:30",
    price: "4 000 ₽/мес",
    desc: "Базовая техника сумо, работа с партнёром, участие в городских соревнованиях. Формирование характера и воли к победе.",
    icon: "Star",
  },
  {
    title: "Юниорская группа",
    age: "13–17 лет",
    schedule: "Пн, Ср, Пт — 18:00",
    price: "4 500 ₽/мес",
    desc: "Углублённое изучение техники, силовая подготовка, участие в региональных и всероссийских соревнованиях.",
    icon: "Flame",
  },
  {
    title: "Взрослая группа",
    age: "18+ лет",
    schedule: "Пн, Ср, Пт — 20:00",
    price: "4 500 ₽/мес",
    desc: "Профессиональная и любительская подготовка, соревновательная практика, работа над физической формой и техникой.",
    icon: "Shield",
  },
  {
    title: "Группа начинающих",
    age: "18–45 лет",
    schedule: "Сб — 11:00",
    price: "3 000 ₽/мес",
    desc: "Для тех, кто хочет попробовать сумо без опыта. Безопасная атмосфера, постепенное освоение техники.",
    icon: "Play",
  },
  {
    title: "Индивидуальные занятия",
    age: "любой возраст",
    schedule: "по договорённости",
    price: "от 1 500 ₽/занятие",
    desc: "Персональные тренировки с мастером спорта. Идеально для подготовки к соревнованиям или быстрого прогресса.",
    icon: "User",
  },
];

export default function Programs({ navigate, full }: ProgramsProps) {
  const display = full ? programs : programs.slice(0, 3);

  return (
    <section className={`py-20 ${full ? "pt-24" : ""}`} style={{ backgroundColor: "#F5F2EE" }}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="section-divider" />
            <span className="font-oswald text-xs tracking-[0.2em] uppercase" style={{ color: "var(--sumo-gold)" }}>Секции</span>
            <span className="section-divider" />
          </div>
          <h2 className="font-oswald font-bold text-4xl" style={{ color: "var(--sumo-black)" }}>
            ПРОГРАММЫ И ГРУППЫ ТРЕНИРОВОК
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {display.map((prog) => (
            <div key={prog.title} className="bg-white rounded card-hover p-6 flex flex-col border border-transparent hover:border-red-100">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded flex items-center justify-center" style={{ backgroundColor: "rgba(123,31,31,0.08)" }}>
                  <Icon name={prog.icon} size={22} style={{ color: "var(--sumo-red)" }} />
                </div>
                <span className="font-oswald font-semibold text-sm px-3 py-1 rounded" style={{ backgroundColor: "var(--sumo-gold)", color: "var(--sumo-black)" }}>
                  {prog.age}
                </span>
              </div>

              <h3 className="font-oswald font-bold text-lg mb-2" style={{ color: "var(--sumo-black)" }}>
                {prog.title}
              </h3>
              <p className="font-golos text-sm leading-relaxed mb-5 flex-1" style={{ color: "#666" }}>
                {prog.desc}
              </p>

              <div className="space-y-2 pt-4 border-t" style={{ borderColor: "#eee" }}>
                <div className="flex items-center gap-2 font-golos text-sm" style={{ color: "#555" }}>
                  <Icon name="Clock" size={14} style={{ color: "var(--sumo-red)" }} />
                  {prog.schedule}
                </div>
                <div className="flex items-center gap-2 font-golos text-sm font-semibold" style={{ color: "var(--sumo-red)" }}>
                  <Icon name="CreditCard" size={14} />
                  {prog.price}
                </div>
              </div>
            </div>
          ))}
        </div>

        {!full && (
          <div className="text-center mt-10">
            <button
              onClick={() => navigate("programs")}
              className="inline-flex items-center gap-2 px-8 py-3 font-oswald font-semibold tracking-wide text-white"
              style={{ backgroundColor: "var(--sumo-red)" }}
            >
              Все программы
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>
        )}

        {full && (
          <div className="mt-14 p-8 rounded" style={{ backgroundColor: "var(--sumo-black)" }}>
            <h3 className="font-oswald font-bold text-xl text-white mb-3">Запись в секцию</h3>
            <p className="font-golos text-sm mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>
              Первое пробное занятие — бесплатно. Свяжитесь с нами, чтобы выбрать подходящую группу.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:+78121234567" className="flex items-center gap-2 px-6 py-3 rounded font-oswald font-semibold text-white" style={{ backgroundColor: "var(--sumo-red)" }}>
                <Icon name="Phone" size={16} />
                +7 (812) 123-45-67
              </a>
              <a href="https://vk.com/sumo_spb" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 rounded font-oswald font-semibold border-2" style={{ borderColor: "rgba(255,255,255,0.3)", color: "white" }}>
                <Icon name="MessageCircle" size={16} />
                ВКонтакте
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
