import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonList = ({ count }: { count: number }) => {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="flex flex-col gap-2 p-4 pt-0">
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="flex items-center rounded-lg border p-3 hover:bg-accent"
        >
          <div className="flex h-9 w-9 items-center justify-center space-y-0">
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>

          <div className="ml-4 space-y-1">
            <Skeleton className="h-3 w-[100px]" />

            <Skeleton className="h-3 w-[200px]" />
          </div>

          <div className="ml-auto font-medium">
            <Skeleton className="h-3 w-[20px]" />
          </div>
        </div>
      ))}
    </div>
  );
};
