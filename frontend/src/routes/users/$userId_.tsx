import { userQueryOptions } from "@/api/fetchUsers";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SkeletonUserDetails } from "@/components/users/skeleton-user";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Percent,
  Plus,
  Swords,
  UserPlus,
} from "lucide-react";

export const Route = createFileRoute("/users/$userId")({
  component: UserComponent,
});

function UserComponent() {
  const { userId } = Route.useParams();
  const { isLoading, isError, data, error } = useQuery(
    userQueryOptions(userId),
  );

  return (
    <div className="container max-w-screen-2xl flex-1 py-4">
      {isLoading && <SkeletonUserDetails />}
      {isError && (
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {error instanceof Error ? error.message : "An unknown error occurred"}
        </p>
      )}
      {!isLoading && !isError && !data && <div>No user found</div>}
      {!isLoading && !isError && data && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="grid md:row-span-3 lg:row-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Main Information</CardTitle>
                <CardDescription>
                  {data.username}'s profile information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-2">
                  <Avatar className="items-center">
                    <AvatarImage
                      src={data.avatar_url}
                      alt="Avatar"
                      className="rounded-full"
                    />
                    <AvatarFallback>{data.id}</AvatarFallback>
                  </Avatar>
                  <p className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
                    {data.username}
                  </p>
                  <p className="text-sm text-muted-foreground">{data.email}</p>
                </div>
                <div className="mt-4 flex justify-center space-x-4">
                  <Button onClick={() => console.log("follow", userId)}>
                    <Plus className="mr-2 h-5 w-5" />
                    Follow
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => console.log("recruit", userId)}
                  >
                    <UserPlus className="mr-2 h-5 w-5" />
                    Recruit
                  </Button>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium leading-none">
                      Followers
                    </p>
                    <p className="text-sm font-extrabold">0</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm font-medium leading-none">
                      Member since
                    </p>
                    <p className="text-sm font-extrabold">
                      {new Date(data.created_at).getDate()}/
                      {new Date(data.created_at).getMonth()}/
                      {new Date(data.created_at).getFullYear()}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm font-medium leading-none">
                      Last updated
                    </p>
                    <p className="text-sm font-extrabold">{data.updated_at}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid md:col-start-2 md:row-start-1 lg:col-span-2 lg:col-start-2 lg:row-start-1">
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 grid-rows-2 gap-6 lg:grid-cols-5 lg:grid-rows-1">
                <div className="flex items-center space-x-2">
                  <Swords className="h-10 w-10 text-purple-400" />
                  <div>
                    <p className="text-xl font-extrabold md:text-2xl">9</p>
                    <p className="text-sm font-medium leading-none">
                      Game Played
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <ArrowUpRight className="h-10 w-10 text-green-400" />
                  <div>
                    <p className="text-xl font-extrabold md:text-2xl">7</p>
                    <p className="text-sm font-medium leading-none">
                      Victories
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <ArrowDownRight className="h-10 w-10 text-red-400" />
                  <div>
                    <p className="text-xl font-extrabold md:text-2xl">2</p>
                    <p className="text-sm font-medium leading-none">Defeats</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <ArrowRight className="h-10 w-10 text-yellow-400" />
                  <div>
                    <p className="text-xl font-extrabold md:text-2xl">0</p>
                    <p className="text-sm font-medium leading-none">Draws</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Percent className="h-10 w-10 text-blue-400" />
                  <div>
                    <p className="text-xl font-extrabold md:text-2xl">78%</p>
                    <p className="text-sm font-medium leading-none">
                      Winning Rate
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid md:col-start-1 md:row-start-4 lg:col-start-1 lg:row-start-4">
            <Card>
              <CardHeader>
                <CardTitle>Team</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </div>
          <div className="grid md:col-start-2 md:row-start-2 lg:col-span-2 lg:col-start-2 lg:row-start-2">
            <Card>
              <CardHeader>
                <CardTitle>Tournaments</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </div>
          <div className="grid md:col-start-2 md:row-span-2 md:row-start-3 lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-3">
            <Card>
              <CardHeader>
                <CardTitle>Tournament Played</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
