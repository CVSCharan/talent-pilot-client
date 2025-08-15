import { useState } from "react";
import { useTestimonialsStore } from "../../store/testimonials-store";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Star } from "lucide-react";
import useAuthStore from "../../store/auth-store";

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TestimonialModal({ isOpen, onClose }: TestimonialModalProps) {
  const { addTestimonial } = useTestimonialsStore();
  const { user } = useAuthStore();
  const [testimonial, setTestimonial] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (testimonial && rating > 0 && user) {
      addTestimonial({ author: user.displayName, testimonial, rating });
      setTestimonial("");
      setRating(0);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave a Testimonial</DialogTitle>
          <DialogDescription>
            We'd love to hear your feedback on our service.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="testimonial">Your Testimonial</Label>
            <Textarea
              id="testimonial"
              value={testimonial}
              onChange={(e) => setTestimonial(e.target.value)}
              placeholder="What did you think of our service?"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-6 w-6 ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                  />
                </button>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Submit Testimonial</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
