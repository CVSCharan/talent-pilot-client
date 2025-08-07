import { ChevronRight, FileText, Upload } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import useAuthStore from "../../store/auth-store";
import { useFormDataStore } from "../../store/form-data-store";
import { useNavigate } from "react-router-dom";

interface JobInputFormProps {
  jobDescription: string;
  setJobDescription: (value: string) => void;
  jobTitle: string;
  setJobTitle: (value: string) => void;
  skills: string;
  setSkills: (value: string) => void;
  resumes: File[];
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent) => void;
  loading: boolean;
}

export function JobInputForm({
  jobDescription,
  setJobDescription,
  jobTitle,
  setJobTitle,
  skills,
  setSkills,
  resumes,
  handleFileChange,
  handleSubmit,
  loading,
}: JobInputFormProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { setFormData } = useFormDataStore();
  const navigate = useNavigate();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setFormData({
        jobTitle,
        skills,
        jobDescription,
        resumes,
      });
      navigate("/login");
    } else {
      handleSubmit(e);
    }
  };

  return (
    <Card className="bg-card/60 backdrop-blur-sm border border-border/20 shadow-lg rounded-2xl overflow-hidden">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div id="job-description">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Job Requirements</h3>
            </div>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="jobTitle" className="font-medium text-sm">
                  Job Title
                </Label>
                <Input
                  id="jobTitle"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g., Senior Frontend Developer"
                  className="bg-input/50 border-border/30 rounded-lg"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="skills" className="font-medium text-sm">
                  Key Skills
                </Label>
                <Input
                  id="skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="e.g., React, TypeScript, GraphQL"
                  className="bg-input/50 border-border/30 rounded-lg"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="jobDescription" className="font-medium text-sm">
                  Job Description
                </Label>
                <Textarea
                  id="jobDescription"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the full job description here..."
                  className="bg-input/50 border-border/30 rounded-lg min-h-[120px]"
                  rows={5}
                />
              </div>
            </div>
          </div>

          <div id="resume-upload">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Upload className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Upload Resumes</h3>
            </div>
            <div
              className="p-4 border-2 border-dashed border-border/30 bg-input/20 rounded-lg text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
              onClick={() =>
                (document.getElementById("resumeUpload") as HTMLInputElement)?.click()
              }
            >
              <input
                id="resumeUpload"
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="bg-primary/10 p-2.5 rounded-full mx-auto mb-3 inline-flex">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <p className="font-medium text-sm mb-1">Drop your files here or browse</p>
              <p className="text-xs text-muted-foreground">
                {resumes.length > 0
                  ? `${resumes.length} file(s) selected`
                  : "Supports: PDF, DOC, DOCX"}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-card/20 p-4 border-t border-border/20" id="submit-analysis">
        <Button
          onClick={handleFormSubmit}
          disabled={
            loading ||
            !jobDescription.trim() ||
            resumes.length === 0 ||
            !jobTitle.trim() ||
            !skills.trim()
          }
          size="lg"
          className="w-full font-semibold text-base tracking-wide shadow-lg hover:shadow-primary/20 transition-all transform hover:-translate-y-1"
        >
          {loading ? (
            <>
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span className="ml-3">Analyzing...</span>
            </>
          ) : (
            <>
              <span>Analyze Resumes</span>
              <ChevronRight className="h-5 w-5 ml-2" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
