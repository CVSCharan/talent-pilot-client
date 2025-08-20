import { useEffect, useState, useRef } from "react";
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
  type CarouselApi,
} from "../components/ui/carousel";
import useAuthStore from "../store/auth-store";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useIsMobile } from "../hooks/use-mobile";
import Autoplay from "embla-carousel-autoplay";

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
  const [api, setApi] = useState<CarouselApi>();
  const [canScroll, setCanScroll] = useState(false);
  const isMobile = useIsMobile();

  const autoplayPlugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  useEffect(() => {
    fetchTestimonials();
    if (isAuthenticated) {
      checkHasTestimonial();
    }
  }, [fetchTestimonials, isAuthenticated, checkHasTestimonial]);

  useEffect(() => {
    if (!api) {
      return;
    }

    const updateScrollability = () => {
      const slidesInView = isMobile ? 1 : 2;
      const totalSlides = api.scrollSnapList().length;
      setCanScroll(totalSlides > slidesInView);
    };

    updateScrollability();

    api.on("select", updateScrollability);
    api.on("reInit", updateScrollability);

    return () => {
      api.off("select", updateScrollability);
      api.off("reInit", updateScrollability);
    };
  }, [api, isMobile]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, index) => (
            <TestimonialCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (error) {
      return <p className="text-red-500">{error}</p>;
    }

    if (testimonials.length === 0) {
      return (
        <p className="text-center text-muted-foreground">
          No testimonials yet. Be the first to leave one!
        </p>
      );
    }

    if (isMobile && testimonials.length === 1) {
      return (
        <div className="max-w-md mx-auto p-4">
          <TestimonialCard testimonial={testimonials[0]} />
        </div>
      );
    }

    return (
      <Carousel
        setApi={setApi}
        plugins={[autoplayPlugin.current]}
        opts={{
          align: isMobile ? "center" : "start",
          loop: testimonials.length > (isMobile ? 1 : 2),
        }}
        className="w-full max-w-4xl mx-auto"
      >
        <CarouselContent className={isMobile ? "ml-0" : ""}>
          {testimonials.map((testimonial) => (
            <CarouselItem
              key={testimonial._id}
              className={isMobile ? "pl-0" : "md:basis-1/2"}
            >
              <div className="p-4">
                <TestimonialCard testimonial={testimonial} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {!isMobile && canScroll && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
        {isMobile && canScroll && (
          <div className="flex items-center justify-center space-x-4 mt-4">
            <CarouselPrevious
              variant="outline"
              className="relative static transform-none -left-0 top-auto"
            />
            <CarouselNext
              variant="outline"
              className="relative static transform-none -right-0 top-auto"
            />
          </div>
        )}
      </Carousel>
    );
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 flex-grow overflow-auto py-8 pt-12">
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
                    You have already submitted a testimonial. Thank you for your
                    feedback!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <TestimonialForm />
            )
          ) : (
            <TestimonialForm />
          )}

          <section>{renderContent()}</section>
        </div>
      </Container>
    </div>
  );
};

export default Testimonials;

