import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/users/$userId")({
  component: UserComponent,
});

function UserComponent() {
  const { userId } = Route.useParams();
  return (
    <section className="container flex-1 items-center gap-6 pb-8 pt-6 md:py-10">
      User ID: {userId}
    </section>
  );
}
