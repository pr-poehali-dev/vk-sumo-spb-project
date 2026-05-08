import Icon from "@/components/ui/icon";

const photos = [
  {
    url: "https://cdn.poehali.dev/projects/a7adfde0-d5d3-47bd-abcd-7c5a055c4f82/bucket/765862c2-f20c-42f6-ba11-832e09ea47f0.jpg",
    caption: "Чемпионат России по сумо 2026 — тяжёлый вес",
    cat: "Соревнования",
  },
  {
    url: "https://cdn.poehali.dev/projects/a7adfde0-d5d3-47bd-abcd-7c5a055c4f82/bucket/c282dfa6-cf53-4d4e-a782-7cb5b623cf34.jpg",
    caption: "Чемпионат России по сумо 2026 — подиум",
    cat: "Соревнования",
  },
  {
    url: "https://cdn.poehali.dev/projects/a7adfde0-d5d3-47bd-abcd-7c5a055c4f82/bucket/14af06de-5df9-4621-9da8-4eaf5217d2e9.jpg",
    caption: "Команда Федерации сумо СПб на Чемпионате России",
    cat: "Команда",
  },
  {
    url: "https://cdn.poehali.dev/projects/a7adfde0-d5d3-47bd-abcd-7c5a055c4f82/bucket/b0977d01-a3ab-4784-94ce-44694939e772.jpg",
    caption: "Призёры Первенства Санкт-Петербурга",
    cat: "Достижения",
  },
  {
    url: "https://cdn.poehali.dev/projects/a7adfde0-d5d3-47bd-abcd-7c5a055c4f82/bucket/2ca149a0-77bf-4d56-a664-00deb51b0ddb.jpg",
    caption: "Первенство Санкт-Петербурга — групповое фото",
    cat: "Соревнования",
  },
];

const catColors: Record<string, string> = {
  "Соревнования": "var(--sumo-red)",
  "Команда": "#1565C0",
  "Достижения": "#2E7D32",
  "Тренировки": "#6D4C41",
};

export default function Gallery() {
  return (
    <section className="pt-20 sm:pt-24 pb-16 sm:pb-20" style={{ backgroundColor: "#F5F2EE" }}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="section-divider" />
            <span className="font-oswald text-xs tracking-[0.2em] uppercase" style={{ color: "var(--sumo-gold)" }}>Медиа</span>
            <span className="section-divider" />
          </div>
          <h2 className="font-oswald font-bold text-3xl sm:text-4xl" style={{ color: "var(--sumo-black)" }}>
            ГАЛЕРЕЯ ФОТО
          </h2>
          <p className="font-golos text-sm mt-3" style={{ color: "#888" }}>
            Наши спортсмены на соревнованиях и тренировках
          </p>
        </div>

        {/* Сетка: первое фото широкое на всю строку, остальные 2×2 */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {/* Широкая первая карточка */}
          <div
            className="relative col-span-2 md:col-span-2 group overflow-hidden rounded-lg"
            style={{ aspectRatio: "16/7" }}
          >
            <img
              src={photos[0].url}
              alt={photos[0].caption}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ objectPosition: "center 30%" }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 55%)" }} />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
              <span className="font-golos text-xs font-semibold text-white px-2 py-0.5 rounded mb-1 inline-block" style={{ backgroundColor: catColors[photos[0].cat] }}>
                {photos[0].cat}
              </span>
              <div className="font-golos text-sm sm:text-base text-white leading-snug font-semibold mt-1">{photos[0].caption}</div>
            </div>
          </div>

          {/* Третья — вертикальная правая */}
          <div
            className="relative row-span-2 group overflow-hidden rounded-lg hidden md:block"
            style={{ aspectRatio: "3/4" }}
          >
            <img
              src={photos[2].url}
              alt={photos[2].caption}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ objectPosition: "center top" }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 55%)" }} />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className="font-golos text-xs font-semibold text-white px-2 py-0.5 rounded mb-1 inline-block" style={{ backgroundColor: catColors[photos[2].cat] }}>
                {photos[2].cat}
              </span>
              <div className="font-golos text-sm text-white leading-snug mt-1">{photos[2].caption}</div>
            </div>
          </div>

          {/* Остальные карточки */}
          {[photos[1], photos[3], photos[4]].map((photo, i) => (
            <div
              key={i}
              className="relative group overflow-hidden rounded-lg"
              style={{ aspectRatio: "4/3" }}
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ objectPosition: "center top" }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 55%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                <span className="font-golos text-xs font-semibold text-white px-2 py-0.5 rounded mb-1 inline-block" style={{ backgroundColor: catColors[photo.cat] || "var(--sumo-red)" }}>
                  {photo.cat}
                </span>
                <div className="font-golos text-xs sm:text-sm text-white leading-snug mt-0.5">{photo.caption}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 text-center">
          <a
            href="https://vk.com/sumospb"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 font-oswald font-semibold tracking-wide text-white text-sm sm:text-base"
            style={{ backgroundColor: "#0077ff" }}
          >
            <Icon name="Users" size={16} />
            Больше фото ВКонтакте — vk.com/sumospb
          </a>
        </div>
      </div>
    </section>
  );
}
