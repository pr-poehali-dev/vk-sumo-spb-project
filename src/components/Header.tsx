import { useState } from "react";
import { Page } from "@/App";
import Icon from "@/components/ui/icon";

interface HeaderProps {
  currentPage: Page;
  navigate: (page: Page) => void;
  cabinetRole: "parent" | "coach" | null;
  setCabinetRole: (role: "parent" | "coach" | null) => void;
}

const navItems: { label: string; page: Page }[] = [
  { label: "Главная", page: "home" },
  { label: "О федерации", page: "about" },
  { label: "Программы", page: "programs" },
  { label: "Расписание", page: "schedule" },
  { label: "Тренеры", page: "coaches" },
  { label: "Новости", page: "news" },
  { label: "Галерея", page: "gallery" },
  { label: "Контакты", page: "contacts" },
];

export default function Header({ currentPage, navigate, cabinetRole, setCabinetRole }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cabinetMenuOpen, setCabinetMenuOpen] = useState(false);

  const handleNav = (page: Page) => {
    navigate(page);
    setMenuOpen(false);
    setCabinetMenuOpen(false);
  };

  const handleLogout = () => {
    setCabinetRole(null);
    navigate("home");
  };

  return (
    <header className="sticky top-0 z-50 bg-sumo-black border-b border-[#2a2a2a]" style={{ backgroundColor: "var(--sumo-black)" }}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => handleNav("home")}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--sumo-red)" }}>
              <span className="font-oswald font-bold text-white text-sm">СУМ</span>
            </div>
            <div className="hidden sm:block text-left">
              <div className="font-oswald font-bold text-white text-sm leading-tight">ФЕДЕРАЦИЯ СУМО</div>
              <div className="font-golos text-xs leading-tight" style={{ color: "var(--sumo-gold)" }}>Санкт-Петербург</div>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNav(item.page)}
                className={`nav-link font-oswald text-sm font-medium tracking-wide transition-colors ${
                  currentPage === item.page ? "active" : ""
                }`}
                style={{ color: currentPage === item.page ? "var(--sumo-gold)" : "rgba(255,255,255,0.8)" }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {cabinetRole ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate(cabinetRole === "parent" ? "parent-cabinet" : "coach-cabinet")}
                  className="flex items-center gap-2 px-3 py-1.5 rounded font-oswald text-sm font-medium text-white"
                  style={{ backgroundColor: "var(--sumo-red)" }}
                >
                  <Icon name="User" size={14} />
                  {cabinetRole === "parent" ? "Личный кабинет" : "Кабинет тренера"}
                </button>
                <button onClick={handleLogout} className="p-1.5 rounded" style={{ color: "rgba(255,255,255,0.5)" }}>
                  <Icon name="LogOut" size={16} />
                </button>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setCabinetMenuOpen(!cabinetMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded font-oswald text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "var(--sumo-red)" }}
                >
                  <Icon name="LogIn" size={15} />
                  Войти
                  <Icon name="ChevronDown" size={13} />
                </button>
                {cabinetMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-52 rounded border shadow-xl z-50" style={{ backgroundColor: "var(--sumo-dark)", borderColor: "#333" }}>
                    <button
                      onClick={() => { setCabinetRole("parent"); setCabinetMenuOpen(false); navigate("parent-cabinet"); }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-left font-golos text-sm text-white hover:opacity-80 border-b"
                      style={{ borderColor: "#333" }}
                    >
                      <Icon name="Users" size={16} style={{ color: "var(--sumo-gold)" }} />
                      Личный кабинет родителя
                    </button>
                    <button
                      onClick={() => { setCabinetRole("coach"); setCabinetMenuOpen(false); navigate("coach-cabinet"); }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-left font-golos text-sm text-white hover:opacity-80"
                    >
                      <Icon name="ClipboardList" size={16} style={{ color: "var(--sumo-gold)" }} />
                      Кабинет тренера
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-white"
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t" style={{ backgroundColor: "var(--sumo-dark)", borderColor: "#2a2a2a" }}>
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNav(item.page)}
              className="block w-full text-left px-6 py-3 font-oswald text-sm tracking-wide border-b"
              style={{
                color: currentPage === item.page ? "var(--sumo-gold)" : "rgba(255,255,255,0.8)",
                borderColor: "#2a2a2a"
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
