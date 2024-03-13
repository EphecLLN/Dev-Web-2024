import { useQuery } from "@tanstack/react-query";
import { userQueryOptions } from "../fetchUsers";
import { userRoute } from "../App";

function User() {
  const { userId } = userRoute.useParams();
  const userQuery = useQuery(userQueryOptions(userId));
  const user = userQuery.data;

  if (userQuery.isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (userQuery.isError || !user) {
    return (
      <div>
        <h1>Something went wrong! User not found.</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>User {user.username}</h1>
      <img src={user.avatar_url} alt={user.username} />
      <ul>
        <li>
          <strong>ID:</strong> {user.id}
        </li>
        <li>
          <strong>Email:</strong> {user.email}
        </li>
        <li>
          <strong>Avatar URL:</strong>{" "}
          <a href={user.avatar_url} target="_blank" rel="noopener noreferrer">
            {user.avatar_url}
          </a>
        </li>
        <li>
          <strong>Created At:</strong> {user.created_at.toString()}
        </li>
        <li>
          <strong>Updated At:</strong> {user.updated_at.toString()}
        </li>
      </ul>
    </div>
  );
}

export default User;
