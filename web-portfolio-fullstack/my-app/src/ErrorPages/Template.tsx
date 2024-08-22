import React from 'react';

interface ErrorPageProps {
  errorMessage: string;
  errorCode: number;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ errorMessage, errorCode }) => {
  return (
    <div className="ErrorPage">
      <h1>Error Page</h1>
      <p>Error Message: {errorMessage}</p>
      <p>Error Code: {errorCode}</p>
    </div>
  );
}

export default ErrorPage;