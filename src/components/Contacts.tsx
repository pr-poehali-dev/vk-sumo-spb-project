import { useState } from "react";
import Icon from "@/components/ui/icon";
import SupportModal from "@/components/SupportModal";

interface ContactsProps {
  full?: boolean;
}

export default function Contacts({ full }: ContactsProps) {
  const [supportOpen, setSupportOpen] = useState(false);

  return (
    <>
      <SupportModal open={supportOpen} onClose={() => setSupportOpen(false)} />

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
                  Укажите ФИО президента
                </div>
                <div className="font-golos text-sm mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Президент Санкт-Петербургской региональной общественной организации «Федерация сумо Санкт-Петербурга»
                </div>
                <a href="https://vk.com/sumospb" target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 font-golos text-sm text-white hover:underline">
                  <Icon name="Users" size={14} style={{ color: "var(--sumo-gold)" }} />
                  vk.com/sumospb
                </a>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
                <div className="font-golos text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Организация</div>
                <div className="font-golos text-sm text-white leading-relaxed mb-3">
                  Санкт-Петербургская региональная общественная организация<br />
                  <span style={{ color: "var(--sumo-gold)" }}>«Федерация сумо Санкт-Петербурга»</span>
                </div>
                <div className="font-golos text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Аккредитация</div>
                <div className="font-golos text-sm text-white">Федерация сумо России</div>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <h3 className="font-oswald font-semibold text-base sm:text-lg mb-5" style={{ color: "var(--sumo-gold)" }}>
                Контакты
              </h3>
              <div className="space-y-4">
                {[
                  { icon: "Globe", label: "Официальный сайт", value: "sumospb.ru", href: "https://sumospb.ru" },
                  { icon: "Users", label: "ВКонтакте", value: "vk.com/sumospb", href: "https://vk.com/sumospb" },
                  { icon: "Mail", label: "Email", value: "sumospb@mail.ru", href: "mailto:sumospb@mail.ru" },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(201,150,58,0.15)" }}>
                      <Icon name={c.icon} size={16} style={{ color: "var(--sumo-gold)" }} />
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
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(201,150,58,0.15)" }}>
                    <Icon name="MapPin" size={16} style={{ color: "var(--sumo-gold)" }} />
                  </div>
                  <div>
                    <div className="font-golos text-xs font-semibold mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>Город</div>
                    <div className="font-golos text-sm text-white">г. Санкт-Петербург</div>
                    <div className="font-golos text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                      Актуальные адреса залов — на sumospb.ru
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(201,150,58,0.15)" }}>
                    <Icon name="Clock" size={16} style={{ color: "var(--sumo-gold)" }} />
                  </div>
                  <div>
                    <div className="font-golos text-xs font-semibold mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>Режим работы</div>
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

          {/* Блок поддержки */}
          <div className="mt-10 sm:mt-14 p-6 sm:p-8 rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-6"
            style={{ background: "linear-gradient(135deg, rgba(123,31,31,0.4) 0%, rgba(123,31,31,0.15) 100%)", border: "1px solid rgba(123,31,31,0.4)" }}>
            <div className="flex-1">
              <div className="font-oswald font-bold text-lg sm:text-xl text-white mb-2">
                Поддержите федерацию
              </div>
              <p className="font-golos text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                Мы — некоммерческая организация, все тренировки бесплатны. Ваша поддержка помогает
                арендовать залы, закупать экипировку и проводить соревнования.
              </p>
            </div>
            <button
              onClick={() => setSupportOpen(true)}
              className="flex-shrink-0 flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-lg font-oswald font-bold text-white tracking-wide transition-opacity hover:opacity-90 whitespace-nowrap"
              style={{ backgroundColor: "var(--sumo-red)" }}
            >
              <Icon name="Heart" size={17} />
              Поддержать
            </button>
          </div>

          {full && (
            <div className="mt-10 p-6 sm:p-8 rounded border" style={{ borderColor: "#333" }}>
              <h3 className="font-oswald font-bold text-lg sm:text-xl text-white mb-6">Написать нам</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  className="px-4 py-3 rounded font-golos text-sm text-white border"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "#333" }}
                  placeholder="Ваше имя"
                />
                <input
                  className="px-4 py-3 rounded font-golos text-sm text-white border"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "#333" }}
                  placeholder="Телефон или Email"
                />
                <textarea
                  className="px-4 py-3 rounded font-golos text-sm text-white border col-span-full"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "#333" }}
                  rows={4}
                  placeholder="Ваш вопрос или сообщение..."
                />
                <div>
                  <button
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 font-oswald font-semibold text-white tracking-wide text-sm"
                    style={{ backgroundColor: "var(--sumo-red)" }}
                  >
                    Отправить сообщение
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
