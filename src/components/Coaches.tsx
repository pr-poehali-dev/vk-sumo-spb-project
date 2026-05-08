import { Page } from "@/App";
import Icon from "@/components/ui/icon";

interface CoachesProps {
  navigate: (page: Page) => void;
  full?: boolean;
}

const coaches = [
  {
    name: "Иванов Андрей Викторович",
    rank: "Мастер спорта России",
    role: "Главный тренер",
    exp: "25 лет",
    achievements: ["Чемпион России 2004, 2006", "Призёр Кубка Европы", "Судья всероссийской категории"],
    groups: ["Детская группа (8–12)", "Индивидуальные занятия"],
    img: "https://cdn.poehali.dev/projects/a7adfde0-d5d3-47bd-abcd-7c5a055c4f82/files/81e274e1-d555-40de-8812-187858dfd8c1.jpg",
  },
  {
    name: "Смирнов Константин Евгеньевич",
    rank: "Мастер спорта России",
    role: "Старший тренер",
    exp: "18 лет",
    achievements: ["Чемпион Северо-Запада 2010–2013", "Тренер года СПб 2019", "КМС по дзюдо"],
    groups: ["Юниоры (13–17)", "Взрослые"],
    img: "",
  },
  {
    name: "Козлов Михаил Владимирович",
    rank: "Кандидат в мастера спорта",
    role: "Тренер",
    exp: "12 лет",
    achievements: ["Призёр Первенства России", "Специалист по физической подготовке"],
    groups: ["Взрослые", "Группа начинающих"],
    img: "",
  },
  {
    name: "Фёдорова Наталья Сергеевна",
    rank: "1-й спортивный разряд",
    role: "Тренер детских групп",
    exp: "8 лет",
    achievements: ["Педагог-организатор", "Специалист по работе с дошкольниками"],
    groups: ["Дошкольники (5–7)"],
    img: "",
  },
];

export default function Coaches({ navigate, full }: CoachesProps) {
  const display = full ? coaches : coaches.slice(0, 3);

  return (
    <section className={`py-20 ${full ? "pt-24" : ""}`} style={{ backgroundColor: "#F5F2EE" }}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="section-divider" />
            <span className="font-oswald text-xs tracking-[0.2em] uppercase" style={{ color: "var(--sumo-gold)" }}>Команда</span>
            <span className="section-divider" />
          </div>
          <h2 className="font-oswald font-bold text-4xl" style={{ color: "var(--sumo-black)" }}>
            НАШИ ТРЕНЕРЫ
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {display.map((coach) => (
            <div key={coach.name} className="bg-white rounded overflow-hidden card-hover">
              <div
                className="h-48 flex items-center justify-center"
                style={{
                  backgroundImage: coach.img ? `url(${coach.img})` : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center top",
                  backgroundColor: coach.img ? undefined : "var(--sumo-black)",
                }}
              >
                {!coach.img && (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--sumo-red)" }}>
                      <Icon name="User" size={36} style={{ color: "white" }} />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="mb-1">
                  <span className="font-oswald text-xs font-semibold px-2 py-0.5 rounded" style={{ backgroundColor: "var(--sumo-gold)", color: "var(--sumo-black)" }}>
                    {coach.role}
                  </span>
                </div>
                <h3 className="font-oswald font-bold text-base mt-2 mb-1" style={{ color: "var(--sumo-black)" }}>
                  {coach.name}
                </h3>
                <div className="font-golos text-xs mb-3" style={{ color: "var(--sumo-red)" }}>
                  {coach.rank} · стаж {coach.exp}
                </div>

                <div className="space-y-1 mb-3">
                  {coach.achievements.map((a) => (
                    <div key={a} className="flex items-start gap-2 font-golos text-xs" style={{ color: "#555" }}>
                      <Icon name="ChevronRight" size={12} style={{ color: "var(--sumo-gold)", flexShrink: 0, marginTop: 1 }} />
                      {a}
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t" style={{ borderColor: "#eee" }}>
                  <div className="font-golos text-xs" style={{ color: "#888" }}>Ведёт группы:</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {coach.groups.map((g) => (
                      <span key={g} className="font-golos text-xs px-2 py-0.5 rounded" style={{ backgroundColor: "#F5F2EE", color: "#555" }}>
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!full && (
          <div className="text-center mt-10">
            <button
              onClick={() => navigate("coaches")}
              className="inline-flex items-center gap-2 px-8 py-3 font-oswald font-semibold tracking-wide text-white"
              style={{ backgroundColor: "var(--sumo-red)" }}
            >
              Все тренеры
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
