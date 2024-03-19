import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Percent,
  Swords,
} from "lucide-react";

export const SkeletonUserDetails = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="grid md:row-span-3 lg:row-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Main Information</CardTitle>
              <Skeleton className="h-4 w-[250px]" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-2">
              <div className="items-center">
                <Skeleton className="h-32 w-32 rounded-full" />
              </div>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="mt-4 flex justify-center space-x-4">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-7" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-14" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
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
              <div className="space-y-2">
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <ArrowUpRight className="h-10 w-10 text-green-400" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <ArrowDownRight className="h-10 w-10 text-red-400" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <ArrowRight className="h-10 w-10 text-yellow-400" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Percent className="h-10 w-10 text-blue-400" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 w-32" />
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
  );
};
