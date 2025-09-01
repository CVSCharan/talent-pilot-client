import type { IN8nUserResponse } from "../../../types";
import { Card, CardContent } from "../../ui/card";
import { FileText } from "lucide-react";
import ExecutiveHeader from "./ExecutiveHeader";
import AssessmentSummary from "./AssessmentSummary";
import StrengthsAndGaps from "./StrengthsAndGaps";
import HardBlockers from "./HardBlockers";
import CandidateProfile from "./CandidateProfile";
import JobRequirements from "./JobRequirements";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { useIsMobile } from "../../../hooks/use-mobile";
import { cn } from "../../lib/utils";

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
  const isMobile = useIsMobile();

  return (
    <div className="space-y-8">
      <Tabs
        defaultValue="ai-summary"
        orientation={isMobile ? "horizontal" : "vertical"}
        className="w-full md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr] md:gap-8"
      >
        <TabsList
          className={cn(
            "h-auto",
            isMobile
              ? "justify-start overflow-x-auto"
              : "flex-col space-y-1 text-left items-start sticky top-24 h-fit rounded-xl bg-muted text-card-foreground shadow-md p-2"
          )}
        >
          <TabsTrigger
            value="ai-summary"
            className={cn(
              isMobile
                ? "h-auto whitespace-normal text-center"
                : "w-full justify-start data-[state=active]:bg-background"
            )}
          >
            AI Analysis
          </TabsTrigger>
          <TabsTrigger
            value="profile"
            className={cn(
              isMobile
                ? "h-auto whitespace-normal text-center"
                : "w-full justify-start data-[state=active]:bg-background"
            )}
          >
            Candidate Profile
          </TabsTrigger>
          <TabsTrigger
            value="requirements"
            className={cn(
              isMobile
                ? "h-auto whitespace-normal text-center"
                : "w-full justify-start data-[state=active]:bg-background"
            )}
          >
            Job Requirements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai-summary" className={cn(!isMobile && "mt-0")}>
          <div className="space-y-6">
            <Card className="shadow-lg">
              <ExecutiveHeader result={result} />
            </Card>
            <AssessmentSummary result={result} />
            <StrengthsAndGaps result={result} />
            <HardBlockers result={result} />
          </div>
        </TabsContent>
        <TabsContent value="profile" className={cn(!isMobile && "mt-0")}>
          <CandidateProfile result={result} />
        </TabsContent>
        <TabsContent value="requirements" className={cn(!isMobile && "mt-0")}>
          <JobRequirements result={result} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
