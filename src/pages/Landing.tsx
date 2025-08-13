import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { JobInputForm } from "../components/landing/JobInputForm";
import { TourGuide } from "../components/landing/TourGuide";
import { useResultsStore } from "../store/results-store";
import { toast } from "sonner";
import type { Results } from "../types";
import { Sparkles } from "lucide-react";
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

    if (!isAuthenticated) {
      // This block should ideally not be reached if AuthPromptModal is used
      // but kept as a fallback or for direct access scenarios
      useFormDataStore.getState().setFormData({
        ...formData,
        pendingSubmission: false, // Ensure this is false if not from a pending submission
      });
      navigate("/login");
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

      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/n8n`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: submissionData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Server responded with ${response.status}: ${errorText}`
        );
      }

      const results: Results = await response.json();
      console.log('Response from API:', results);

      setResults(results);
      toast.success("Analysis complete!", {
        description: "Redirecting to the results page...",
      });
      navigate("/results");
    } catch (error: unknown) {
      console.error("Analysis failed:", error);
      toast.error("Analysis failed", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again later.",
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
      setHasAttemptedSubmit(true); // Mark that we've handled this state
    }
  }, [isAuthenticated, storedFormData?.pendingSubmission, hasAttemptedSubmit]);

  return (
    <>
      <TourGuide isOpen={isTourOpen} onClose={() => setIsTourOpen(false)} />
      <div className="container mx-auto px-4 sm:px-6 flex-grow overflow-auto py-8 pt-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            AI Powered Screening
          </h1>
          <Button
            onClick={() => setIsTourOpen(true)}
            variant="outline"
            size="sm"
            className="mt-4"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Take a Tour
          </Button>
        </div>
        <div className="max-w-7xl mx-auto">
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
        </div>
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
          <div className="flex justify-end space-x-2">
            <Button
              onClick={() => {
                setShowResumeReuploadModal(false);
                clearFormData(); // Clear pending submission if user cancels
              }}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowResumeReuploadModal(false);
                handleSubmit();
                clearFormData(); // Clear pending submission after successful submission
              }}
              disabled={!resume}
            >
              Submit Analysis
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Landing;
