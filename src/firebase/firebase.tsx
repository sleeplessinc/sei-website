/* eslint-disable @typescript-eslint/no-explicit-any */
import app from 'firebase/app';
import 'firebase/database';
import 'firebase/functions';
import { deserialize } from 'json-typescript-mapper';
import * as firebaseConfig from '../firebase-config.json';
import News from '../models/News';

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig.config);
  }

  database(): app.database.Database {
    return app.database();
  }

  subscribeToPath<T>(
    path: string,
    converter: (snapshot: any) => T,
    callback: (content: T) => void,
    cancelCallbackOrContext?: (error: any) => void,
  ): () => void {
    const internalCallback = (snapshot) => {
      if (!snapshot || !snapshot.val()) {
        if (cancelCallbackOrContext) cancelCallbackOrContext('Not found');
        return;
      }

      const content = converter(snapshot);
      callback(content);
    };
    app.database().ref(path).on('value', internalCallback, cancelCallbackOrContext);
    return () => {
      app.database().ref(path).off('value', internalCallback);
    };
  }

  subscribeToNews(callback: (news: News[]) => void, cancelCallbackOrContext?: (error: any) => void): () => void {
    const converter = (snapshot) => {
      const val = snapshot.val();
      return Object.keys(val)
        .map((key) => {
          const newsItem = deserialize(News, val[key]);
          newsItem.key = key;
          return deserialize(News, newsItem);
        })
        .sort(
          (first: News, second: News) => new Date(second.published).getTime() - new Date(first.published).getTime(),
        );
    };
    return this.subscribeToPath(`page-details/news`, converter, callback, cancelCallbackOrContext);
  }

  subscribeToPage(
    pageName: string,
    callback: (content: string) => void,
    cancelCallbackOrContext?: (error: any) => void,
  ): () => void {
    return this.subscribeToPath(
      `pages/${pageName}`,
      (snapshot) => snapshot.val() as string,
      callback,
      cancelCallbackOrContext,
    );
  }

  subscribeToPageDetails(
    pageName: string,
    callback: (content: News) => void,
    cancelCallbackOrContext?: (error: any) => void,
  ): () => void {
    return this.subscribeToPath(
      `page-details/${pageName}`,
      (snapshot) => deserialize(News, snapshot.val()),
      callback,
      cancelCallbackOrContext,
    );
  }

  updateObject<T>(path: string, newValue: T, callback: () => void, errorCallback?: (error: string) => void): void {
    app
      .database()
      .ref(path)
      .set(newValue, (error) => {
        if (error && errorCallback) {
          errorCallback(error.message);
          return;
        }

        callback();
      });
  }

  updatePageContent(
    pageName: string,
    content: string,
    callback: () => void,
    errorCallback?: (error: string) => void,
  ): void {
    this.updateObject(`pages/${pageName}`, content, callback, errorCallback);
  }
}

export default Firebase;
