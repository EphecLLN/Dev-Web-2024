import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get("/api/users")
      .then((res) => {
        setUsers(res.data as User[]);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <main>
      <h1>Users</h1>
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>
            <a href={user.avatarUrl} target="_blank" rel="noreferrer">
              {user.username}{" "}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
