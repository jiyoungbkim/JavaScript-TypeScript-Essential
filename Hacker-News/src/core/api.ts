import { NewsFeed, NewsDetail } from "../types";

export class Api {
  // ajax: XMLHttpRequest;
  xhr: XMLHttpRequest;
  url: string;

  constructor(url: string) {
    // this.ajax = new XMLHttpRequest();
    this.xhr = new XMLHttpRequest();
    this.url = url;
  }

  // 1
  // protected getRequest<AjaxResponse>(): AjaxResponse {
  //   this.ajax.open("GET", this.url, false);
  //   this.ajax.send();

  //   return JSON.parse(this.ajax.response);
  // }
  // 비동기
  protected getRequestWithXHR<AjaxResponse>(
    cb: (data: AjaxResponse) => void
  ): void {
    this.xhr.open("GET", this.url);
    this.xhr.addEventListener("load", () => {
      cb(JSON.parse(this.xhr.response) as AjaxResponse);
    });
    this.xhr.send();
  }
  // promise
  protected getRequestWithPromise<AjaxResponse>(
    cb: (data: AjaxResponse) => void
  ): void {
    fetch(this.url)
      .then((res) => res.json())
      .then(cb)
      .catch(() => {
        console.error("data를 불러오지 못했습니다.");
      });
  }
  // async / await
  async request<AjaxResponse>(): Promise<AjaxResponse> {
    const response = await fetch(this.url);
    return (await response.json()) as AjaxResponse;
  }
}

export class NewsFeedApi extends Api {
  constructor(url: string) {
    super(url);
  }

  // getData(): NewsFeed[] {
  //   return this.getRequest<NewsFeed[]>();
  getDataWithXHR(cb: (data: NewsFeed[]) => void): void {
    return this.getRequestWithXHR<NewsFeed[]>(cb);
  }
  getDataWithPromise(cb: (data: NewsFeed[]) => void): void {
    return this.getRequestWithPromise<NewsFeed[]>(cb);
  }
  // async / await
  async getData(): Promise<NewsFeed[]> {
    return this.request<NewsFeed[]>();
  }
}

export class NewsDetailApi extends Api {
  constructor(url: string) {
    super(url);
  }

  // getData(): NewsDetail {
  //   return this.getRequest<NewsDetail>();
  getDataWithXHR(cb: (data: NewsDetail) => void): void {
    return this.getRequestWithXHR<NewsDetail>(cb);
  }
  getDataWithPromise(cb: (data: NewsDetail) => void): void {
    return this.getRequestWithPromise<NewsDetail>(cb);
  }
  // async / await
  async getData(): Promise<NewsDetail> {
    return this.request<NewsDetail>();
  }
}
/* 믹스인 */
// function applyApiMixins(targetClass: any, baseClasses: any[]): void {
//   baseClasses.forEach((baseClass) => {
//     Object.getOwnPropertyNames(baseClass.prototype).forEach((name) => {
//       const descriptor = Object.getOwnPropertyDescriptor(
//         baseClass.prototype,
//         name
//       );

//       if (descriptor) {
//         Object.defineProperty(targetClass.prototype, name, descriptor);
//       }
//     });
//   });
// }
// class Api {
//   getRequest<AjaxResponse>(url: string): AjaxResponse {
//     const ajax = new XMLHttpRequest();
//     ajax.open("GET", url, false);
//     ajax.send();

//     return JSON.parse(ajax.response);
//   }
// }

// class NewsFeedApi {
//   getData(): NewsFeed[] {
//     return this.getRequest<NewsFeed[]>(NEWS_URL);
//   }
// }

// class NewsDetailApi {
//   getData(id: string): NewsDetail {
//     return this.getRequest<NewsDetail>(CONTENT_URL.replace("@id", id));
//   }
// }
// interface NewsFeedApi extends Api {}
// interface NewsDetailApi extends Api {}
// applyApiMixins(NewsFeedApi, [Api]);
// applyApiMixins(NewsDetailApi, [Api]);
