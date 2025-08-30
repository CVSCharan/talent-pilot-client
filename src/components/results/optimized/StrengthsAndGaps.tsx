import { memo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Star, Zap } from "lucide-react";
import type { IN8nUserResponse } from "../../../types";

interface StrengthsAndGapsProps {
  result: IN8nUserResponse;
}

const StrengthsAndGaps = memo(({ result }: StrengthsAndGapsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="shadow-sm">
        <CardHeader className="bg-muted/30">
          <CardTitle className="flex items-center text-lg">
            <Star className="h-5 w-5 text-yellow-500 mr-2" />
            Key Strengths
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            {result.results.key_strengths.map((strength, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <Badge variant="outline" className="font-normal text-sm">
                  {strength}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="bg-muted/30">
          <CardTitle className="flex items-center text-lg">
            <Zap className="h-5 w-5 text-orange-500 mr-2" />
            Key Gaps
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            {result.results.key_gaps.map((gap, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <Badge variant="outline" className="font-normal text-sm">
                  {gap}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

export default StrengthsAndGaps;
