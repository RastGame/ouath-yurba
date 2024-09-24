require('dotenv').config();
const express = require('express');
const session = require('express-session');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Need to get the token and information from the token
const publicKey = process.env.PUBLIC_KEY;
const redirectUrl = process.env.REDIRECT_URL;
const secret = process.env.SECRET;

// Need to send a message when everything is completed (optional)
const yurbaToken = process.env.YURBA_TOKEN;

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

// Logging function (for convenience)
const log = (message) => {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(' ')[0];
    console.log(`[${date} || ${time}] ${message}`);
};

// Main page
app.get('/', (req, res) => {
    log('Main page');
    res.send(`<a href="/oauth"><h2>Oauth</h2></a>`); 
});

// Rendering the login form
app.get('/oauth', (req, res) => {
    log('Requesting authorization page. Redirecting to Yurba OAuth...');
    const redirectUrlFull = `https://yurba.one/oauth/?publicKey=${publicKey}&redirectUrl=${redirectUrl}`;
    log(`Redirect URL: ${redirectUrlFull}`);
    res.redirect(redirectUrlFull);
});

// After successful authorization, redirect to the profile page
app.get('/redirect', async (req, res) => {
    const { success, token } = req.query;

    log(`Redirecting after authorization: success=${success}, token=${token}`);

    if (success === '1' && token) {
        log(`Successful authorization. Token received: ${token}`);

        req.session.token = token; // store token in session
        log('Token stored in session.');

        try {
            log('Requesting user information from Yurba API...');
            const userInfoResponse = await axios.get(`https://api.yurba.one/apps/user/${token}`, {
                headers: { 'secret-key': secret }
            });

            const userInfo = userInfoResponse.data;
            const userId = userInfo.ID;
            req.session.userInfo = userInfo; // store user information in session

            log(`User information received: ` + userInfo);

            if (yurbaToken) {
                log('Creating a private dialog with the user...');

                const dialogResponse = await axios.post(`https://api.yurba.one/dialogs/private/${userId}`, {}, {
                    headers: { 'token': yurbaToken }
                });

                const dialog = dialogResponse.data;
                const dialogId = dialog.ID;

                log(`Private dialog created. Dialog ID: ${dialogId}`);
                log('Sending a message to the private dialog...');
                try {
                    await postDialogMessage(yurbaToken, dialogId, '**╭  Successfully :white_check_mark:**\n・Login was made from this account\n**╰  ' + token + ' **');
                } catch (error) {
                    log(`Error when trying to send a message: ` + error)
                }
            } else {
                log(`No token, ignoring message`)
            }

            res.send(`User info: \n ${JSON.stringify(userInfo, null, 2)} \n Token: ${token}`);


        } catch (error) {
            log(`Error when requesting Yurba API: ${error.message}`);
            res.send('<h2>Error processing the request.</h2>');
        }
    } else {
        log('Authorization error. Success parameter is not equal to 1 or token is missing.');
        res.send('<h2>Login error. Please try again.</h2>');
    }
});

// Function to send a message to the dialog
async function postDialogMessage(token, dialogId, text) {
    try {
        log(`Sending message to dialog (ID=${dialogId}). Message text: "${text}"`);

        const response = await axios.post(`https://api.yurba.one/dialogs/${dialogId}/messages`, {
            text,
            photos_list: [],
            replyTo: 0,
            edit: 0,
            attachments: []
        }, {
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        });

        log(`Message sent successfully. Server response: ${JSON.stringify(response.data)}`);
        return response.data;

    } catch (error) {
        log(`Error sending message to dialog (ID=${dialogId}): ${error.message}`);
        if (error.response) {
            log(`API response on error: ${JSON.stringify(error.response.data)}`);
        }
    }
}

// Starting the server
app.listen(PORT, () => {
    log(`Server started at http://localhost:${PORT}`);
});

