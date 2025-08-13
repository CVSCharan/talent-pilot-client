import { useEffect, useState } from "react";
import { ResultsDisplay } from "../components/results/ResultsDisplay";
import { useResultsStore } from "../store/results-store";

const ResultsPage = () => {
  const { results, loading, hasHydrated } = useResultsStore();
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (hasHydrated) {
      setShowResults(true);
    }
  }, [hasHydrated]);

  return (
    <div className="min-h-screen bg-background">
      {/* Professional Header */}
      <div className="bg-card shadow-sm border-b border-border">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Candidate Screening Results
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive AI-powered analysis and ranking of candidates based
              on job requirements and qualifications
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {showResults ? (
            <ResultsDisplay loading={loading} results={results} />
          ) : (
            <div className="bg-card rounded-lg shadow-sm border border-border p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Processing Results
              </h2>
              <p className="text-muted-foreground">
                Please wait while we analyze and compile the screening
                results...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;