// third-party libraries
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// components

// css
import "../styles/Universal.css";
import "../styles/ChapterList.css";

// types
import { Chapter, Chapters } from "../types/manga";

// for ImagePage screen
interface ChapterListRouteParams {
  website: string;
  id: string;
  chapterNum: string;
}

interface ChapterListProps {
  chapters: Chapters;
  linkPath: string;
  linkFormat?: string;
}

const ChapterList: React.FC<ChapterListProps> = ({
  chapters,
  linkPath,
  linkFormat,
}) => {
  // useEffect(() => {
  //   console.log("chapters:");

  //   console.table(chapters);
  // }, [chapters])

  // for ImagePage screen
  // const { website, id, chapterNum }: ChapterListRouteParams = useParams();

  return (
    <div className="verticalPadding">
      <ul>
        {chapters.map((chapter: Chapter, index: number) => {
          const chapterLinkPath = `${linkPath}${chapter.linkSuffix}/1${
            linkFormat ? `/${linkFormat}` : ""
          }`;
          console.log(chapterLinkPath);
          return (
            <li
              key={index}
              className="chapterListItem"
              onClick={() => sessionStoreOnClick(chapter.chapterLink)}
            >
              <Link to={chapterLinkPath}>{chapter.chapterNum}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

/**
 * Store the specified chapter page link in session storage
 * which is to be retrieved when the ImaegPage screen is rendered.
 */
const sessionStoreOnClick = (chapterLink: string) => {
  console.log("storing chapterLink: ", chapterLink);
  
  // store chapter page link url in session storage (to be retrieved in ImagePage screen)
  window.sessionStorage.setItem("chapterLink", chapterLink);
};

export default ChapterList;
