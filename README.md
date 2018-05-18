# LINE-LOGIN-BY-GIQUE
Run on node.js app using [Express 4](http://expressjs.com/).

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