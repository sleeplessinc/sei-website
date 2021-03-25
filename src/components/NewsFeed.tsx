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
  const itemsPerPage = 4;
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

  const startIndex = (activePage - 1) * itemsPerPage;
  const newsCards = newsItems.slice(startIndex, startIndex + itemsPerPage)?.map((news) => {
    return (
      <div key={news.title} className="ml-4">
        <hr />
        <h2>{news.title}</h2>
        <small>
          <p>{'Published ' + formatDistance(new Date(news.published), new Date()) + ' ago'}</p>
        </small>
        <p>{news.blurb}</p>
        <Link to={'news/' + news.key}>READ MORE</Link>
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

  const getPageElement = (pageNo: number, key?: number) => {
    return (
      <Pagination.Item key={key ?? pageNo} active={pageNo === activePage} onClick={() => handlePageClick(pageNo)}>
        {pageNo}
      </Pagination.Item>
    );
  };

  if (pageCount <= 5) {
    for (let number = 1; number <= pageCount; number++) {
      pages.push(getPageElement(number));
    }
  } else {
    if (activePage <= 3) {
      pages.push(getPageElement(1));
      pages.push(getPageElement(2));
      pages.push(getPageElement(3));
      pages.push(<Pagination.Ellipsis key={4} onClick={() => handlePageClick(4)} />);
      pages.push(getPageElement(pageCount, 5));
    } else if (activePage >= pageCount - 2) {
      pages.push(getPageElement(1));
      pages.push(<Pagination.Ellipsis key={2} onClick={() => handlePageClick(2)} />);
      pages.push(getPageElement(pageCount - 2, 3));
      pages.push(getPageElement(pageCount - 1, 4));
      pages.push(getPageElement(pageCount, 5));
    } else {
      pages.push(getPageElement(1));
      pages.push(<Pagination.Ellipsis key={2} onClick={() => handlePageClick(activePage - 1)} />);
      pages.push(getPageElement(activePage, 3));
      pages.push(<Pagination.Ellipsis key={3} onClick={() => handlePageClick(activePage + 1)} />);
      pages.push(getPageElement(pageCount, 5));
    }
  }

  return (
    <Container>
      <h1 className="mb-3">News</h1>
      <Pagination className="justify-content-center">
        <Pagination.First onClick={() => handlePageClick('first')} />
        <Pagination.Prev onClick={() => handlePageClick('previous')} />
        {pages}
        <Pagination.Next onClick={() => handlePageClick('next')} />
        <Pagination.Last onClick={() => handlePageClick('last')} />
      </Pagination>
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
