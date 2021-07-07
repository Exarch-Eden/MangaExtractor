// third-party libraries
import React, { FC, useCallback, useEffect, useState } from "react";

// components
import CardLayout from "../components/CardLayout";
import PageNumbersLocal from "../components/Pagination/PageNumbersLocal";

// css
import "../styles/Home.css";
import "../styles/Universal.css";

// interfaces
import { Book } from "../types/manga";

// local constants
import { SERVER_LATEST_URL } from "../constants/serverURLS";
import { DOMAINS } from "../constants/domains";

// const serverLatestUrl = "http://localhost:8000/latest";

type HomeRouteParams = {
  page?: string;
};

const fetchFailedMessage = "Failed to fetch data from server :(";

/**
 * Placeholder value for the max page number.
 * As of the 15th of June 2021, the max page number is 14274
 */
const maxPageNumberPlaceholder = 14274;

/**
 * Home screen component renders the latest updated manga titles
 * from certain websites.
 *
 * @returns The home screen component.
 */
const Home: FC = () => {
  // holds data regarding the latest releases
  const [latestData, setLatestData] = useState<Book[]>([]);
  // holds the maximum page number available for this specific title
  // used mainly for pagination
  const [maxPageNumber, setMaxPageNumber] = useState(1);
  // holds the current page number
  const [pageNumber, setPageNumber] = useState(1);

  /**
   * Handler for page number change. Is passed
   * to PageNumbersLocal component which triggers it
   * when the component is pressed.
   */
  const onPageNumChange = useCallback((newPageNumber: number) => {
    setPageNumber(newPageNumber);
  }, []);

  /**
   * Fetches manga data from the local server and updates
   * the latestData state as well as the extracted max page number.
   */
  const fetchData = useCallback(async () => {
    try {
      // overwrite previous data with newly-fetched data
      // const retrievedData = await fetchLatestData();
      const retrievedData = await fetchLatestData(pageNumber);
      if (retrievedData) {
        // for testing purposes
        console.table(retrievedData);
        setLatestData(retrievedData.bookTitles);
        // fetched max page number value may be undefined if it
        // is the last page
        if (retrievedData.maxPageNumber) {
          setMaxPageNumber(parseInt(retrievedData.maxPageNumber));
        }
      }
    } catch (error) {
      console.log(
        "Error occurred in outer trycatch block of fetchLatestData()"
      );

      console.error(error);
    }
  }, [pageNumber]);

  // extract data of latest doujinshi releases
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="homeContainer">
      <div className="titleContainer verticalPadding">
        <p>Home Page</p>
      </div>
      <div className="contentContainer verticalPadding">
        <div className="homeLatestContainer verticalPadding">
          <p>Latest Title Releases</p>
          <CardLayout results={latestData} />
          {latestData.length !== 0 ? null : (
            <p className="errorMessage">{fetchFailedMessage}</p>
          )}
        </div>
      </div>
      <PageNumbersLocal
        curPageNumber={pageNumber}
        maxPageNumber={maxPageNumber}
        onChange={onPageNumChange}
      />
    </div>
  );
};

/**
 * Fetches manga data from the local server and updates
 * the latestData state as well as the extracted max page number.
 *
 * @param pageNumber The targeted page number to be parsed and extracted
 * from in the targeted website.
 * @returns The fetched data from the local server. Could be undefined if
 * an error is encountered.
 */
const fetchLatestData = async (pageNumber: number) => {
  // local server endpoint to fetch
  let targetUrl = `${SERVER_LATEST_URL}?domain=${DOMAINS.mangakakalot}`;
  
  // if specified page number is greater than 1, append query parameter
  // otherwise, use default endpoint url
  if (pageNumber > 1) {
    targetUrl += `&page=${pageNumber}`;
  }

  // holds the return data object
  let returnData = undefined;

  try {
    // request server to fetch data
    const res = await fetch(targetUrl);
    const data = await res.json();

    // for testing purposes
    // console.log("data: ");
    // console.table(data);
    // console.log("maxPageNumber: ", parseInt(data.maxPageNumber));

    // overwrite previous data with newly-fetched data
    returnData = data;
  } catch (error) {
    console.log("Error occurred while attempting to fetch data from server");
    console.error(error);
  }

  return returnData;
};

export default Home;
