import { useRef, useState, useEffect } from "react";
import { CheckCircle, FileText, AlertTriangle, ThumbsUp, ThumbsDown, TrendingUp, Mail, Phone, Star, Zap, ShieldAlert, Info } from "lucide-react";
import type { ScreeningResult } from "../../types";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";

interface ResultsDisplayProps {
  loading: boolean;
  results: ScreeningResult[] | null;
}

const SectionHeader = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <div className="flex items-center gap-3 mb-4">
    {icon}
    <h3 className="text-xl font-semibold text-foreground">{title}</h3>
  </div>
);

const ScoreCard = ({ title, score, explanation }: { title: string; score: number; explanation: React.ReactNode }) => {
  const [height, setHeight] = useState<number | undefined>(undefined);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frontHeight = frontRef.current?.scrollHeight;
    const backHeight = backRef.current?.scrollHeight;
    setHeight(Math.max(frontHeight || 0, backHeight || 0));
  }, [explanation]);

  return (
    <div className="group [perspective:1000px]">
      <div 
        className="relative w-full rounded-2xl shadow-lg transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
        style={{ height }}
      >
        {/* Front of the card */}
        <div ref={frontRef} className="absolute inset-0 bg-card p-6 rounded-2xl border shadow-sm [backface-visibility:hidden]">
          <h4 className="text-md font-semibold text-muted-foreground mb-3 text-center">{title}</h4>
          <div className="relative w-32 h-32 mx-auto">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                className="text-border"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                className="text-primary"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray={`${score}, 100`}
                strokeDashoffset="0"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-foreground">{score}</span>
            </div>
          </div>
        </div>
        {/* Back of the card */}
        <div ref={backRef} className="absolute inset-0 bg-card p-6 rounded-2xl border shadow-sm [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <h4 className="text-md font-semibold text-muted-foreground mb-3 text-center">{title}</h4>
          <div className="text-sm text-muted-foreground pb-2">
            {explanation}
          </div>
        </div>
      </div>
    </div>
  );
};

export function ResultsDisplay({ loading, results }: ResultsDisplayProps) {
  const getRecommendationPill = (recommendation: string) => {
    switch (recommendation.toLowerCase()) {
      case "yes":
        return (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">
            <ThumbsUp className="h-4 w-4" />
            <span className="font-semibold">Recommended</span>
          </div>
        );
      case "no":
        return (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300">
            <ThumbsDown className="h-4 w-4" />
            <span className="font-semibold">Not Recommended</span>
          </div>
        );
      case "maybe":
        return (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300">
            <AlertTriangle className="h-4 w-4" />
            <span className="font-semibold">Maybe</span>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Replace with a proper skeleton loader
  }

  if (!results || results.length === 0) {
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

  return (
    <div className="space-y-12">
      {results.map((result, index) => (
        <div key={index} className="bg-card text-card-foreground rounded-3xl shadow-lg border">
          <div className="p-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
                  {result.candidate_name}
                </h2>
                <div className="flex items-center flex-wrap gap-x-6 gap-y-2 text-muted-foreground mt-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{result.email_address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{result.contact_number}</span>
                  </div>
                </div>
              </div>
              {getRecommendationPill(result.recommendation)}
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            <div className="lg:col-span-2 space-y-10">
              <section>
                <SectionHeader icon={<FileText className="h-6 w-6 text-primary" />} title="Justification" />
                <div className="prose prose-gray dark:prose-invert max-w-none text-muted-foreground leading-7">
                  <p>{result.justification}</p>
                </div>
              </section>

              <Separator />

              <section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <SectionHeader icon={<Star className="h-6 w-6 text-yellow-500" />} title="Key Strengths" />
                    <ul className="space-y-3">
                      {result.key_strengths.map((strength, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-muted-foreground">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <SectionHeader icon={<Zap className="h-6 w-6 text-red-500" />} title="Key Gaps" />
                    <ul className="space-y-3">
                      {result.key_gaps.map((gap, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-orange-500 mt-1 flex-shrink-0" />
                          <span className="text-muted-foreground">{gap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {result.hard_blockers.length > 0 && (
                <>
                  <Separator />
                  <section>
                    <SectionHeader icon={<ShieldAlert className="h-6 w-6 text-red-700" />} title="Hard Blockers" />
                    <div className="bg-destructive/10 border-l-4 border-destructive p-4 rounded-r-lg">
                      <ul className="space-y-3">
                        {result.hard_blockers.map((blocker, i) => (
                          <li key={i} className="flex items-start gap-3 font-medium text-destructive">
                            <Info className="h-5 w-5 mt-1 flex-shrink-0" />
                            <span>{blocker}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>
                </>
              )}
            </div>

            <aside className="space-y-8 lg:border-l lg:pl-8">
              <ScoreCard 
                title="Final Score" 
                score={result.final_score} 
                explanation={
                  <p className="max-w-xs">
                    This is the candidate’s evaluation score (out of 100) based on how well they match the job requirements. 
                    It reflects their actual fit for the role. 
                    <br /><br />
                    <strong>Example:</strong> 62 → means the candidate matches 62% of the expected role requirements.
                  </p>
                }
              />
              <ScoreCard 
                title="Confidence Score" 
                score={result.confidence_score} 
                explanation={
                  <p className="max-w-xs">
                    This is the system’s certainty about the accuracy of that evaluation. It represents how confident the screener is that the final_score is correct.
                    <br /><br />
                    <strong>Example:</strong> 72 → means the evaluator is 72% confident that their scoring is reliable.
                  </p>
                }
              />
            </aside>
          </div>
        </div>
      ))}
    </div>
  );
}
