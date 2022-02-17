import { NewsFeed, NewsDetail } from "../types";

export class Api {
  ajax: XMLHttpRequest;
  url: string;

  constructor(url: string) {
    this.ajax = new XMLHttpRequest();
    this.url = url;
  }

  protected getRequest<AjaxResponse>(): AjaxResponse {
    this.ajax.open("GET", this.url, false);
    this.ajax.send();

    return JSON.parse(this.ajax.response);
  }
}

export class NewsFeedApi extends Api {
  getData(): NewsFeed[] {
    return this.getRequest<NewsFeed[]>();
  }
}

export class NewsDetailApi extends Api {
  getData(): NewsDetail {
    return this.getRequest<NewsDetail>();
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
