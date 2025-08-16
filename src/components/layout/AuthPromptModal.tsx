import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useFormDataStore } from "../../store/form-data-store";

interface AuthPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  skills: string;
  jobDescription: string; // This will be the coreResponsibilities
}

export function AuthPromptModal({
  isOpen,
  onClose,
  jobTitle,
  skills, // Renamed from requiredSkills for simplicity
  jobDescription, // Renamed from coreResponsibilities for simplicity
}: AuthPromptModalProps) {
  const navigate = useNavigate();
  const { setFormData } = useFormDataStore();

  const handleLoginClick = () => {
    setFormData({
      jobTitle,
      requiredSkills: skills,
      coreResponsibilities: jobDescription,
      pendingSubmission: true,
    });
    onClose();
    navigate("/login");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-foreground">Login Required</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Please log in to analyze your resumes. Your entered job
            details will be saved.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onClose} className="text-foreground">
            Cancel
          </Button>
          <Button onClick={handleLoginClick}>Login</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
