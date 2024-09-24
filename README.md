# ouath-yurba
Example ouath with Yurba.one ( node.js )

<a href="/docs/uk.md">Українською</a>

---

# Project Documentation

Example implementation of user authentication via OAuth using the Yurba social network API.

## Usage

### Requirements

- Node.js
- npm

### Setup

1. Copy the file `.env.example` to `.env` and fill it with the following values:

   ```plaintext
   PORT=3000
   REDIRECT_URL=http://localhost:3000/redirect
   PUBLIC_KEY=your_public_key
   SECRET=your_secret
   YURBA_TOKEN=your_yurba_token
   SESSION_SECRET=your_session_secret
   ```

2. Install the required packages:

   ```bash
   npm run run
   ```

   #### Or

   ```bash
   npm install dotenv express express-session axios 
   ```

3. Start the server:

   ```bash
   npm run run   
   ```
   
   #### Or

   ```bash
   node index.js 
   ```

### Endpoints

- `GET /`: The main page, which contains a link to initiate authentication.
  
- `GET /oauth`: Redirects the user to the Yurba authentication page. Constructs the URL using `PUBLIC_KEY` and `REDIRECT_URL`.

- `GET /redirect`: Handles the redirect after successful authentication. Receives the user's token and requests user information from the Yurba API. Stores user information in the session.

### Logging

The entire process logs actions to the console with the date and time specified. A `log(message)` function is used to format the output.

### Sending Messages

The `postDialogMessage(token, dialogId, text)` function allows sending messages to Yurba private dialogs. It accepts a token, a dialog identifier, and the message text.

## Examples

To test, start the server and go to `http://localhost:3000/`, where you can initiate the authentication process.

---

I hope this helps! If you need anything more specific or detailed, just let me know!