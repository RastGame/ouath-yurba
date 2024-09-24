---

# Документація
Приклад реалізації аутентифікації користувача через OAuth за допомогою API соціальної мережі Yurba.
<a href="https://me.yurba.one/RastGame" target="_blank"> Yurba </a> || <a href="https://github.com/RastGame" target="_blank"> Github </a>
## Використання

### Вимоги

- Node.js
- npm

### Налаштування


1. Скопіюйте проєкт:

   ```bash
   git clone https://github.com/RastGame/ouath-yurba.git
   ```
 
2. Скопіюйте файл `.env.example` у `.env` і заповніть його значеннями:

### <a href="https://yurba.one/settings/?page=developer" target="_blank"> Public Key & Secret </a> 
### <a href="https://yurba.one/settings/?page=developer" target="_blank"> Token </a> 

   ```plaintext
   PORT=3000
   REDIRECT_URL=http://localhost:3000/redirect
   PUBLIC_KEY=your_public_key
   SECRET=your_secret
   YURBA_TOKEN=your_yurba_token
   SESSION_SECRET=your_session_secret
   ```

3. Встановіть необхідні пакети та запустіть сервер:

   ```bash
   npm run run
   ```

   #### Або

   ```bash
   npm install dotenv express express-session axios 
   ```
   ```bash
   node index.js 
   ```

### Ендпоінти

- `GET /`: Головна сторінка, на якій є посилання для переходу до аутентифікації.
  
- `GET /oauth`: Направляє користувача на сторінку аутентифікації Yurba. Формує URL з використанням `PUBLIC_KEY` і `REDIRECT_URL`.

- `GET /redirect`: Обробляє редирект після успішної аутентифікації. Отримує токен користувача і запитує інформацію про нього з API Yurba. Зберігає інформацію про користувача в сесії.

### Логування

Весь процес виконує логування дій у консоль з вказанням дати і часу. Використовується функція `log(message)`, яка форматує виведення.

### Надсилання повідомлень

Функція `postDialogMessage(token, dialogId, text)` дозволяє надсилати повідомлення у приватні діалоги Yurba. Вона приймає токен, ідентифікатор діалогу та текст повідомлення.

## Приклади

Для тестування розгорніть сервер і перейдіть за адресою `http://localhost:3000/`, де ви зможете ініціювати процес аутентифікації.

---

Сподіваюсь, це допоможе! Якщо потрібно щось конкретніше або детальніше, дай знати!