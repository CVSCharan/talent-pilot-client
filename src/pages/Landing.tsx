import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { JobInputForm } from "../components/landing/JobInputForm";
import { TourGuide } from "../components/landing/TourGuide";
import { useResultsStore } from "../store/results-store";
import { toast } from "sonner";
import { useFormDataStore } from "../store/form-data-store";
import useAuthStore from "../store/auth-store";
import { Card, CardContent } from "../components/ui/card";
import { jobInputSchema } from "../schemas/jobInputSchema";
import type { ApiResponse } from "../types";
import { RateLimitModal } from "../components/landing/RateLimitModal";
import api from "../lib/api";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";

const Landing = () => {
  const navigate = useNavigate();
  const { setResults, setLoading, loading, setError, setIsRedirecting } =
    useResultsStore();
  const {
    formData,
    resume,
    setResume,
    setFormField,
    clearFormData,
    setEntireFormData,
  } = useFormDataStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const token = useAuthStore((state) => state.token);

  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isRateLimitModalOpen, setIsRateLimitModalOpen] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setResume(event.target.files[0]);
    }
  };

  const handleSubmit = async (event?: React.FormEvent) => {
    event?.preventDefault();

    if (loading) {
      return;
    }

    if (!isAuthenticated) {
      setEntireFormData({ ...formData, pendingSubmission: true });
      navigate("/login");
      return;
    }

    const validationResult = jobInputSchema.safeParse(formData);

    if (!validationResult.success) {
      validationResult.error.errors.forEach((error) => {
        toast.error(error.message);
      });
      return;
    }

    setLoading(true);
    toast.info("Starting AI analysis...", {
      description: "Please wait while we analyze the resumes.",
    });

    try {
      const submissionData = new FormData();
      for (const key in formData) {
        const value = formData[key as keyof typeof formData];
        if (value !== undefined && value !== null) {
          submissionData.append(key, String(value));
        }
      }
      if (resume) {
        submissionData.append("document", resume);
      }

      const response = await api.fetch(
        `${import.meta.env.VITE_BASE_API_URL}/n8n`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: submissionData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Server responded with ${response.status}: ${errorText}`
        );
      }

      const apiResponse: ApiResponse = await response.json();

      setResults(apiResponse.data);
      setLoading(false);
      setIsRedirecting(true);
      toast.success("Analysis complete!", {
        description: "Redirecting to the results page...",
      });
      navigate("/results");
      clearFormData();
    } catch (error: unknown) {
      let errorMessage =
        "An unexpected error occurred. Please try again later.";
      let shouldShowToast = true;

      if (error instanceof Error) {
        if (error.message.includes("Server responded with")) {
          const status = parseInt(error.message.split(" ")[3], 10);
          if (status === 429) {
            setIsRateLimitModalOpen(true);
            shouldShowToast = false;
          } else if (status === 400) {
            errorMessage =
              "There was a problem with your submission. Please check your input and try again.";
          } else if (status === 401) {
            errorMessage =
              "You are not authorized to perform this action. Please log in again.";
          } else if (status === 500) {
            errorMessage =
              "There was a problem with our server. Please try again later.";
          }
        } else if (error.message.includes("fetch")) {
          errorMessage =
            "Could not connect to the server. Please check your internet connection.";
        }
      }

      if (shouldShowToast) {
        toast.error("Analysis failed", {
          description: errorMessage,
        });
      }
      setError(errorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && formData.pendingSubmission) {
      if (!resume) {
        toast.error("Please upload a resume to continue.");
        setEntireFormData({ ...formData, pendingSubmission: false });
        return;
      }
      handleSubmit();
    }
  }, [isAuthenticated, formData.pendingSubmission]);

  return (
    <>
      <TourGuide isOpen={isTourOpen} onClose={() => setIsTourOpen(false)} />
      <RateLimitModal
        isOpen={isRateLimitModalOpen}
        onClose={() => setIsRateLimitModalOpen(false)}
      />
      <div className="container mx-auto px-4 sm:px-6 flex-grow overflow-auto py-8 pt-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            AI Powered Screening
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Streamline your hiring process with our AI-powered candidate
            screening tool. Get detailed analysis and insights in seconds.
          </p>
          <div className="flex justify-center items-center gap-4">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                onClick={() => setIsTourOpen(true)}
                variant="outline"
                size="sm"
                className="mt-6"
              >
                How it Works
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                onClick={() => navigate("/sample-results")}
                variant="outline"
                size="sm"
                className="mt-6"
              >
                Sample Results
              </Button>
            </motion.div>
          </div>
        </div>
        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardContent className="p-8">
            <JobInputForm
              formData={formData}
              setFormData={setFormField}
              resume={resume}
              handleFileChange={handleFileChange}
              handleSubmit={handleSubmit}
              loading={loading}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Landing;
