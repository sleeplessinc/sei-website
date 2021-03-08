export default class News {
  author: string;
  published: Date;
  key: string;
  title: string;
  body: string;
  blurb: string;

  constructor() {
    this.author = '';
    this.published = new Date();
    this.body = '';
    this.key = '';
    this.title = '';
    this.blurb = '';
  }
}
