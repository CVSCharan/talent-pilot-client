import { useEffect, useState } from "react";
import { ResultsDisplay } from "../components/results/ResultsDisplay";
import { ResultsSkeleton } from "../components/results/ResultsSkeleton";
import { TestimonialModal } from "../components/results/TestimonialModal";
import { useResultsStore } from "../store/results-store";
import useAuthStore from "../store/auth-store";

const ResultsPage = () => {
  const { results, loading, hasHydrated } = useResultsStore();
  const { isAuthenticated } = useAuthStore();
  const [showResults, setShowResults] = useState(false);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);

  useEffect(() => {
    if (hasHydrated) {
      setShowResults(true);
      if (isAuthenticated) {
        setTimeout(() => {
          setIsTestimonialModalOpen(true);
        }, 3000); // Open modal after 3 seconds
      }
    }
  }, [hasHydrated, isAuthenticated]);

  return (
    <div className="min-h-screen bg-background">
      {/* Professional Header */}
      <div className="bg-card shadow-sm border-b border-border">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-2">
              Candidate Screening Results
            </h1>
            <p className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto">
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
            <ResultsSkeleton />
          )}
        </div>
      </div>
      <TestimonialModal
        isOpen={isTestimonialModalOpen}
        onClose={() => setIsTestimonialModalOpen(false)}
      />
    </div>
  );
};

export default ResultsPage;