import { Dialog, DialogContent } from "../ui/dialog";
import { TestimonialForm } from "../testimonials/TestimonialForm";

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TestimonialModal({ isOpen, onClose }: TestimonialModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <TestimonialForm />
      </DialogContent>
    </Dialog>
  );
}
