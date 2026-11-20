# Practika (TypeScript)

Интернет-магазин климатического оборудования — переписан на **TypeScript** + React + Vite + Tailwind.

## Запуск

```bash
npm install
npm run server   # JSON Server на порту 3001 (в отдельном терминале)
npm run dev      # Vite dev server
```

## Структура

- `src/types` — общие типы (Product, Category, Order, DashboardStats и т.д.)
- `src/api` — API-функции с типизацией
- `src/hooks` — `useProducts` с типизированным результатом
- `src/components` — все компоненты на `.tsx` с интерфейсами пропсов
- `src/pages` — страницы
- `db.json` — данные для json-server

## Что изменилось относительно JSX-версии

1. Все `.jsx` → `.tsx`, `.js` → `.ts`
2. Добавлен `tsconfig.json` (strict)
3. Общие типы в `src/types/index.ts`
4. API и хуки возвращают/принимают типизированные данные
5. Компоненты с пропсами имеют интерфейсы
6. `package.json` обновлён: `typescript`, скрипт `build` с `tsc -b`

## Примечание

Некоторые места (например, сортировка по `id` в каталоге) допускают `string | number` для совместимости с json-server.
