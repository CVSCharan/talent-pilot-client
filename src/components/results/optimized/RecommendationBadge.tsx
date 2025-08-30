import { memo } from "react";
import { Badge } from "../../ui/badge";
import { cn } from "../../lib/utils";
import { ThumbsUp, ThumbsDown, AlertTriangle } from "lucide-react";

interface RecommendationBadgeProps {
  recommendation: string;
}

const RecommendationBadge = memo(({ recommendation }: RecommendationBadgeProps) => {
  const baseClasses = "text-sm font-semibold px-6 py-3";

  switch (recommendation.toLowerCase()) {
    case "yes":
      return (
        <Badge
          variant="default"
          className={cn(baseClasses, "bg-green-500 hover:bg-green-600")}
        >
          <ThumbsUp className="h-4 w-4 mr-2" />
          Recommended
        </Badge>
      );
    case "no":
      return (
        <Badge variant="destructive" className={cn(baseClasses)}>
          <ThumbsDown className="h-4 w-4 mr-2" />
          Not Recommended
        </Badge>
      );
    default:
      return (
        <Badge variant="secondary" className={cn(baseClasses)}>
          <AlertTriangle className="h-4 w-4 mr-2" />
          Further Review
        </Badge>
      );
  }
});

export default RecommendationBadge;
