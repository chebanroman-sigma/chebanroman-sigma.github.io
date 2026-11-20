import Brand from "../Header/Brand";

function Footer() {
  return (
    <footer className="bg-slate-900 py-12 text-slate-300">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          
          {/* Колонка 1: Бренд и описание */}
          <div>
            <div className="mb-4 [&_span]:text-white"> {}
              <Brand name="КЛИМАТ-ПРО" />
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Профессиональная установка и обслуживание климатического оборудования для дома и бизнеса. Работаем с 1902 года.
            </p>
          </div>

          {/* Колонка 2: Контакты */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Контакты</h4>
            <ul className="space-y-2 text-sm">
              <li>📞 +7 (999) 148-80-67</li>
              <li>✉️ info@climat-pro.ru</li>
              <li>📍 г. Москва, ул. Строителей, д. 15</li>
            </ul>
          </div>

          {/* Колонка 3: Режим работы */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Режим работы</h4>
            <ul className="space-y-2 text-sm">
              <li>Пн-Пт: с 09:00 до 20:00</li>
              <li>Сб-Вс: с 10:00 до 18:00</li>
              <li className="pt-2 text-blue-400 font-medium">Аварийная служба: 24/7</li>
            </ul>
          </div>
        </div>

        {/* Нижняя полоса с копирайтом */}
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          © 2026 КЛИМАТ-ПРО. Все права защищены.
        </div>
      </div>
    </footer>
  );
}

export default Footer;