import { ChevronRight, Upload } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import useAuthStore from "../../store/auth-store";
import { AuthPromptModal } from "../layout/AuthPromptModal";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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

  const handleSelectChange = (id: string, value: string) => {
    setFormData({ ...formData, [id]: value });
  };

  return (
    <Card id="job-context" className="w-full">
      <CardContent className="space-y-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              placeholder="e.g., Frontend Developer Intern"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="requiredSkills">Required Skills</Label>
            <Input
              id="requiredSkills"
              value={formData.requiredSkills}
              onChange={handleInputChange}
              placeholder="e.g., React, JavaScript, HTML, CSS"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="coreResponsibilities">Core Responsibilities</Label>
          <Textarea
            id="coreResponsibilities"
            value={formData.coreResponsibilities}
            onChange={handleInputChange}
            placeholder="Brief responsibilities for the role"
            rows={4}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="seniorityLevel">Seniority Level</Label>
            <Select
              onValueChange={(value) =>
                handleSelectChange("seniorityLevel", value)
              }
              value={formData.seniorityLevel}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select seniority level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Intern">Intern</SelectItem>
                <SelectItem value="Junior">Junior</SelectItem>
                <SelectItem value="Mid">Mid</SelectItem>
                <SelectItem value="Senior">Senior</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="preferredLocation">Preferred Location</Label>
            <Input
              id="preferredLocation"
              value={formData.preferredLocation}
              onChange={handleInputChange}
              placeholder="e.g., Remote / Hyderabad / Bangalore"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="minimumExperience">
              Minimum Experience (Years)
            </Label>
            <Input
              id="minimumExperience"
              type="number"
              value={formData.minimumExperience}
              onChange={handleInputChange}
              placeholder="e.g., 0 for interns"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="educationRequirement">Education Requirement</Label>
            <Input
              id="educationRequirement"
              value={formData.educationRequirement}
              onChange={handleInputChange}
              placeholder="e.g., B.Tech in CS/IT or equivalent"
            />
          </div>
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
        <div id="resume-upload">
          <Label>Upload CV or Resume</Label>
          <div
            className="mt-2 p-6 border-2 border-dashed border-border/30 bg-input/20 rounded-xl text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
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
              Drop your files here or browse
            </p>
            <p className="text-sm text-muted-foreground">
              {resume ? resume.name : "Supports: PDF only"}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter id="submit-analysis" className="p-4">
        <Button
          onClick={handleFormSubmit}
          disabled={
            loading ||
            !formData.jobTitle?.trim() ||
            !formData.requiredSkills?.trim() ||
            !formData.coreResponsibilities?.trim() ||
            !resume
          }
          size="lg"
          className="w-full font-bold text-lg tracking-wide shadow-lg hover:shadow-primary/30 transition-all transform hover:-translate-y-1 py-7"
        >
          {loading ? (
            <>
              <div className="h-6 w-6 rounded-full animate-spin"></div>
              <span className="ml-4">Analyzing...</span>
            </>
          ) : (
            <>
              <span>Analyze Resumes</span>
              <ChevronRight className="h-6 w-6 ml-3" />
            </>
          )}
        </Button>
      </CardFooter>
      <AuthPromptModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        jobTitle={formData.jobTitle}
        skills={formData.requiredSkills}
        jobDescription={formData.coreResponsibilities} // Changed to coreResponsibilities
      />
    </Card>
  );
}
