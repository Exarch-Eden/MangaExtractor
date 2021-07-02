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

const ChapterList: React.FC<ChapterListProps> = ({ chapters, linkPath, linkFormat }) => {
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
          const chapterLinkPath = `${linkPath}${chapter.linkSuffix}${linkFormat ? `/${linkFormat}` : ""}`;
          console.log(chapterLinkPath);
          return (
            <li key={index} className="chapterListItem">
              <Link to={chapterLinkPath}>{chapter.chapterNum}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChapterList;
