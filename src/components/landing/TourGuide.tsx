import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Check, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "../ui/drawer";

type TourStep = {
  target: string;
  title: string;
  content: string;
};

const tourSteps: TourStep[] = [
  {
    target: "#job-description",
    title: "Step 1: Define the Job",
    content: "Start by providing the job title, key skills, and a detailed description of the role. The more information you provide, the better the AI can screen candidates.",
  },
  {
    target: "#resume-upload",
    title: "Step 2: Upload Resumes",
    content: "Upload the candidate resumes you want to screen. You can select multiple files at once.",
  },
  {
    target: "#submit-analysis",
    title: "Step 3: Start the Analysis",
    content: "Once you're ready, click the 'Analyze Resumes' button. Our AI will get to work, and you'll be redirected to the results page.",
  },
];

interface TourGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TourGuide({ isOpen, onClose }: TourGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isOpen) {
      highlightElement(tourSteps[currentStep].target);
    }
    return () => {
      unhighlightElement(tourSteps[currentStep].target);
    };
  }, [isOpen, currentStep]);

  const highlightElement = (target: string) => {
    const element = document.querySelector(target);
    if (element) {
      element.classList.add("tour-highlight");
    }
  };

  const unhighlightElement = (target: string) => {
    const element = document.querySelector(target);
    if (element) {
      element.classList.remove("tour-highlight");
    }
  };

  const handleNext = () => {
    unhighlightElement(tourSteps[currentStep].target);
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    unhighlightElement(tourSteps[currentStep].target);
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentTourStep = tourSteps[currentStep];

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              {currentTourStep.title}
            </DrawerTitle>
            <DrawerDescription>{currentTourStep.content}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="flex-row gap-2">
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
            <DrawerClose asChild>
              <Button variant="ghost" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
