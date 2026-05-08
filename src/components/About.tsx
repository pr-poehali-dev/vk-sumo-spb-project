import { Page } from "@/App";
import Icon from "@/components/ui/icon";

const LOGO_URL = "https://cdn.poehali.dev/projects/a7adfde0-d5d3-47bd-abcd-7c5a055c4f82/bucket/7faf7e86-bd52-4506-ad94-567ea17e46d1.jpg";

interface AboutProps {
  navigate: (page: Page) => void;
  full?: boolean;
}

export default function About({ navigate, full }: AboutProps) {
  return (
    <section className={`py-20 bg-white ${full ? "pt-24" : ""}`}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="section-divider" />
              <span className="font-oswald text-xs tracking-[0.2em] uppercase" style={{ color: "var(--sumo-gold)" }}>
                О нас
              </span>
            </div>
            <h2 className="font-oswald font-bold text-4xl mb-6" style={{ color: "var(--sumo-black)" }}>
              ФЕДЕРАЦИЯ СУМО<br />САНКТ-ПЕТЕРБУРГА
            </h2>
            <p className="font-golos text-base leading-relaxed mb-5" style={{ color: "#444" }}>
              Санкт-Петербургская региональная общественная организация «Федерация сумо Санкт-Петербурга» —
              аккредитованная организация Федерации сумо России, осуществляющая развитие и популяризацию
              сумо в Северо-Западном регионе. Мы объединяем спортсменов всех возрастов, тренеров
              и любителей этого уникального единоборства.
            </p>
            <p className="font-golos text-base leading-relaxed mb-8" style={{ color: "#444" }}>
              Наши воспитанники становятся призёрами и чемпионами России, участвуют в международных
              соревнованиях. Мы проводим учебно-тренировочные занятия, городские, региональные и
              всероссийские соревнования, а также активно работаем с молодёжью — принимаем детей
              с 5 лет.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: "Award", text: "Аккредитована Федерацией сумо России" },
                { icon: "MapPin", text: "Несколько залов в Санкт-Петербурге" },
                { icon: "Users", text: "Секции для детей от 5 лет и взрослых" },
                { icon: "Trophy", text: "Призёры чемпионатов России и мира" },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3 p-4 rounded" style={{ backgroundColor: "#F5F2EE" }}>
                  <Icon name={item.icon} size={20} style={{ color: "var(--sumo-red)", flexShrink: 0, marginTop: 1 }} />
                  <span className="font-golos text-sm" style={{ color: "#333" }}>{item.text}</span>
                </div>
              ))}
            </div>

            {!full && (
              <button
                onClick={() => navigate("about")}
                className="flex items-center gap-2 font-oswald text-sm font-semibold tracking-wide"
                style={{ color: "var(--sumo-red)" }}
              >
                Подробнее о федерации
                <Icon name="ArrowRight" size={16} />
              </button>
            )}
          </div>

          <div className="relative">
            <img
              src="https://cdn.poehali.dev/projects/a7adfde0-d5d3-47bd-abcd-7c5a055c4f82/files/058424fe-2a47-41e5-b42f-4bcbf6846ab1.jpg"
              alt="Тренировка сумо"
              className="rounded w-full h-96 object-cover"
            />
            <div className="absolute -bottom-6 -right-4 p-4 rounded-xl shadow-xl bg-white border-2" style={{ borderColor: "var(--sumo-gold)" }}>
              <img src={LOGO_URL} alt="Логотип федерации" className="w-20 h-20 rounded-full object-cover" />
            </div>
          </div>
        </div>

        {full && (
          <>
            <div className="mt-24">
              <h3 className="font-oswald font-bold text-2xl mb-8" style={{ color: "var(--sumo-black)" }}>
                О ВИДЕ СПОРТА
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="font-golos text-base leading-relaxed mb-4" style={{ color: "#444" }}>
                    Сумо — традиционное японское единоборство, в котором двое спортсменов соревнуются
                    на круглой платформе (дохё). Цель — вытолкнуть соперника за пределы круга или заставить
                    его коснуться пола любой частью тела, кроме ступней.
                  </p>
                  <p className="font-golos text-base leading-relaxed" style={{ color: "#444" }}>
                    Современное спортивное сумо культивируется в более чем 80 странах мира. Международная
                    федерация сумо (IFS) регулярно проводит чемпионаты мира, Европы и другие международные
                    соревнования. В России сумо развивается с 1990-х годов — российские спортсмены
                    неоднократно становились призёрами и чемпионами мира.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "80+", label: "стран мира культивируют сумо" },
                    { value: "с 5 лет", label: "принимаем детей в секцию" },
                    { value: "5 весовых", label: "категорий у мужчин и женщин" },
                    { value: "СПб", label: "один из ведущих регионов России" },
                  ].map((s) => (
                    <div key={s.label} className="p-5 rounded text-center" style={{ backgroundColor: "#F5F2EE" }}>
                      <div className="font-oswald font-bold text-2xl mb-1" style={{ color: "var(--sumo-red)" }}>{s.value}</div>
                      <div className="font-golos text-xs" style={{ color: "#666" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-16">
              <h3 className="font-oswald font-bold text-2xl mb-8" style={{ color: "var(--sumo-black)" }}>
                ИСТОРИЯ И ДОСТИЖЕНИЯ
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { year: "1990-е", text: "Зарождение сумо в Санкт-Петербурге, первые соревнования" },
                  { year: "2000-е", text: "Создание официальной федерации, аккредитация Федерацией сумо России" },
                  { year: "2008", text: "Первые чемпионы России в нашем составе" },
                  { year: "2012", text: "Расширение сети залов и детских групп по всему городу" },
                  { year: "2016", text: "Призёры первенств Европы и международных соревнований" },
                  { year: "2024+", text: "Продолжаем готовить чемпионов, принимаем детей с 5 лет" },
                ].map((item) => (
                  <div key={item.year} className="gold-border-left pl-4 py-2">
                    <div className="font-oswald font-bold text-xl mb-1" style={{ color: "var(--sumo-gold)" }}>{item.year}</div>
                    <p className="font-golos text-sm" style={{ color: "#555" }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 p-8 rounded" style={{ backgroundColor: "#F5F2EE" }}>
              <h3 className="font-oswald font-bold text-xl mb-4" style={{ color: "var(--sumo-black)" }}>
                НАШИ ЗАДАЧИ
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Развитие и популяризация сумо в Санкт-Петербурге и Ленинградской области",
                  "Подготовка спортсменов высокого класса для участия в соревнованиях всех уровней",
                  "Физическое, нравственное и патриотическое воспитание молодёжи через спорт",
                  "Организация и проведение городских, региональных и всероссийских соревнований",
                  "Взаимодействие с органами государственной власти в области физкультуры и спорта",
                  "Поддержка ветеранов спорта и развитие сумо среди всех возрастных групп",
                ].map((task) => (
                  <div key={task} className="flex items-start gap-3">
                    <Icon name="ChevronRight" size={16} style={{ color: "var(--sumo-gold)", flexShrink: 0, marginTop: 2 }} />
                    <span className="font-golos text-sm" style={{ color: "#444" }}>{task}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
