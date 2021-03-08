import React from 'react';
import ErrorPage from './ErrorPage';

const PageNotFound: React.FC = () => {
  return (
    <ErrorPage
      title="404 - Could you repeat that?"
      message="Sometimes when you can't find the answer you are looking for, you are asking the wrong question."
    />
  );
};

export default PageNotFound;
