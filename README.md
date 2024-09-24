# ouath-yurba
Example ouath with Yurba.one ( node.js )

<a href="/docs/uk.md">Українська</a> | <a href="/docs/pl.md">Polski</a> 

---

# Documentation
Example of implementing user authentication via OAuth using the Yurba social network API.
<a href="https://me.yurba.one/RastGame" target="_blank">Yurba</a> || <a href="https://github.com/RastGame" target="_blank">Github</a>
## Usage

### Requirements

- Node.js
- npm

### Setup 

1. Clone the project:

   ```bash
   git clone https://github.com/RastGame/ouath-yurba.git
   ```

2. Copy the `.env.example` file to `.env` and fill it with the values:

### <a href="https://yurba.one/settings/?page=developer" target="_blank">Public Key & Secret</a> 
### <a href="https://docs.yurba.one/login" target="_blank">Token</a> 

   ```plaintext
   PORT=3000
   REDIRECT_URL=http://localhost:3000/redirect
   PUBLIC_KEY=your_public_key
   SECRET=your_secret
   YURBA_TOKEN=your_yurba_token
   SESSION_SECRET=your_session_secret
   ```

3. Install the required packages and start the server:

   ```bash
   npm run run
   ```

   #### Or

   ```bash
   npm install dotenv express express-session axios 
   ```
   ```bash
   node index.js 
   ```

### Endpoints

- `GET /`: The homepage, which contains a link to initiate authentication.
  
- `GET /oauth`: Redirects the user to the Yurba authentication page. Forms the URL using `PUBLIC_KEY` and `REDIRECT_URL`.

- `GET /redirect`: Handles the redirect after successful authentication. Retrieves the user's token and requests user information from the Yurba API. Stores user information in the session.

### Logging

The entire process logs actions to the console with timestamps. It uses the `log(message)` function, which formats the output.

### Sending Messages

The function `postDialogMessage(token, dialogId, text)` allows sending messages in private Yurba dialogs. It accepts a token, dialog ID, and message text.

## Examples

To test, deploy the server and navigate to `http://localhost:3000/`, where you can initiate the authentication process.

---

I hope this helps! If you need anything more specific or detailed, let me know!

<a href="https://me.yurba.one/RastGame" target="_blank">Yurba</a> || <a href="https://github.com/RastGame" target="_blank">Github</a>