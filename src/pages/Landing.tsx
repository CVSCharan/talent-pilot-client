import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { JobInputForm } from "../components/landing/JobInputForm";
import { TourGuide } from "../components/landing/TourGuide";
import { useResultsStore } from "../store/results-store";
import { toast } from "sonner";
import type { Results } from "../types";
import { Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";

const Landing = () => {
  const navigate = useNavigate();
  const { setResults, setLoading, loading } = useResultsStore();
  const [jobDescription, setJobDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [resumes, setResumes] = useState<File[]>([]);
  const [isTourOpen, setIsTourOpen] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setResumes(Array.from(event.target.files));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    toast.info("Starting AI analysis...", {
      description: "Please wait while we analyze the resumes.",
    });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const mockResults: Results = {
        totalResumes: resumes.length,
        processed: resumes.length,
        matches: [
          {
            name: "Sarah Johnson",
            score: 92,
            experience: "5 years",
            skills: ["React", "Node.js", "Python"],
            status: "Excellent Match",
          },
          {
            name: "Michael Chen",
            score: 87,
            experience: "3 years",
            skills: ["JavaScript", "React", "AWS"],
            status: "Good Match",
          },
          {
            name: "Emily Rodriguez",
            score: 76,
            experience: "4 years",
            skills: ["Python", "Django", "SQL"],
            status: "Potential Match",
          },
        ],
      };
      setResults(mockResults);
      toast.success("Analysis complete!", {
        description: "Redirecting to the results page...",
      });
      navigate("/results");
    } catch (error: unknown) {
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
        <div className="max-w-3xl mx-auto">
          <JobInputForm
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            jobTitle={jobTitle}
            setJobTitle={setJobTitle}
            skills={skills}
            setSkills={setSkills}
            resumes={resumes}
            handleFileChange={handleFileChange}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default Landing;
