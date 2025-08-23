import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useHistoryStore } from "../store/history-store";
import { useResultsStore } from "../store/results-store";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { TrendingUp } from "lucide-react";
import type { ScreeningResult } from "../types";
import { Skeleton } from "../components/ui/skeleton";
import useAuthStore from "../store/auth-store";

const HistoryPage = () => {
  const { history, loading, fetchHistory } = useHistoryStore();
  const { setResults } = useResultsStore();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const effectRan = useRef(false);

  const handleRedirect = useCallback(() => {
    if (!loading && history.length === 0) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (isAuthenticated && effectRan.current === false) {
      fetchHistory();
      return () => {
        effectRan.current = true;
      };
    }
  }, [isAuthenticated, fetchHistory]);

  const handleViewResult = (result: ScreeningResult) => {
    setResults([result]);
    navigate("/results");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          {Array.from({ length: 2 }).map((_, index) => (
            <Card key={index} className="shadow-lg flex flex-col">
              <CardHeader>
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-4">
                  <div>
                    <Skeleton className="h-4 w-1/4 mb-2" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-1/4 mb-2" />
                    <div className="flex flex-wrap gap-2">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-12" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 bg-muted/50 p-4">
                <div>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-10 w-16" />
                </div>
                <Skeleton className="h-12 w-32" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!loading && history.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-sm max-w-md mx-auto mt-8 sm:mt-12">
          <CardContent className="p-6 sm:p-12 text-center">
            <TrendingUp className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground/50 mx-auto mb-6" />
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
              No History to Display
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              It seems there are no past screening results to show right now.
            </p>
            <Button onClick={handleRedirect} className="mt-4">
              Go to Home Page
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="text-center mt-12 mb-8">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-2">
              Screening History
            </h1>
            <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
              A log of all previously screened candidates.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            {history.map((result) => (
              <Card
                key={result.email_address}
                className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <CardHeader>
                  <CardTitle className="text-xl sm:text-2xl">
                    {result.candidate_name}
                  </CardTitle>
                  <CardDescription>{result.recommendation}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">
                        Justification
                      </h4>
                      <p className="font-semibold">
                        {result.justification.slice(0, 100)}...
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">
                        Key Strengths
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {result.key_strengths
                          .slice(0, 5)
                          .map((skill: string) => (
                            <span
                              key={skill}
                              className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full"
                            >
                              {skill.trim()}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 bg-muted/50 p-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Final Score
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold">
                      {result.final_score}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleViewResult(result)}
                    size="md"
                    className="w-full sm:w-auto"
                  >
                    View Full Report
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
