export interface Book {
  id: string;
  title?: string;
  cover?: string;
  overviewPageLink?: string;
  artist?: string;
  latestChapter?: string;
  chapters?: Chapters;
  pages?: Pages;
  thumbnails?: Pages;
  linkFormat?: string;
}

export type Chapters = Chapter[];

export type Chapter = {
  chapterNum: string;
  linkSuffix: string;
  chapterLink: string;
  pages?: Pages;
}

export type Pages = string[];

export interface SessionData {
  id: string;
  pages: Pages;
}
