import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { ClipboardList } from "lucide-react";
import type { IN8nUserResponse } from "../../../types";

interface JobRequirementsProps {
  result: IN8nUserResponse;
}

const JobRequirements = memo(({ result }: JobRequirementsProps) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="bg-muted/30">
        <CardTitle className="flex items-center text-xl">
          <ClipboardList className="h-6 w-6 text-primary mr-3" />
          Job Requirement Details
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-lg pb-2">
              Position Overview
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-muted/30 rounded-md">
                <span className="font-medium text-foreground">Position:</span>
                <p className="text-muted-foreground">
                  {result.jdContext.jobDetails.positionTitle}
                </p>
              </div>
              <div className="p-3 bg-muted/30 rounded-md">
                <span className="font-medium text-foreground">Seniority:</span>
                <p className="text-muted-foreground">
                  {result.jdContext.jobDetails.seniorityLevel}
                </p>
              </div>
              <div className="p-3 bg-muted/30 rounded-md">
                <span className="font-medium text-foreground">Experience:</span>
                <p className="text-muted-foreground">
                  {result.jdContext.jobDetails.minimumExperience}
                </p>
              </div>
              <div className="p-3 bg-muted/30 rounded-md">
                <span className="font-medium text-foreground">Location:</span>
                <p className="text-muted-foreground">
                  {result.jdContext.jobDetails.preferredLocation}
                </p>
              </div>
              <div className="p-3 bg-muted/30 rounded-md">
                <span className="font-medium text-foreground">Education:</span>
                <p className="text-muted-foreground">
                  {result.jdContext.jobDetails.educationRequirement}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-foreground text-lg pb-2 mb-4">
                Required Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.jdContext.jobDetails.requiredSkills.map((skill, i) => (
                  <Badge key={i} variant="outline" className="font-normal">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {result.jdContext.jobDetails.bonusSkills &&
              result.jdContext.jobDetails.bonusSkills.length > 0 && (
                <div>
                  <h4 className="font-semibold text-foreground text-lg pb-2 mb-4">
                    Bonus Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.jdContext.jobDetails.bonusSkills.map((skill, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="font-normal"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

            <div>
              <h4 className="font-semibold text-foreground text-lg pb-2 mb-4">
                Key Responsibilities
              </h4>
              <div className="space-y-2">
                {result.jdContext.jobDetails.coreResponsibilities.map(
                  (resp, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {resp}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

export default JobRequirements;
