import { useState } from "react";
import { Page } from "@/App";
import Icon from "@/components/ui/icon";

interface CoachCabinetProps {
  navigate: (page: Page) => void;
}

interface Student {
  id: number;
  name: string;
  age: number;
}

const initialGroups = [
  { id: "jun", label: "Юниоры (13–17)", time: "18:00–19:30", day: "Пн/Ср/Пт" },
  { id: "adult", label: "Взрослые", time: "20:00–21:30", day: "Пн/Ср/Пт" },
  { id: "kids", label: "Детская (8–12)", time: "16:30–17:30", day: "Вт/Чт" },
];

const initialStudents: Record<string, Student[]> = {
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
type TabType = "mark" | "history" | "notify" | "manage" | "integration";

export default function CoachCabinet({ navigate }: CoachCabinetProps) {
  const [selectedGroup, setSelectedGroup] = useState("jun");
  const [attendance, setAttendance] = useState<AttendanceMap>({});
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("mark");
  const [students, setStudents] = useState(initialStudents);

  // Управление учениками
  const [addName, setAddName] = useState("");
  const [addAge, setAddAge] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const group = initialGroups.find((g) => g.id === selectedGroup)!;
  const list = students[selectedGroup] ?? [];

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

  const addStudent = () => {
    if (!addName.trim() || !addAge.trim()) return;
    const newId = Date.now();
    setStudents((prev) => ({
      ...prev,
      [selectedGroup]: [...(prev[selectedGroup] ?? []), { id: newId, name: addName.trim(), age: Number(addAge) }],
    }));
    setAddName("");
    setAddAge("");
  };

  const removeStudent = (id: number) => {
    setStudents((prev) => ({
      ...prev,
      [selectedGroup]: (prev[selectedGroup] ?? []).filter((s) => s.id !== id),
    }));
    setConfirmDelete(null);
  };

  const presentCount = list.filter((s) => attendance[s.id] === "present").length;
  const absentCount = list.filter((s) => attendance[s.id] === "absent").length;
  const unknownCount = list.filter((s) => !attendance[s.id] || attendance[s.id] === "unknown").length;
  const today = new Date().toLocaleDateString("ru-RU");

  const tabs: { key: TabType; label: string; icon: string }[] = [
    { key: "mark", label: "Явка", icon: "UserCheck" },
    { key: "manage", label: "Состав", icon: "Users" },
    { key: "history", label: "История", icon: "History" },
    { key: "notify", label: "Оповещение", icon: "Bell" },
    { key: "integration", label: "VK/TG", icon: "Share2" },
  ];

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: "#F5F2EE" }}>
      <div className="container mx-auto px-3 sm:px-4 max-w-3xl py-4 sm:py-8">

        <button onClick={() => navigate("home")} className="flex items-center gap-2 font-golos text-sm mb-4 sm:mb-6" style={{ color: "var(--sumo-red)" }}>
          <Icon name="ArrowLeft" size={16} />На главную
        </button>

        <div className="p-4 sm:p-6 rounded-xl mb-4 sm:mb-5" style={{ backgroundColor: "var(--sumo-black)" }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--sumo-red)" }}>
              <Icon name="ClipboardList" size={22} style={{ color: "white" }} />
            </div>
            <div>
              <div className="font-oswald font-bold text-base sm:text-lg text-white">Кабинет тренера</div>
              <div className="font-golos text-xs sm:text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>Сегодня: {today}</div>
            </div>
          </div>
        </div>

        {/* Выбор группы */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {initialGroups.map((g) => (
            <button
              key={g.id}
              onClick={() => { setSelectedGroup(g.id); setAttendance({}); setSaved(false); }}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg font-oswald text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap"
              style={{
                backgroundColor: selectedGroup === g.id ? "var(--sumo-red)" : "white",
                color: selectedGroup === g.id ? "white" : "#444",
                border: `1px solid ${selectedGroup === g.id ? "var(--sumo-red)" : "#E8E0D8"}`,
              }}
            >
              {g.label}
              <span className="font-golos text-xs opacity-60">({(students[g.id] ?? []).length})</span>
            </button>
          ))}
        </div>

        {/* Табы */}
        <div className="flex gap-1 mb-4 p-1 rounded-lg overflow-x-auto" style={{ backgroundColor: "#E8E0D8", scrollbarWidth: "none" }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="flex-shrink-0 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2 px-2 sm:px-3 rounded-md font-oswald text-xs sm:text-sm font-semibold tracking-wide transition-all"
              style={{
                backgroundColor: activeTab === tab.key ? "var(--sumo-black)" : "transparent",
                color: activeTab === tab.key ? "white" : "#666",
                minWidth: 60,
              }}
            >
              <Icon name={tab.icon} size={14} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* === ЯВКА === */}
        {activeTab === "mark" && (
          <>
            <div className="bg-white rounded-xl border mb-3" style={{ borderColor: "#E8E0D8" }}>
              <div className="px-4 sm:px-5 py-3 border-b" style={{ borderColor: "#E8E0D8" }}>
                <div className="flex items-start sm:items-center justify-between gap-2 flex-wrap">
                  <div>
                    <div className="font-oswald font-bold text-sm sm:text-base" style={{ color: "var(--sumo-black)" }}>{group.label}</div>
                    <div className="font-golos text-xs mt-0.5" style={{ color: "#999" }}>{group.day} · {group.time} · Нажмите для отметки</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => markAll("present")} className="px-2.5 py-1.5 rounded font-golos text-xs font-semibold" style={{ backgroundColor: "#E8F5E9", color: "#2E7D32" }}>✓ Все</button>
                    <button onClick={() => markAll("absent")} className="px-2.5 py-1.5 rounded font-golos text-xs font-semibold" style={{ backgroundColor: "#FEE2E2", color: "#dc2626" }}>✗ Никого</button>
                  </div>
                </div>
              </div>
              <div className="divide-y" style={{ borderColor: "#F5F2EE" }}>
                {list.map((student) => {
                  const status = attendance[student.id] || "unknown";
                  return (
                    <div key={student.id} className="flex items-center justify-between px-4 sm:px-5 py-3 cursor-pointer active:bg-gray-50" onClick={() => toggleStatus(student.id)} style={{ WebkitTapHighlightColor: "transparent" }}>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center font-oswald font-bold text-sm flex-shrink-0" style={{ backgroundColor: status === "present" ? "#16a34a" : status === "absent" ? "#dc2626" : "#e5e7eb", color: status === "unknown" ? "#6b7280" : "white", transition: "background-color 0.15s" }}>
                          {status === "present" ? "✓" : status === "absent" ? "✗" : student.id}
                        </div>
                        <div>
                          <div className="font-golos text-sm font-medium" style={{ color: "#222" }}>{student.name}</div>
                          <div className="font-golos text-xs" style={{ color: "#999" }}>{student.age} лет</div>
                        </div>
                      </div>
                      <span className="font-golos text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0" style={{ backgroundColor: status === "present" ? "#E8F5E9" : status === "absent" ? "#FEE2E2" : "#F3F4F6", color: status === "present" ? "#16a34a" : status === "absent" ? "#dc2626" : "#9CA3AF", transition: "all 0.15s" }}>
                        {status === "present" ? "Пришёл" : status === "absent" ? "Нет" : "—"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 p-4 bg-white rounded-xl border" style={{ borderColor: "#E8E0D8" }}>
              <div className="flex gap-3 sm:gap-4">
                <span className="font-golos text-sm font-semibold" style={{ color: "#16a34a" }}>✓ {presentCount}</span>
                <span className="font-golos text-sm font-semibold" style={{ color: "#dc2626" }}>✗ {absentCount}</span>
                <span className="font-golos text-sm" style={{ color: "#9CA3AF" }}>? {unknownCount}</span>
              </div>
              <button onClick={() => setSaved(true)} disabled={saved} className="flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg font-oswald font-bold text-xs sm:text-sm text-white flex-shrink-0" style={{ backgroundColor: saved ? "#16a34a" : "var(--sumo-red)", transition: "background-color 0.2s" }}>
                <Icon name={saved ? "Check" : "Save"} size={15} />
                {saved ? "Сохранено!" : "Сохранить"}
              </button>
            </div>
          </>
        )}

        {/* === УПРАВЛЕНИЕ СОСТАВОМ === */}
        {activeTab === "manage" && (
          <div className="space-y-4">
            {/* Добавить ученика */}
            <div className="bg-white rounded-xl border p-4 sm:p-5" style={{ borderColor: "#E8E0D8" }}>
              <h3 className="font-oswald font-bold text-sm sm:text-base mb-4" style={{ color: "var(--sumo-black)" }}>
                Добавить ученика в группу «{group.label}»
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                  className="flex-1 px-3 py-2.5 rounded-lg border font-golos text-sm"
                  style={{ borderColor: "#E8E0D8", fontSize: 16 }}
                  placeholder="Фамилия Имя"
                />
                <input
                  value={addAge}
                  onChange={(e) => setAddAge(e.target.value)}
                  type="number"
                  min="5"
                  max="70"
                  className="w-full sm:w-24 px-3 py-2.5 rounded-lg border font-golos text-sm"
                  style={{ borderColor: "#E8E0D8", fontSize: 16 }}
                  placeholder="Возраст"
                />
                <button
                  onClick={addStudent}
                  disabled={!addName.trim() || !addAge.trim()}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-oswald font-bold text-sm text-white whitespace-nowrap"
                  style={{ backgroundColor: addName.trim() && addAge.trim() ? "#16a34a" : "#ccc" }}
                >
                  <Icon name="UserPlus" size={16} />
                  Добавить
                </button>
              </div>
            </div>

            {/* Список учеников */}
            <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: "#E8E0D8" }}>
              <div className="px-4 sm:px-5 py-3 border-b flex items-center justify-between" style={{ borderColor: "#E8E0D8" }}>
                <h3 className="font-oswald font-bold text-sm sm:text-base" style={{ color: "var(--sumo-black)" }}>
                  Состав: {list.length} чел.
                </h3>
              </div>
              {list.length === 0 ? (
                <div className="text-center py-10 font-golos text-sm" style={{ color: "#999" }}>
                  В группе пока нет учеников
                </div>
              ) : (
                <div className="divide-y" style={{ borderColor: "#F5F2EE" }}>
                  {list.map((student) => (
                    <div key={student.id} className="flex items-center justify-between px-4 sm:px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-oswald font-bold text-sm flex-shrink-0" style={{ backgroundColor: "#F5F2EE", color: "var(--sumo-red)" }}>
                          {student.id}
                        </div>
                        <div>
                          <div className="font-golos text-sm font-medium" style={{ color: "#222" }}>{student.name}</div>
                          <div className="font-golos text-xs" style={{ color: "#999" }}>{student.age} лет</div>
                        </div>
                      </div>
                      {confirmDelete === student.id ? (
                        <div className="flex items-center gap-2">
                          <span className="font-golos text-xs" style={{ color: "#dc2626" }}>Удалить?</span>
                          <button onClick={() => removeStudent(student.id)} className="px-2.5 py-1 rounded font-golos text-xs font-semibold" style={{ backgroundColor: "#FEE2E2", color: "#dc2626" }}>Да</button>
                          <button onClick={() => setConfirmDelete(null)} className="px-2.5 py-1 rounded font-golos text-xs font-semibold" style={{ backgroundColor: "#F3F4F6", color: "#666" }}>Нет</button>
                        </div>
                      ) : (
                        <button onClick={() => setConfirmDelete(student.id)} className="p-1.5 rounded transition-colors hover:bg-red-50" style={{ color: "#ccc" }}>
                          <Icon name="Trash2" size={15} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* === ИСТОРИЯ === */}
        {activeTab === "history" && (
          <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: "#E8E0D8" }}>
            <div className="px-4 sm:px-5 py-3 border-b" style={{ borderColor: "#E8E0D8" }}>
              <h3 className="font-oswald font-bold text-sm sm:text-base" style={{ color: "var(--sumo-black)" }}>История — {group.label}</h3>
            </div>
            <div className="divide-y" style={{ borderColor: "#F5F2EE" }}>
              {[{ date: "05.05.2026", present: 6, absent: 1, total: 7 }, { date: "29.04.2026", present: 7, absent: 0, total: 7 }, { date: "28.04.2026", present: 5, absent: 2, total: 7 }, { date: "25.04.2026", present: 7, absent: 0, total: 7 }, { date: "23.04.2026", present: 6, absent: 1, total: 7 }].map((entry) => (
                <div key={entry.date} className="flex items-center justify-between px-4 sm:px-5 py-3">
                  <div>
                    <div className="font-oswald font-semibold text-sm" style={{ color: "var(--sumo-black)" }}>{entry.date}</div>
                    <div className="font-golos text-xs mt-0.5" style={{ color: "#999" }}>{group.time}</div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="font-golos text-sm font-semibold" style={{ color: "#16a34a" }}>✓ {entry.present}</span>
                    <span className="font-golos text-sm font-semibold" style={{ color: "#dc2626" }}>✗ {entry.absent}</span>
                    <span className="font-golos text-xs px-2 py-1 rounded-full" style={{ backgroundColor: "#F5F2EE", color: "#666" }}>{Math.round((entry.present / entry.total) * 100)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === УВЕДОМЛЕНИЕ === */}
        {activeTab === "notify" && (
          <div className="bg-white rounded-xl border p-4 sm:p-6" style={{ borderColor: "#E8E0D8" }}>
            <div className="flex items-center gap-2 mb-5">
              <Icon name="Bell" size={18} style={{ color: "var(--sumo-red)" }} />
              <h3 className="font-oswald font-bold text-sm sm:text-base" style={{ color: "var(--sumo-black)" }}>Отправить родителям</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="font-golos text-xs mb-2" style={{ color: "#888" }}>Тип</div>
                <div className="flex flex-wrap gap-2">
                  {[{ label: "Отмена", icon: "XCircle", color: "#dc2626", bg: "#FEE2E2" }, { label: "Перенос", icon: "Clock", color: "#d97706", bg: "#FEF3C7" }, { label: "Изменение", icon: "Calendar", color: "#1565C0", bg: "#E3F2FD" }, { label: "Инфо", icon: "Info", color: "#555", bg: "#F5F2EE" }].map((type) => (
                    <button key={type.label} className="flex items-center gap-1.5 px-3 py-2 rounded-lg font-golos text-xs font-semibold border" style={{ backgroundColor: type.bg, color: type.color, borderColor: type.bg }}>
                      <Icon name={type.icon} size={13} />{type.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-golos text-xs mb-1.5" style={{ color: "#888" }}>Группа</div>
                <select className="w-full px-3 py-2.5 rounded-lg border font-golos text-sm" style={{ borderColor: "#E8E0D8", color: "#333", fontSize: 16 }}>
                  <option>Все группы</option>
                  {initialGroups.map((g) => <option key={g.id}>{g.label}</option>)}
                </select>
              </div>
              <div>
                <div className="font-golos text-xs mb-1.5" style={{ color: "#888" }}>Текст</div>
                <textarea className="w-full px-3 py-2.5 rounded-lg border font-golos text-sm" style={{ borderColor: "#E8E0D8", color: "#333", fontSize: 16 }} rows={4} placeholder="Например: Тренировка в среду 14 мая переносится на пятницу 16 мая в 18:00." />
              </div>
              <button className="flex items-center gap-2 w-full sm:w-auto justify-center px-6 py-3 rounded-lg font-oswald font-bold text-sm text-white" style={{ backgroundColor: "var(--sumo-red)" }}>
                <Icon name="Send" size={15} />Отправить уведомление
              </button>
            </div>
          </div>
        )}

        {/* === ИНТЕГРАЦИЯ VK / TG === */}
        {activeTab === "integration" && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border p-5" style={{ borderColor: "#E8E0D8" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#0077ff" }}>
                  <Icon name="Users" size={20} style={{ color: "white" }} />
                </div>
                <div>
                  <div className="font-oswald font-bold text-base" style={{ color: "var(--sumo-black)" }}>ВКонтакте</div>
                  <div className="font-golos text-xs" style={{ color: "#888" }}>Автопостинг новостей в сообщество</div>
                </div>
              </div>
              <div className="p-4 rounded-lg mb-4 space-y-3" style={{ backgroundColor: "#F5F2EE" }}>
                <p className="font-golos text-sm font-semibold" style={{ color: "#333" }}>Как подключить:</p>
                <ol className="font-golos text-sm space-y-2" style={{ color: "#555" }}>
                  <li><span className="font-semibold">1.</span> Перейдите в настройки сообщества vk.com/sumospb</li>
                  <li><span className="font-semibold">2.</span> Раздел «Работа с API» → создайте приложение</li>
                  <li><span className="font-semibold">3.</span> Получите «Токен сообщества» (access_token)</li>
                  <li><span className="font-semibold">4.</span> Передайте токен администратору сайта для настройки автопостинга</li>
                </ol>
                <div className="p-3 rounded" style={{ backgroundColor: "rgba(0,119,255,0.1)", border: "1px solid rgba(0,119,255,0.2)" }}>
                  <p className="font-golos text-xs" style={{ color: "#0077ff" }}>
                    💡 После настройки уведомления из раздела «Оповещение» будут автоматически публиковаться в группе ВКонтакте
                  </p>
                </div>
              </div>
              <a href="https://vk.com/sumospb" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-oswald font-bold text-sm text-white" style={{ backgroundColor: "#0077ff" }}>
                <Icon name="ExternalLink" size={15} />
                Открыть группу ВКонтакте
              </a>
            </div>

            <div className="bg-white rounded-xl border p-5" style={{ borderColor: "#E8E0D8" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#26a5e4" }}>
                  <Icon name="Send" size={20} style={{ color: "white" }} />
                </div>
                <div>
                  <div className="font-oswald font-bold text-base" style={{ color: "var(--sumo-black)" }}>Telegram</div>
                  <div className="font-golos text-xs" style={{ color: "#888" }}>Канал или группа для оповещений</div>
                </div>
              </div>
              <div className="p-4 rounded-lg mb-4 space-y-3" style={{ backgroundColor: "#F5F2EE" }}>
                <p className="font-golos text-sm font-semibold" style={{ color: "#333" }}>Как подключить:</p>
                <ol className="font-golos text-sm space-y-2" style={{ color: "#555" }}>
                  <li><span className="font-semibold">1.</span> Создайте Telegram-бота через @BotFather</li>
                  <li><span className="font-semibold">2.</span> Получите Bot Token (например: <code className="px-1 py-0.5 rounded text-xs" style={{ backgroundColor: "#E8E0D8" }}>123456:ABC-DEF...</code>)</li>
                  <li><span className="font-semibold">3.</span> Добавьте бота администратором в ваш канал/группу</li>
                  <li><span className="font-semibold">4.</span> Узнайте Chat ID канала</li>
                  <li><span className="font-semibold">5.</span> Передайте токен и Chat ID администратору сайта</li>
                </ol>
                <div className="p-3 rounded" style={{ backgroundColor: "rgba(38,165,228,0.1)", border: "1px solid rgba(38,165,228,0.2)" }}>
                  <p className="font-golos text-xs" style={{ color: "#26a5e4" }}>
                    💡 Уведомления об отмене и переносе тренировок будут приходить в Telegram автоматически
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: "#FFF8E1", border: "1px solid #FFE082" }}>
                <p className="font-golos text-xs" style={{ color: "#F57F17" }}>
                  ⚠️ Для реальной интеграции обратитесь к разработчику сайта — он настроит backend-подключение к VK API и Telegram Bot API.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
