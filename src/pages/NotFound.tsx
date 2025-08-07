import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const NotFound = () => {
  return (
    <main className="flex items-center justify-center bg-background pt-12">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 z-0 pointer-events-none"></div>
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-24 relative z-10 flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <p className="text-2xl md:text-3xl font-light text-muted-foreground mt-4">
            Page Not Found
          </p>
          <p className="mt-6 text-lg text-foreground/80">
            Sorry, the page you are looking for does not exist.
          </p>
          <Button asChild className="mt-8">
            <Link to="/">Go back to Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
