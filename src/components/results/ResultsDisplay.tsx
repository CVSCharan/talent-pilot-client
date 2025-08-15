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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

interface ResultsDisplayProps {
  loading: boolean;
  results: Results | null;
}

export function ResultsDisplay({ loading, results }: ResultsDisplayProps) {
  const getScoreColor = (score: number): string => {
    if (score >= 8) return "text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900 border-green-200 dark:border-green-700";
    if (score >= 6) return "text-yellow-700 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-700";
    return "text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900 border-red-200 dark:border-red-700";
  };

  const getRecommendationColor = (recommendation: string): string => {
    return recommendation.toLowerCase() === "yes"
      ? "text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900"
      : "text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900";
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Summary Card Skeleton */}
        <Card className="bg-card shadow-sm border">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-6 w-48 mb-2 bg-muted" />
                <Skeleton className="h-4 w-64 bg-muted" />
              </div>
              <Skeleton className="h-10 w-10 rounded-full bg-muted" />
            </div>
          </CardHeader>
        </Card>

        {/* Candidate Cards Skeleton */}
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="bg-card shadow-sm border">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Skeleton className="h-10 w-10 rounded-full bg-muted" />
                    <div>
                      <Skeleton className="h-6 w-48 mb-1 bg-muted" />
                      <Skeleton className="h-4 w-32 bg-muted" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Skeleton className="h-4 w-24 mb-2 bg-muted" />
                      <Skeleton className="h-16 w-full bg-muted" />
                    </div>
                    <div>
                      <Skeleton className="h-4 w-20 mb-2 bg-muted" />
                      <div className="flex flex-wrap gap-1">
                        <Skeleton className="h-6 w-16 bg-muted" />
                        <Skeleton className="h-6 w-20 bg-muted" />
                        <Skeleton className="h-6 w-18 bg-muted" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start lg:items-end gap-3">
                  <Skeleton className="h-12 w-24 bg-muted" />
                  <Skeleton className="h-8 w-20 bg-muted" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <Card className="bg-card shadow-sm border">
        <CardContent className="p-12 text-center">
          <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">
            No Results Available
          </h2>
          <p className="text-muted-foreground">
            Results will be displayed here once the analysis is complete.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Handle single candidate result from your API response
  const candidates = results;

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <Card className="bg-card shadow-sm border">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-foreground">
                Screening Analysis Complete
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground mt-1">
                Comprehensive evaluation based on job requirements
              </CardDescription>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Candidate Result Card */}
      {candidates.map((candidate, index) => (
      <Card key={index} className="bg-card shadow-sm border hover:shadow-md transition-shadow">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Candidate Information */}
            <div className="lg:col-span-3 space-y-6">
              {/* Header with Name and Contact */}
              <div className="flex items-start gap-4 pb-4 border-b border-border">
                <div className="bg-primary/10 p-3 rounded-full">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {candidate.name}
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
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

              {/* Education and Experience Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Education */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-semibold text-foreground">Education</h4>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {candidate.education}
                    </p>
                  </div>
                </div>

                {/* Job History */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-semibold text-foreground">Experience</h4>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {candidate.jobHistory}
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-5 w-5 text-muted-foreground" />
                  <h4 className="font-semibold text-foreground">
                    Technical Skills
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.split(", ").map((skill: string, i: number) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1"
                    >
                      {skill.trim()}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Star className="h-5 w-5 text-muted-foreground" />
                  <h4 className="font-semibold text-foreground">Key Projects</h4>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-foreground/80">{candidate.projects}</p>
                </div>
              </div>

              {/* JD Alignment Analysis */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">
                  Job Requirements Analysis
                </h4>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {candidate.jdAlignment}
                  </p>
                </div>
              </div>

              {/* Justification */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">
                  Assessment Summary
                </h4>
                <div className="bg-primary/10 p-4 rounded-lg border-l-4 border-primary/30">
                  <p className="text-sm text-primary/80 leading-relaxed">
                    {candidate.justification}
                  </p>
                </div>
              </div>
            </div>

            {/* Score and Recommendation */}
            <div className="flex flex-col gap-4">
              {/* Overall Score */}
              <div className="text-center">
                <div
                  className={`inline-flex items-center justify-center w-24 h-24 rounded-full border-4 ${getScoreColor(
                    candidate.score
                  )} mb-3`}
                >
                  <span className="text-3xl font-bold">{candidate.score}</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  Overall Score
                </p>
                <p className="text-xs text-muted-foreground/70">out of 10</p>
              </div>

              {/* Recommendation */}
              <div className="text-center">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold ${getRecommendationColor(
                    candidate.recommendation
                  )}`}
                >
                  {candidate.recommendation.toLowerCase() === "yes" ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                  <span className="text-sm">
                    {candidate.recommendation.toLowerCase() === "yes"
                      ? "Recommended"
                      : "Not Recommended"}
                  </span>
                </div>
              </div>

              {/* Status Indicators */}
              <div className="space-y-2 pt-4 border-t border-border">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">
                    Assessment Status
                  </p>
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700"
                  >
                    Analysis Complete
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      ))}
    </div>
  );
}