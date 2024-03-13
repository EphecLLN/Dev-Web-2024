import { useQuery } from "@tanstack/react-query";
import { UserType, usersQueryOptions } from "../fetchUsers";
import { Link } from "@tanstack/react-router";
import { userRoute } from "../App";
import { Outlet } from "@tanstack/react-router";

function Users() {
  const { data, isLoading, isError } = useQuery(usersQueryOptions);
  const users: UserType[] = data || [];

  if (isError) {
    return (
      <div>
        <h1>Something went wrong! Please try again later.</h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user: UserType) => (
          <li key={user.id}>
            <Link to={userRoute.to} params={{ userId: user.id }}>
              {user.username}
            </Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}

export default Users;
