import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "../lib/use-toast";
import { useUserProfileStore } from "../../hooks/use-user-profile";
import useAuthStore from "../../store/auth-store";
import { CardContent, CardHeader, CardTitle } from "../ui/card";

const testimonialSchema = z.object({
  author: z.string().min(2, "Name is too short").max(50, "Name is too long"),
  designation: z
    .string()
    .min(2, "Designation is too short")
    .max(50, "Designation is too long"),
  rating: z.number().min(1, "Rating is required"),
  content: z
    .string()
    .min(10, "Testimonial is too short")
    .max(500, "Testimonial is too long"),
});

export const TestimonialForm = () => {
  const { toast } = useToast();
  const { userProfile } = useUserProfileStore();
  const { isAuthenticated } = useAuthStore();
  const [hovered, setHovered] = useState(0);

  const form = useForm<z.infer<typeof testimonialSchema>>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      author: "",
      designation: "",
      rating: 0,
      content: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated && userProfile) {
      form.setValue("author", userProfile.displayName);
    }
  }, [isAuthenticated, userProfile, form]);

  const onSubmit = async (values: z.infer<typeof testimonialSchema>) => {
    try {
      // Add your submission logic here
      console.log(values);
      toast({
        title: "Success!",
        description: "Your testimonial has been submitted for approval.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit testimonial. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center mt-2">
          Share your valuable feedback
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => {
                        const ratingValue = i + 1;
                        return (
                          <Star
                            key={ratingValue}
                            className={`h-8 w-8 cursor-pointer ${
                              ratingValue <= (hovered || field.value)
                                ? "text-yellow-400"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                            fill={
                              ratingValue <= (hovered || field.value)
                                ? "currentColor"
                                : "none"
                            }
                            onClick={() => field.onChange(ratingValue)}
                            onMouseEnter={() => setHovered(ratingValue)}
                            onMouseLeave={() => setHovered(0)}
                          />
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        {...field}
                        disabled={isAuthenticated && !!userProfile}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="designation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Designation</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Software Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Testimonial</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your experience..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Submit Testimonial
            </Button>
          </form>
        </Form>
      </CardContent>
    </div>
  );
};
