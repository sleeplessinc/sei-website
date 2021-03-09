import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import News from '../models/News';
import { FirebaseContext } from '../firebase';
import { Spinner } from 'react-bootstrap';
import { formatDistance } from 'date-fns';
import useStateWithLocalStorage from '../utils/storage';
import { Link } from 'react-router-dom';

const NewsFeed: React.FC = () => {
  const firebaseContext = React.useContext(FirebaseContext);
  const [newsJson, setNewsJson] = useStateWithLocalStorage('news');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return firebaseContext?.subscribeToNews(
      (results) => {
        setNewsJson(JSON.stringify(results));
        setIsLoading(false);
      },
      (error) => {
        console.log(error);
        setIsLoading(false);
      },
    );
  }, [firebaseContext]);

  const newsItems: News[] = newsJson ? JSON.parse(newsJson) : [];
  const newsCount = newsItems.length;
  const newsCards = newsItems?.map((news, i) => {
    return (
      <div key={news.title} className="ml-4">
        <h2>{news.title}</h2>
        <small>
          <p>{'Published ' + formatDistance(new Date(news.published), new Date()) + ' ago'}</p>
        </small>
        <p>{news.blurb}</p>
        <Link to={'news/' + news.key}>READ MORE</Link>
        {newsCount == i + 1 ? null : <hr />}
      </div>
    );
  });

  return (
    <Container>
      <h1 className="mb-3">News</h1>
      {isLoading ? (
        <div className="text-center">
          <Spinner className="m-5" animation="border" role="status" variant="primary">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        newsCards
      )}
    </Container>
  );
};

export default NewsFeed;
