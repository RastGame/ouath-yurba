Ось переклад польською:

---

# Dokumentacja
Przykład implementacji uwierzytelniania użytkownika przez OAuth przy użyciu API sieci społecznościowej Yurba.
<a href="https://me.yurba.one/RastGame" target="_blank">Yurba</a> || <a href="https://github.com/RastGame" target="_blank">Github</a>
## Użycie

### Wymagania

- Node.js
- npm

### Konfiguracja

1. Sklonuj projekt:

   ```bash
   git clone https://github.com/RastGame/ouath-yurba.git
   ```

2. Skopiuj plik `.env.example` do `.env` i uzupełnij go:

### <a href="https://yurba.one/settings/?page=developer" target="_blank">Klucz publiczny i sekret</a> 
### <a href="https://yurba.one/settings/?page=developer" target="_blank">Token</a> 

   ```plaintext
   PORT=3000
   REDIRECT_URL=http://localhost:3000/redirect
   PUBLIC_KEY=your_public_key
   SECRET=your_secret
   YURBA_TOKEN=your_yurba_token
   SESSION_SECRET=your_session_secret
   ```

3. Zainstaluj wymagane pakiety i uruchom serwer:

   ```bash
   npm run run
   ```

   #### Lub

   ```bash
   npm install dotenv express express-session axios 
   ```
   ```bash
   node index.js 
   ```

### Endpointy

- `GET /`: Strona główna, która zawiera link do rozpoczęcia procesu uwierzytelniania.
  
- `GET /oauth`: Przekierowuje użytkownika na stronę uwierzytelniania Yurba. Tworzy URL przy użyciu `PUBLIC_KEY` i `REDIRECT_URL`.

- `GET /redirect`: Obsługuje przekierowanie po pomyślnym uwierzytelnieniu. Odbiera token użytkownika i żąda informacji o nim z API Yurba. Przechowuje informacje o użytkowniku w sesji.

### Logowanie

Cały proces loguje działania do konsoli z oznaczeniem daty i godziny. Używa funkcji `log(message)`, która formatuje wyjście.

### Wysyłanie wiadomości

Funkcja `postDialogMessage(token, dialogId, text)` umożliwia wysyłanie wiadomości w prywatnych dialogach Yurba. Przyjmuje token, identyfikator dialogu oraz tekst wiadomości.
 
## Przykłady

Aby przetestować, uruchom serwer i przejdź pod adres `http://localhost:3000/`, gdzie możesz zainicjować proces uwierzytelniania.

---

Mam nadzieję, że to pomoże! Jeśli potrzebujesz czegoś bardziej konkretnego lub szczegółowego, daj znać!