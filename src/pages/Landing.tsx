import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { JobInputForm } from "../components/landing/JobInputForm";
import { TourGuide } from "../components/landing/TourGuide";
import { useResultsStore } from "../store/results-store";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { useFormDataStore } from "../store/form-data-store";
import useAuthStore from "../store/auth-store";
import { ResumeReuploadPrompt } from "../components/landing/ResumeReuploadPrompt";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Card, CardContent } from "../components/ui/card";
import { jobInputSchema } from "../schemas/jobInputSchema";
import type { ApiResponse } from "../types";

const Landing = () => {
  const navigate = useNavigate();
  const { setResults, setLoading, loading } = useResultsStore();
  const storedFormData = useFormDataStore((state) => state.formData);
  const clearFormData = useFormDataStore((state) => state.clearFormData);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const token = useAuthStore((state) => state.token);

  const initialFormData = {
    jobTitle: "",
    requiredSkills: "",
    coreResponsibilities: "",
    seniorityLevel: "",
    preferredLocation: "",
    minimumExperience: "",
    educationRequirement: "",
    bonusSkills: "",
  };

  const [formData, setFormData] = useState({
    ...initialFormData,
    ...storedFormData,
  });

  const [resume, setResume] = useState<File | null>(null);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [showResumeReuploadModal, setShowResumeReuploadModal] = useState(false);

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
      useFormDataStore.getState().setFormData({
        ...formData,
        pendingSubmission: true,
      });
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

      // const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/n8n`, {
      const response = await fetch(
        `http://localhost:5678/webhook-test/505c5ad8-c545-48cd-8ef0-e779a6899391`,
        {
          method: "POST",
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
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
      toast.success("Analysis complete!", {
        description: "Redirecting to the results page...",
      });
      navigate("/results");
      clearFormData();
    } catch (error: unknown) {
      let errorMessage =
        "An unexpected error occurred. Please try again later.";
      if (error instanceof Error) {
        if (error.message.includes("Server responded with")) {
          const status = parseInt(error.message.split(" ")[3], 10);
          if (status === 400) {
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

      toast.error("Analysis failed", {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      isAuthenticated &&
      storedFormData?.pendingSubmission &&
      !hasAttemptedSubmit
    ) {
      setShowResumeReuploadModal(true);
      setHasAttemptedSubmit(true);
    }
  }, [isAuthenticated, storedFormData?.pendingSubmission, hasAttemptedSubmit]);

  return (
    <>
      <TourGuide isOpen={isTourOpen} onClose={() => setIsTourOpen(false)} />
      <div className="container mx-auto px-4 sm:px-6 flex-grow overflow-auto py-8 pt-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            AI Powered Screening
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Streamline your hiring process with our AI-powered candidate
            screening tool. Get detailed analysis and insights in seconds.
          </p>
          <Button
            onClick={() => setIsTourOpen(true)}
            variant="outline"
            size="sm"
            className="mt-6"
          >
            Take a Tour
          </Button>
        </div>
        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardContent className="p-8">
            {isAuthenticated &&
              storedFormData?.jobTitle &&
              !storedFormData?.pendingSubmission && (
                <ResumeReuploadPrompt
                  handleFileChange={handleFileChange}
                  resume={resume}
                />
              )}
            <JobInputForm
              formData={formData}
              setFormData={setFormData}
              resume={resume}
              handleFileChange={handleFileChange}
              handleSubmit={handleSubmit}
              loading={loading}
            />
          </CardContent>
        </Card>
      </div>

      {/* Resume Re-upload Modal */}
      <Dialog
        open={showResumeReuploadModal}
        onOpenChange={setShowResumeReuploadModal}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Re-upload Resumes</DialogTitle>
            <DialogDescription>
              Please re-upload your resumes to complete the analysis.
            </DialogDescription>
          </DialogHeader>
          <ResumeReuploadPrompt
            handleFileChange={handleFileChange}
            resume={resume}
          />
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              onClick={() => {
                setShowResumeReuploadModal(false);
                clearFormData();
              }}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowResumeReuploadModal(false);
                handleSubmit();
                clearFormData();
              }}
              disabled={loading || !resume}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="ml-2">Analyzing...</span>
                </>
              ) : (
                "Submit Analysis"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Landing;
