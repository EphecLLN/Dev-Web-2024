import { userQueryOptions } from "@/api/fetchUsers";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/users/$userId")({
  component: UserComponent,
});

function UserComponent() {
  const { userId } = Route.useParams();
  const { isLoading, isError, data, error } = useQuery(
    userQueryOptions(userId),
  );

  return (
    <section className="container  flex-1 items-center gap-6 pb-8 pt-6 md:py-10">
      {isLoading && (
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Loading ...
        </p>
      )}
      {isError && (
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {error instanceof Error ? error.message : "An unknown error occurred"}
        </p>
      )}
      {!isLoading && !isError && !data && <div>No user found</div>}
      {!isLoading && !isError && data && (
        <div>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            {data.username}'s Profile
          </h1>
          <ul>
            <li>{data.email}</li>
            <li>{data.avatar_url}</li>
            <li>{data.created_at}</li>
            <li>{data.updated_at}</li>
          </ul>
        </div>
      )}
    </section>
  );
}
