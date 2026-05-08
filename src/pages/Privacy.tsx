export default function Privacy() {
  return (
    <div className="min-h-screen py-16 sm:py-24" style={{ backgroundColor: "#F5F2EE" }}>
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="font-oswald font-bold text-3xl sm:text-4xl mb-2" style={{ color: "var(--sumo-black)" }}>
          ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ
        </h1>
        <p className="font-golos text-sm mb-10" style={{ color: "#888" }}>
          Санкт-Петербургская региональная общественная организация «Федерация сумо Санкт-Петербурга»
        </p>

        <div className="space-y-8 font-golos text-base" style={{ color: "#444" }}>

          <section>
            <h2 className="font-oswald font-bold text-xl mb-3" style={{ color: "var(--sumo-black)" }}>1. Общие положения</h2>
            <p className="leading-relaxed mb-3">
              Настоящая политика конфиденциальности (далее — Политика) разработана в соответствии с требованиями
              Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» и определяет порядок обработки
              персональных данных на официальном сайте Федерации сумо Санкт-Петербурга (далее — Сайт).
            </p>
            <p className="leading-relaxed">
              Используя Сайт, вы соглашаетесь с условиями настоящей Политики. Если вы не согласны с условиями,
              пожалуйста, прекратите использование Сайта.
            </p>
          </section>

          <section>
            <h2 className="font-oswald font-bold text-xl mb-3" style={{ color: "var(--sumo-black)" }}>2. Какие данные мы НЕ собираем</h2>
            <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: "#E8F5E9", border: "1px solid #A5D6A7" }}>
              <p className="font-semibold text-green-800 mb-2">✓ Сайт НЕ собирает и НЕ хранит:</p>
              <ul className="space-y-1 text-green-900 text-sm">
                <li>• Файлы cookie для отслеживания</li>
                <li>• Данные о поведении пользователей</li>
                <li>• IP-адреса посетителей</li>
                <li>• Персональные данные без явного согласия</li>
                <li>• Данные платёжных карт</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-oswald font-bold text-xl mb-3" style={{ color: "var(--sumo-black)" }}>3. Данные, передаваемые добровольно</h2>
            <p className="leading-relaxed mb-3">
              При заполнении форм обратной связи (заявка на звонок, обращение) вы добровольно передаёте:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-3 text-sm leading-relaxed">
              <li>Имя (необязательно)</li>
              <li>Номер телефона (для обратной связи)</li>
              <li>Текст сообщения</li>
            </ul>
            <p className="leading-relaxed">
              Данные используются исключительно для ответа на ваш запрос. Мы <strong>не передаём</strong> их
              третьим лицам, не используем в маркетинговых целях и не храним дольше, чем необходимо.
            </p>
          </section>

          <section>
            <h2 className="font-oswald font-bold text-xl mb-3" style={{ color: "var(--sumo-black)" }}>4. Цели обработки</h2>
            <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed">
              <li>Ответ на обращения и вопросы посетителей</li>
              <li>Организация обратного звонка по вашей заявке</li>
              <li>Информирование о деятельности федерации (только с согласия)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-oswald font-bold text-xl mb-3" style={{ color: "var(--sumo-black)" }}>5. Защита данных</h2>
            <p className="leading-relaxed">
              Мы принимаем все необходимые технические и организационные меры для защиты персональных данных
              от несанкционированного доступа, изменения, раскрытия или уничтожения. Данные передаются
              только по защищённому соединению (HTTPS).
            </p>
          </section>

          <section>
            <h2 className="font-oswald font-bold text-xl mb-3" style={{ color: "var(--sumo-black)" }}>6. Права субъектов персональных данных</h2>
            <p className="leading-relaxed mb-3">В соответствии с ФЗ-152 вы имеете право:</p>
            <ul className="list-disc list-inside space-y-1 text-sm leading-relaxed">
              <li>Получить информацию об обработке ваших данных</li>
              <li>Требовать исправления или удаления данных</li>
              <li>Отозвать согласие на обработку</li>
              <li>Обратиться с жалобой в Роскомнадзор</li>
            </ul>
          </section>

          <section>
            <h2 className="font-oswald font-bold text-xl mb-3" style={{ color: "var(--sumo-black)" }}>7. Сторонние сервисы</h2>
            <p className="leading-relaxed mb-3">
              Сайт содержит ссылки на сторонние ресурсы (ВКонтакте, РУСАДА и др.). Мы не несём ответственности
              за политику конфиденциальности этих ресурсов.
            </p>
            <p className="leading-relaxed">
              На сайте используется Яндекс.Метрика для сбора обезличенной статистики посещений в соответствии
              с политикой конфиденциальности Яндекса.
            </p>
          </section>

          <section>
            <h2 className="font-oswald font-bold text-xl mb-3" style={{ color: "var(--sumo-black)" }}>8. Контакты</h2>
            <p className="leading-relaxed mb-2">
              По вопросам обработки персональных данных обращайтесь:
            </p>
            <div className="p-4 rounded-xl" style={{ backgroundColor: "var(--sumo-black)", color: "rgba(255,255,255,0.8)" }}>
              <p className="font-golos text-sm">
                <span style={{ color: "var(--sumo-gold)" }}>Организация:</span> СПРООО «Федерация сумо Санкт-Петербурга»<br />
                <span style={{ color: "var(--sumo-gold)" }}>Сайт:</span> sumospb.ru<br />
                <span style={{ color: "var(--sumo-gold)" }}>ВКонтакте:</span> vk.com/sumospb<br />
                <span style={{ color: "var(--sumo-gold)" }}>Email:</span> sumospb@mail.ru
              </p>
            </div>
          </section>

          <section className="pt-4 border-t" style={{ borderColor: "#ddd" }}>
            <p className="text-sm" style={{ color: "#999" }}>
              Дата последнего обновления: май 2026 г.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
