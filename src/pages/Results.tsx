import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResultsDisplay } from "../components/results/ResultsDisplay";
import { ResultsSkeleton } from "../components/results/ResultsSkeleton";
import { TestimonialModal } from "../components/results/TestimonialModal";
import { useResultsStore } from "../store/results-store";
import useAuthStore from "../store/auth-store";
import { useTestimonialsStore } from "../store/testimonials-store";

const ResultsPage = () => {
  const { results, loading, isRedirecting, setIsRedirecting } = useResultsStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);

  useEffect(() => {
    if (!loading && results === null && !isRedirecting) {
      navigate("/");
    }
    setIsRedirecting(false);
  }, [results, loading, navigate, isRedirecting, setIsRedirecting]);

  useEffect(() => {
    if (isAuthenticated) {
      useTestimonialsStore.getState().checkHasTestimonial();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const unsubscribe = useTestimonialsStore.subscribe((state) => {
      if (!state.hasTestimonial && state.hasTestimonialChecked) {
        const timer = setTimeout(() => {
          setIsTestimonialModalOpen(true);
        }, 60000); // Open modal after 60 seconds (1 minute)
        return () => clearTimeout(timer);
      }
    });

    return unsubscribe;
  }, []);

  if (isRedirecting || !results) {
    return <ResultsSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Professional Header */}
      <div className="text-center mt-12 mb-4">
        <div className="container mx-auto px-6 pt-8 pb-4">
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
      <div className="container mx-auto px-6 pb-12 pt-6">
        <div className="max-w-6xl mx-auto">
          <ResultsDisplay results={results} />
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