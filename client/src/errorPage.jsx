import React from 'react';
import { useRouteError } from 'react-router-dom';

/**
 * ErrorPage component to display an error message when a route is not found.
 *
 * @returns {ReactNode} - JSX element representing the error page.
 */
const ErrorPage = () => {
  // Retrieve the route error using the useRouteError hook
  const error = useRouteError();

  // Log the error to the console
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>The page you are looking for cannot be found.</p>
    </div>
  );
};

export default ErrorPage;