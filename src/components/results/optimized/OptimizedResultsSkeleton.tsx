import { Skeleton } from "../../ui/skeleton";
import { Card, CardContent, CardHeader } from "../../ui/card";

export function OptimizedResultsSkeleton() {
  return (
    <div className="space-y-8">
      {/* Executive Header Skeleton */}
      <Card className="shadow-lg">
        <CardHeader className="p-8 bg-muted/20">
          <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-6">
            <div className="flex-1 space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <div className="flex flex-col sm:flex-row gap-6">
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-5 w-1/2" />
              </div>
            </div>
            <div className="flex-shrink-0">
              <Skeleton className="h-12 w-48" />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Assessment Summary Skeleton */}
      <Card className="shadow-sm">
        <CardHeader className="bg-muted/30">
          <Skeleton className="h-7 w-1/2" />
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>

      {/* Strengths and Gaps Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="bg-muted/30">
            <Skeleton className="h-6 w-1/3" />
          </CardHeader>
          <CardContent className="p-6 space-y-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="bg-muted/30">
            <Skeleton className="h-6 w-1/3" />
          </CardHeader>
          <CardContent className="p-6 space-y-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
          </CardContent>
        </Card>
      </div>

      {/* Candidate Profile Skeleton */}
      <Card className="shadow-sm">
        <CardHeader className="bg-muted/30">
          <Skeleton className="h-7 w-1/3" />
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>

      {/* Job Requirements Skeleton */}
      <Card className="shadow-sm">
        <CardHeader className="bg-muted/30">
          <Skeleton className="h-7 w-1/3" />
        </CardHeader>
        <CardContent className="p-8">
          <Skeleton className="h-40 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
