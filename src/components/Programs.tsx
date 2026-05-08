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
    desc: "Мягкое введение в единоборство через игровые упражнения. Развитие координации, дисциплины и уважения к сопернику.",
    icon: "Baby",
  },
  {
    title: "Детская группа",
    age: "8–12 лет",
    schedule: "Пн, Ср, Пт — 16:30",
    desc: "Базовая техника сумо, работа с партнёром, участие в городских соревнованиях. Формирование характера и воли к победе.",
    icon: "Star",
  },
  {
    title: "Юниорская группа",
    age: "13–17 лет",
    schedule: "Пн, Ср, Пт — 18:00",
    desc: "Углублённое изучение техники, силовая подготовка, участие в региональных и всероссийских соревнованиях.",
    icon: "Flame",
  },
  {
    title: "Взрослая группа",
    age: "18+ лет",
    schedule: "Пн, Ср, Пт — 20:00",
    desc: "Профессиональная и любительская подготовка, соревновательная практика, работа над физической формой и техникой.",
    icon: "Shield",
  },
  {
    title: "Группа начинающих",
    age: "18–45 лет",
    schedule: "Сб — 11:00",
    desc: "Для тех, кто хочет попробовать сумо без опыта. Безопасная атмосфера, постепенное освоение техники.",
    icon: "Play",
  },
  {
    title: "Индивидуальные занятия",
    age: "любой возраст",
    schedule: "по договорённости",
    desc: "Персональные тренировки с мастером спорта. Идеально для подготовки к соревнованиям или быстрого прогресса.",
    icon: "User",
  },
];

export default function Programs({ navigate, full }: ProgramsProps) {
  const display = full ? programs : programs.slice(0, 3);

  return (
    <section className={`py-16 sm:py-20 ${full ? "pt-20 sm:pt-24" : ""}`} style={{ backgroundColor: "#F5F2EE" }}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="section-divider" />
            <span className="font-oswald text-xs tracking-[0.2em] uppercase" style={{ color: "var(--sumo-gold)" }}>Секции</span>
            <span className="section-divider" />
          </div>
          <h2 className="font-oswald font-bold text-3xl sm:text-4xl" style={{ color: "var(--sumo-black)" }}>
            ПРОГРАММЫ И ГРУППЫ ТРЕНИРОВОК
          </h2>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: "rgba(123,31,31,0.08)" }}>
            <Icon name="Heart" size={15} style={{ color: "var(--sumo-red)" }} />
            <span className="font-golos text-sm font-semibold" style={{ color: "var(--sumo-red)" }}>
              Все занятия — бесплатно
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {display.map((prog) => (
            <div key={prog.title} className="bg-white rounded card-hover p-5 sm:p-6 flex flex-col border border-transparent hover:border-red-100">
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded flex items-center justify-center" style={{ backgroundColor: "rgba(123,31,31,0.08)" }}>
                  <Icon name={prog.icon} size={20} style={{ color: "var(--sumo-red)" }} />
                </div>
                <span className="font-oswald font-semibold text-xs px-3 py-1 rounded" style={{ backgroundColor: "var(--sumo-gold)", color: "var(--sumo-black)" }}>
                  {prog.age}
                </span>
              </div>

              <h3 className="font-oswald font-bold text-base sm:text-lg mb-2" style={{ color: "var(--sumo-black)" }}>
                {prog.title}
              </h3>
              <p className="font-golos text-sm leading-relaxed mb-5 flex-1" style={{ color: "#666" }}>
                {prog.desc}
              </p>

              <div className="pt-4 border-t" style={{ borderColor: "#eee" }}>
                <div className="flex items-center gap-2 font-golos text-sm" style={{ color: "#555" }}>
                  <Icon name="Clock" size={14} style={{ color: "var(--sumo-red)" }} />
                  {prog.schedule}
                </div>
              </div>
            </div>
          ))}
        </div>

        {!full && (
          <div className="text-center mt-8 sm:mt-10">
            <button
              onClick={() => navigate("programs")}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 font-oswald font-semibold tracking-wide text-white text-sm sm:text-base"
              style={{ backgroundColor: "var(--sumo-red)" }}
            >
              Все программы
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>
        )}

        {full && (
          <div className="mt-10 sm:mt-14 p-6 sm:p-8 rounded" style={{ backgroundColor: "var(--sumo-black)" }}>
            <h3 className="font-oswald font-bold text-lg sm:text-xl text-white mb-3">Записаться в секцию</h3>
            <p className="font-golos text-sm mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>
              Занятия проводятся <span className="font-semibold text-white">бесплатно</span> — федерация работает на общественных началах.
              Свяжитесь с нами, чтобы выбрать подходящую группу.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://vk.com/sumospb"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 sm:px-6 py-3 rounded font-oswald font-semibold text-sm text-white"
                style={{ backgroundColor: "#0077ff" }}
              >
                <Icon name="Users" size={16} />
                Написать ВКонтакте
              </a>
              <a
                href="https://sumospb.ru"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 sm:px-6 py-3 rounded font-oswald font-semibold text-sm border-2"
                style={{ borderColor: "rgba(255,255,255,0.3)", color: "white" }}
              >
                <Icon name="Globe" size={16} />
                sumospb.ru
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
