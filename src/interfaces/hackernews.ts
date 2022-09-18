// note do not import this file in index, names in interfaces are not fully decoupled

export enum MatchLevel {
  Full = "full",
  None = "none",
}

export enum Query {
  Nodejs = "nodejs",
}

export interface HackerNewsResponse {
  hits: Hit[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  exhaustive: Exhaustive;
  query: Query | string; // FIXME enum
  params: string;
  processingTimeMS: number;
  processingTimingsMS: ProcessingTimingsMS;
}

export interface Exhaustive {
  nbHits: boolean;
  typo: boolean;
}

export interface Hit {
  created_at: string;
  title: null | string;
  url: null | string;
  author: string;
  points: number | null;
  story_text: null | string;
  comment_text: null | string;
  num_comments: number | null;
  story_id: number | null;
  story_title: null | string;
  story_url: null | string;
  parent_id: number | null;
  created_at_i: number;
  _tags: string[];
  objectID: string;
  _highlightResult: HighlightResult;
}

export interface HighlightResult {
  author: Author;
  comment_text?: Author;
  story_title?: Author;
  story_url?: Author;
  title?: Author;
  url?: Author;
}

export interface Author {
  value: string;
  matchLevel: MatchLevel | string; // FIXME enum
  matchedWords: Query[] | string[]; // FIXME enum
  fullyHighlighted?: boolean;
}

export interface ProcessingTimingsMS {
  afterFetch: AfterFetch;
  fetch: Fetch;
  total: number;
}

export interface AfterFetch {
  format: Format;
  total: number;
}

export interface Format {
  highlighting: number;
  total: number;
}

export interface Fetch {
  scanning: number;
  total: number;
}
