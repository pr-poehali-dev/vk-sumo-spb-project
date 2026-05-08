import Icon from "@/components/ui/icon";

const wantSponsor = [
  "Размещение логотипа и ссылки на сайте федерации",
  "Упоминание на соревнованиях и мероприятиях",
  "Логотип на форме спортсменов",
  "Публикации в сообществе ВКонтакте (vk.com/sumospb)",
  "Благодарственное письмо и диплом партнёра федерации",
  "Баннер на официальных мероприятиях СПб",
];

const orgPartners = [
  { name: "Федерация сумо России", url: "https://sumo-russia.ru", icon: "Trophy", color: "#C62828" },
  { name: "IFS — Мировая федерация сумо", url: "https://ifs-sumo.com", icon: "Globe", color: "#1A237E" },
  { name: "Правительство СПб", url: "https://gov.spb.ru", icon: "Building2", color: "#0D47A1" },
  { name: "Комитет по физкультуре и спорту СПб", url: "https://kfis.spb.ru", icon: "Medal", color: "#1B5E20" },
  { name: "РУСАДА", url: "https://rusada.ru", icon: "Shield", color: "#003087" },
];

export default function Sponsors() {
  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: "#F5F2EE" }}>

      {/* Hero */}
      <div className="py-16 sm:py-20" style={{ backgroundColor: "var(--sumo-black)" }}>
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="section-divider" />
            <span className="font-oswald text-xs tracking-[0.2em] uppercase" style={{ color: "var(--sumo-gold)" }}>
              Партнёрство
            </span>
            <span className="section-divider" />
          </div>
          <h1 className="font-oswald font-bold text-3xl sm:text-5xl text-white mb-5">
            СПОНСОРЫ И ПАРТНЁРЫ
          </h1>
          <p className="font-golos text-sm sm:text-base max-w-lg mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
            Федерация сумо Санкт-Петербурга — некоммерческая организация.
            Все тренировки бесплатны. Развитие спорта возможно благодаря поддержке партнёров.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl py-12 sm:py-16 space-y-10">

        {/* Место для спонсора */}
        <div className="bg-white rounded-2xl border-2 border-dashed p-10 sm:p-14 text-center" style={{ borderColor: "#E8E0D8" }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: "#F5F2EE" }}>
            <Icon name="Star" size={36} style={{ color: "var(--sumo-gold)" }} />
          </div>
          <div className="font-oswald font-bold text-2xl sm:text-3xl mb-3" style={{ color: "#ccc" }}>
            ЗДЕСЬ МОЖЕТ БЫТЬ ВАШ ЛОГОТИП
          </div>
          <p className="font-golos text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-6" style={{ color: "#aaa" }}>
            Станьте первым официальным спонсором Федерации сумо Санкт-Петербурга.
            Ваш бренд — перед аудиторией спортсменов, родителей и болельщиков города.
          </p>
          <a
            href="mailto:sumospb@mail.ru?subject=Предложение о спонсорстве"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-oswald font-bold text-sm text-white"
            style={{ backgroundColor: "var(--sumo-red)" }}
          >
            <Icon name="Mail" size={16} />
            Стать спонсором
          </a>
        </div>

        {/* Блок «Стать спонсором» */}
        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "var(--sumo-black)" }}>
          <div className="h-1.5" style={{ background: "linear-gradient(90deg, var(--sumo-red), var(--sumo-gold), var(--sumo-red))" }} />
          <div className="p-6 sm:p-10">
            <div className="grid sm:grid-cols-2 gap-8 sm:gap-12 items-start">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(201,150,58,0.15)" }}>
                    <Icon name="Handshake" size={20} style={{ color: "var(--sumo-gold)" }} />
                  </div>
                  <h2 className="font-oswald font-bold text-xl sm:text-2xl text-white">
                    Стать спонсором
                  </h2>
                </div>
                <p className="font-golos text-sm sm:text-base leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.65)" }}>
                  Мы открыты для сотрудничества с компаниями любого масштаба.
                  Поддержите развитие сумо в Санкт-Петербурге — это инвестиция в спорт,
                  здоровье молодёжи и имидж вашего бренда.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="mailto:sumospb@mail.ru?subject=Предложение о спонсорстве"
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-oswald font-bold text-sm text-white"
                    style={{ backgroundColor: "var(--sumo-red)" }}
                  >
                    <Icon name="Mail" size={16} />
                    sumospb@mail.ru
                  </a>
                  <a
                    href="https://vk.com/sumospb"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-oswald font-bold text-sm border text-white"
                    style={{ borderColor: "rgba(255,255,255,0.2)" }}
                  >
                    <Icon name="Users" size={16} />
                    ВКонтакте
                  </a>
                </div>
              </div>

              <div>
                <div className="font-oswald font-semibold text-sm mb-4 tracking-wide" style={{ color: "var(--sumo-gold)" }}>
                  ЧТО ПОЛУЧАЕТ СПОНСОР:
                </div>
                <ul className="space-y-3">
                  {wantSponsor.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "rgba(201,150,58,0.2)" }}>
                        <Icon name="Check" size={12} style={{ color: "var(--sumo-gold)" }} />
                      </div>
                      <span className="font-golos text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Официальные партнёры-организации */}
        <div>
          <h3 className="font-oswald font-bold text-xl mb-6 text-center" style={{ color: "var(--sumo-black)" }}>
            ОФИЦИАЛЬНЫЕ ПАРТНЁРЫ
          </h3>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {orgPartners.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border hover:shadow-md transition-all"
                style={{ borderColor: "#E8E0D8" }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: p.color + "18" }}>
                  <Icon name={p.icon} size={16} style={{ color: p.color }} />
                </div>
                <span className="font-golos text-sm" style={{ color: "#444" }}>{p.name}</span>
                <Icon name="ExternalLink" size={12} style={{ color: "#ccc" }} />
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
