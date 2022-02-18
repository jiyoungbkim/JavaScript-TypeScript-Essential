import { NewsFeed, NewsStore } from "./types";

export default class Store implements NewsStore {
  private feeds: NewsFeed[];
  private _currentPage: number;
  private lastPage: number;

  constructor() {
    this.feeds = [];
    this._currentPage = 1;
    this.lastPage = 1;
  }

  get currentPage() {
    return this._currentPage;
  }

  set currentPage(page: number) {
    // if(page <= 0) return;
    this._currentPage = page;
  }

  get nextPage(): number {
    return this._currentPage + 1;
  }

  get prevPage(): number {
    return this._currentPage > 1 ? this._currentPage - 1 : 1;
  }

  get numberOfFeed(): number {
    return this.feeds.length;
  }

  get hasFeeds(): boolean {
    return this.feeds.length > 0;
  }

  // 전체 피드를 내보내기
  getAllFeeds(): NewsFeed[] {
    return this.feeds;
  }
  // 피드 내에 특정한 위치에 있는 피드 하나를 꺼내오는 것
  getFeed(position: number): NewsFeed {
    return this.feeds[position];
  }
  // 피드 전체의 데이터를 api에서 당겨오면서 read 속성을 추가해서 값을 세팅
  setFeeds(feeds: NewsFeed[]): void {
    this.feeds.map((feed) => ({ ...feed, read: false }));
  }
  // 상세 페이지 읽음 표시
  makeRead(id: number): void {
    const feed = this.feeds.find((feed: NewsFeed) => feed.id === id);

    if (feed) {
      feed.read = true;
    }
  }
}
