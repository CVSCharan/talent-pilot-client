import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Star } from "lucide-react";
import type { Testimonial } from "../../types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const getInitials = (name: string | undefined) => {
  if (!name) return "A";
  const names = name.split(" ");
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <Card className="bg-card/50 dark:bg-card/20 border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      <CardContent className="p-6 flex flex-col flex-grow">
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < testimonial.rating
                  ? "text-yellow-400"
                  : "text-gray-300 dark:text-gray-600"
              }`}
              fill={i < testimonial.rating ? "currentColor" : "none"}
            />
          ))}
        </div>
        <div className="flex items-start space-x-4">
          <Avatar>
            <AvatarFallback>
              {getInitials(testimonial.author || "Anonymous")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div>
              <p className="font-semibold text-lg">
                {testimonial.author || "Anonymous"}
              </p>
              {testimonial.designation && (
                <p className="text-sm text-muted-foreground">
                  {testimonial.designation}
                </p>
              )}
            </div>
          </div>
        </div>
        <blockquote className="mt-4 border-l-2 pl-4 italic text-muted-foreground flex-grow">
          {testimonial.content}
        </blockquote>
      </CardContent>
    </Card>
  );
};