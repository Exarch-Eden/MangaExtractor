const cheerio = require("cheerio");
const fetch = require("node-fetch");
const CODES = require("../constants/statusCodes").CODES;

// removes the backslashes and g characters from the href attribute of
// a element
const idRegex = /\/|g/g;
// for extraction of max page value from href
// which is located at the very end of the string
const maxPageValueRegex = /[0-9]+/g;

// ([a-z]+\d+)(?=\w)
// ([a-z]+\d+)$

// for extracting the manga id
const mangaIdRegex = /([a-z]+\d+)$/;
// for removal of https:// and .com/ from the manga overview page link
const mangaPageLinkSeparatorRegex = /(?<=https:\/\/)(.*)(?=\.com\/)/g;
// const mangaPageLinkSeparatorRegex = /((\.com\/([a-z-]+\d+))|(https:\/\/))/g;
// const mangaPageLinkSeparatorRegex = /((\.com\/)|(https:\/\/))/g;

// FOR MANGAKAKALOT SOURCES

// div container holding all the page images (including cover image)
const pagesContainerTag = "body > .container-chapter-reader";
// div container holding the individual page images (excluding the cover image)
const indivPageTag = `${pagesContainerTag} > img`;

// OLD CODE
// // image elements holding all page images
// const pageImageTag = "img";
// // image element holding the cover (does not have a div container)
// const coverImageTag = `${pagesContainerTag} > ${pageImageTag}`;

exports.getChapter = async (res, targetUrl) => {
  // holds the page images of the specified chapter
  // including the cover image
  const pages = [];

  try {
    console.log("fetching chapter data...");
    const fetchRes = await fetch(targetUrl);
    const html = await fetchRes.text();

    const $ = cheerio.load(html);

    // OLD CODE:
    // this code is redundant
    // as all page images are just image elements under the main container
    // // get cover page
    // const coverUrl = $(coverImageTag).attr("src");
    // pages.push(coverUrl);

    // get the rest of the pages
    $(indivPageTag).each((index, element) => {
      const pageUrl = $(element).attr("src");
      pages.push(pageUrl);
    });

    // for testing purposes
    console.log("successfully fetched latest data");
    console.log("pages[]:");
    console.log(pages);
    console.log("\n");
  } catch (error) {
    console.log("---------------ERROR--------------\n");
    console.log(error);
    console.log("----------------------------------\n");
    console.log("\n");
    res.status(CODES[500]).send("Error occurred while fetching data");
    return;
  }

  res.send(pages);
};
