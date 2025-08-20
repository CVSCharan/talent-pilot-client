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
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export const Testimonials = () => {
  const {
    testimonials,
    isLoading: loading,
    error,
    fetchApprovedTestimonials: fetchTestimonials,
    hasTestimonial,
    checkHasTestimonial,
  } = useTestimonialsStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    fetchTestimonials();
    if (isAuthenticated) {
      checkHasTestimonial();
    }
  }, [fetchTestimonials, isAuthenticated, checkHasTestimonial]);

  return (
    <Container>
      <div className="space-y-12">
        {isAuthenticated ? (
          hasTestimonial ? (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-center">Thank You!</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  You have already submitted a testimonial. Thank you for your feedback!
                </p>
              </CardContent>
            </Card>
          ) : (
            <TestimonialForm />
          )
        ) : (
          <TestimonialForm />
        )}

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