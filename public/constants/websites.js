/**
 * Map of URIs accessible to client.
 */
const WEBSITES = {
  readmanganato: "readmanganato",
  mangakakalot: "mangakakalot",
};

/**
 * Holds the DOM paths for containers of various websites
 * which hold many key information regarding a manga.
 */
const WEBSITE_MAIN_TAGS = {
  [WEBSITES.readmanganato]: {
    mainContainer: ".body-site > .container-main > .container-main-left",
    mainContainerInfo:
      ".body-site > .container-main > .container-main-left > .panel-story-info",
  },
  [WEBSITES.mangakakalot]: {
    mainContainer: ".container > .main-wrapper > .leftCol",
    mainContainerInfo:
      ".container > .main-wrapper > .leftCol > .manga-info-top",
  },
};

/**
 * Holds website-specific DOM paths for individual elements holding
 * key information regarding a manga.
 */
const WEBSITE_SPECIFIC_TAGS = {
  // readmanganato.com
  [WEBSITES.readmanganato]: {
    // element container for the cover image
    coverTag: `${
      WEBSITE_MAIN_TAGS[WEBSITES.readmanganato].mainContainerInfo
    } > .story-info-left > .info-image > img`,
    // element container for the title, id, artist, and tags of the doujinshi
    infoBlockTag: `${
      WEBSITE_MAIN_TAGS[WEBSITES.readmanganato].mainContainerInfo
    } > .story-info-right`,
    // used by appending this tag to infoBlockTag
    artistTag:
      ".variations-tableInfo > tbody > tr:nth-child(2) > .table-value > a",
    // used by appending this tag to infoBlockTag
    titleTag: "h1",
    // element containing info regarding the parody, language, and translator
    // used by appending this tag to infoBlockTag
    othersTag: "",
    // individual list elements in chapterList
    chapterRowTag: `${
      WEBSITE_MAIN_TAGS[WEBSITES.readmanganato].mainContainer
    } > .panel-story-chapter-list > .row-content-chapter > li`,
    // the actual chapter number value from chapterRow
    // used by appending this tag to chapterRow
    chapterNumTag: "a",
    // element container for the page images
    pageTag: "",
    // thumbnail image src values
    imgTag: "",
  },
  // mangakakalot.com
  [WEBSITES.mangakakalot]: {
    // element container for the cover image
    coverTag: `${
      WEBSITE_MAIN_TAGS[WEBSITES.mangakakalot].mainContainerInfo
    } > .manga-info-pic > img`,
    // element container for the title, id, artist, and tags of the doujinshi
    infoBlockTag: `${
      WEBSITE_MAIN_TAGS[WEBSITES.mangakakalot].mainContainerInfo
    } > .manga-info-text`,
    // used by appending this tag to infoBlockTag
    artistTag:
      ".manga-info-text > li:nth-child(2) > a",
    // used by appending this tag to infoBlockTag
    titleTag: ".manga-info-text > li:first-child > h1",
    // element containing info regarding the parody, language, and translator
    // used by appending this tag to infoBlockTag
    othersTag: "",
    // individual list elements in chapterList
    chapterRowTag: `${
      WEBSITE_MAIN_TAGS[WEBSITES.mangakakalot].mainContainer
    } > .chapter > .manga-info-chapter > .chapter-list > .row`,
    // the actual chapter number value from chapterRow
    // used by appending this tag to chapterRow
    chapterNumTag: "span:first-child > a",
    // element container for the page images
    pageTag: "",
    // thumbnail image src values
    imgTag: "",
  },
};

// --------------------------------
// EXPORTS

exports.WEBSITES = WEBSITES;
exports.WEBSITE_MAIN_TAGS = WEBSITE_MAIN_TAGS;
exports.WEBSITE_SPECIFIC_TAGS = WEBSITE_SPECIFIC_TAGS;
