import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import News from '../models/News';
import { FirebaseContext } from '../firebase';
import { Pagination, Spinner } from 'react-bootstrap';
import { formatDistance } from 'date-fns';
import useStateWithLocalStorage from '../utils/storage';
import { Link } from 'react-router-dom';

const NewsFeed: React.FC = () => {
  const firebaseContext = React.useContext(FirebaseContext);
  const itemsPerPage = 6;
  const [newsJson, setNewsJson] = useStateWithLocalStorage('news');
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);

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
  const pageCount = Math.ceil(newsCount / itemsPerPage);
  const pages: Array<JSX.Element> = [];
  for (let number = 1; number <= pageCount; number++) {
    pages.push(
      <Pagination.Item key={number} active={number === activePage} onClick={() => handlePageClick(number)}>
        {number}
      </Pagination.Item>,
    );
  }

  const startIndex = (activePage - 1) * itemsPerPage;
  const newsCards = newsItems.slice(startIndex, startIndex + itemsPerPage)?.map((news, i) => {
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

  const handlePageClick = (target: number | 'first' | 'last' | 'next' | 'previous') => {
    if (target === 'first') {
      setActivePage(1);
    } else if (target === 'last') {
      setActivePage(pageCount);
    } else if (target === 'previous') {
      setActivePage(Math.max(1, activePage - 1));
    } else if (target === 'next') {
      setActivePage(Math.min(pageCount, activePage + 1));
    } else {
      setActivePage(target);
    }
  };

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
      <Pagination className="justify-content-center">
        <Pagination.First onClick={() => handlePageClick('first')} />
        <Pagination.Prev onClick={() => handlePageClick('previous')} />
        {pages}
        <Pagination.Next onClick={() => handlePageClick('next')} />
        <Pagination.Last onClick={() => handlePageClick('last')} />
      </Pagination>
    </Container>
  );
};

export default NewsFeed;
