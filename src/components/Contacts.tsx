import Icon from "@/components/ui/icon";

interface ContactsProps {
  full?: boolean;
}

export default function Contacts({ full }: ContactsProps) {
  return (
    <section className={`py-20 ${full ? "pt-24" : ""}`} style={{ backgroundColor: "var(--sumo-black)" }}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="section-divider" />
            <span className="font-oswald text-xs tracking-[0.2em] uppercase" style={{ color: "var(--sumo-gold)" }}>Связь</span>
            <span className="section-divider" />
          </div>
          <h2 className="font-oswald font-bold text-4xl text-white">
            КОНТАКТЫ И РЕКВИЗИТЫ
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="font-oswald font-semibold text-lg mb-5" style={{ color: "var(--sumo-gold)" }}>
              Контакты
            </h3>
            <div className="space-y-4">
              {[
                { icon: "Globe", label: "Сайт", value: "sumospb.ru", href: "https://sumospb.ru" },
                { icon: "Globe", label: "ВКонтакте", value: "vk.com/sumospb", href: "https://vk.com/sumospb" },
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
            <h3 className="font-oswald font-semibold text-lg mb-5" style={{ color: "var(--sumo-gold)" }}>
              Адрес
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(201,150,58,0.15)" }}>
                  <Icon name="MapPin" size={16} style={{ color: "var(--sumo-gold)" }} />
                </div>
                <div>
                  <div className="font-golos text-xs font-semibold mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>Юридический / почтовый адрес</div>
                  <div className="font-golos text-sm text-white leading-relaxed">
                    г. Санкт-Петербург<br />
                    (уточняйте актуальный адрес на sumospb.ru)
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(201,150,58,0.15)" }}>
                  <Icon name="Clock" size={16} style={{ color: "var(--sumo-gold)" }} />
                </div>
                <div>
                  <div className="font-golos text-xs font-semibold mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>Режим работы</div>
                  <div className="font-golos text-sm text-white">Пн–Пт: 9:00 – 21:00<br />Сб: 9:00 – 15:00</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-oswald font-semibold text-lg mb-5" style={{ color: "var(--sumo-gold)" }}>
              Реквизиты
            </h3>
            <div className="space-y-2 font-golos text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
              <div>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Полное наименование</span><br />
                Санкт-Петербургская региональная общественная организация «Федерация сумо Санкт-Петербурга»
              </div>
              <div className="pt-2">
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Сокращённое наименование</span><br />
                СПРООО «Федерация сумо СПб»
              </div>
              <div className="pt-2">
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Аккредитация</span><br />
                Федерация сумо России
              </div>
            </div>
          </div>
        </div>

        {full && (
          <div className="mt-14 p-8 rounded border" style={{ borderColor: "#333" }}>
            <h3 className="font-oswald font-bold text-xl text-white mb-6">Написать нам</h3>
            <div className="grid md:grid-cols-2 gap-4">
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
                  className="px-8 py-3 font-oswald font-semibold text-white tracking-wide"
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
  );
}
