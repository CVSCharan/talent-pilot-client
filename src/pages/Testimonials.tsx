import { useEffect } from "react";
import { useTestimonialsStore } from "../store/testimonials-store";
import { TestimonialCard } from "../components/testimonials/TestimonialCard";
import { TestimonialCardSkeleton } from "../components/testimonials/TestimonialCardSkeleton";
import { Container } from "../components/layout/Container";


import { TestimonialForm } from "../components/testimonials/TestimonialForm";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import useAuthStore from "../store/auth-store";

export const Testimonials = () => {
  const {
    testimonials,
    isLoading: loading,
    error,
    fetchApprovedTestimonials: fetchTestimonials,
  } = useTestimonialsStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials, isAuthenticated]);

  return (
    <Container>
      <div className="space-y-8">
        <section>
          <TestimonialForm />
        </section>

        <section>
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <TestimonialCardSkeleton key={index} />
              ))}
            </div>
          )}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && testimonials.length > 0 && (
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-4xl mx-auto"
            >
              <CarouselContent>
                {testimonials.map((testimonial) => (
                  <CarouselItem
                    key={testimonial._id}
                    className="md:basis-1/2 p-4"
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
          {!loading && !error && testimonials.length === 0 && (
            <p className="text-center text-muted-foreground">
              No testimonials yet. Be the first to leave one!
            </p>
          )}
        </section>
      </div>
    </Container>
  );
};

export default Testimonials;
