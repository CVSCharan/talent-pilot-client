import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { TestimonialForm } from "../testimonials/TestimonialForm";

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TestimonialModal({ isOpen, onClose }: TestimonialModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Share Your Feedback
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Your insights are invaluable to us! Please share your experience to
            help enhance our project.
          </DialogDescription>
        </DialogHeader>
        <TestimonialForm />
      </DialogContent>
    </Dialog>
  );
}
