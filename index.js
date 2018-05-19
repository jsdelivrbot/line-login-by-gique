"use strict";

const path = require('path');
const bodyParser = require("body-parser");
const dotenv = require('dotenv').config();
const express = require("express");
const app = express();
const request = require('request');
const https = require('https');
const http = require('http');
const line_login = require("line-login");
const session = require("express-session");
const session_options = {
    secret: process.env.LINE_LOGIN_CHANNEL_SECRET,
    resave: false,
    saveUninitialized: false
}

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

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
 
app.use("/login", login.auth());
app.use("/callback", login.callback(
    (req, res, next, token_response) => {
        https.get('https://todo-list-by-gique.herokuapp.com/todolist/v1/list?line_id='+ token_response.id_token.sub, (resp) => {
            let todo = '';
            resp.on('data', (chunk) => {
                todo = JSON.parse(chunk);
                console.log("Status code: " +todo.status.code);
                console.log("Status message: " + todo.status.message);
            });
            resp.on('end', () => {
                res.render("index", { todo: todo.data, user_name: token_response.id_token.name, profile_pic: token_response.id_token.picture});
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    },
    (req, res, next, error) => {
        res.status(400).json(error);
    }
));

app.post('/edit', function (req, res) {
    console.log(req.body);

    var options = { 
        method: 'PUT',
        url: 'https://todo-list-by-gique.herokuapp.com:443/todolist/v1/edit',
        headers: { 'cache-control': 'no-cache', 'content-type': 'application/json' }, 
        body: req.body, json: true 
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        
        console.log(body.data);
        res.render("index", { todo: body.data, user_name: "", profile_pic: ""});
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    })
});

app.get("/", function(req, res) {
    https.get('https://todo-list-by-gique.herokuapp.com/todolist/v1/list?line_id=xxx', (resp) => {
        let todo = '';
        resp.on('data', (chunk) => {
            todo = JSON.parse(chunk);
            console.log("Status code: " +todo.status.code);
            console.log("Status message: " + todo.status.message);
        });
        resp.on('end', () => {
            res.render("index", { todo: todo.data});
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
});