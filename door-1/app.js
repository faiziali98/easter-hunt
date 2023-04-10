const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const axios = require('axios');
const qs = require('qs'); // import qs library to stringify form data

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Display the file upload form
app.use('/', indexRouter);

app.post('/submit', (req, res) => {
  const answer = req.body.input;
  var hiddenData = req.body.hidden_data;
  var paragraph =  `Whats the answer to unlock door ${hiddenData}?`;

  axios.post('https://test-faiziali98.vercel.app/answer', qs.stringify({ question: hiddenData, answer }), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(response => {
      var result = response.data;
      
      if (result !== "Wrong Answer") {
        hiddenData = parseInt(hiddenData) + 1;
        paragraph =  `Whats the answer to unlock door ${hiddenData}?`;
      }

      res.render('index', { paragraph, result, hiddenData });
    })
    
    .catch(error => {
      const message = error.message;
      res.render('index', { paragraph, result: message, hiddenData });
    });
});

module.exports = app;
