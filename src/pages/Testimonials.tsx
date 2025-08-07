import { Link } from "react-router-dom";
import { TestimonialForm } from "../components/testimonials/TestimonialForm";
import { TestimonialCard } from "../components/ui/TestimonialCard";
import useAuthStore from "../store/auth-store";

const testimonials = [
  {
    quote: "This service is amazing! It has saved me so much time and effort.",
    name: "John Doe",
    title: "CEO, Example Inc.",
  },
  {
    quote:
      "I can't imagine working without it. It's an essential tool for my team.",
    name: "Jane Smith",
    title: "Marketing Manager, Another Co.",
  },
];

const Testimonials = () => {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <main className="flex items-center justify-center bg-background pt-12">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 z-0 pointer-events-none"></div>
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-24 relative z-10">
        <h1 className="text-4xl font-bold text-center mb-8">Testimonials</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
        {isAuthenticated && user ? (
          <TestimonialForm user={user} />
        ) : (
          <div className="text-center">
            <p className="text-lg text-muted-foreground">
              You must be logged in to post a testimonial.
            </p>
            <Link to="/login" className="text-primary underline">
              Login to share your feedback
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default Testimonials;
