import { Upload, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import useAuthStore from "../../store/auth-store";
import { AuthPromptModal } from "../layout/AuthPromptModal";
import { useState } from "react";
import { toast } from "../lib/sonner-toast";

interface JobInputFormProps {
  formData: any;
  setFormData: (data: any) => void;
  resume: File | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent) => void;
  loading: boolean;
}

export function JobInputForm({
  formData,
  setFormData,
  resume,
  handleFileChange,
  handleSubmit,
  loading,
}: JobInputFormProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) {
      toast.error("Please upload a resume to continue.");
      return;
    }
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
    } else {
      handleSubmit(e);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input
            id="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            placeholder="e.g., Frontend Developer Intern"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="requiredSkills">Required Skills</Label>
          <Input
            id="requiredSkills"
            value={formData.requiredSkills}
            onChange={handleInputChange}
            placeholder="e.g., React, JavaScript, HTML, CSS"
            required
          />
        </div>
        <div className="lg:col-span-2 space-y-2">
          <Label htmlFor="coreResponsibilities">Core Responsibilities</Label>
          <Textarea
            id="coreResponsibilities"
            value={formData.coreResponsibilities}
            onChange={handleInputChange}
            placeholder="Brief responsibilities for the role"
            rows={4}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bonusSkills">Bonus Skills (Optional)</Label>
          <Input
            id="bonusSkills"
            value={formData.bonusSkills}
            onChange={handleInputChange}
            placeholder="e.g., AWS, Docker, MongoDB"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="seniorityLevel">Seniority Level</Label>
          <Input
            id="seniorityLevel"
            value={formData.seniorityLevel}
            onChange={handleInputChange}
            placeholder="e.g., Intern, Junior, Mid, Senior"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="preferredLocation">Preferred Location</Label>
          <Input
            id="preferredLocation"
            value={formData.preferredLocation}
            onChange={handleInputChange}
            placeholder="e.g., Remote / Hyderabad / Bangalore"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="minimumExperience">Minimum Experience (Years)</Label>
          <Input
            id="minimumExperience"
            type="number"
            value={formData.minimumExperience}
            onChange={handleInputChange}
            placeholder="e.g., 0 for interns"
            required
          />
        </div>
        <div className="lg:col-span-2 space-y-2">
          <Label htmlFor="educationRequirement">Education Requirement</Label>
          <Input
            id="educationRequirement"
            value={formData.educationRequirement}
            onChange={handleInputChange}
            placeholder="e.g., B.Tech in CS/IT or equivalent"
            required
          />
        </div>
      </div>

      <div id="resume-upload" className="space-y-2">
        <Label>Upload CV or Resume</Label>
        <div
          className={`mt-2 p-6 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all ${
            resume
              ? "border-primary bg-primary/5"
              : "border-border/30 bg-input/20 hover:border-primary/50 hover:bg-primary/5"
          }`}
          onClick={() =>
            (
              document.getElementById("resumeUpload") as HTMLInputElement
            )?.click()
          }
        >
          <input
            id="resumeUpload"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="bg-primary/10 p-3 rounded-full mx-auto mb-4 inline-flex">
            <Upload className="h-7 w-7 text-primary" />
          </div>
          <p className="font-semibold text-base mb-1">
            {resume ? resume.name : "Drop your files here or browse"}
          </p>
          <p className="text-sm text-muted-foreground">Supports: PDF only</p>
        </div>
      </div>

      <div className="pt-6">
        <Button
          type="submit"
          disabled={loading || !resume}
          size="lg"
          className="w-full font-bold text-lg tracking-wide shadow-lg hover:shadow-primary/30 transition-all transform hover:-translate-y-1 py-7"
        >
          {loading ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="ml-4">Analyzing...</span>
            </>
          ) : (
            <>
              <span>AI Analyze</span>
            </>
          )}
        </Button>
      </div>

      <AuthPromptModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        jobTitle={formData.jobTitle}
        skills={formData.requiredSkills}
        jobDescription={formData.coreResponsibilities}
      />
    </form>
  );
}
