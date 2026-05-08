import { useState } from "react";
import Icon from "@/components/ui/icon";
import SupportModal from "@/components/SupportModal";
import CallbackModal from "@/components/CallbackModal";

interface ContactsProps {
  full?: boolean;
  navigate?: (page: string) => void;
}

export default function Contacts({ full, navigate }: ContactsProps) {
  const [supportOpen, setSupportOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);

  return (
    <>
      <SupportModal open={supportOpen} onClose={() => setSupportOpen(false)} />
      <CallbackModal open={callbackOpen} onClose={() => setCallbackOpen(false)} />

      <section className={`py-16 sm:py-20 ${full ? "pt-20 sm:pt-24" : ""}`} style={{ backgroundColor: "var(--sumo-black)" }}>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-10 sm:mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="section-divider" />
              <span className="font-oswald text-xs tracking-[0.2em] uppercase" style={{ color: "var(--sumo-gold)" }}>Связь</span>
              <span className="section-divider" />
            </div>
            <h2 className="font-oswald font-bold text-3xl sm:text-4xl text-white">
              КОНТАКТЫ И РЕКВИЗИТЫ
            </h2>
          </div>

          {/* Быстрые кнопки связи */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            <a
              href="tel:+78121234567"
              className="flex flex-col items-center gap-2 py-4 px-3 rounded-xl font-golos text-sm font-semibold text-white transition-opacity hover:opacity-80"
              style={{ backgroundColor: "rgba(22,163,74,0.15)", border: "1px solid rgba(22,163,74,0.3)" }}
            >
              <Icon name="Phone" size={22} style={{ color: "#4ade80" }} />
              <span style={{ color: "#4ade80" }}>Позвонить</span>
              <span className="font-golos text-xs font-normal" style={{ color: "rgba(255,255,255,0.4)" }}>+7 (812) 123-45-67</span>
            </a>
            <button
              onClick={() => setCallbackOpen(true)}
              className="flex flex-col items-center gap-2 py-4 px-3 rounded-xl font-golos text-sm font-semibold text-white transition-opacity hover:opacity-80"
              style={{ backgroundColor: "rgba(201,150,58,0.12)", border: "1px solid rgba(201,150,58,0.3)" }}
            >
              <Icon name="PhoneCall" size={22} style={{ color: "var(--sumo-gold)" }} />
              <span style={{ color: "var(--sumo-gold)" }}>Перезвоним</span>
              <span className="font-golos text-xs font-normal" style={{ color: "rgba(255,255,255,0.4)" }}>Оставьте номер</span>
            </button>
            <a
              href="https://vk.com/sumospb"
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-2 py-4 px-3 rounded-xl font-golos text-sm font-semibold text-white transition-opacity hover:opacity-80"
              style={{ backgroundColor: "rgba(0,119,255,0.12)", border: "1px solid rgba(0,119,255,0.3)" }}
            >
              <Icon name="Users" size={22} style={{ color: "#4d9fff" }} />
              <span style={{ color: "#4d9fff" }}>ВКонтакте</span>
              <span className="font-golos text-xs font-normal" style={{ color: "rgba(255,255,255,0.4)" }}>vk.com/sumospb</span>
            </a>
            <a
              href="mailto:sumospb@mail.ru"
              className="flex flex-col items-center gap-2 py-4 px-3 rounded-xl font-golos text-sm font-semibold text-white transition-opacity hover:opacity-80"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Icon name="Mail" size={22} style={{ color: "rgba(255,255,255,0.6)" }} />
              <span style={{ color: "rgba(255,255,255,0.7)" }}>Email</span>
              <span className="font-golos text-xs font-normal" style={{ color: "rgba(255,255,255,0.4)" }}>sumospb@mail.ru</span>
            </a>
          </div>

          {/* Президент федерации */}
          <div className="mb-10 p-6 sm:p-8 rounded-xl" style={{ backgroundColor: "rgba(201,150,58,0.08)", border: "1px solid rgba(201,150,58,0.2)" }}>
            <div className="flex items-center gap-3 mb-5">
              <Icon name="UserCheck" size={20} style={{ color: "var(--sumo-gold)" }} />
              <h3 className="font-oswald font-bold text-lg" style={{ color: "var(--sumo-gold)" }}>
                Президент федерации
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <div className="font-oswald font-bold text-xl text-white mb-1">
                  — уточняется —
                </div>
                <div className="font-golos text-sm mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Президент СПРООО «Федерация сумо Санкт-Петербурга»<br />
                  Для уточнения контактов обратитесь через ВКонтакте
                </div>
                <a href="https://vk.com/sumospb" target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 font-golos text-sm font-semibold text-white hover:underline">
                  <Icon name="Users" size={14} style={{ color: "var(--sumo-gold)" }} />
                  vk.com/sumospb
                </a>
              </div>
              <div className="p-4 rounded-lg space-y-3" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
                <div>
                  <div className="font-golos text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Организация</div>
                  <div className="font-golos text-sm text-white">
                    <span style={{ color: "var(--sumo-gold)" }}>СПРООО «Федерация сумо Санкт-Петербурга»</span>
                  </div>
                </div>
                <div>
                  <div className="font-golos text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Аккредитация</div>
                  <div className="font-golos text-sm text-white">Федерация сумо России</div>
                </div>
                <div>
                  <div className="font-golos text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Телефон</div>
                  <a href="tel:+78121234567" className="font-golos text-sm text-white hover:underline">+7 (812) 123-45-67</a>
                </div>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10">
            <div>
              <h3 className="font-oswald font-semibold text-base sm:text-lg mb-5" style={{ color: "var(--sumo-gold)" }}>
                Контакты
              </h3>
              <div className="space-y-4">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (812) 123-45-67", href: "tel:+78121234567" },
                  { icon: "Globe", label: "Официальный сайт", value: "sumospb.ru", href: "https://sumospb.ru" },
                  { icon: "Users", label: "ВКонтакте", value: "vk.com/sumospb", href: "https://vk.com/sumospb" },
                  { icon: "Mail", label: "Email", value: "sumospb@mail.ru", href: "mailto:sumospb@mail.ru" },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "rgba(201,150,58,0.15)" }}>
                      <Icon name={c.icon} size={15} style={{ color: "var(--sumo-gold)" }} />
                    </div>
                    <div>
                      <div className="font-golos text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{c.label}</div>
                      <a href={c.href} target="_blank" rel="noreferrer" className="font-golos text-sm text-white hover:underline">
                        {c.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-oswald font-semibold text-base sm:text-lg mb-5" style={{ color: "var(--sumo-gold)" }}>
                Адрес и режим
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(201,150,58,0.15)" }}>
                    <Icon name="MapPin" size={15} style={{ color: "var(--sumo-gold)" }} />
                  </div>
                  <div>
                    <div className="font-golos text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>Город</div>
                    <div className="font-golos text-sm text-white">г. Санкт-Петербург</div>
                    <div className="font-golos text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                      Адреса залов — на sumospb.ru
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(201,150,58,0.15)" }}>
                    <Icon name="Clock" size={15} style={{ color: "var(--sumo-gold)" }} />
                  </div>
                  <div>
                    <div className="font-golos text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>Режим работы</div>
                    <div className="font-golos text-sm text-white">Пн–Пт: 9:00 – 21:00</div>
                    <div className="font-golos text-sm text-white">Сб: 9:00 – 15:00</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-oswald font-semibold text-base sm:text-lg mb-5" style={{ color: "var(--sumo-gold)" }}>
                Реквизиты
              </h3>
              <div className="space-y-3 font-golos text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                <div>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Полное наименование</span><br />
                  Санкт-Петербургская региональная общественная организация «Федерация сумо Санкт-Петербурга»
                </div>
                <div>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Сокращённое</span><br />
                  СПРООО «Федерация сумо СПб»
                </div>
                <div>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Аккредитация</span><br />
                  Федерация сумо России
                </div>
              </div>
            </div>
          </div>

          {/* Поддержка + перезвоним */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="p-6 rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-4"
              style={{ background: "linear-gradient(135deg, rgba(123,31,31,0.4) 0%, rgba(123,31,31,0.15) 100%)", border: "1px solid rgba(123,31,31,0.4)" }}>
              <div className="flex-1">
                <div className="font-oswald font-bold text-base text-white mb-1">Поддержите федерацию</div>
                <p className="font-golos text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Некоммерческая организация. Все тренировки бесплатны.
                </p>
              </div>
              <button
                onClick={() => setSupportOpen(true)}
                className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-lg font-oswald font-bold text-sm text-white"
                style={{ backgroundColor: "var(--sumo-red)" }}
              >
                <Icon name="Heart" size={15} />
                Поддержать
              </button>
            </div>
            <div className="p-6 rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-4"
              style={{ backgroundColor: "rgba(201,150,58,0.08)", border: "1px solid rgba(201,150,58,0.2)" }}>
              <div className="flex-1">
                <div className="font-oswald font-bold text-base text-white mb-1">Остались вопросы?</div>
                <p className="font-golos text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Оставьте номер — мы перезвоним в течение дня.
                </p>
              </div>
              <button
                onClick={() => setCallbackOpen(true)}
                className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-lg font-oswald font-bold text-sm text-white"
                style={{ backgroundColor: "rgba(201,150,58,0.25)", border: "1px solid rgba(201,150,58,0.5)", color: "var(--sumo-gold)" }}
              >
                <Icon name="PhoneCall" size={15} />
                Перезвоним
              </button>
            </div>
          </div>

          {full && (
            <div className="mt-6 p-6 sm:p-8 rounded border" style={{ borderColor: "#333" }}>
              <h3 className="font-oswald font-bold text-lg text-white mb-6">Написать нам</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <input className="px-4 py-3 rounded font-golos text-sm text-white border" style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "#333", fontSize: 16 }} placeholder="Ваше имя" />
                <input type="tel" className="px-4 py-3 rounded font-golos text-sm text-white border" style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "#333", fontSize: 16 }} placeholder="Телефон или Email" />
                <textarea className="px-4 py-3 rounded font-golos text-sm text-white border col-span-full" style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "#333", fontSize: 16 }} rows={4} placeholder="Ваш вопрос или сообщение..." />
                <div className="col-span-full flex items-center justify-between flex-wrap gap-4">
                  <button className="px-6 py-3 font-oswald font-semibold text-white tracking-wide text-sm rounded" style={{ backgroundColor: "var(--sumo-red)" }}>
                    Отправить сообщение
                  </button>
                  <p className="font-golos text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                    Нажимая, вы принимаете{" "}
                    <a href="/privacy" className="underline" style={{ color: "rgba(255,255,255,0.45)" }}>
                      политику конфиденциальности
                    </a>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
