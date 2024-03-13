import { useSuspenseQuery } from "@tanstack/react-query";
import { userQueryOptions } from "../fetchUsers";
import { userRoute } from "../App";

function User() {
  const { userId } = userRoute.useParams();
  const userQuery = useSuspenseQuery(userQueryOptions(userId));
  const user = userQuery.data;

  return (
    <div>
      <h1>User {user.username}</h1>
      <ul>
        <li>
          <strong>ID:</strong> {user.id}
        </li>
        <li>
          <strong>Email:</strong> {user.email}
        </li>
        <li>
          <strong>Avatar URL:</strong> {user.avatar_url}
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
