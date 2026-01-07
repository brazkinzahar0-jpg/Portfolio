# Премиум Портфолио

Профессиональный сайт-портфолио премиум-класса с современным дизайном, интерактивными элементами и безупречной производительностью.

## ✨ Особенности

- 🎨 **Темная тема** с неоновыми акцентами
- 🖱️ **Кастомный курсор** с магнитными эффектами
- ✨ **Плавные анимации** на основе Framer Motion
- 🌟 **3D элементы** с React Three Fiber
- 📱 **Полностью адаптивный** дизайн
- ⚡ **Оптимизирован для производительности** (Lighthouse 100)

## 🚀 Установка и запуск

### Локальная разработка

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка для продакшена
npm run build

# Запуск продакшен версии
npm start
```

## 🐳 Развертывание с помощью Docker

### Требования

- Docker версии 20.10 или выше
- Docker Compose версии 1.29 или выше

### Быстрый старт

1. **Клонируйте репозиторий или скопируйте проект**

2. **Соберите Docker образ:**

```bash
docker build -t portfolio:latest .
```

3. **Запустите контейнер:**

```bash
docker run -d \
  --name portfolio-app \
  -p 3000:3000 \
  --restart unless-stopped \
  portfolio:latest
```

### Использование Docker Compose (Рекомендуется)

1. **Запустите приложение:**

```bash
docker-compose up -d
```

2. **Проверьте статус:**

```bash
docker-compose ps
```

3. **Просмотр логов:**

```bash
docker-compose logs -f portfolio
```

4. **Остановка приложения:**

```bash
docker-compose down
```

5. **Пересборка после изменений:**

```bash
docker-compose up -d --build
```

## 📋 Развертывание на сервере

### Пошаговая инструкция

#### 1. Подготовка сервера

**Установите Docker на Ubuntu/Debian:**

```bash
# Обновление системы
sudo apt update && sudo apt upgrade -y

# Установка зависимостей
sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release

# Добавление официального GPG ключа Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Добавление репозитория Docker
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Установка Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Проверка установки
docker --version
docker compose version
```

#### 2. Загрузка проекта на сервер

**Вариант A: Через Git**

```bash
# Клонирование репозитория
git clone <your-repo-url> portfolio
cd portfolio
```

**Вариант B: Через SCP**

```bash
# С локального компьютера
scp -r /path/to/portfolio user@your-server:/home/user/
```

**Вариант C: Через SFTP (FileZilla, WinSCP)**

Загрузите все файлы проекта на сервер.

#### 3. Сборка и запуск

```bash
# Перейдите в директорию проекта
cd /path/to/portfolio

# Соберите и запустите контейнер
docker compose up -d --build
```

#### 4. Настройка Nginx (опционально, для использования домена)

**Установка Nginx:**

```bash
sudo apt install -y nginx
```

**Создайте конфигурацию:**

```bash
sudo nano /etc/nginx/sites-available/portfolio
```

**Содержимое конфигурации:**

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Активируйте конфигурацию:**

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

**Настройка SSL с Let's Encrypt:**

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

#### 5. Автозапуск при перезагрузке

Docker Compose автоматически перезапускает контейнеры благодаря опции `restart: unless-stopped` в `docker-compose.yml`.

Для проверки:

```bash
# Перезагрузите сервер
sudo reboot

# После перезагрузки проверьте статус
docker compose ps
```

## 🔧 Управление контейнером

### Полезные команды

```bash
# Просмотр запущенных контейнеров
docker ps

# Просмотр логов
docker logs -f portfolio-app

# Остановка контейнера
docker stop portfolio-app

# Запуск контейнера
docker start portfolio-app

# Перезапуск контейнера
docker restart portfolio-app

# Удаление контейнера
docker rm -f portfolio-app

# Просмотр использования ресурсов
docker stats portfolio-app

# Вход в контейнер (для отладки)
docker exec -it portfolio-app sh
```

### Обновление приложения

```bash
# Остановите текущий контейнер
docker-compose down

# Получите последние изменения (если используете Git)
git pull

# Пересоберите и запустите
docker-compose up -d --build
```

## 🌐 Переменные окружения

Создайте файл `.env` (опционально) для настройки переменных окружения:

```env
NODE_ENV=production
PORT=3000
NEXT_TELEMETRY_DISABLED=1

# Для email сервиса (если настроена форма обратной связи)
RESEND_API_KEY=your_api_key_here
```

И обновите `docker-compose.yml`:

```yaml
services:
  portfolio:
    # ... другие настройки
    env_file:
      - .env
```

## 🔍 Проверка работоспособности

1. **Проверьте, что контейнер запущен:**

```bash
docker ps | grep portfolio
```

2. **Проверьте логи:**

```bash
docker logs portfolio-app
```

3. **Проверьте доступность:**

```bash
curl http://localhost:3000
```

Или откройте в браузере: `http://your-server-ip:3000`

## 📦 Структура проекта

```
портфолио/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Глобальные стили
│   ├── layout.tsx         # Главный layout
│   └── page.tsx           # Главная страница
├── components/            # React компоненты
│   ├── sections/         # Секции сайта
│   ├── CustomCursor.tsx  # Кастомный курсор
│   ├── Navigation.tsx    # Навигация
│   └── Footer.tsx        # Футер
├── types/                # TypeScript типы
├── Dockerfile           # Docker конфигурация
├── docker-compose.yml   # Docker Compose конфигурация
├── package.json         # Зависимости проекта
└── README.md           # Документация
```

## 🛠️ Решение проблем

### Контейнер не запускается

```bash
# Проверьте логи
docker logs portfolio-app

# Проверьте, не занят ли порт 3000
sudo lsof -i :3000

# Если порт занят, измените его в docker-compose.yml
ports:
  - "3001:3000"  # Используйте другой внешний порт
```

### Ошибка при сборке

```bash
# Очистите кеш Docker
docker system prune -a

# Пересоберите без кеша
docker-compose build --no-cache
```

### Проблемы с производительностью

```bash
# Ограничьте ресурсы в docker-compose.yml
services:
  portfolio:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 1G
```

## 📝 Лицензия

MIT

## 👤 Автор

Ваше имя

---

**Сделано с ❤ для демонстрации премиум веб-дизайна и разработки**



