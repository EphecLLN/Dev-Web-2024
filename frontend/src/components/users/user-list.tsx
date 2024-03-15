import { UserType } from "@/api/fetchUsers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "@tanstack/react-router";

export const UserList = ({ users }: { users: UserType[] }) => {
  return (
    <div className="flex flex-col gap-2 p-4 pt-0">
      {users.map((user) => (
        <Link
          to="/users/$userId"
          params={{ userId: user.id }}
          key={user.id}
          className="flex items-center rounded-lg border p-3 hover:bg-accent"
        >
          <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
            <AvatarImage src={user.avatar_url} alt="Avatar" />

            <AvatarFallback>{user.id}</AvatarFallback>
          </Avatar>

          <div className="ml-4 space-y-1">
            <p className="text-sm font-bold leading-none">{user.username}</p>

            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>

          <p className="ml-auto font-medium">#{user.id}</p>
        </Link>
      ))}
    </div>
  );
};
