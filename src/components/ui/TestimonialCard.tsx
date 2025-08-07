import { Card, CardContent, CardFooter } from "./card";

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
}

export const TestimonialCard = ({ quote, name, title }: TestimonialCardProps) => {
  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <p className="text-lg font-medium text-foreground/80">"{quote}"</p>
      </CardContent>
      <CardFooter className="p-6 border-t border-border/40">
        <div className="flex flex-col">
          <p className="text-base font-semibold text-foreground">{name}</p>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </CardFooter>
    </Card>
  );
};
