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
}

type Chapters = Chapter[];

type Chapter = {
  number: number;
  pages?: Pages;
}

export type Pages = string[];

export interface SessionData {
  id: string;
  pages: Pages;
}
