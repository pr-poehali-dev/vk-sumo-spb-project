import Icon from "@/components/ui/icon";

const photos = [
  {
    url: "https://cdn.poehali.dev/projects/a7adfde0-d5d3-47bd-abcd-7c5a055c4f82/files/0a21860b-4b33-40c2-902a-30e881b25900.jpg",
    caption: "Соревнования по сумо, СПб",
    cat: "Соревнования",
  },
  {
    url: "https://cdn.poehali.dev/projects/a7adfde0-d5d3-47bd-abcd-7c5a055c4f82/files/058424fe-2a47-41e5-b42f-4bcbf6846ab1.jpg",
    caption: "Тренировки в зале",
    cat: "Тренировки",
  },
  {
    url: "https://cdn.poehali.dev/projects/a7adfde0-d5d3-47bd-abcd-7c5a055c4f82/files/81e274e1-d555-40de-8812-187858dfd8c1.jpg",
    caption: "Наш тренерский состав",
    cat: "Команда",
  },
  {
    url: "https://cdn.poehali.dev/projects/a7adfde0-d5d3-47bd-abcd-7c5a055c4f82/files/0a21860b-4b33-40c2-902a-30e881b25900.jpg",
    caption: "Первенство России",
    cat: "Соревнования",
  },
  {
    url: "https://cdn.poehali.dev/projects/a7adfde0-d5d3-47bd-abcd-7c5a055c4f82/files/058424fe-2a47-41e5-b42f-4bcbf6846ab1.jpg",
    caption: "Детская группа на тренировке",
    cat: "Тренировки",
  },
  {
    url: "https://cdn.poehali.dev/projects/a7adfde0-d5d3-47bd-abcd-7c5a055c4f82/files/81e274e1-d555-40de-8812-187858dfd8c1.jpg",
    caption: "Призёры Кубка СПб",
    cat: "Достижения",
  },
];

export default function Gallery() {
  return (
    <section className="pt-24 pb-20" style={{ backgroundColor: "#F5F2EE" }}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="section-divider" />
            <span className="font-oswald text-xs tracking-[0.2em] uppercase" style={{ color: "var(--sumo-gold)" }}>Медиа</span>
            <span className="section-divider" />
          </div>
          <h2 className="font-oswald font-bold text-4xl" style={{ color: "var(--sumo-black)" }}>
            ГАЛЕРЕЯ ФОТО И ВИДЕО
          </h2>
          <p className="font-golos text-sm mt-3" style={{ color: "#888" }}>
            Лучшие моменты наших соревнований и тренировок
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo, i) => (
            <div key={i} className="relative group overflow-hidden rounded card-hover">
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-end p-4">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="font-golos text-xs font-semibold text-white mb-1"
                    style={{ backgroundColor: "var(--sumo-gold)", display: "inline-block", padding: "2px 8px", borderRadius: 2 }}>
                    {photo.cat}
                  </div>
                  <div className="font-golos text-sm text-white">{photo.caption}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://vk.com/sumo_spb"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 font-oswald font-semibold tracking-wide text-white"
            style={{ backgroundColor: "var(--sumo-red)" }}
          >
            <Icon name="ExternalLink" size={16} />
            Больше фото ВКонтакте
          </a>
        </div>
      </div>
    </section>
  );
}
