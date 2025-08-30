import type { IN8nUserResponse } from "../../../types";
import { Card, CardContent } from "../../ui/card";
import { FileText } from "lucide-react";
import ExecutiveHeader from "./ExecutiveHeader";
import AssessmentSummary from "./AssessmentSummary";
import StrengthsAndGaps from "./StrengthsAndGaps";
import HardBlockers from "./HardBlockers";
import CandidateProfile from "./CandidateProfile";
import JobRequirements from "./JobRequirements";

interface OptimizedResultsDisplayProps {
  results: IN8nUserResponse[] | null;
}

export function OptimizedResultsDisplay({
  results,
}: OptimizedResultsDisplayProps) {
  if (!results || results.length === 0) {
    return (
      <Card className="shadow-sm">
        <CardContent className="p-12 text-center">
          <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            No Results to Display
          </h2>
          <p className="text-muted-foreground">
            Upload a resume and job description to begin analysis.
          </p>
        </CardContent>
      </Card>
    );
  }

  const result = results[0];

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <ExecutiveHeader result={result} />
      </Card>
      <AssessmentSummary result={result} />
      <StrengthsAndGaps result={result} />
      <HardBlockers result={result} />
      <div className="space-y-6">
        <CandidateProfile result={result} />
        <JobRequirements result={result} />
      </div>
    </div>
  );
}
