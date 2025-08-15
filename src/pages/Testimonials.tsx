import { useState } from "react";
import { useTestimonialsStore } from "../store/testimonials-store";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Star, StarHalf } from "lucide-react";

const TestimonialsPage = () => {
  const { testimonials, addTestimonial } = useTestimonialsStore();
  const [author, setAuthor] = useState("");
  const [testimonial, setTestimonial] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (author && testimonial && rating > 0) {
      addTestimonial({ author, testimonial, rating });
      setAuthor("");
      setTestimonial("");
      setRating(0);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-8 text-center">
          Testimonials
        </h1>
        <Card>
          <CardHeader>
            <CardTitle>Leave a Testimonial</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="author">Your Name</Label>
                <Input
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>
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
              <Button type="submit">Submit Testimonial</Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">What Others Are Saying</h2>
          <div className="space-y-6">
            {testimonials.map((t) => (
              <Card key={t.id}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(Math.floor(t.rating))].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400" />
                      ))}
                      {t.rating % 1 !== 0 && (
                        <StarHalf className="h-5 w-5 text-yellow-400" />
                      )}
                    </div>
                  </div>
                  <p className="text-lg text-foreground mb-4">{t.testimonial}</p>
                  <p className="text-md font-semibold text-muted-foreground">- {t.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;