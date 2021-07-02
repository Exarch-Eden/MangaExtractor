const cheerio = require("cheerio");
const fetch = require("node-fetch");
const CODES = require("../constants/statusCodes").CODES;
const WEBSITES = require("../constants/websites").WEBSITES;
const WEBSITE_SPECIFIC_TAGS =
  require("../constants/websites").WEBSITE_SPECIFIC_TAGS;

// removes any special characters (such as brackets or square brackets)
const specialCharRegex = /\(|\)|\[|\]/g;

// regex for extracting full-sized images from thumbnail src value
const fullSizeFirstTRegex = /t\.nhentai\.net/g;
const fullSizeLastTRegex = /\/[0-9]+t/g;
// old code
// const fullSizeLastTRegex = /\/[0-9]t/g;

// regex for extracting the last bit of the link used to access
// a specific chapter
const linkSuffixRegex = /(?<=\/)[\w\-_]+$/;

const imgTag = "img";

exports.getTitle = async (res, targetUrl) => {
  // holds the data extracted from the website
  // data is relevant to an id-specified doujinshi
  const bookData = {};

  // for testing purposes
  console.log("targetUrl: ", targetUrl);

  // website selector
  // determines which set of element tags and DOM paths to use
  let selectedWebsite = "";
  let websiteTags = {};

  for (const key in WEBSITES) {
    const curWebsite = WEBSITES[key];
    if (targetUrl.match(curWebsite)) {
      selectedWebsite = curWebsite;
      websiteTags = WEBSITE_SPECIFIC_TAGS[curWebsite];
      break;
    }
  }

  // OLD CODE
  // WEBSITES.forEach((website) => {

  // });

  // for testing purposes
  console.log("selectedWebsite: ", selectedWebsite);
  // console.log("websiteTags: ");
  // console.log(websiteTags);
  console.log("\n");

  try {
    console.log("fetching individual title data...");
    const fetchRes = await fetch(targetUrl);
    const html = await fetchRes.text();

    // for testing purposes
    // console.log("res text: \n", resHtml);
    // console.log("html: \n", html);

    const $ = cheerio.load(html);

    // extract cover image
    bookData.cover = $(websiteTags.coverTag).attr("src");

    // extract other relevant data about the doujinshi
    bookData.artist = $(websiteTags.artistTag).text();
    bookData.title = $(websiteTags.titleTag).text();

    // initialize page thumbnail images url array for bookData object
    bookData.thumbnails = [];

    bookData.pages = [];

    bookData.chapters = [];

    // extract the chapters
    $(websiteTags.chapterRowTag).each((index, element) => {
      const chapterNum = $(element).find(websiteTags.chapterNumTag).text();
      const chapterHref = $(element).find(websiteTags.chapterNumTag).attr("href");
      const linkSuffix = chapterHref.match(linkSuffixRegex)[0];
      console.log("linkSuffix: ", linkSuffix);

      bookData.chapters.push({ chapterNum, linkSuffix });
    });

    // reverse chapters[] in bookData so that it is numerically sorted
    // NOTE: maybe do this in client instead

    console.log("successfully fetched individual title data");
    console.log("bookData:");
    console.log(bookData);
  } catch (error) {
    console.log("---------------ERROR--------------\n");
    console.log(error);
    console.log("\n");
    res
      .send("Error occurred while fetching individual title data")
      .status(CODES[500]);
  }


  res.send(bookData);
};

// OLD CODE
// // element container for the cover image
// const coverTag = "#bigcontainer > #cover > a > img";

// // element container for the title, id, artist, and tags of the doujinshi
// const infoBlockTag = "#bigcontainer > #info-block > #info";
// const artistTag = `${infoBlockTag} > h1.title > .before`;
// const titleTag = `${infoBlockTag} > h1.title > .pretty`;
// // element containing info regarding the parody, language, and translator
// const othersTag = `${infoBlockTag} > h1.title > .after`;

// // element container for the page images
// const pageTag = "#thumbnail-container > .thumbs > .thumb-container > a";
