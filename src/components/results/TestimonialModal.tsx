import { useState } from "react";
import { useTestimonialsStore } from "../../store/testimonials-store";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Star } from "lucide-react";
import { useUserProfileStore } from "../../hooks/use-user-profile";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TestimonialModal({ isOpen, onClose }: TestimonialModalProps) {
  const { addTestimonial } = useTestimonialsStore();
  const { userProfile } = useUserProfileStore();
  const [testimonial, setTestimonial] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (testimonial && rating > 0 && userProfile) {
      addTestimonial({ author: userProfile.displayName, testimonial, rating });
      setTestimonial("");
      setRating(0);
      onClose();
    }
  };

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
        {userProfile && (
          <div className="flex items-center space-x-3 mb-4">
            <Avatar>
              <AvatarImage
                src={userProfile.photoUrl}
                alt={userProfile.displayName}
              />
              <AvatarFallback>
                {userProfile.displayName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="text-foreground font-medium">
              {userProfile.displayName}
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="testimonial" className="text-foreground">
              Your Testimonial
            </Label>
            <Textarea
              id="testimonial"
              value={testimonial}
              onChange={(e) => setTestimonial(e.target.value)}
              placeholder="What did you think of our service?"
              required
              className="text-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-foreground">Rating</Label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= rating
                        ? "text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <DialogFooter className="pt-4">
            <Button type="submit">Submit Testimonial</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
