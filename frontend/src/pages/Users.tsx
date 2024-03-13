import { useQuery } from "@tanstack/react-query";
import { UserType, usersQueryOptions } from "../fetchUsers";

function Users() {
  const { data, isLoading, isError } = useQuery(usersQueryOptions);
  const users = data ?? [];

  if (isError) {
    return (
      <main>
        <h1>Something went wrong!</h1>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <main>
      <h1>Users</h1>
      <ul>
        {users.map((user: UserType) => (
          <li key={user.id}>
            <a href={user.avatar_url} target="_blank" rel="noreferrer">
              {user.username}{" "}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Users;
