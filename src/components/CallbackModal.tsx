import { useState } from "react";
import { createPortal } from "react-dom";
import Icon from "@/components/ui/icon";

interface CallbackModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CallbackModal({ open, onClose }: CallbackModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setSent(true);
    setTimeout(() => { setSent(false); setName(""); setPhone(""); onClose(); }, 3000);
  };

  return createPortal(
    <div
      className="fixed inset-0 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.75)", zIndex: 100001 }}
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-sm rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: "var(--sumo-black)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Шапка */}
        <div className="relative px-6 pt-6 pb-5" style={{ background: "linear-gradient(135deg, var(--sumo-red) 0%, #4a0f0f 100%)" }}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
          >
            <Icon name="X" size={16} style={{ color: "white" }} />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
              <Icon name="Phone" size={22} style={{ color: "white" }} />
            </div>
            <div>
              <div className="font-oswald font-bold text-white text-lg leading-tight">Перезвоним вам</div>
              <div className="font-golos text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.7)" }}>Обычно в течение 1–2 часов</div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-golos text-xs mb-1.5 block" style={{ color: "rgba(255,255,255,0.5)" }}>Ваше имя</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg font-golos text-white border outline-none"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "#333", fontSize: 16 }}
                  placeholder="Иван"
                />
              </div>
              <div>
                <label className="font-golos text-xs mb-1.5 block" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Номер телефона <span style={{ color: "var(--sumo-gold)" }}>*</span>
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  required
                  className="w-full px-4 py-3 rounded-lg font-golos text-white border outline-none"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "#333", fontSize: 16 }}
                  placeholder="+7 (___) ___-__-__"
                />
              </div>

              <div className="p-3 rounded-lg font-golos text-xs leading-relaxed" style={{ backgroundColor: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.4)" }}>
                Нажимая кнопку, вы соглашаетесь с{" "}
                <a href="/privacy" className="underline" style={{ color: "rgba(255,255,255,0.55)" }}>политикой конфиденциальности</a>.
                Мы не передаём данные третьим лицам.
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg font-oswald font-bold text-white tracking-wide"
                style={{ backgroundColor: "var(--sumo-red)" }}
              >
                <Icon name="Phone" size={16} />
                Жду звонка
              </button>
            </form>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "rgba(22,163,74,0.15)" }}>
                <Icon name="CheckCircle" size={36} style={{ color: "#16a34a" }} />
              </div>
              <div className="font-oswald font-bold text-white text-lg mb-2">Заявка принята!</div>
              <p className="font-golos text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                Мы перезвоним вам в ближайшее время.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
