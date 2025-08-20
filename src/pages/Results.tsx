import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResultsDisplay } from "../components/results/ResultsDisplay";
import { ResultsSkeleton } from "../components/results/ResultsSkeleton";
import { TestimonialModal } from "../components/results/TestimonialModal";
import { useResultsStore } from "../store/results-store";
import useAuthStore from "../store/auth-store";

const ResultsPage = () => {
  const { results, loading } = useResultsStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);

  useEffect(() => {
    if (!loading && !results) {
      navigate("/");
    }
  }, [results, loading, navigate]);

  useEffect(() => {
    const checkTestimonial = async () => {
      if (isAuthenticated) {
        try {
          const token = useAuthStore.getState().token;
          const response = await fetch(
            `${import.meta.env.VITE_BASE_API_URL}/testimonials/has-testimonial`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          if (!data.hasTestimonial) {
            setTimeout(() => {
              setIsTestimonialModalOpen(true);
            }, 60000); // Open modal after 60 seconds (1 minute)
          }
        } catch (error) {
          console.error("Failed to check testimonial status:", error);
        }
      }
    };

    checkTestimonial();
  }, [isAuthenticated]);

  if (loading || !results) {
    return <ResultsSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Professional Header */}
      <div className="text-center mt-12 mb-8">
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
          <ResultsDisplay loading={loading} results={results} />
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
