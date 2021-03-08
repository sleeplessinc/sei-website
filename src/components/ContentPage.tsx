import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { FirebaseContext } from '../firebase';
import parse from 'html-react-parser';
import useStateWithLocalStorage from '../utils/storage';
import PageNotFound from './PageNotFound';
import { Col, Row, Spinner } from 'react-bootstrap';
import News from '../models/News';
import { formatDistance } from 'date-fns';

interface IContentPageProps {
  path: string;
  showAttribution?: boolean;
}

const defaultProps: IContentPageProps = {
  path: '',
  showAttribution: true,
};

const ContentPage: React.FC<IContentPageProps> = ({ path, showAttribution }: IContentPageProps) => {
  const firebaseContext = React.useContext(FirebaseContext);
  const [details, setDetails] = useState<News | undefined>(undefined);
  const [content, setContent] = useStateWithLocalStorage(path);
  const [notFound, setnotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(content ? false : true);

  useEffect(() => {
    return firebaseContext?.subscribeToPage(
      path,
      (results) => {
        if (!results || results === '') {
          setnotFound(true);
        } else {
          setContent(results);
          setIsLoading(false);
        }
      },
      (error) => {
        console.log(error);
        setnotFound(true);
      },
    );
  }, [firebaseContext]);

  useEffect(() => {
    return firebaseContext?.subscribeToPageDetails(path, setDetails, console.log);
  }, [firebaseContext]);

  return notFound ? (
    <PageNotFound />
  ) : (
    <Container className="blog">
      {isLoading ? (
        <div className="text-center">
          <Spinner className="m-5" animation="border" role="status" variant="primary">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          {details && (
            <Row>
              <Col>
                <h2 className="mt-3">{details?.title}</h2>
                <p>
                  <i>{details?.blurb}</i>
                </p>
                {!showAttribution ? null : (
                  <>
                    <small>
                      <p>{'Published ' + formatDistance(new Date(details?.published), new Date()) + ' ago'}</p>
                    </small>
                  </>
                )}
              </Col>
            </Row>
          )}
          <Row>
            <Col>{parse(content)}</Col>
          </Row>
        </>
      )}
    </Container>
  );
};

ContentPage.defaultProps = defaultProps;

export default ContentPage;
