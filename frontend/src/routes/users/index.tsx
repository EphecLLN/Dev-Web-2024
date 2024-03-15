import { usersQueryOptions } from "@/api/fetchUsers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";

export const Route = createFileRoute("/users/")({
  component: UsersIndexComponent,
});

function UsersIndexComponent() {
  const { isPending, isError, data, error } = useQuery(usersQueryOptions);

  if (isPending) {
    return (
      <section className="container flex-1 items-center gap-6 pb-8 pt-6 md:py-10">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Loading...
        </h1>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="container flex-1 items-center gap-6 pb-8 pt-6 md:py-10">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Oh no !
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {error.message || "An internal server error occurred"}
        </p>
      </section>
    );
  }

  return (
    <section className="container flex-1 items-center gap-6 pb-8 pt-6 md:py-10">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Here is a list of all users registered
      </h1>
      <div className="p-4">
        <form>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8" />
          </div>
        </form>
      </div>
      <div className="flex flex-col gap-2 p-4 pt-0">
        {data.map((user) => (
          <Link
            to="/users/$userId"
            params={{ userId: user.id }}
            key={user.id}
            className="flex p-3 items-center rounded-lg border hover:bg-accent"
          >
            <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
              <AvatarImage src={user.avatar_url} alt="Avatar" />
              <AvatarFallback>{user.id}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {user.username}
              </p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <div className="ml-auto font-medium">{user.id}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
