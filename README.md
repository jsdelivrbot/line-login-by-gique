# LINE-LOGIN-BY-GIQUE
- Run on node.js app using [Express 4](http://expressjs.com/).
- Using: modules: line-login, https, request, express, ejs
- Using: bootstrap, modal, jquery 
- Deploy: Heroku
- Connect to: https://developers.line.me
- Using: Line message api BOT: https://developers.line.me/en/docs/messaging-api/building-bot/
- Using: Line login api: https://developers.line.me/en/docs/line-login/web/integrate-linelogin/

## Running Locally
Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ heroku git:clone -a line-login-by-gique
$ cd line-login-by-gique
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku
```
$ heroku create
$ git push heroku master
$ heroku open
```

## Change source code
```
$ heroku git:remote -a {heroku app name}
$ git add .
$ git commit -m "First commit"
$ git push heroku master
```

## Logs
```
$ heroku logs --tail
```