import { memo } from "react";
import {
  Card,  
  CardContent,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { FileText, Target, TrendingUp, User } from "lucide-react";
import type { IN8nUserResponse } from "../../../types";

interface AssessmentSummaryProps {
  result: IN8nUserResponse;
}

const AssessmentSummary = memo(({ result }: AssessmentSummaryProps) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="bg-muted/30">
        <CardTitle className="flex items-center text-2xl">
          <FileText className="h-6 w-6 text-primary mr-3" />
          AI Assessment Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-6 rounded-lg bg-muted/50">
            <div className="flex items-center justify-center mb-3">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              Final Score
            </h4>
            <p className="text-4xl font-bold text-primary">
              {result.results.final_score}
            </p>
          </div>
          <div className="text-center p-6 rounded-lg bg-muted/50">
            <div className="flex items-center justify-center mb-3">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              Confidence
            </h4>
            <p className="text-4xl font-bold text-primary">
              {result.results.confidence_score}
            </p>
          </div>
          <div className="text-center p-6 rounded-lg bg-muted/50">
            <div className="flex items-center justify-center mb-3">
              <User className="h-8 w-8 text-primary" />
            </div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              Status
            </h4>
            <p className="text-lg font-semibold text-primary">
              {result.results.recommendation}
            </p>
          </div>
        </div>
        <div className="border-l-4 border-primary p-6 bg-muted/30 rounded-r-lg">
          <h4 className="font-semibold mb-3">Assessment Details</h4>
          <p className="text-muted-foreground leading-relaxed">
            {result.results.justification}
          </p>
        </div>
      </CardContent>
    </Card>
  );
});

export default AssessmentSummary;
