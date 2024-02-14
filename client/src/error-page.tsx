import { ErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as ErrorResponse | Error;
  console.error(error);

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{isErrorResponse(error) ? error.statusText : error.message}</i>
      </p>
    </div>
  );
}

function isErrorResponse(error: ErrorResponse | Error): error is ErrorResponse {
  return (error as ErrorResponse).statusText !== undefined;
}
