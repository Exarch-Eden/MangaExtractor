const express = require("express");
const http = require("http");
const CODES = require("./constants/statusCodes").CODES;
const ENDPOINTS = require("./constants/endpoints").ENDPOINTS;
const WEBSITES = require("./constants/websites").WEBSITES;

// REST API
const restLatest = require("./rest/latest");
const restTitle = require("./rest/title");
const restSearch = require("./rest/search");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// base url for target website
const BASE_URL = "https://mangakakalot.com/";
// const BASE_URL = "https://nhentai.net/";
//
const INDIV_TITLE_SUFFIX = "g/";
//
const SEARCH_SUFFIX = "search/";

app.get(ENDPOINTS.default, (req, res) => {
  console.log(`Accessed endpoint ${ENDPOINTS.default}`);
  res.send(`Accessed endpoint ${ENDPOINTS.default}`);
});

// "/latest"
/**
 * Fetches title, cover, and id of the latest doujinshi releases
 * in the home page of the target website.
 */
app.get(ENDPOINTS.latest, async (req, res) => {
  const latestUrl = "manga_list?type=latest&category=all&state=all";
  // numRequests++;

  // if (numRequests > 2) {
  //   return;
  // }

  const page = req.query.page;

  // for testing purposes
  console.log("page number: ", page);

  let targetUrl = BASE_URL + latestUrl;

  // if page was specified, add it to target url
  page ? (targetUrl += `&page=${page}`) : (targetUrl += `&page=1`);

  try {
    await restLatest.getLatest(res, targetUrl);
  } catch (error) {
    console.error(error);
  }
});

// "/title"
/**
 * Fetches data of an id-specific doujinshi.
 */
app.get(ENDPOINTS.title, async (req, res) => {
  // id of specific doujinshi
  const website = req.query.website;
  const id = req.query.id;

  // for testing purposes
  console.log("id: ", id);
  console.log("website: ", website);

  if (!id) {
    res.send(unspecifiedQueryParamLog("Id")).status(CODES[400]);
    return;
  }

  if (!website) {
    res.send(unspecifiedQueryParamLog("Website")).status(CODES[400]);
    return;
  }

  let targetUrl = `https://`;

  switch (website) {
    case WEBSITES.readmanganato:
      targetUrl += `${website}.com/manga-${id}`;
      break;
    case WEBSITES.mangakakalot:
      targetUrl += `${website}.com/manga/${id}`;
      break;
    default:
      res.send("Website query parameter has invalid value").status(CODES[400]);
      return;
  }

  try {
    await restTitle.getTitle(res, targetUrl);
  } catch (error) {
    console.error(error);
  }
});

app.get(ENDPOINTS.search, async (req, res) => {
  // TODO: add query parameter for page number
  // if page number parameter is defined,
  // append the value to the targetUrl:
  // &page={value}

  // used for replacing whitespace characters with +
  // const searchInputRegex = /\s/g;

  const searchPreCheck = req.query.search;
  const page = req.query.page;

  // for testing purposes
  console.log("search input: ", searchPreCheck);

  // check to see if search input is defined
  // return error 400 if not
  if (!searchPreCheck) {
    res.send(unspecifiedQueryParamLog("Search")).status(CODES[400]);
  }

  // DEEMED UNNECESSARY as client is required to do that in order to
  // successfully insert the entire search input as a query parameter

  // after confirming search input is indeed a string,
  // replace any whitespace characters with +
  // const searchPostCheck = searchPreCheck.replace(searchInputRegex, "+");

  let targetUrl = `${BASE_URL}${SEARCH_SUFFIX}?q=${searchPreCheck}`;

  if (page) {
    targetUrl += `&page=${page}`;
  }

  // for testing purposes
  console.log("targetUrl: ", targetUrl);
  // res.send(targetUrl);

  try {
    await restSearch.getSearch(res, targetUrl);
  } catch (error) {
    console.error(error);
  }

  // for testing purposes
  // console.log("end of search get request");
});

const unspecifiedQueryParamLog = (queryParam) => {
  return `${queryParam} query parameter was not specified`;
};

http.createServer(app).listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
