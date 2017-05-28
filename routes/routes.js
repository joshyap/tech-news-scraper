var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");

router.get("/", function(req,res) {
  res.render("index");
});


module.exports = router;
