var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("get");
  console.log(req.query.url1)
  res.send('fdbserver_home');
});

/* POST home page. */
router.post('/', function(req, res, next) {

    console.log(req.body.url1)
    res.send('fdbserver_home');
});
module.exports = router;
