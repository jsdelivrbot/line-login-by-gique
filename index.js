"use strict";
 
const app = require('express')();
const line_login = require("line-login");
const session = require("express-session");
const session_options = {
    secret: "ca9a8fdaa2e65203b3685c37277ac5c8",
    resave: false,
    saveUninitialized: false
}
app.use(session(session_options));

const login = new line_login({
    channel_id: "1581612706",
    channel_secret: "ca9a8fdaa2e65203b3685c37277ac5c8",
    callback_url: "https://line-login-by-gique.herokuapp.com/callback",
    scope: "openid profile",
    prompt: "consent",
    bot_prompt: "normal"
});
 
app.listen(process.env.PORT || 5000, () => {
    console.log(`server is listening to ${process.env.PORT || 5000}...`);
});
 
// Specify the path you want to start authorization.
app.use("/", login.auth());
 
// Specify the path you want to wait for the callback from LINE authorization endpoint.
app.use("/callback", login.callback(
    (req, res, next, token_response) => {
        // Success callback
        res.json(token_response);
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

