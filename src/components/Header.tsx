import { useState } from "react";
import { Page } from "@/App";
import Icon from "@/components/ui/icon";
import SupportModal from "@/components/SupportModal";

const LOGO_URL = "https://cdn.poehali.dev/projects/a7adfde0-d5d3-47bd-abcd-7c5a055c4f82/bucket/7faf7e86-bd52-4506-ad94-567ea17e46d1.jpg";

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
  const [supportOpen, setSupportOpen] = useState(false);

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
    <>
      <SupportModal open={supportOpen} onClose={() => setSupportOpen(false)} />

      <header className="sticky top-0 z-50 border-b border-[#2a2a2a]" style={{ backgroundColor: "var(--sumo-black)" }}>
        <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
          <div className="flex items-center justify-between h-14 sm:h-16">

            {/* Logo */}
            <button onClick={() => handleNav("home")} className="flex items-center gap-2 sm:gap-3 min-w-0">
              <img
                src={LOGO_URL}
                alt="Федерация сумо СПб"
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover border-2 flex-shrink-0"
                style={{ borderColor: "var(--sumo-gold)" }}
              />
              <div className="text-left min-w-0">
                <div className="font-oswald font-bold text-white leading-tight tracking-wide" style={{ fontSize: "clamp(10px, 3vw, 14px)" }}>
                  ФЕДЕРАЦИЯ СУМО
                </div>
                <div className="font-golos leading-tight hidden sm:block" style={{ color: "var(--sumo-gold)", fontSize: 11 }}>
                  Санкт-Петербург
                </div>
              </div>
            </button>

            {/* Desktop nav */}
            <nav className="hidden xl:flex items-center gap-4">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNav(item.page)}
                  className={`nav-link font-oswald text-sm font-medium tracking-wide transition-colors ${currentPage === item.page ? "active" : ""}`}
                  style={{ color: currentPage === item.page ? "var(--sumo-gold)" : "rgba(255,255,255,0.8)" }}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Support — desktop */}
              <button
                onClick={() => setSupportOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded font-oswald text-xs font-semibold tracking-wide border"
                style={{ borderColor: "rgba(201,150,58,0.4)", color: "var(--sumo-gold)", backgroundColor: "rgba(201,150,58,0.08)" }}
              >
                <Icon name="Heart" size={13} />
                Поддержать
              </button>

              {cabinetRole ? (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => navigate(cabinetRole === "parent" ? "parent-cabinet" : "coach-cabinet")}
                    className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded font-oswald text-xs sm:text-sm font-medium text-white"
                    style={{ backgroundColor: "var(--sumo-red)" }}
                  >
                    <Icon name="User" size={13} />
                    <span className="hidden md:inline">{cabinetRole === "parent" ? "Личный кабинет" : "Кабинет тренера"}</span>
                    <span className="md:hidden">Кабинет</span>
                  </button>
                  <button onClick={handleLogout} className="p-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                    <Icon name="LogOut" size={15} />
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setCabinetMenuOpen(!cabinetMenuOpen)}
                    className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-2 rounded font-oswald text-xs sm:text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "var(--sumo-red)" }}
                  >
                    <Icon name="LogIn" size={14} />
                    <span className="hidden xs:inline">Войти</span>
                    <Icon name="ChevronDown" size={12} />
                  </button>
                  {cabinetMenuOpen && (
                    <div className="absolute right-0 top-full mt-1 w-52 rounded border shadow-xl z-50" style={{ backgroundColor: "var(--sumo-dark)", borderColor: "#333" }}>
                      <button
                        onClick={() => { setCabinetRole("parent"); setCabinetMenuOpen(false); navigate("parent-cabinet"); }}
                        className="flex items-center gap-3 w-full px-4 py-3 text-left font-golos text-sm text-white hover:opacity-80 border-b"
                        style={{ borderColor: "#333" }}
                      >
                        <Icon name="Users" size={16} style={{ color: "var(--sumo-gold)" }} />
                        Кабинет родителя
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

              {/* Burger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="xl:hidden p-2 text-white"
                aria-label="Открыть меню"
              >
                <Icon name={menuOpen ? "X" : "Menu"} size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="xl:hidden border-t" style={{ backgroundColor: "var(--sumo-dark)", borderColor: "#2a2a2a" }}>
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNav(item.page)}
                className="flex items-center w-full text-left px-5 py-4 font-oswald text-sm tracking-wide border-b"
                style={{
                  color: currentPage === item.page ? "var(--sumo-gold)" : "rgba(255,255,255,0.85)",
                  borderColor: "#2a2a2a",
                  backgroundColor: currentPage === item.page ? "rgba(201,150,58,0.05)" : "transparent",
                }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { setSupportOpen(true); setMenuOpen(false); }}
              className="flex items-center gap-2 w-full px-5 py-4 font-oswald text-sm font-semibold border-t"
              style={{ color: "var(--sumo-gold)", borderColor: "#333" }}
            >
              <Icon name="Heart" size={16} />
              Поддержать федерацию
            </button>
            <a
              href="https://vk.com/sumospb"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 w-full px-5 py-4 font-golos text-sm border-t"
              style={{ color: "rgba(255,255,255,0.65)", borderColor: "#2a2a2a" }}
            >
              <Icon name="Users" size={16} style={{ color: "#4d8fcc" }} />
              Сообщество ВКонтакте
            </a>
          </div>
        )}
      </header>
    </>
  );
}
