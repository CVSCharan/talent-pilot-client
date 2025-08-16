import {
  Briefcase,
  Star,
  TrendingUp,
  User,
  Mail,
  Phone,
  GraduationCap,
  Award,
  CheckCircle,
  XCircle,
} from "lucide-react";
import type { Results } from "../../types";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

interface ResultsDisplayProps {
  loading: boolean;
  results: Results | null;
}

export function ResultsDisplay({ loading, results }: ResultsDisplayProps) {
  const getScoreColor = (score: number): string => {
    if (score >= 8) return "border-primary text-primary";
    if (score >= 6) return "border-yellow-500 text-yellow-500";
    return "border-destructive text-destructive";
  };

  const getRecommendationColor = (recommendation: string): string => {
    return recommendation.toLowerCase() === "yes"
      ? "bg-primary/10 text-primary"
      : "bg-destructive/10 text-destructive";
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <Card className="shadow-sm">
          <CardHeader>
            <Skeleton className="h-7 w-3/4" />
            <Skeleton className="h-5 w-1/2" />
          </CardHeader>
        </Card>
        {[...Array(2)].map((_, index) => (
          <Card key={index} className="shadow-sm">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-3 space-y-6">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-16 w-16 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-48" />
                      <Skeleton className="h-4 w-64" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                  <div className="space-y-4">
                    <Skeleton className="h-5 w-32" />
                    <div className="flex flex-wrap gap-2">
                      <Skeleton className="h-7 w-20" />
                      <Skeleton className="h-7 w-24" />
                      <Skeleton className="h-7 w-16" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-4 border-l border-border/50 pl-6">
                  <Skeleton className="h-24 w-24 rounded-full" />
                  <Skeleton className="h-8 w-32" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!results) {
    return (
      <Card className="shadow-sm">
        <CardContent className="p-12 text-center">
          <TrendingUp className="h-16 w-16 text-muted-foreground/50 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            No Results to Display
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            It seems there are no results to show right now. Try uploading a new
            set of resumes to begin the analysis.
          </p>
        </CardContent>
      </Card>
    );
  }

  const candidate = results; // results is now a single Candidate object

  return (
    <div className="space-y-8">
      <Card className="shadow-sm hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-3 space-y-6">
              <div className="flex items-center gap-4 pb-4 border-b border-border/50">
                <div className="bg-primary/10 p-4 rounded-full">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {candidate.name}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>{candidate.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{candidate.contact}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <GraduationCap className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-semibold">Education</h4>
                  </div>
                  <p className="text-sm text-foreground/80">
                    {candidate.education}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Briefcase className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-semibold">Experience</h4>
                  </div>
                  <p className="text-sm text-foreground/80">
                    {candidate.jobHistory}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Award className="h-5 w-5 text-muted-foreground" />
                  <h4 className="font-semibold">Technical Skills</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills &&
                    candidate.skills
                      .split(", ")
                      .map((skill: string, i: number) => (
                        <Badge key={i} variant="secondary">
                          {skill.trim()}
                        </Badge>
                      ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Star className="h-5 w-5 text-muted-foreground" />
                  <h4 className="font-semibold">Key Projects</h4>
                </div>
                <p className="text-sm text-foreground/80">
                  {candidate.projects}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-3">
                  Job Requirements Analysis
                </h4>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {candidate.jdAlignment}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Key Observations</h4>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {candidate.keyObservations}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Assessment Summary</h4>
                <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary/20">
                  <p className="text-sm text-primary/90 leading-relaxed">
                    {candidate.justification}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center space-y-6 border-l border-border/50 pl-6">
              <div className="text-center">
                <div
                  className={`flex items-center justify-center w-28 h-28 rounded-full border-4 ${getScoreColor(
                    candidate.score
                  )}`}
                >
                  <span className="text-4xl font-bold">{candidate.score}</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground mt-3">
                  Overall Score
                </p>
              </div>

              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Confidence Score
                </p>
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary"
                >
                  {candidate.confidenceScore}
                </Badge>
              </div>

              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold ${getRecommendationColor(
                  candidate.recommendation
                )}`}
              >
                {candidate.recommendation.toLowerCase() === "yes" ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <XCircle className="h-5 w-5" />
                )}
                <span>
                  {candidate.recommendation.toLowerCase() === "yes"
                    ? "Recommended"
                    : "Not Recommended"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
