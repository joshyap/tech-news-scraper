var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");

var Article = require("../models/Article.js");
var Comment = require("../models/Comment.js");

router.get("/", function(req,res) {
  Article.find({}, function(err, results){
    if(err)
      return res.send(err);
    res.render("index", {articles: results});
  });
});


router.get("/scrape", function(req, res){
  request("https://news.ycombinator.com/", function(err, response, html) {
    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(html);

    var result = [];

    $("a.storylink").each(function(i, element) {

      var link = $(element).attr("href");
      var title = $(element).text();

      result.push({
        title: title,
        link: link
      });
    });

console.log(result);

  });
res.redirect('/');
});

module.exports = router;
