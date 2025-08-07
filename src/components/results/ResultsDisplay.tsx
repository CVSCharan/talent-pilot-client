import { Brain, Briefcase, Star, TrendingUp } from "lucide-react";
import type { Results } from "../../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";

interface ResultsDisplayProps {
  loading: boolean;
  results: Results | null;
}

export function ResultsDisplay({ loading, results }: ResultsDisplayProps) {
  const getScoreBadgeVariant = (
    score: number
  ): "default" | "secondary" | "destructive" | "outline" => {
    if (score >= 90) return "default";
    if (score >= 75) return "secondary";
    return "destructive";
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-card/60 backdrop-blur-sm border border-border/20 shadow-lg rounded-2xl">
        <div className="relative mb-4">
          <div className="h-16 w-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Brain className="h-8 w-8 text-primary opacity-75" />
          </div>
        </div>
        <p className="text-xl font-semibold mb-2">AI Analysis in Progress</p>
        <p className="text-muted-foreground">
          Crunching data and ranking candidates...
        </p>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-card/60 backdrop-blur-sm border border-border/20 shadow-lg rounded-2xl">
        <img src="/logo.png" alt="TalentPilot Logo" className="h-12 w-auto mb-4" />
        <p className="text-xl font-semibold mb-2">Awaiting Analysis</p>
        <p className="text-muted-foreground">
          Results will be displayed here once the analysis is complete.
        </p>
      </div>
    );
  }

  return (
    <Card className="bg-card/60 backdrop-blur-sm border border-border/20 shadow-lg rounded-2xl overflow-hidden">
      <CardHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle>Screening Results</CardTitle>
            <CardDescription>
              {results.matches.length} candidates ranked by AI analysis.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {results.matches.map((match, index) => (
          <Card
            key={index}
            className="bg-card/70 border border-border/30 hover:border-primary/40 transition-all"
          >
            <CardContent className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="md:col-span-2">
                <h3 className="font-semibold text-lg text-foreground">
                  {match.name}
                </h3>
                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                  <Briefcase className="h-4 w-4" />
                  {match.experience}
                </p>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {match.skills.map((skill, i) => (
                      <Badge key={i} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2">
                <Badge
                  variant={getScoreBadgeVariant(match.score)}
                  className="text-lg px-4 py-2"
                >
                  {match.score}% Match
                </Badge>
                <Badge
                  variant="outline"
                  className="flex items-center gap-1.5"
                >
                  <Star className="h-3 w-3" />
                  {match.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
