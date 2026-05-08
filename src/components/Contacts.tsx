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
                { icon: "Phone", label: "Телефон", value: "+7 (812) 123-45-67" },
                { icon: "Mail", label: "Email", value: "info@sumo-spb.ru" },
                { icon: "Globe", label: "ВКонтакте", value: "vk.com/sumo_spb" },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(201,150,58,0.15)" }}>
                    <Icon name={c.icon} size={16} style={{ color: "var(--sumo-gold)" }} />
                  </div>
                  <div>
                    <div className="font-golos text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{c.label}</div>
                    <div className="font-golos text-sm text-white">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-oswald font-semibold text-lg mb-5" style={{ color: "var(--sumo-gold)" }}>
              Залы
            </h3>
            <div className="space-y-4">
              {[
                { name: "Зал №1", addr: "Невский пр., 147, Невский р-н" },
                { name: "Зал №2", addr: "ул. Садовая, 32, Центральный р-н" },
                { name: "Зал №3", addr: "пр. Энгельса, 27, Выборгский р-н" },
              ].map((hall) => (
                <div key={hall.name} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(201,150,58,0.15)" }}>
                    <Icon name="MapPin" size={16} style={{ color: "var(--sumo-gold)" }} />
                  </div>
                  <div>
                    <div className="font-golos text-xs font-semibold mb-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{hall.name}</div>
                    <div className="font-golos text-sm text-white">{hall.addr}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-oswald font-semibold text-lg mb-5" style={{ color: "var(--sumo-gold)" }}>
              Реквизиты
            </h3>
            <div className="space-y-2 font-golos text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
              <div>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Полное наименование</span><br />
                РОО «Федерация сумо Санкт-Петербурга»
              </div>
              <div>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>ИНН / КПП</span><br />
                7801234567 / 780101001
              </div>
              <div>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>ОГРН</span><br />
                1037800123456
              </div>
              <div>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Юридический адрес</span><br />
                190000, г. Санкт-Петербург, Невский пр., д. 147
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
