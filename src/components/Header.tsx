import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Блокируем скролл body когда мобильное меню открыто
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Закрываем дропдаун при клике снаружи
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCabinetMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Закрываем всё при смене страницы
  useEffect(() => {
    setMenuOpen(false);
    setCabinetMenuOpen(false);
  }, [currentPage]);

  const handleNav = (page: Page) => {
    navigate(page);
    setMenuOpen(false);
    setCabinetMenuOpen(false);
  };

  const handleLogout = () => {
    setCabinetRole(null);
    navigate("home");
  };

  // Высота шапки для позиционирования мобильного меню
  const getHeaderBottom = () => {
    if (headerRef.current) {
      return headerRef.current.getBoundingClientRect().bottom;
    }
    return 90;
  };

  // Мобильное меню через портал — рендерится прямо в body, поверх ВСЕГО
  const mobileMenuPortal = menuOpen && createPortal(
    <>
      {/* Затемняющий фон */}
      <div
        className="xl:hidden"
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 99998,
        }}
        onClick={() => setMenuOpen(false)}
      />

      {/* Само меню */}
      <div
        className="xl:hidden"
        style={{
          position: "fixed",
          top: getHeaderBottom(),
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99999,
          backgroundColor: "#111",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          borderTop: "1px solid #2a2a2a",
        }}
      >
        {/* Кнопки кабинета — вверху */}
        {!cabinetRole && (
          <div className="p-3 grid grid-cols-2 gap-2 border-b" style={{ borderColor: "#222" }}>
            <button
              onClick={() => { setCabinetRole("parent"); setMenuOpen(false); navigate("parent-cabinet"); }}
              className="flex flex-col items-center gap-2 py-4 px-3 rounded-xl font-golos text-sm font-semibold text-white"
              style={{ backgroundColor: "rgba(201,150,58,0.12)", border: "1px solid rgba(201,150,58,0.3)" }}
            >
              <Icon name="Users" size={24} style={{ color: "var(--sumo-gold)" }} />
              <span style={{ color: "var(--sumo-gold)" }}>Кабинет родителя</span>
              <span className="font-golos text-xs font-normal" style={{ color: "rgba(255,255,255,0.4)" }}>Посещаемость</span>
            </button>
            <button
              onClick={() => { setCabinetRole("coach"); setMenuOpen(false); navigate("coach-cabinet"); }}
              className="flex flex-col items-center gap-2 py-4 px-3 rounded-xl font-golos text-sm font-semibold text-white"
              style={{ backgroundColor: "rgba(123,31,31,0.25)", border: "1px solid rgba(123,31,31,0.5)" }}
            >
              <Icon name="ClipboardList" size={24} style={{ color: "#ff8080" }} />
              <span style={{ color: "#ff8080" }}>Кабинет тренера</span>
              <span className="font-golos text-xs font-normal" style={{ color: "rgba(255,255,255,0.4)" }}>Отметка явки</span>
            </button>
          </div>
        )}

        {/* Если уже вошёл */}
        {cabinetRole && (
          <div className="p-3 flex items-center gap-3 border-b" style={{ borderColor: "#222" }}>
            <button
              onClick={() => { navigate(cabinetRole === "parent" ? "parent-cabinet" : "coach-cabinet"); setMenuOpen(false); }}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-oswald text-sm font-bold text-white"
              style={{ backgroundColor: "var(--sumo-red)" }}
            >
              <Icon name="User" size={16} />
              {cabinetRole === "parent" ? "Мой кабинет" : "Кабинет тренера"}
            </button>
            <button
              onClick={() => { setCabinetRole(null); navigate("home"); setMenuOpen(false); }}
              className="flex items-center gap-1.5 py-3 px-4 rounded-xl font-golos text-sm"
              style={{ color: "rgba(255,255,255,0.5)", border: "1px solid #333" }}
            >
              <Icon name="LogOut" size={15} />
              Выйти
            </button>
          </div>
        )}

        {/* Навигация */}
        <div>
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => handleNav(item.page)}
              className="flex items-center justify-between w-full px-5 py-4 font-oswald text-base tracking-wide border-b"
              style={{
                color: currentPage === item.page ? "var(--sumo-gold)" : "rgba(255,255,255,0.85)",
                borderColor: "#1e1e1e",
                backgroundColor: currentPage === item.page ? "rgba(201,150,58,0.05)" : "transparent",
              }}
            >
              {item.label}
              {currentPage === item.page && <Icon name="ChevronRight" size={16} style={{ color: "var(--sumo-gold)" }} />}
            </button>
          ))}
        </div>

        {/* Доп. действия */}
        <div className="p-3 space-y-2 pb-8">
          <button
            onClick={() => { setSupportOpen(true); setMenuOpen(false); }}
            className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl font-oswald text-sm font-semibold"
            style={{ backgroundColor: "rgba(201,150,58,0.1)", color: "var(--sumo-gold)", border: "1px solid rgba(201,150,58,0.2)" }}
          >
            <Icon name="Heart" size={18} />
            Поддержать федерацию
          </button>
          <a
            href="https://vk.com/sumospb"
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl font-golos text-sm"
            style={{ backgroundColor: "rgba(0,119,255,0.1)", color: "#4d9fff", border: "1px solid rgba(0,119,255,0.2)" }}
          >
            <Icon name="Users" size={18} />
            Сообщество ВКонтакте
          </a>
        </div>
      </div>
    </>,
    document.body
  );

  return (
    <>
      <SupportModal open={supportOpen} onClose={() => setSupportOpen(false)} />

      {/* Мобильное меню через портал — вне любого родителя с overflow */}
      {mobileMenuPortal}

      <header
        ref={headerRef}
        className="sticky top-0"
        style={{ backgroundColor: "var(--sumo-black)", zIndex: 99997 }}
      >
        {/* Топ-бар РУСАДА */}
        <div className="border-b" style={{ backgroundColor: "#0a0a0a", borderColor: "#1e1e1e" }}>
          <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
            <div className="flex items-center justify-between h-7 sm:h-8">
              <a
                href="https://rusada.ru"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 transition-opacity hover:opacity-80"
              >
                <span
                  className="font-oswald font-bold text-white tracking-widest px-2 py-0.5 rounded"
                  style={{ backgroundColor: "#003087", fontSize: 9 }}
                >
                  РУСАДА
                </span>
                <span className="font-golos text-xs hidden sm:inline" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Российское антидопинговое агентство
                </span>
              </a>
              <div className="flex items-center gap-3">
                <a href="tel:+78121234567"
                  className="flex items-center gap-1 font-golos text-xs transition-opacity hover:opacity-80"
                  style={{ color: "rgba(255,255,255,0.5)" }}>
                  <Icon name="Phone" size={10} />
                  <span className="hidden sm:inline">+7 (812) 123-45-67</span>
                  <span className="sm:hidden">Позвонить</span>
                </a>
                <a href="https://vk.com/sumospb" target="_blank" rel="noreferrer"
                  className="font-golos text-xs transition-opacity hover:opacity-80 hidden sm:inline"
                  style={{ color: "rgba(255,255,255,0.4)" }}>
                  vk.com/sumospb
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Основная навигация */}
        <div className="border-b border-[#2a2a2a]">
          <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
            <div className="flex items-center justify-between h-14 sm:h-16 gap-2">

              {/* Логотип */}
              <button onClick={() => handleNav("home")} className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                <img
                  src={LOGO_URL}
                  alt="Федерация сумо СПб"
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover border-2"
                  style={{ borderColor: "var(--sumo-gold)" }}
                />
                <div className="text-left">
                  <div className="font-oswald font-bold text-white leading-tight tracking-wide text-xs sm:text-sm">
                    ФЕДЕРАЦИЯ СУМО
                  </div>
                  <div className="font-golos leading-tight hidden sm:block text-xs" style={{ color: "var(--sumo-gold)" }}>
                    Санкт-Петербург
                  </div>
                </div>
              </button>

              {/* Desktop навигация */}
              <nav className="hidden xl:flex items-center gap-4 flex-1 justify-center">
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

              {/* Правая часть */}
              <div className="flex items-center gap-2 flex-shrink-0">

                {/* Поддержать — только desktop */}
                <button
                  onClick={() => setSupportOpen(true)}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded font-oswald text-xs font-semibold tracking-wide border whitespace-nowrap"
                  style={{ borderColor: "rgba(201,150,58,0.4)", color: "var(--sumo-gold)", backgroundColor: "rgba(201,150,58,0.08)" }}
                >
                  <Icon name="Heart" size={13} />
                  Поддержать
                </button>

                {/* Кабинет */}
                {cabinetRole ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => navigate(cabinetRole === "parent" ? "parent-cabinet" : "coach-cabinet")}
                      className="flex items-center gap-1.5 px-3 py-2 rounded font-oswald text-xs sm:text-sm font-medium text-white whitespace-nowrap"
                      style={{ backgroundColor: "var(--sumo-red)" }}
                    >
                      <Icon name="User" size={13} />
                      <span className="hidden sm:inline">{cabinetRole === "parent" ? "Кабинет" : "Тренер"}</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="p-2 rounded"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                      title="Выйти"
                    >
                      <Icon name="LogOut" size={15} />
                    </button>
                  </div>
                ) : (
                  /* Desktop дропдаун */
                  <div className="relative hidden xl:block" ref={dropdownRef}>
                    <button
                      onClick={() => setCabinetMenuOpen((v) => !v)}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded font-oswald text-sm font-semibold text-white whitespace-nowrap"
                      style={{ backgroundColor: "var(--sumo-red)" }}
                    >
                      <Icon name="LogIn" size={14} />
                      Войти
                      <Icon name="ChevronDown" size={12} />
                    </button>

                    {cabinetMenuOpen && (
                      <div
                        className="absolute right-0 mt-2 w-60 rounded-xl border shadow-2xl overflow-hidden"
                        style={{ backgroundColor: "#1a1a1a", borderColor: "#333", top: "100%", zIndex: 100000 }}
                      >
                        <div className="px-4 py-2.5 border-b" style={{ borderColor: "#2a2a2a" }}>
                          <span className="font-golos text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                            Выберите тип входа
                          </span>
                        </div>
                        <button
                          onClick={() => { setCabinetRole("parent"); setCabinetMenuOpen(false); navigate("parent-cabinet"); }}
                          className="flex items-center gap-3 w-full px-4 py-4 text-left font-golos text-sm text-white border-b hover:bg-white hover:bg-opacity-5 transition-colors"
                          style={{ borderColor: "#2a2a2a" }}
                        >
                          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(201,150,58,0.15)" }}>
                            <Icon name="Users" size={16} style={{ color: "var(--sumo-gold)" }} />
                          </div>
                          <div>
                            <div className="font-semibold leading-tight">Кабинет родителя</div>
                            <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Посещаемость ребёнка</div>
                          </div>
                        </button>
                        <button
                          onClick={() => { setCabinetRole("coach"); setCabinetMenuOpen(false); navigate("coach-cabinet"); }}
                          className="flex items-center gap-3 w-full px-4 py-4 text-left font-golos text-sm text-white hover:bg-white hover:bg-opacity-5 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(201,150,58,0.15)" }}>
                            <Icon name="ClipboardList" size={16} style={{ color: "var(--sumo-gold)" }} />
                          </div>
                          <div>
                            <div className="font-semibold leading-tight">Кабинет тренера</div>
                            <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Отметка посещаемости</div>
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Бургер */}
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="xl:hidden flex items-center justify-center w-10 h-10 rounded-lg"
                  style={{
                    backgroundColor: menuOpen ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)",
                    color: "white",
                  }}
                  aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
                >
                  <Icon name={menuOpen ? "X" : "Menu"} size={22} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}