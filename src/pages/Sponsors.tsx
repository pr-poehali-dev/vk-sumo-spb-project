import Icon from "@/components/ui/icon";

const LOGO_URL = "https://cdn.poehali.dev/projects/a7adfde0-d5d3-47bd-abcd-7c5a055c4f82/bucket/7faf7e86-bd52-4506-ad94-567ea17e46d1.jpg";

const sponsors = [
  {
    id: 1,
    name: "ООО «САЙНЭД»",
    site: "ooosined.ru",
    url: "https://ooosined.ru",
    category: "Генеральный спонсор",
    categoryColor: "#C9963A",
    desc: "Топливная компания. Надёжный партнёр федерации, обеспечивающий поддержку в организации выездных соревнований и учебно-тренировочных сборов по всей России.",
    tags: ["Топливо", "Логистика"],
    logo: "",
    logoBg: "#1a3a5c",
    logoText: "САЙНЭД",
  },
];

const wantSponsor = [
  "Размещение логотипа на сайте федерации",
  "Упоминание на соревнованиях и мероприятиях",
  "Логотип на форме спортсменов",
  "Реклама в социальных сетях федерации (ВКонтакте)",
  "Благодарственное письмо и диплом партнёра",
];

export default function Sponsors() {
  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: "#F5F2EE" }}>
      {/* Hero-шапка */}
      <div className="py-16 sm:py-20" style={{ backgroundColor: "var(--sumo-black)" }}>
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="section-divider" />
            <span className="font-oswald text-xs tracking-[0.2em] uppercase" style={{ color: "var(--sumo-gold)" }}>
              Партнёрство
            </span>
            <span className="section-divider" />
          </div>
          <h1 className="font-oswald font-bold text-3xl sm:text-5xl text-white mb-4">
            НАШИ СПОНСОРЫ
          </h1>
          <p className="font-golos text-sm sm:text-base max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
            Компании, которые помогают нам развивать сумо в Санкт-Петербурге, проводить соревнования
            и обеспечивать спортсменов всем необходимым.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-12 sm:py-16">

        {/* Карточки спонсоров */}
        <div className="space-y-6 mb-16">
          {sponsors.map((s) => (
            <div key={s.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border" style={{ borderColor: "#E8E0D8" }}>
              {/* Бейдж категории */}
              <div className="h-1.5 w-full" style={{ backgroundColor: s.categoryColor }} />

              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
                  {/* Логотип */}
                  <div
                    className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-2xl flex flex-col items-center justify-center shadow-md"
                    style={{ backgroundColor: s.logoBg }}
                  >
                    <Icon name="Fuel" size={28} style={{ color: "#C9963A", marginBottom: 4 }} />
                    <span className="font-oswald font-bold text-white text-center leading-tight" style={{ fontSize: 11 }}>
                      {s.logoText}
                    </span>
                  </div>

                  {/* Инфо */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h2 className="font-oswald font-bold text-xl sm:text-2xl" style={{ color: "var(--sumo-black)" }}>
                        {s.name}
                      </h2>
                      <span
                        className="font-oswald font-semibold text-xs px-3 py-1 rounded-full"
                        style={{ backgroundColor: s.categoryColor + "20", color: s.categoryColor, border: `1px solid ${s.categoryColor}40` }}
                      >
                        {s.category}
                      </span>
                    </div>

                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-golos text-sm mb-4 hover:underline"
                      style={{ color: "var(--sumo-red)" }}
                    >
                      <Icon name="Globe" size={14} />
                      {s.site}
                    </a>

                    <p className="font-golos text-sm sm:text-base leading-relaxed mb-4" style={{ color: "#555" }}>
                      {s.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {s.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-golos text-xs px-3 py-1 rounded-full"
                          style={{ backgroundColor: "#F5F2EE", color: "#666", border: "1px solid #E8E0D8" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-oswald font-bold text-sm text-white transition-opacity hover:opacity-90"
                      style={{ backgroundColor: "var(--sumo-red)" }}
                    >
                      <Icon name="ExternalLink" size={15} />
                      Перейти на сайт
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Стать спонсором */}
        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "var(--sumo-black)" }}>
          <div className="p-1" style={{ background: "linear-gradient(90deg, var(--sumo-red), var(--sumo-gold), var(--sumo-red))" }} />
          <div className="p-6 sm:p-10">
            <div className="grid sm:grid-cols-2 gap-8 sm:gap-12 items-start">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(201,150,58,0.15)" }}>
                    <Icon name="Star" size={20} style={{ color: "var(--sumo-gold)" }} />
                  </div>
                  <h2 className="font-oswald font-bold text-xl sm:text-2xl text-white">
                    Стать спонсором
                  </h2>
                </div>
                <p className="font-golos text-sm sm:text-base leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.65)" }}>
                  Федерация сумо Санкт-Петербурга приглашает компании к сотрудничеству.
                  Ваш бренд — перед аудиторией спортсменов, родителей и болельщиков.
                  Все тренировки бесплатны — поддержка спонсоров напрямую идёт на развитие спорта.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="mailto:sumospb@mail.ru?subject=Предложение о спонсорстве"
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-oswald font-bold text-sm text-white"
                    style={{ backgroundColor: "var(--sumo-red)" }}
                  >
                    <Icon name="Mail" size={16} />
                    Написать нам
                  </a>
                  <a
                    href="https://vk.com/sumospb"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-oswald font-bold text-sm text-white border"
                    style={{ borderColor: "rgba(255,255,255,0.2)" }}
                  >
                    <Icon name="Users" size={16} />
                    ВКонтакте
                  </a>
                </div>
              </div>

              <div>
                <div className="font-oswald font-semibold text-base mb-4" style={{ color: "var(--sumo-gold)" }}>
                  Что получает спонсор:
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

        {/* Текущие партнёры-организации */}
        <div className="mt-12">
          <h3 className="font-oswald font-bold text-xl mb-6 text-center" style={{ color: "var(--sumo-black)" }}>
            ОФИЦИАЛЬНЫЕ ПАРТНЁРЫ И ПОДДЕРЖКА
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "Федерация сумо России", url: "https://sumo-russia.ru", icon: "Trophy", color: "#C62828" },
              { name: "IFS — Мировая федерация сумо", url: "https://ifs-sumo.com", icon: "Globe", color: "#1A237E" },
              { name: "Правительство СПб", url: "https://gov.spb.ru", icon: "Building", color: "#0D47A1" },
              { name: "Комитет по физкультуре и спорту СПб", url: "https://kfis.spb.ru", icon: "Medal", color: "#1B5E20" },
              { name: "РУСАДА", url: "https://rusada.ru", icon: "Shield", color: "#003087" },
            ].map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border hover:shadow-md transition-shadow"
                style={{ borderColor: "#E8E0D8" }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: p.color + "20" }}>
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
