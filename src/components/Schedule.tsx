import Icon from "@/components/ui/icon";

interface ScheduleProps {
  full?: boolean;
}

const days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

const schedule = [
  { day: "Понедельник", classes: [
    { time: "16:30", group: "Детская группа (8–12)", hall: "Зал №1, Невский пр., 147", coach: "Иванов А.В." },
    { time: "18:00", group: "Юниоры (13–17)", hall: "Зал №1, Невский пр., 147", coach: "Смирнов К.Е." },
    { time: "20:00", group: "Взрослые", hall: "Зал №2, ул. Садовая, 32", coach: "Козлов М.В." },
  ]},
  { day: "Вторник", classes: [
    { time: "16:00", group: "Дошкольники (5–7)", hall: "Зал №3, пр. Энгельса, 27", coach: "Фёдорова Н.С." },
    { time: "18:00", group: "Юниоры (13–17)", hall: "Зал №3, пр. Энгельса, 27", coach: "Смирнов К.Е." },
  ]},
  { day: "Среда", classes: [
    { time: "16:30", group: "Детская группа (8–12)", hall: "Зал №1, Невский пр., 147", coach: "Иванов А.В." },
    { time: "18:00", group: "Юниоры (13–17)", hall: "Зал №1, Невский пр., 147", coach: "Козлов М.В." },
    { time: "20:00", group: "Взрослые", hall: "Зал №2, ул. Садовая, 32", coach: "Смирнов К.Е." },
  ]},
  { day: "Четверг", classes: [
    { time: "16:00", group: "Дошкольники (5–7)", hall: "Зал №3, пр. Энгельса, 27", coach: "Фёдорова Н.С." },
    { time: "17:00", group: "Детская группа (8–12)", hall: "Зал №3, пр. Энгельса, 27", coach: "Иванов А.В." },
  ]},
  { day: "Пятница", classes: [
    { time: "16:30", group: "Детская группа (8–12)", hall: "Зал №1, Невский пр., 147", coach: "Иванов А.В." },
    { time: "18:00", group: "Юниоры (13–17)", hall: "Зал №2, ул. Садовая, 32", coach: "Смирнов К.Е." },
    { time: "20:00", group: "Взрослые", hall: "Зал №1, Невский пр., 147", coach: "Козлов М.В." },
  ]},
  { day: "Суббота", classes: [
    { time: "10:00", group: "Дошкольники (5–7)", hall: "Зал №2, ул. Садовая, 32", coach: "Фёдорова Н.С." },
    { time: "11:00", group: "Группа начинающих (18–45)", hall: "Зал №1, Невский пр., 147", coach: "Козлов М.В." },
    { time: "13:00", group: "Индивидуальные", hall: "по договорённости", coach: "Иванов А.В." },
  ]},
];

export default function Schedule({ full }: ScheduleProps) {
  const display = full ? schedule : schedule.slice(0, 3);

  return (
    <section className={`py-20 bg-white ${full ? "pt-24" : ""}`}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="section-divider" />
            <span className="font-oswald text-xs tracking-[0.2em] uppercase" style={{ color: "var(--sumo-gold)" }}>Расписание</span>
            <span className="section-divider" />
          </div>
          <h2 className="font-oswald font-bold text-4xl" style={{ color: "var(--sumo-black)" }}>
            РАСПИСАНИЕ ТРЕНИРОВОК
          </h2>
          <p className="font-golos text-sm mt-3" style={{ color: "#888" }}>
            Актуальное расписание. При изменениях — уведомления в личном кабинете.
          </p>
        </div>

        <div className="space-y-6">
          {display.map((day) => (
            <div key={day.day} className="rounded border overflow-hidden" style={{ borderColor: "#E8E0D8" }}>
              <div className="px-6 py-3 flex items-center gap-3" style={{ backgroundColor: "var(--sumo-black)" }}>
                <Icon name="Calendar" size={16} style={{ color: "var(--sumo-gold)" }} />
                <span className="font-oswald font-semibold text-white tracking-wide">{day.day}</span>
              </div>
              <div className="divide-y" style={{ borderColor: "#f0e8e0" }}>
                {day.classes.map((cls, i) => (
                  <div key={i} className="px-6 py-4 grid grid-cols-4 gap-4 items-center hover:bg-red-50 transition-colors">
                    <div className="font-oswald font-bold text-lg" style={{ color: "var(--sumo-red)" }}>
                      {cls.time}
                    </div>
                    <div>
                      <div className="font-golos font-semibold text-sm" style={{ color: "#222" }}>{cls.group}</div>
                    </div>
                    <div className="flex items-center gap-2 font-golos text-sm" style={{ color: "#666" }}>
                      <Icon name="MapPin" size={13} />
                      <span className="hidden md:inline">{cls.hall}</span>
                      <span className="md:hidden">Зал</span>
                    </div>
                    <div className="flex items-center gap-2 font-golos text-sm" style={{ color: "#666" }}>
                      <Icon name="User" size={13} />
                      {cls.coach}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {!full && (
          <div className="text-center mt-8">
            <p className="font-golos text-sm mb-4" style={{ color: "#888" }}>
              Показаны первые 3 дня. Полное расписание на странице «Расписание».
            </p>
          </div>
        )}

        <div className="mt-8 p-5 rounded flex items-start gap-4" style={{ backgroundColor: "#FFF8F0", border: "1px solid #F5E0C0" }}>
          <Icon name="Bell" size={20} style={{ color: "var(--sumo-gold)", flexShrink: 0, marginTop: 2 }} />
          <div>
            <div className="font-oswald font-semibold text-sm mb-1" style={{ color: "#333" }}>
              Уведомления об изменениях
            </div>
            <p className="font-golos text-sm" style={{ color: "#666" }}>
              Войдите в личный кабинет родителя — и вы будете автоматически получать уведомления об отмене, переносе или изменении расписания тренировок.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
