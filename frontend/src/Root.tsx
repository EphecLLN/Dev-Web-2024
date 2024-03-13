import { Outlet, Link } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

function Root() {
  return (
    <>
      <div>
        <Link to="/">Home</Link> <Link to="/users">Users</Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}

export default Root;
