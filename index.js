const cheerio = require("cheerio");
const rp = require("request-promise");
var fs = require("fs");
const prompt = require("prompt-sync")();

const name = prompt("Enter link here!");

// const reqLink = `https://simple.wikipedia.org/wiki/List_of_presidents_of_the_United_States`;

const reqLink = `${name}`;

rp(reqLink)
  .then(function (html) {
    // Process html...
    // console.log(html);
    const $ = cheerio.load(html);
    // console.log($);
    const title = $(".wikitable td b a");
    const wiki = [];

    for (let i = 0; i < title.length; i++) {
      const Name = title[i].attribs.title;
      const Link = title[i].attribs.href;
      wiki.push({ Name, Link });
    }
    // console.log(wiki);
    fs.writeFile("output.json", JSON.stringify(wiki), function (err) {
      console.log(
        "Sraping data successfully written! - Check your project public/output.json file"
      );
    });
  })
  .then((res) => console.log(res))
  .catch(function (err) {
    // Crawling failed...
    console.log(err);
  });
