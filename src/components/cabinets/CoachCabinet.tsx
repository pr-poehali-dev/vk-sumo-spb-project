import { useState } from "react";
import { Page } from "@/App";
import Icon from "@/components/ui/icon";

interface CoachCabinetProps {
  navigate: (page: Page) => void;
}

const groups = [
  { id: "jun", label: "Юниоры (13–17)", time: "18:00–19:30", day: "Понедельник" },
  { id: "adult", label: "Взрослые", time: "20:00–21:30", day: "Понедельник" },
  { id: "kids", label: "Детская (8–12)", time: "16:30–17:30", day: "Среда" },
];

const students: Record<string, { id: number; name: string; age: number }[]> = {
  jun: [
    { id: 1, name: "Новиков Артём", age: 15 },
    { id: 2, name: "Волков Иван", age: 14 },
    { id: 3, name: "Петров Никита", age: 16 },
    { id: 4, name: "Соколов Дмитрий", age: 13 },
    { id: 5, name: "Михайлов Алексей", age: 15 },
    { id: 6, name: "Орлов Максим", age: 17 },
    { id: 7, name: "Зайцев Кирилл", age: 14 },
  ],
  adult: [
    { id: 8, name: "Фёдоров Павел", age: 28 },
    { id: 9, name: "Гусев Андрей", age: 34 },
    { id: 10, name: "Кузнецов Сергей", age: 22 },
    { id: 11, name: "Лебедев Роман", age: 31 },
  ],
  kids: [
    { id: 12, name: "Тихонов Матвей", age: 9 },
    { id: 13, name: "Беляев Егор", age: 10 },
    { id: 14, name: "Ковалёв Степан", age: 11 },
    { id: 15, name: "Макаров Тимур", age: 8 },
    { id: 16, name: "Борисов Захар", age: 12 },
  ],
};

type AttendanceMap = Record<number, "present" | "absent" | "unknown">;

export default function CoachCabinet({ navigate }: CoachCabinetProps) {
  const [selectedGroup, setSelectedGroup] = useState("jun");
  const [attendance, setAttendance] = useState<AttendanceMap>({});
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"mark" | "history" | "notify">("mark");

  const group = groups.find((g) => g.id === selectedGroup)!;
  const list = students[selectedGroup];

  const toggleStatus = (id: number) => {
    setAttendance((prev) => {
      const cur = prev[id] || "unknown";
      const next = cur === "unknown" ? "present" : cur === "present" ? "absent" : "unknown";
      return { ...prev, [id]: next };
    });
    setSaved(false);
  };

  const markAll = (status: "present" | "absent") => {
    const updated: AttendanceMap = {};
    list.forEach((s) => (updated[s.id] = status));
    setAttendance(updated);
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
  };

  const presentCount = list.filter((s) => attendance[s.id] === "present").length;
  const absentCount = list.filter((s) => attendance[s.id] === "absent").length;
  const unknownCount = list.filter((s) => !attendance[s.id] || attendance[s.id] === "unknown").length;

  const today = new Date().toLocaleDateString("ru-RU");

  return (
    <div className="min-h-screen pt-8 pb-20" style={{ backgroundColor: "#F5F2EE" }}>
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("home")}
            className="flex items-center gap-2 font-golos text-sm"
            style={{ color: "var(--sumo-red)" }}
          >
            <Icon name="ArrowLeft" size={16} />
            На главную
          </button>
        </div>

        <div className="p-6 rounded mb-6" style={{ backgroundColor: "var(--sumo-black)" }}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--sumo-red)" }}>
              <Icon name="ClipboardList" size={24} style={{ color: "white" }} />
            </div>
            <div>
              <div className="font-oswald font-bold text-lg text-white">Кабинет тренера</div>
              <div className="font-golos text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                Смирнов Константин Евгеньевич · Сегодня: {today}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {groups.map((g) => (
            <button
              key={g.id}
              onClick={() => { setSelectedGroup(g.id); setAttendance({}); setSaved(false); }}
              className="flex items-center gap-2 px-4 py-2.5 rounded font-oswald text-sm font-semibold tracking-wide transition-all"
              style={{
                backgroundColor: selectedGroup === g.id ? "var(--sumo-red)" : "white",
                color: selectedGroup === g.id ? "white" : "#444",
                border: `1px solid ${selectedGroup === g.id ? "var(--sumo-red)" : "#E8E0D8"}`,
              }}
            >
              {g.label}
              <span className="font-golos text-xs opacity-70">({students[g.id].length})</span>
            </button>
          ))}
        </div>

        <div className="flex gap-1 mb-4 p-1 rounded" style={{ backgroundColor: "#E8E0D8" }}>
          {[
            { key: "mark", label: "Отметить явку", icon: "UserCheck" },
            { key: "history", label: "История", icon: "History" },
            { key: "notify", label: "Уведомление", icon: "Bell" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded font-oswald text-sm font-semibold tracking-wide transition-all"
              style={{
                backgroundColor: activeTab === tab.key ? "var(--sumo-black)" : "transparent",
                color: activeTab === tab.key ? "white" : "#666",
              }}
            >
              <Icon name={tab.icon} size={15} />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "mark" && (
          <>
            <div className="bg-white rounded border mb-4" style={{ borderColor: "#E8E0D8" }}>
              <div className="px-6 py-4 border-b flex items-center justify-between flex-wrap gap-3" style={{ borderColor: "#E8E0D8" }}>
                <div>
                  <h3 className="font-oswald font-bold text-base" style={{ color: "var(--sumo-black)" }}>
                    {group.label} · {group.day}, {group.time}
                  </h3>
                  <div className="font-golos text-xs mt-0.5" style={{ color: "#999" }}>
                    Нажмите на имя, чтобы отметить: ✓ присутствует / ✗ отсутствует
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => markAll("present")}
                    className="px-3 py-1.5 rounded font-golos text-xs font-semibold"
                    style={{ backgroundColor: "#E8F5E9", color: "#2E7D32" }}
                  >
                    Все пришли
                  </button>
                  <button
                    onClick={() => markAll("absent")}
                    className="px-3 py-1.5 rounded font-golos text-xs font-semibold"
                    style={{ backgroundColor: "#FEE2E2", color: "#dc2626" }}
                  >
                    Все отсутствуют
                  </button>
                </div>
              </div>

              <div className="divide-y" style={{ borderColor: "#F5F2EE" }}>
                {list.map((student) => {
                  const status = attendance[student.id] || "unknown";
                  return (
                    <div
                      key={student.id}
                      className="flex items-center justify-between px-6 py-3.5 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => toggleStatus(student.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center font-oswald font-bold text-sm"
                          style={{
                            backgroundColor: status === "present" ? "#16a34a" : status === "absent" ? "#dc2626" : "#e5e7eb",
                            color: status === "unknown" ? "#6b7280" : "white",
                          }}
                        >
                          {status === "present" ? "✓" : status === "absent" ? "✗" : student.id}
                        </div>
                        <div>
                          <div className="font-golos text-sm font-medium" style={{ color: "#222" }}>{student.name}</div>
                          <div className="font-golos text-xs" style={{ color: "#999" }}>{student.age} лет</div>
                        </div>
                      </div>
                      <span
                        className="font-golos text-xs font-semibold px-3 py-1.5 rounded"
                        style={{
                          backgroundColor: status === "present" ? "#E8F5E9" : status === "absent" ? "#FEE2E2" : "#F3F4F6",
                          color: status === "present" ? "#16a34a" : status === "absent" ? "#dc2626" : "#9CA3AF",
                        }}
                      >
                        {status === "present" ? "Присутствует" : status === "absent" ? "Отсутствует" : "Не отмечен"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex gap-4 flex-1">
                <div className="flex items-center gap-2 font-golos text-sm" style={{ color: "#16a34a" }}>
                  <Icon name="CheckCircle" size={16} />
                  Пришли: <strong>{presentCount}</strong>
                </div>
                <div className="flex items-center gap-2 font-golos text-sm" style={{ color: "#dc2626" }}>
                  <Icon name="XCircle" size={16} />
                  Отсутствуют: <strong>{absentCount}</strong>
                </div>
                <div className="flex items-center gap-2 font-golos text-sm" style={{ color: "#9CA3AF" }}>
                  <Icon name="HelpCircle" size={16} />
                  Не отмечены: <strong>{unknownCount}</strong>
                </div>
              </div>

              <button
                onClick={handleSave}
                disabled={saved}
                className="flex items-center gap-2 px-6 py-3 rounded font-oswald font-semibold text-sm tracking-wide text-white transition-opacity"
                style={{
                  backgroundColor: saved ? "#16a34a" : "var(--sumo-red)",
                  opacity: saved ? 0.8 : 1,
                }}
              >
                <Icon name={saved ? "Check" : "Save"} size={16} />
                {saved ? "Сохранено!" : "Сохранить явку"}
              </button>
            </div>
          </>
        )}

        {activeTab === "history" && (
          <div className="bg-white rounded border" style={{ borderColor: "#E8E0D8" }}>
            <div className="px-6 py-4 border-b" style={{ borderColor: "#E8E0D8" }}>
              <h3 className="font-oswald font-bold text-base" style={{ color: "var(--sumo-black)" }}>
                История посещений — {group.label}
              </h3>
            </div>
            <div className="divide-y" style={{ borderColor: "#F5F2EE" }}>
              {[
                { date: "05.05.2026", present: 6, absent: 1, total: 7 },
                { date: "29.04.2026", present: 7, absent: 0, total: 7 },
                { date: "28.04.2026", present: 5, absent: 2, total: 7 },
                { date: "25.04.2026", present: 7, absent: 0, total: 7 },
                { date: "23.04.2026", present: 6, absent: 1, total: 7 },
              ].map((entry) => (
                <div key={entry.date} className="flex items-center justify-between px-6 py-4">
                  <div>
                    <div className="font-oswald font-semibold text-sm" style={{ color: "var(--sumo-black)" }}>{entry.date}</div>
                    <div className="font-golos text-xs mt-0.5" style={{ color: "#999" }}>{group.day} · {group.time}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-golos text-sm" style={{ color: "#16a34a" }}>✓ {entry.present}</span>
                    <span className="font-golos text-sm" style={{ color: "#dc2626" }}>✗ {entry.absent}</span>
                    <span className="font-golos text-xs px-2 py-1 rounded" style={{ backgroundColor: "#F5F2EE", color: "#666" }}>
                      {Math.round((entry.present / entry.total) * 100)}% явка
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "notify" && (
          <div className="bg-white rounded border p-6" style={{ borderColor: "#E8E0D8" }}>
            <div className="flex items-center gap-3 mb-6">
              <Icon name="Bell" size={20} style={{ color: "var(--sumo-red)" }} />
              <h3 className="font-oswald font-bold text-base" style={{ color: "var(--sumo-black)" }}>
                Отправить уведомление родителям
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="font-golos text-xs mb-1 block" style={{ color: "#888" }}>Тип уведомления</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Отмена тренировки", icon: "XCircle", color: "#dc2626", bg: "#FEE2E2" },
                    { label: "Перенос тренировки", icon: "Clock", color: "#d97706", bg: "#FEF3C7" },
                    { label: "Изменение расписания", icon: "Calendar", color: "#1565C0", bg: "#E3F2FD" },
                    { label: "Общая информация", icon: "Info", color: "#555", bg: "#F5F2EE" },
                  ].map((type) => (
                    <button
                      key={type.label}
                      className="flex items-center gap-2 px-3 py-2 rounded font-golos text-xs font-semibold border transition-colors hover:opacity-80"
                      style={{ backgroundColor: type.bg, color: type.color, borderColor: type.bg }}
                    >
                      <Icon name={type.icon} size={13} />
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-golos text-xs mb-1 block" style={{ color: "#888" }}>Группа</label>
                <select className="w-full px-4 py-2.5 rounded border font-golos text-sm" style={{ borderColor: "#E8E0D8", color: "#333" }}>
                  <option>Все группы</option>
                  {groups.map((g) => (
                    <option key={g.id}>{g.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-golos text-xs mb-1 block" style={{ color: "#888" }}>Текст уведомления</label>
                <textarea
                  className="w-full px-4 py-3 rounded border font-golos text-sm"
                  style={{ borderColor: "#E8E0D8", color: "#333" }}
                  rows={4}
                  placeholder="Например: Тренировка в понедельник 12 мая отменяется. Следующая тренировка — в среду 14 мая в обычное время."
                />
              </div>

              <button
                className="flex items-center gap-2 px-6 py-3 font-oswald font-semibold text-sm tracking-wide text-white rounded"
                style={{ backgroundColor: "var(--sumo-red)" }}
              >
                <Icon name="Send" size={16} />
                Отправить уведомление
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
