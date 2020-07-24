const express = require('express');
const app = express();
const Chuck = require('chucknorris-io');
const client = new Chuck();
const hbs = require('hbs');
const path = require('path');
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/', (request, response, next) => {
  client
    .getRandomJoke()
    .then(joke => {
      response.render('home', { joke });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/categories', (request, response, next) => {
  client
    .getJokeCategories()
    .then(jokeCategories => {
      response.render('categories', { jokeCategories });
    })
    .catch(error => {
      console.log(error);
    });
});

app.post('/search', (request, response, next) => {
  const keyword = request.body.term;
  client
    .search(keyword)
    .then(joke => {
      console.log(joke);
      response.render('search', { joke });
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get('/categories/:category', (request, response, next) => {
  const category = request.params.category;
  client
    .getRandomJoke(category)
    .then(joke => {
      response.render('joke-by-category', { joke });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/search', (request, response, next) => {
  response.render('search');
});
app.listen(3000);
