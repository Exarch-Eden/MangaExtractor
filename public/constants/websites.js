/**
 * Map of domains accessible to client.
 */
const WEBSITES = {
  // ---
  // To be removed in a future update
  readmanganato: "readmanganato",
  mangakakalot: "mangakakalot",
  // ---
  mangadex: "mangadex",
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
  [WEBSITES.mangadex]: {
    /* using ids and class names (replacing div tag with respective names):
     *
     * body > #__nuxt > #__layout > .v-application > .v-application--wrap
     * > d-flex
     *
     * possible children elements from here on out:
     * 1. navbar
     * 2. main content parent container
     *
     * last updated: 6th of July, 2021
     */
    mainContainer: "body > div > div > div > div > div",
  },
};

/**
 * Holds the DOM paths for containers holding many elements of the same
 * nature. The string values are separated by their method type
 * (e.g. latest, search, title) first
 * and then their website domain name (e.g. mangadex) second.
 *
 * For example, a parent container holding the list of child containers,
 * each one having key information regarding a manga title.
 */
const WEBSITE_MAIN_SPECIFIC_TAGS = {
  latestMainContainers: {
    [WEBSITES.mangadex]: `${WEBSITE_MAIN_TAGS.mangadex.mainContainer}
     > div:nth-child(2) > div:nth-child(2) > div.container > div:nth-child(2)
     > div > div`,
  },
  searchMainContainers: {},
  titleMainContainers: {},
  chapterMainContainers: {},
};

/**
 * Holds the DOM paths for containers and individual elements
 * of various websites for latest updated manga title extraction.
 *
 * The website link this extracts from: https://mangadex.org/titles/latest
 */
const WEBSITE_LATEST_TAGS = {
  [WEBSITES.mangadex]: {
    /**
     * The individual containers from the content list that directly hold key data
     * of an individual manga title.
     */
    individualContainer: `${WEBSITE_MAIN_SPECIFIC_TAGS.latestMainContainers.mangadex} > div.pb-2`,
    /**
     * Tag for the three latest chapters of the individual manga title.
     */
    individualLatestChapter: `div.py-1`,
    /**
     * The parent sub-element within the individual container that holds data
     * such as the manga title and author.
     */
    mainInfoParent: `div:first-child`,
    mainInfoCover: `a`,
    mainInfoTitle: `h4 > a`,
  },
};

/**
 * WARNING: TO BE REMOVED AT A FUTURE UPDATE
 *
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
    artistTag: ".manga-info-text > li:nth-child(2) > a",
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
exports.WEBSITE_MAIN_SPECIFIC_TAGS = WEBSITE_MAIN_SPECIFIC_TAGS;
exports.WEBSITE_LATEST_TAGS = WEBSITE_LATEST_TAGS;
exports.WEBSITE_SPECIFIC_TAGS = WEBSITE_SPECIFIC_TAGS;
