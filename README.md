# PawsStore

Функциональный прототип интернет-магазина по ТЗ:

- Каталог с сортировкой (A-Z, Z-A, price asc/desc)
- Фильтрация по рейтингу и диапазону цены
- Карточка товара с галереей (3+ фото), аккордеоном и кнопкой добавления в корзину
- Корзина с изменением количества, удалением, пересчетом суммы
- Промокод `SAVE10` (скидка 10%), валидация пустого и некорректного ввода
- Empty state корзины
- Сохранение корзины и промокода в `localStorage`
- Адаптив 375px–1440px
- Hover/transition-анимации, тени, мобильные состояния меню/фильтров

## Стек

- HTML5
- CSS3 (адаптив + анимации)
- JavaScript ES6+ (Vanilla SPA через hash-маршрутизацию)

## Запуск локально

Откройте `index.html` в браузере

или через простой сервер:

```bash
# Python
python -m http.server 5173
```

После запуска открыть: `http://localhost:5173`

## Структура

- `index.html` — каркас приложения
- `styles.css` — стили, адаптив, анимации
- `app.js` — данные, рендер страниц, state корзины, фильтры, promo

## Деплой

### GitHub Pages

1. Запушить ветку `dev` и слить в `main`/`master`.
2. В репозитории: `Settings -> Pages`.
3. Source: `Deploy from a branch`.
4. Branch: `main` (или `master`), folder `/ (root)`.
5. После публикации получите прямую ссылку.

### Netlify

1. `Add new site -> Import an existing project`.
2. Подключить GitHub-репозиторий.
3. Build command: пусто.
4. Publish directory: `.`

### Vercel

1. `New Project` -> выбрать репозиторий.
2. Framework Preset: `Other`.
3. Build command: пусто.
4. Output directory: `.`

## Git workflow (рекомендуемый)

- Основная ветка: `main`/`master` (стабильный код)
- Разработка: `dev` + feature-ветки
- Коммиты: осмысленные, на русском, в стиле Conventional Commits

Примеры:

- `feat: добавить фильтры и сортировку каталога`
- `feat: реализовать корзину и промокод SAVE10`
- `style: улучшить адаптив и анимации элементов`
