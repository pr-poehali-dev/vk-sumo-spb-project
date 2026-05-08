import { useEffect, useState } from "react";
import { Page } from "@/App";
import Icon from "@/components/ui/icon";

const NEWS_FEED_URL = "https://functions.poehali.dev/fc6f2027-71d4-4757-bc3e-75ffd2ccbab4";

interface NewsItem {
  title: string;
  link: string;
  description: string;
  pub_date: string;
  image: string;
  source: string;
  category: string;
}

interface NewsLiveProps {
  navigate: (page: Page) => void;
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return dateStr;
  }
}

const sourceColors: Record<string, string> = {
  "Sports.ru": "#FF6600",
  "РИА Спорт": "#003087",
  "Lenta.ru": "#CC0000",
  "ТАСС": "#1A1A6E",
};

export default function NewsLive({ navigate }: NewsLiveProps) {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Добавляем timestamp для обхода кэша
    fetch(`${NEWS_FEED_URL}?t=${Date.now()}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        setItems(data.items || []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-16 sm:py-20" style={{ backgroundColor: "var(--sumo-black)" }}>
      <div className="container mx-auto px-4 max-w-7xl">

        <div className="flex items-end justify-between mb-10 sm:mb-12 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="section-divider" />
              <span className="font-oswald text-xs tracking-[0.2em] uppercase" style={{ color: "var(--sumo-gold)" }}>
                Актуально
              </span>
            </div>
            <h2 className="font-oswald font-bold text-3xl sm:text-4xl text-white">
              НОВОСТИ СУМО
            </h2>
            <p className="font-golos text-sm mt-2" style={{ color: "rgba(255,255,255,0.4)" }}>
              Агрегатор из открытых источников — Sports.ru, РИА Новости, Lenta.ru, ТАСС
            </p>
          </div>
          <button
            onClick={() => navigate("news")}
            className="flex items-center gap-2 font-oswald text-sm font-semibold tracking-wide border-b pb-0.5"
            style={{ color: "var(--sumo-gold)", borderColor: "var(--sumo-gold)" }}
          >
            Новости федерации
            <Icon name="ArrowRight" size={15} />
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-lg overflow-hidden animate-pulse" style={{ backgroundColor: "#1a1a1a" }}>
                <div className="h-40 bg-gray-800" />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-gray-700 rounded w-1/3" />
                  <div className="h-4 bg-gray-700 rounded w-full" />
                  <div className="h-4 bg-gray-700 rounded w-4/5" />
                  <div className="h-3 bg-gray-800 rounded w-1/2 mt-2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error / empty */}
        {!loading && (error || items.length === 0) && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
              <Icon name="Rss" size={28} style={{ color: "rgba(255,255,255,0.3)" }} />
            </div>
            <p className="font-golos text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              {error ? "Не удалось загрузить новости. Попробуйте позже." : "Новости о сумо временно недоступны."}
            </p>
            <p className="font-golos text-xs mt-2" style={{ color: "rgba(255,255,255,0.25)" }}>
              Следите за новостями в{" "}
              <a href="https://vk.com/sumospb" target="_blank" rel="noreferrer" className="underline" style={{ color: "rgba(255,255,255,0.4)" }}>
                нашем сообществе ВКонтакте
              </a>
            </p>
          </div>
        )}

        {/* News grid */}
        {!loading && !error && items.length > 0 && (
          <>
            {/* Первая (большая) карточка */}
            <div className="mb-4">
              <a
                href={items[0].link}
                target="_blank"
                rel="noreferrer"
                className="block rounded-xl overflow-hidden group relative"
                style={{ backgroundColor: "#111" }}
              >
                <div className="relative h-56 sm:h-80 overflow-hidden">
                  {items[0].image ? (
                    <img
                      src={items[0].image}
                      alt={items[0].title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: "var(--sumo-red)" }}>
                      <Icon name="Newspaper" size={48} style={{ color: "rgba(255,255,255,0.3)" }} />
                    </div>
                  )}
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)" }} />
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="font-golos text-xs font-semibold px-2 py-0.5 rounded"
                        style={{ backgroundColor: sourceColors[items[0].source] || "var(--sumo-red)", color: "white" }}
                      >
                        {items[0].source}
                      </span>
                      <span className="font-golos text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                        {formatDate(items[0].pub_date)}
                      </span>
                    </div>
                    <h3 className="font-oswald font-bold text-white text-lg sm:text-2xl leading-snug mb-2 group-hover:underline">
                      {items[0].title}
                    </h3>
                    {items[0].description && (
                      <p className="font-golos text-sm hidden sm:block" style={{ color: "rgba(255,255,255,0.65)", WebkitLineClamp: 2, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {items[0].description}
                      </p>
                    )}
                  </div>
                </div>
              </a>
            </div>

            {/* Остальные карточки */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.slice(1, 7).map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col rounded-lg overflow-hidden group transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#111" }}
                >
                  <div className="relative h-36 overflow-hidden flex-shrink-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          const el = e.target as HTMLImageElement;
                          el.parentElement!.style.backgroundColor = "#1a1a1a";
                          el.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: "#1a1a1a" }}>
                        <Icon name="Newspaper" size={28} style={{ color: "rgba(255,255,255,0.15)" }} />
                      </div>
                    )}
                    <div
                      className="absolute top-2 left-2 font-golos text-xs font-semibold px-2 py-0.5 rounded"
                      style={{ backgroundColor: sourceColors[item.source] || "var(--sumo-red)", color: "white" }}
                    >
                      {item.source}
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <h4 className="font-oswald font-semibold text-sm text-white leading-snug mb-2 flex-1 group-hover:underline"
                      style={{ WebkitLineClamp: 3, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {item.title}
                    </h4>
                    <div className="flex items-center justify-between mt-auto pt-2 border-t" style={{ borderColor: "#222" }}>
                      <span className="font-golos text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                        {formatDate(item.pub_date)}
                      </span>
                      <Icon name="ExternalLink" size={12} style={{ color: "rgba(255,255,255,0.25)" }} />
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Ещё новости текстом */}
            {items.length > 7 && (
              <div className="mt-6 rounded-lg overflow-hidden" style={{ backgroundColor: "#111" }}>
                {items.slice(7, 13).map((item, i) => (
                  <a
                    key={i}
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-4 px-4 sm:px-5 py-3.5 border-b transition-colors hover:bg-white hover:bg-opacity-5"
                    style={{ borderColor: "#1a1a1a" }}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <span
                        className="font-golos text-xs font-semibold px-2 py-0.5 rounded whitespace-nowrap"
                        style={{ backgroundColor: sourceColors[item.source] || "#333", color: "white" }}
                      >
                        {item.source}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-golos text-sm text-white leading-snug truncate">{item.title}</p>
                    </div>
                    <div className="flex-shrink-0 font-golos text-xs self-center" style={{ color: "rgba(255,255,255,0.3)" }}>
                      {formatDate(item.pub_date).replace(/ г\.$/, "")}
                    </div>
                  </a>
                ))}
              </div>
            )}

            <div className="mt-6 text-center">
              <a
                href="https://vk.com/sumospb"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 font-oswald font-semibold tracking-wide text-sm border"
                style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.6)" }}
              >
                <Icon name="Users" size={15} />
                Новости федерации — vk.com/sumospb
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}