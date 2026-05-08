import { useState } from "react";
import { Page } from "@/App";
import Icon from "@/components/ui/icon";

interface ParentCabinetProps {
  navigate: (page: Page) => void;
}

const mockChild = {
  name: "Новиков Артём Дмитриевич",
  group: "Юниоры (13–17)",
  coach: "Смирнов К.Е.",
  hall: "Зал №1",
  joinDate: "01.09.2024",
};

const mockAttendance = [
  { date: "05.05.2026", day: "Пн", time: "18:00", status: "present", note: "" },
  { date: "03.05.2026", day: "Сб", time: "11:00", status: "absent", note: "Болезнь" },
  { date: "01.05.2026", day: "Пт", time: "18:00", status: "absent", note: "Праздник" },
  { date: "29.04.2026", day: "Ср", time: "18:00", status: "present", note: "" },
  { date: "28.04.2026", day: "Вт", time: "18:00", status: "present", note: "" },
  { date: "25.04.2026", day: "Пт", time: "18:00", status: "present", note: "" },
  { date: "23.04.2026", day: "Ср", time: "18:00", status: "present", note: "" },
  { date: "21.04.2026", day: "Пн", time: "18:00", status: "absent", note: "Без причины" },
  { date: "18.04.2026", day: "Пт", time: "18:00", status: "present", note: "" },
  { date: "16.04.2026", day: "Ср", time: "18:00", status: "present", note: "" },
];

const mockNotifications = [
  { id: 1, type: "warning", date: "28.04.2026", text: "Тренировка 01.05.2026 отменена в связи с праздничным днём." },
  { id: 2, type: "info", date: "15.04.2026", text: "Изменение расписания с 20 апреля: тренировка перенесена с 17:30 на 18:00." },
  { id: 3, type: "success", date: "05.04.2026", text: "Поздравляем! Артём занял 2-е место на Первенстве Санкт-Петербурга." },
  { id: 4, type: "info", date: "01.03.2026", text: "Напоминание: не забудьте предупреждать тренера об отсутствии заранее." },
];

const notifIcons: Record<string, string> = {
  warning: "AlertTriangle",
  info: "Bell",
  success: "Trophy",
};
const notifColors: Record<string, { bg: string; icon: string; border: string }> = {
  warning: { bg: "#FFF8E1", icon: "#F57F17", border: "#FFE082" },
  info: { bg: "#E3F2FD", icon: "#1565C0", border: "#90CAF9" },
  success: { bg: "#E8F5E9", icon: "#2E7D32", border: "#A5D6A7" },
};

export default function ParentCabinet({ navigate }: ParentCabinetProps) {
  const [activeTab, setActiveTab] = useState<"attendance" | "notifications" | "schedule">("attendance");

  const presentCount = mockAttendance.filter((a) => a.status === "present").length;
  const absentCount = mockAttendance.filter((a) => a.status === "absent").length;
  const rate = Math.round((presentCount / mockAttendance.length) * 100);

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: "#F5F2EE" }}>
      <div className="container mx-auto px-3 sm:px-4 max-w-3xl py-4 sm:py-8">

        {/* Назад */}
        <button
          onClick={() => navigate("home")}
          className="flex items-center gap-2 font-golos text-sm mb-4 sm:mb-6"
          style={{ color: "var(--sumo-red)" }}
        >
          <Icon name="ArrowLeft" size={16} />
          На главную
        </button>

        {/* Шапка кабинета */}
        <div className="p-4 sm:p-6 rounded-xl mb-4 sm:mb-6" style={{ backgroundColor: "var(--sumo-black)" }}>
          <div className="flex items-start sm:items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--sumo-red)" }}>
                <Icon name="Users" size={22} style={{ color: "white" }} />
              </div>
              <div>
                <div className="font-oswald font-bold text-base sm:text-lg text-white">Личный кабинет</div>
                <div className="font-golos text-xs sm:text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>Иванова Мария Петровна</div>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: "rgba(201,150,58,0.15)" }}>
              <Icon name="Bell" size={14} style={{ color: "var(--sumo-gold)" }} />
              <span className="font-golos text-xs sm:text-sm" style={{ color: "var(--sumo-gold)" }}>
                {mockNotifications.length} уведомления
              </span>
            </div>
          </div>
        </div>

        {/* Данные ребёнка */}
        <div className="p-4 sm:p-6 bg-white rounded-xl mb-4 border" style={{ borderColor: "#E8E0D8" }}>
          <div className="flex items-center gap-2 mb-3">
            <Icon name="UserCheck" size={16} style={{ color: "var(--sumo-red)" }} />
            <h2 className="font-oswald font-bold text-base" style={{ color: "var(--sumo-black)" }}>Воспитанник</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "ФИО", value: mockChild.name },
              { label: "Группа", value: mockChild.group },
              { label: "Тренер", value: mockChild.coach },
              { label: "В секции с", value: mockChild.joinDate },
            ].map((field) => (
              <div key={field.label}>
                <div className="font-golos text-xs mb-0.5" style={{ color: "#999" }}>{field.label}</div>
                <div className="font-golos text-sm font-medium" style={{ color: "#222" }}>{field.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
          {[
            { label: "Посещено", value: presentCount, icon: "CheckCircle", color: "#16a34a", bg: "#E8F5E9" },
            { label: "Пропущено", value: absentCount, icon: "XCircle", color: "#dc2626", bg: "#FEE2E2" },
            { label: "Явка", value: `${rate}%`, icon: "TrendingUp", color: "var(--sumo-red)", bg: "#FFF8F0" },
          ].map((stat) => (
            <div key={stat.label} className="p-3 sm:p-4 rounded-xl text-center" style={{ backgroundColor: stat.bg }}>
              <Icon name={stat.icon} size={18} style={{ color: stat.color, margin: "0 auto 4px" }} />
              <div className="font-oswald font-bold text-xl sm:text-2xl" style={{ color: stat.color }}>{stat.value}</div>
              <div className="font-golos text-xs" style={{ color: "#666" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Табы */}
        <div className="flex gap-1 mb-4 p-1 rounded-lg" style={{ backgroundColor: "#E8E0D8" }}>
          {[
            { key: "attendance", label: "Посещения", icon: "Calendar" },
            { key: "notifications", label: "Оповещения", icon: "Bell" },
            { key: "schedule", label: "Расписание", icon: "Clock" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2.5 rounded-md font-oswald text-xs sm:text-sm font-semibold tracking-wide transition-all"
              style={{
                backgroundColor: activeTab === tab.key ? "var(--sumo-black)" : "transparent",
                color: activeTab === tab.key ? "white" : "#666",
              }}
            >
              <Icon name={tab.icon} size={14} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Посещаемость */}
        {activeTab === "attendance" && (
          <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: "#E8E0D8" }}>
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b" style={{ borderColor: "#E8E0D8" }}>
              <h3 className="font-oswald font-bold text-sm sm:text-base" style={{ color: "var(--sumo-black)" }}>
                Последние 10 занятий
              </h3>
            </div>
            <div className="divide-y" style={{ borderColor: "#F5F2EE" }}>
              {mockAttendance.map((entry, i) => (
                <div key={i} className="flex items-center justify-between px-4 sm:px-6 py-3">
                  <div className="flex items-center gap-3">
                    <div className="text-center w-10 sm:w-12 flex-shrink-0">
                      <div className="font-oswald font-bold text-sm" style={{ color: "var(--sumo-black)" }}>{entry.date.slice(0, 5)}</div>
                      <div className="font-golos text-xs" style={{ color: "#999" }}>{entry.day}</div>
                    </div>
                    <div className="min-w-0">
                      <div className="font-golos text-xs sm:text-sm" style={{ color: "#444" }}>{entry.time}</div>
                      {entry.note && (
                        <div className="font-golos text-xs mt-0.5 truncate" style={{ color: "#999", maxWidth: 140 }}>{entry.note}</div>
                      )}
                    </div>
                  </div>
                  <span
                    className="font-golos text-xs font-semibold px-2 sm:px-3 py-1 rounded-full flex-shrink-0 ml-2"
                    style={{
                      backgroundColor: entry.status === "present" ? "#E8F5E9" : "#FEE2E2",
                      color: entry.status === "present" ? "#16a34a" : "#dc2626",
                    }}
                  >
                    {entry.status === "present" ? "✓ Был" : "✗ Нет"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Уведомления */}
        {activeTab === "notifications" && (
          <div className="space-y-3">
            {mockNotifications.map((notif) => (
              <div
                key={notif.id}
                className="flex items-start gap-3 p-4 rounded-xl border"
                style={{ backgroundColor: notifColors[notif.type].bg, borderColor: notifColors[notif.type].border }}
              >
                <Icon name={notifIcons[notif.type]} size={18} style={{ color: notifColors[notif.type].icon, flexShrink: 0, marginTop: 1 }} />
                <div className="flex-1 min-w-0">
                  <p className="font-golos text-sm leading-relaxed" style={{ color: "#333" }}>{notif.text}</p>
                  <div className="font-golos text-xs mt-1.5" style={{ color: "#999" }}>{notif.date}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Расписание */}
        {activeTab === "schedule" && (
          <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: "#E8E0D8" }}>
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b" style={{ borderColor: "#E8E0D8" }}>
              <h3 className="font-oswald font-bold text-sm sm:text-base" style={{ color: "var(--sumo-black)" }}>
                {mockChild.group}
              </h3>
            </div>
            <div className="divide-y" style={{ borderColor: "#F5F2EE" }}>
              {[
                { day: "Понедельник", time: "18:00–19:30", hall: "Зал №1" },
                { day: "Среда", time: "18:00–19:30", hall: "Зал №1" },
                { day: "Пятница", time: "18:00–19:30", hall: "Зал №2" },
              ].map((s) => (
                <div key={s.day} className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-6 px-4 sm:px-6 py-3 sm:py-4">
                  <div className="font-oswald font-semibold text-sm" style={{ color: "var(--sumo-red)", minWidth: 100 }}>{s.day}</div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 font-golos text-sm" style={{ color: "#444" }}>
                      <Icon name="Clock" size={13} />{s.time}
                    </span>
                    <span className="flex items-center gap-1.5 font-golos text-sm" style={{ color: "#666" }}>
                      <Icon name="MapPin" size={13} />{s.hall}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 sm:px-6 py-3 border-t" style={{ borderColor: "#E8E0D8", backgroundColor: "#FAFAFA" }}>
              <span className="flex items-center gap-2 font-golos text-sm" style={{ color: "#888" }}>
                <Icon name="User" size={14} />Тренер: {mockChild.coach}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
