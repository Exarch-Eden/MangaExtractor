// third-party libraries
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// components
import TitleInfo from "../components/TitleInfo";
import CardLayout from "../components/CardLayout";

// css
import "../styles/IndividualTitle.css";
import "../styles/Universal.css";

// local constants
import { SERVER_TITLE_URL } from "../constants/serverURLS";

// types
import { Book, SessionData } from "../types/manga";
import ChapterList from "../components/ChapterList";

type IndividualTitleRouteParams = {
  website: string;
  id: string;
  linkFormat: string;
};

const blankTitleData = {
  id: "-1",
};

const IndividualTitle = () => {
  const [titleData, setTitleData] = useState<Book>(blankTitleData);
  const [linkPath, setLinkPath] = useState("");

  // holds the id parameter passed through react-router
  const { website, id, linkFormat }: IndividualTitleRouteParams = useParams();

  // for testing purposes
  console.log("website: ", website);
  console.log("id: ", id);
  console.log("linkFormat: ", linkFormat);

  // extract data of id-specified doujinshi
  useEffect(() => {
    // target url without the link format query parameter
    // for readmanganato sources
    const noLinkFormat = `${SERVER_TITLE_URL}?website=${website}&id=${id}`;

    // appends the necessary query parameters to the target url
    // for mangakakalot sources
    const targetUrl = linkFormat
      ? `${noLinkFormat}&linkFormat=${linkFormat}`
      : noLinkFormat;

    (async () => {
      try {
        // request server to fetch data
        const res = await fetch(targetUrl);
        const data = await res.json();

        console.log("retrieved title data:");
        console.table(data);

        setTitleData({
          id: id,
          overviewPageLink: website,
          ...data,
        });

        // OLD CODE
        // const sessionData: SessionData = {
        //   id: id,
        //   pages: data.pages,
        // };

        setLinkPath(`/chapter/${website}/${id}/`);
        
        // // store page urls in session storage
        // window.sessionStorage.setItem("pages", JSON.stringify(sessionData));
      } catch (error) {
        console.log(
          "Error occurred while attempting to fetch data from server"
        );

        console.log(error);
      }
    })();
  }, [website, id]);

  return (
    <div className="individualTitleContainer">
      <div className="titleContainer verticalPadding">
        <p>Individual Title Page</p>
      </div>
      <div className="contentContainer verticalPadding">
        <p>Id retrieved: {id}</p>
        <div className="infoContainer verticalPadding">
          <TitleInfo {...titleData} />
        </div>
        <ChapterList
          chapters={titleData.chapters || []}
          linkPath={linkPath}
          linkFormat={titleData.linkFormat}
        />
        {/* <div className="pagesContainer verticalPadding">
          <CardLayout results={titleData.thumbnails || []} id={id} />
        </div> */}
      </div>
    </div>
  );
};

export default IndividualTitle;
