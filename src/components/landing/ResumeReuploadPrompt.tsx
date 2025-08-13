import { Upload } from "lucide-react";

interface ResumeReuploadPromptProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resume: File | null;
}

export function ResumeReuploadPrompt({
  handleFileChange,
  resume,
}: ResumeReuploadPromptProps) {
  return (
    <div className="bg-card/60 backdrop-blur-sm border border-border/20 shadow-lg rounded-2xl p-6 mb-6">
      <h3 className="text-lg font-semibold mb-3">
        Welcome back! Please re-upload your resumes.
      </h3>
      <p className="text-muted-foreground mb-4">
        Your job details have been restored. To continue the analysis, please
        re-upload the resumes.
      </p>
      <div
        className="p-4 border-2 border-dashed border-border/30 bg-input/20 rounded-lg text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
        onClick={() =>
          (document.getElementById("resumeReupload") as HTMLInputElement)?.click()
        }
      >
        <input
          id="resumeReupload"
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="bg-primary/10 p-2.5 rounded-full mx-auto mb-3 inline-flex">
          <Upload className="h-6 w-6 text-primary" />
        </div>
        <p className="font-medium text-sm mb-1">
          Drop your file here or browse
        </p>
        <p className="text-xs text-muted-foreground">
          {resume ? resume.name : "Supports: PDF only"}
        </p>
      </div>
    </div>
  );
}
