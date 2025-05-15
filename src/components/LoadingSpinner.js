import React from 'react';
import { Spinner } from 'react-bootstrap';

function LoadingSpinner() {
  return (
    <div className="text-center my-5">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default LoadingSpinner;