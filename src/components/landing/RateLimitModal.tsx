import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Timer } from "lucide-react";

interface RateLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RateLimitModal = ({ isOpen, onClose }: RateLimitModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30">
            <Timer
              className="h-6 w-6 text-yellow-600 dark:text-yellow-400"
              aria-hidden="true"
            />
          </div>
          <DialogTitle className="text-center mt-4 text-xl font-bold">
            Request Limit Reached
          </DialogTitle>
          <DialogDescription className="text-center px-4 py-2">
            Each user is allowed only 2 screening attempts. Further requests
            cannot be processed.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button onClick={onClose} className="w-full">
            Got It
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
