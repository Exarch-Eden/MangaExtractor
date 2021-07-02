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

// anchor container for the title, id, and cover
const mangaDivTag = `.container > .main-wrapper > .listCol > .truyen-list > .list-truyen-item-wrap`;
// holds the anchor element containing the manga id and cover image
const idTag = "a:first-child";
// holds the cover image
const imgTag = `${idTag} > img`;
// holds the title value and the manga overview page link
const captionTag = `h3 > a`;
// holds the latest updated chapter
const latestChapterTag = `h3 + a`;
// anchor for the last page pagination icon
const maxPageTag = ".panel_page_number > .group_page > .page_last";

// OLD CODE
// // anchor container for the title, id, and cover
// const mangaDivTag = `.main-wrapper > #contentstory > .doreamon > .itemupdate`;
// // holds the anchor element containing the manga id and cover image
// const aTag = "a";
// // holds the cover image
// const imgTag = `${aTag} > img`;
// // holds the title value
// const captionTag = `ul > li:first-child > h3 > a`;
// // anchor for the last page pagination icon
// const maxPageTag = ".pagination > .last";

exports.getChapter = async (res, targetUrl) => {
  // data object to be sent
  // holds the book titles and the max page number value
  const sendData = {};

  // holds the titles of doujinshis in the home page
  const bookTitles = [];

  try {
    console.log("fetching latest data...");
    const fetchRes = await fetch(targetUrl);
    const html = await fetchRes.text();

    // for testing purposes
    // console.log("res text: \n", resHtml);
    // console.log("html: \n", html);

    const $ = cheerio.load(html);

    $(mangaDivTag).each((index, element) => {
      const title = $(element).find(captionTag).text();
      const coverUrl = $(element).find(imgTag).attr("src");

      // the original manga overview page link
      const overviewPageLink = $(element).find(idTag).attr("href");

      // the manga overview page link without the id
      // example output: readmanganato
      const baseOverviewPageLink = overviewPageLink.match(
        mangaPageLinkSeparatorRegex
      )[0];

      // OLD CODE
      // const baseOverviewPageLink = overviewPageLink.split(mangaIdRegex)
      //   ? overviewPageLink
      //       .split(mangaIdRegex)[0]
      //       .replace(mangaPageLinkSeparatorRegex, "")
      //   : undefined;

      const matchedId = overviewPageLink.match(mangaIdRegex);
      const id = matchedId ? matchedId[0] : undefined;

      const latestChapter = $(element).find(latestChapterTag).text();

      // for testing purposes
      // console.log("manga info:");
      // console.log({
      //   id: id,
      //   title: title,
      //   coverUrl: coverUrl,
      // });

      if (!id) {
        throw Error("Could not grab manga ID");
      }

      bookTitles.push({
        id: id,
        title: title,
        cover: coverUrl,
        overviewPageLink: baseOverviewPageLink,
        latestChapter: latestChapter,
      });
    });

    // get the max page number
    const lastPageNumHref = $(maxPageTag).text().match(maxPageValueRegex);
    const maxPageNumber = lastPageNumHref ? lastPageNumHref[0] : undefined;

    // add final fetched data to send object
    sendData.bookTitles = bookTitles;
    sendData.maxPageNumber = maxPageNumber;

    // $(aTag).each((index, element) => {
    //   const title = $(element).find(captionTag).text();
    //   const coverUrl = $(element).find(imgTag).attr("data-src");

    //   // get the database id of the current book
    //   // cut off the first 3 characters, in this case it is "/g/"
    //   // since we only want the number
    //   const id = $(element).attr("href").replace(idRegex, "");

    //   bookTitles.push({
    //     id: id,
    //     title: title,
    //     cover: coverUrl,
    //   });
    // });

    // // the anchor href value
    // const lastPageNumHref = $(maxPageTag).attr("href");
    // // get the page number value only
    // const maxPageNumber = lastPageNumHref
    //   ? lastPageNumHref.match(maxPageValueRegex).join("")
    //   : undefined;

    // console.log("bookTitles:");
    // console.table(bookTitles);
    console.log("successfully fetched latest data");
  } catch (error) {
    console.log("---------------ERROR--------------\n");
    console.log(error);
    console.log("\n");
    console.log("----------------------------------\n");
    res.send("Error occurred while fetching data").status(CODES[500]);
    return;
  }

  res.send(sendData);
};
