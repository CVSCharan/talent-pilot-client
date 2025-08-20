import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const TestimonialCardSkeleton = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Skeleton className="h-5 w-24" />
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex items-center mt-4">
          <Skeleton className="h-8 w-32" />
        </div>
      </CardContent>
    </Card>
  );
};
