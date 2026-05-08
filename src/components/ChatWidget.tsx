import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Icon from "@/components/ui/icon";

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
  time: string;
}

const SUMO_CONTEXT = `Ты — помощник Федерации сумо Санкт-Петербурга. Отвечай только на вопросы о сумо: история, техника, правила, питание, тренировки, соревнования, весовые категории, экипировка, записи в секцию. Если вопрос не связан с сумо или федерацией — вежливо перенаправь к теме сумо. Отвечай кратко и по делу, на русском языке. Для записи в секцию направляй на vk.com/sumospb или sumospb.ru.`;

const QUICK_QUESTIONS = [
  "С какого возраста принимают?",
  "Нужна ли физическая подготовка?",
  "Как записаться?",
  "Какие весовые категории?",
];

function getTime() {
  return new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
}

// Простые шаблонные ответы — работают без AI ключа
const TEMPLATE_ANSWERS: { patterns: string[]; answer: string }[] = [
  {
    patterns: ["возраст", "лет", "ребенок", "ребёнок", "принимают", "с какого"],
    answer: "Принимаем детей с 5 лет. Для дошкольников (5–7 лет) — особая игровая программа. Верхнего ограничения по возрасту нет, взрослые тоже приходят.",
  },
  {
    patterns: ["записат", "вступит", "как попасть", "как прийти", "запись"],
    answer: "Для записи напишите нам ВКонтакте: vk.com/sumospb или на сайте sumospb.ru. Первое пробное занятие — бесплатно!",
  },
  {
    patterns: ["цена", "стоит", "платн", "бесплатн", "оплат", "деньги"],
    answer: "Все тренировки в нашей федерации бесплатны! Мы — некоммерческая организация. При желании можно поддержать федерацию добровольным взносом.",
  },
  {
    patterns: ["расписан", "когда", "время", "график"],
    answer: "Расписание зависит от группы. Детские группы — по будням после 16:00, взрослые — вечером. Актуальное расписание — в разделе «Расписание» на сайте.",
  },
  {
    patterns: ["подготовк", "физическ", "спортсмен", "начинающ", "нулевой", "без опыта"],
    answer: "Специальная физическая подготовка не нужна! Берём всех с нуля. Тренер подберёт нагрузку под ваш уровень.",
  },
  {
    patterns: ["весов", "категор", "вес", "кг"],
    answer: "В сумо 5 мужских весовых категорий: до 85 кг, до 100 кг, до 115 кг, до 130 кг и свыше 130 кг. У женщин: до 65 кг, до 80 кг, свыше 80 кг. Также есть категория «Абсолютная».",
  },
  {
    patterns: ["правил", "как побеждают", "как выигрывают", "дохё", "бороть"],
    answer: "Цель — вытолкнуть соперника за пределы круга (дохё) или заставить коснуться земли любой частью тела, кроме ступней. Схватка длится несколько секунд!",
  },
  {
    patterns: ["маваши", "форм", "одежд", "экипировк", "костюм"],
    answer: "Спортсмены выступают в маваши — специальном поясе. На тренировках можно заниматься в обычных шортах. Федерация поможет с экипировкой для соревнований.",
  },
  {
    patterns: ["адрес", "где", "зал", "приехат", "находит"],
    answer: "У нас несколько залов в Санкт-Петербурге. Актуальные адреса — на сайте sumospb.ru или напишите нам ВКонтакте: vk.com/sumospb",
  },
  {
    patterns: ["трен", "тренировк", "занятий", "урок"],
    answer: "Тренировки включают разминку, отработку техники (сикири, тэппо, маваси), спарринги и специальную физическую подготовку. Длительность — 60–90 минут.",
  },
  {
    patterns: ["соревнован", "чемпионат", "турнир", "первенств"],
    answer: "Проводим городские соревнования в СПб, выезжаем на Первенства СЗФО и Чемпионат России. Наши спортсмены — призёры всероссийских соревнований!",
  },
  {
    patterns: ["питани", "диет", "еда", "похудеть", "вес"],
    answer: "В сумо нет жёстких диетических ограничений, как в других единоборствах (взвешивание не за день до соревнований). Рекомендуется сбалансированное питание с акцентом на белок.",
  },
];

function getAutoAnswer(text: string): string | null {
  const lower = text.toLowerCase();
  for (const qa of TEMPLATE_ANSWERS) {
    if (qa.patterns.some((p) => lower.includes(p))) {
      return qa.answer;
    }
  }
  return null;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      text: "Привет! Я помощник Федерации сумо СПб. Задайте любой вопрос о сумо — о тренировках, записи, правилах или соревнованиях.",
      time: getTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasNew, setHasNew] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) {
      setHasNew(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Блокируем скролл при открытом чате на мобиле
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const sendMessage = async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;

    setInput("");
    const userMsg: Message = { id: Date.now(), role: "user", text: msg, time: getTime() };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    // Небольшая задержка для реализма
    await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));

    const autoAnswer = getAutoAnswer(msg);
    const replyText = autoAnswer
      ?? "Хороший вопрос! По этой теме лучше уточнить у наших тренеров — напишите нам ВКонтакте: vk.com/sumospb или на сайте sumospb.ru. Там ответят быстро!";

    const botMsg: Message = { id: Date.now() + 1, role: "assistant", text: replyText, time: getTime() };
    setMessages((prev) => [...prev, botMsg]);
    setLoading(false);

    if (!open) setHasNew(true);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const widget = (
    <>
      {/* Кнопка открытия */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed flex items-center justify-center shadow-2xl transition-transform hover:scale-105 active:scale-95"
        style={{
          bottom: 24,
          right: 20,
          width: 56,
          height: 56,
          borderRadius: "50%",
          backgroundColor: "var(--sumo-red)",
          zIndex: 89999,
          border: "3px solid rgba(255,255,255,0.15)",
        }}
        aria-label="Открыть чат"
      >
        {open ? (
          <Icon name="X" size={22} style={{ color: "white" }} />
        ) : (
          <Icon name="MessageCircle" size={24} style={{ color: "white" }} />
        )}
        {hasNew && !open && (
          <span
            className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white"
            style={{ backgroundColor: "var(--sumo-gold)" }}
          />
        )}
      </button>

      {/* Тултип при первом появлении */}
      {!open && messages.length === 1 && (
        <div
          className="fixed font-golos text-xs text-white px-3 py-1.5 rounded-full shadow-lg pointer-events-none"
          style={{
            bottom: 90,
            right: 20,
            backgroundColor: "var(--sumo-black)",
            zIndex: 89998,
            whiteSpace: "nowrap",
            border: "1px solid #333",
          }}
        >
          Задайте вопрос о сумо 🥋
        </div>
      )}

      {/* Чат-панель */}
      {open && (
        <div
          className="fixed flex flex-col shadow-2xl"
          style={{
            bottom: 88,
            right: 16,
            width: "min(380px, calc(100vw - 32px))",
            height: "min(520px, calc(100svh - 120px))",
            borderRadius: 16,
            overflow: "hidden",
            zIndex: 89999,
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
          }}
        >
          {/* Шапка чата */}
          <div
            className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
            style={{ background: "linear-gradient(135deg, var(--sumo-red) 0%, #5c1616 100%)" }}
          >
            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
              <span className="text-lg">🥋</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-oswald font-bold text-white text-sm leading-tight">Помощник федерации</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="font-golos text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {loading ? "Печатает..." : "Онлайн"}
                </span>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ color: "rgba(255,255,255,0.7)" }}>
              <Icon name="X" size={18} />
            </button>
          </div>

          {/* Сообщения */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ backgroundColor: "#f9f9f9" }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[85%] px-3.5 py-2.5 rounded-2xl font-golos text-sm leading-relaxed"
                  style={{
                    backgroundColor: msg.role === "user" ? "var(--sumo-red)" : "white",
                    color: msg.role === "user" ? "white" : "#222",
                    borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                  }}
                >
                  {msg.text}
                  <div
                    className="text-right mt-1 font-golos"
                    style={{ fontSize: 10, color: msg.role === "user" ? "rgba(255,255,255,0.6)" : "#bbb" }}
                  >
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl bg-white shadow-sm flex gap-1 items-center" style={{ borderRadius: "18px 18px 18px 4px" }}>
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: "#ccc",
                        animation: "bounce 1.2s infinite",
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Быстрые вопросы */}
          {messages.length <= 2 && (
            <div className="px-3 py-2 flex gap-1.5 overflow-x-auto flex-shrink-0 border-t" style={{ borderColor: "#eee", scrollbarWidth: "none" }}>
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="flex-shrink-0 font-golos text-xs px-3 py-1.5 rounded-full border transition-colors hover:bg-red-50"
                  style={{ borderColor: "var(--sumo-red)", color: "var(--sumo-red)", whiteSpace: "nowrap" }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Поле ввода */}
          <div className="flex items-end gap-2 px-3 py-3 border-t flex-shrink-0" style={{ borderColor: "#eee", backgroundColor: "white" }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
              placeholder="Напишите вопрос..."
              className="flex-1 resize-none font-golos text-sm rounded-xl px-3 py-2.5 border outline-none"
              style={{
                borderColor: "#e5e7eb",
                fontSize: 16,
                maxHeight: 100,
                lineHeight: 1.4,
              }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-opacity"
              style={{
                backgroundColor: input.trim() && !loading ? "var(--sumo-red)" : "#e5e7eb",
              }}
            >
              <Icon name="Send" size={16} style={{ color: input.trim() && !loading ? "white" : "#aaa" }} />
            </button>
          </div>
        </div>
      )}
    </>
  );

  return createPortal(widget, document.body);
}
