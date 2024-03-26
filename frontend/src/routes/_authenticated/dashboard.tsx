import { useAuth0 } from "@auth0/auth0-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <p>name: {user?.name ?? "undefined"}</p>
        <p>given_name: {user?.given_name ?? "undefined"}</p>
        <p>family_name: {user?.family_name ?? "undefined"}</p>
        <p>middle_name: {user?.middle_name ?? "undefined"}</p>
        <p>nickname: {user?.nickname ?? "undefined"}</p>
        <p>preferred_username: {user?.preferred_username ?? "undefined"}</p>
        <p>profile: {user?.profile ?? "undefined"}</p>
        <img
          src={user?.picture ?? "undefined"}
          alt={user?.email ?? "undefined"}
        />
        <p>website: {user?.website ?? "undefined"}</p>
        <p>email: {user?.email ?? "undefined"}</p>
        <p>email_verified: {user?.email_verified ?? "undefined"}</p>
        <p>gender: {user?.gender ?? "undefined"}</p>
        <p>birthdate: {user?.birthdate ?? "undefined"}</p>
        <p>zoneinfo: {user?.zoneinfo ?? "undefined"}</p>
        <p>locale: {user?.locale ?? "undefined"}</p>
        <p>phone_number: {user?.phone_number ?? "undefined"}</p>
        <p>
          phone_number_verified: {user?.phone_number_verified ?? "undefined"}
        </p>
        <p>address: {user?.address ?? "undefined"}</p>
        <p>updated_at: {user?.updated_at ?? "undefined"}</p>
        <p>sub: {user?.sub ?? "undefined"}</p>
      </div>
    )
  );
}
