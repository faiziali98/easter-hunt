var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const paragraph = "Whats the answer to unlock door 2?";
  res.render('index', { paragraph, hiddenData: "2" });
});

module.exports = router;
