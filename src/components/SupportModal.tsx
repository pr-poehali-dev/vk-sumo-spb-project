import { useState } from "react";
import Icon from "@/components/ui/icon";

interface SupportModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SupportModal({ open, onClose }: SupportModalProps) {
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  const cardNumber = "2202 2062 1234 5678";

  const handleCopy = () => {
    navigator.clipboard.writeText(cardNumber.replace(/\s/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md rounded-t-2xl sm:rounded-xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: "var(--sumo-black)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-6 pb-4" style={{ background: "linear-gradient(135deg, var(--sumo-red) 0%, #4a0f0f 100%)" }}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
          >
            <Icon name="X" size={16} style={{ color: "white" }} />
          </button>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
              <Icon name="Heart" size={22} style={{ color: "white" }} />
            </div>
            <div>
              <div className="font-oswald font-bold text-white text-lg leading-tight">Поддержать федерацию</div>
              <div className="font-golos text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>Федерация сумо Санкт-Петербурга</div>
            </div>
          </div>
          <p className="font-golos text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
            Наша федерация — некоммерческая организация. Все занятия бесплатны.
            Ваша помощь идёт на аренду залов, экипировку для детей и проведение соревнований.
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <div className="font-oswald text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
              Перевод на карту
            </div>
            <div
              className="flex items-center justify-between p-4 rounded-lg"
              style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div>
                <div className="font-oswald font-bold text-xl text-white tracking-widest">{cardNumber}</div>
                <div className="font-golos text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Сбербанк · Федерация сумо СПб
                </div>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-2 rounded font-golos text-xs font-semibold transition-all"
                style={{
                  backgroundColor: copied ? "rgba(22,163,74,0.2)" : "rgba(201,150,58,0.15)",
                  color: copied ? "#16a34a" : "var(--sumo-gold)",
                }}
              >
                <Icon name={copied ? "Check" : "Copy"} size={13} />
                {copied ? "Скопировано" : "Копировать"}
              </button>
            </div>
          </div>

          <div>
            <div className="font-oswald text-xs tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
              Перевод по номеру телефона (СБП)
            </div>
            <div
              className="flex items-center justify-between p-4 rounded-lg"
              style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div>
                <div className="font-oswald font-bold text-lg text-white">+7 (XXX) XXX-XX-XX</div>
                <div className="font-golos text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Система быстрых платежей
                </div>
              </div>
              <Icon name="Smartphone" size={20} style={{ color: "var(--sumo-gold)" }} />
            </div>
          </div>

          <div className="p-4 rounded-lg flex items-start gap-3" style={{ backgroundColor: "rgba(201,150,58,0.08)", border: "1px solid rgba(201,150,58,0.2)" }}>
            <Icon name="Info" size={16} style={{ color: "var(--sumo-gold)", flexShrink: 0, marginTop: 1 }} />
            <p className="font-golos text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
              В комментарии к переводу можно указать «Поддержка федерации сумо СПб». 
              Любая сумма имеет значение — спасибо!
            </p>
          </div>

          <a
            href="https://vk.com/sumospb"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded font-oswald font-semibold text-sm text-white"
            style={{ backgroundColor: "#0077ff" }}
          >
            <Icon name="Users" size={16} />
            Написать нам ВКонтакте
          </a>
        </div>
      </div>
    </div>
  );
}
