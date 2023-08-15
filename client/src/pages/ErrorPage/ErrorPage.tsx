import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  let errorMessage: string = '';

  if (isRouteErrorResponse(error)) {
    errorMessage = error.error?.message || error.statusText;   
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = 'Unknown error';
  }

  return (
    <>
      <div>{errorMessage}</div>
      <div>Page is not found</div>
    </>
  )
}

export default ErrorPage;