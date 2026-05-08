import { Page } from "@/App";
import Icon from "@/components/ui/icon";

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
              Региональная общественная организация «Федерация сумо Санкт-Петербурга» объединяет спортсменов,
              тренеров и любителей этого уникального единоборства. Мы аккредитованы Федерацией сумо России
              и ведём активную работу по развитию и популяризации сумо в Северо-Западном регионе.
            </p>
            <p className="font-golos text-base leading-relaxed mb-8" style={{ color: "#444" }}>
              В наших рядах — спортсмены всех возрастов: от дошкольников до ветеранов. Мы проводим
              регулярные тренировки, городские и региональные соревнования, участвуем в Первенствах
              и Чемпионатах России.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: "Award", text: "Аккредитованная федерация России" },
                { icon: "MapPin", text: "3 зала в Санкт-Петербурге" },
                { icon: "Users", text: "Группы для детей от 6 лет" },
                { icon: "Trophy", text: "Призёры чемпионатов мира" },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3 p-4 rounded" style={{ backgroundColor: "var(--sumo-light, #F5F2EE)" }}>
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
            <div className="absolute -bottom-6 -left-6 p-6 rounded shadow-xl" style={{ backgroundColor: "var(--sumo-red)" }}>
              <div className="font-oswald font-bold text-4xl text-white">2003</div>
              <div className="font-golos text-sm text-white opacity-80">год основания</div>
            </div>
          </div>
        </div>

        {full && (
          <div className="mt-20">
            <h3 className="font-oswald font-bold text-2xl mb-8" style={{ color: "var(--sumo-black)" }}>
              ИСТОРИЯ И ДОСТИЖЕНИЯ
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { year: "2003", text: "Основание федерации, открытие первой секции в Невском районе" },
                { year: "2008", text: "Первый чемпион России в нашем составе — Александр Петров" },
                { year: "2012", text: "Открытие второго зала, расширение детских групп" },
                { year: "2016", text: "Победа на Первенстве Европы среди юниоров" },
                { year: "2019", text: "Открытие третьего зала, программа для взрослых начинающих" },
                { year: "2023", text: "20-летие федерации, более 500 воспитанников за историю" },
              ].map((item) => (
                <div key={item.year} className="gold-border-left pl-4 py-2">
                  <div className="font-oswald font-bold text-xl mb-1" style={{ color: "var(--sumo-gold)" }}>{item.year}</div>
                  <p className="font-golos text-sm" style={{ color: "#555" }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}