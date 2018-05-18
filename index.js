"use strict";

const LINE_LOGIN_CHANNEL_ID=1581612706;
const LINE_LOGIN_CHANNEL_SECRET=ca9a8fdaa2e65203b3685c37277ac5c8;
const LINE_LOGIN_CALLBACK_URL="https://line-login-by-gique.herokuapp.com/callback";

const app = require('express')();
const line_login = require("line-login");
const session = require("express-session");
const session_options = {
    secret: process.env.LINE_LOGIN_CHANNEL_SECRET,
    resave: false,
    saveUninitialized: false
}
app.use(session(session_options));

const login = new line_login({
    channel_id: process.env.LINE_LOGIN_CHANNEL_ID,
    channel_secret: process.env.LINE_LOGIN_CHANNEL_SECRET,
    callback_url: process.env.LINE_LOGIN_CALLBACK_URL,
    scope: "openid profile",
    prompt: "consent",
    bot_prompt: "normal"
});
 
app.listen(process.env.PORT || 5000, () => {
    console.log(`server is listening to ${process.env.PORT || 5000}...`);
});
 
app.use("/", login.auth());
 
// Specify the path you want to wait for the callback from LINE authorization endpoint.
app.use("/callback", login.callback(
    (req, res, next, token_response) => {
        // Success callback
        console.log("Success");
        res.send('GET request to the homepage')
        //res.json(token_response);
    },
    (req, res, next, error) => {
        // Failure callback
        res.status(400).json(error);
    }
));


/*
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
*/

