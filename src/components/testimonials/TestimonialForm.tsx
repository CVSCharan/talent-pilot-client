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
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { testimonialSchema } from "../../schemas/testimonialSchema";

export const TestimonialForm = () => {
  const { toast } = useToast();
  const { userProfile } = useUserProfileStore();
  const { isAuthenticated, token, user } = useAuthStore();
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
    let postData: {
      authorName: string; // Always send authorName
      designation: string;
      rating: number;
      content: string;
    } = {
      authorName:
        isAuthenticated && userProfile
          ? userProfile.displayName
          : values.author, // Use display name if authenticated, else form value
      designation: values.designation,
      rating: values.rating,
      content: values.content,
    };

    console.log("Sending postData:", postData);
    console.log("isAuthenticated:", isAuthenticated);
    console.log("token:", token);
    console.log("user:", user);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/testimonials`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }), // Only add Authorization header if token exists
          },
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit testimonial");
      }

      toast({
        title: "Success! ",
        description: "Your testimonial has been submitted for approval.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="max-w-2xl mx-auto my-4">
      <CardHeader>
        <CardTitle className="text-center">
          Submit your valuable Feedback
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
    </Card>
  );
};
