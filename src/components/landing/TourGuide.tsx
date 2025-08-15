import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Check, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Progress } from "../ui/progress";

type TourStep = {
  title: string;
  content: string;
};

const tourSteps: TourStep[] = [
  {
    title: "Step 1: Define the Job",
    content:
      "Start by providing the job details. The more information you provide, the better the AI can screen candidates.",
  },
  {
    title: "Step 2: Upload CV or Resume",
    content:
      "Upload the candidate CV or Resume you want to screen. You can select one file at a time.",
  },
  {
    title: "Step 3: Start the Analysis",
    content:
      "Once you're ready, click the 'Analyze Resumes' button. Our AI will get to work, and you'll be redirected to the results page.",
  },
];

interface TourGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TourGuide({ isOpen, onClose }: TourGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) {
    return null;
  }

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentTourStep = tourSteps[currentStep];
  const progress = ((currentStep + 1) / tourSteps.length) * 100;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center backdrop-blur-sm">
      <Card className="w-full max-w-md m-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">TalentPilot App Tour</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Step {currentStep + 1} of {tourSteps.length}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Progress value={progress} className="w-full mt-4 h-2" />
        </CardHeader>
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            {currentTourStep.title}
          </h3>
          <p className="text-muted-foreground">{currentTourStep.content}</p>
        </CardContent>
        <CardFooter className="flex-row gap-2 p-4 bg-card/50">
          {currentStep > 0 && (
            <Button variant="outline" onClick={handlePrev}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
          )}
          <Button onClick={handleNext} className="flex-1">
            {currentStep < tourSteps.length - 1 ? (
              <>
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </>
            ) : (
              <>
                Finish Tour
                <Check className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
