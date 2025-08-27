import {
  FileText,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  Star,
  Zap,
  ShieldAlert,
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  ClipboardList,
  Mail,
  Phone,
  Building,
  Calendar,
  Target,
  TrendingUp,
} from "lucide-react";
import type { IN8nUserResponse } from "../../types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { cn } from "../lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const getRecommendationBadge = (recommendation: string) => {
  const baseClasses = "text-sm font-semibold px-6 py-3";
  switch (recommendation.toLowerCase()) {
    case "yes":
      return (
        <Badge
          variant="default"
          className={cn(baseClasses, "bg-green-500 hover:bg-green-600")}
        >
          <ThumbsUp className="h-4 w-4 mr-2" />
          Recommended
        </Badge>
      );
    case "no":
      return (
        <Badge variant="destructive" className={cn(baseClasses)}>
          <ThumbsDown className="h-4 w-4 mr-2" />
          Not Recommended
        </Badge>
      );
    default:
      return (
        <Badge variant="secondary" className={cn(baseClasses)}>
          <AlertTriangle className="h-4 w-4 mr-2" />
          Further Review
        </Badge>
      );
  }
};

export function ResultsDisplay({
  results,
}: {
  results: IN8nUserResponse[] | null;
}) {
  if (!results || results.length === 0) {
    return (
      <Card className="shadow-sm">
        <CardContent className="p-12 text-center">
          <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            No Results to Display
          </h2>
          <p className="text-muted-foreground">
            Upload a resume and job description to begin analysis.
          </p>
        </CardContent>
      </Card>
    );
  }

  const result = results[0];

  return (
    <div className="space-y-8">
      {/* Executive Header */}
      <Card className="shadow-lg">
        <CardHeader className="p-8 bg-muted/20">
          <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-6">
            <div className="flex-1">
              <CardTitle className="text-3xl mb-4">
                {result.candidateResume.candidateDetails["Candidate Name"]}
              </CardTitle>
              <CardDescription className="flex flex-col sm:flex-row gap-6 text-base">
                <a
                  href={`mailto:${result.candidateResume.candidateDetails["Candidate Email"]}`}
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {result.candidateResume.candidateDetails["Candidate Email"]}
                </a>
                <a
                  href={`tel:${result.candidateResume.candidateDetails["Candidate Contact"]}`}
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {result.candidateResume.candidateDetails["Candidate Contact"]}
                </a>
              </CardDescription>
            </div>
            <div className="flex-shrink-0">
              {getRecommendationBadge(result.results.recommendation)}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Assessment Summary - Full Width */}
      <Card className="shadow-sm">
        <CardHeader className="bg-muted/30">
          <CardTitle className="flex items-center text-2xl">
            <FileText className="h-6 w-6 text-primary mr-3" />
            AI Assessment Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          {/* Score Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 rounded-lg bg-muted/50">
              <div className="flex items-center justify-center mb-3">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Final Score
              </h4>
              <p className="text-4xl font-bold text-primary">
                {result.results.final_score}
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-muted/50">
              <div className="flex items-center justify-center mb-3">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Confidence
              </h4>
              <p className="text-4xl font-bold text-primary">
                {result.results.confidence_score}
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-muted/50">
              <div className="flex items-center justify-center mb-3">
                <User className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Status
              </h4>
              <p className="text-lg font-semibold text-primary">
                {result.results.recommendation}
              </p>
            </div>
          </div>

          {/* Justification */}
          <div className="border-l-4 border-primary p-6 bg-muted/30 rounded-r-lg">
            <h4 className="font-semibold mb-3">Assessment Details</h4>
            <p className="text-muted-foreground leading-relaxed">
              {result.results.justification}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Strengths, Gaps, and Blockers - Professional Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="bg-muted/30">
            <CardTitle className="flex items-center text-lg">
              <Star className="h-5 w-5 text-yellow-500 mr-2" />
              Key Strengths
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {result.results.key_strengths.map((strength, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <Badge variant="outline" className="font-normal text-sm">
                    {strength}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="bg-muted/30">
            <CardTitle className="flex items-center text-lg">
              <Zap className="h-5 w-5 text-orange-500 mr-2" />
              Key Gaps
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {result.results.key_gaps.map((gap, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <Badge variant="outline" className="font-normal text-sm">
                    {gap}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hard Blockers - Full Width Alert */}
      {result.results.hard_blockers.length > 0 && (
        <Card className="shadow-sm border-destructive/50">
          <CardHeader className="bg-destructive/10">
            <CardTitle className="flex items-center text-lg text-destructive">
              <ShieldAlert className="h-5 w-5 mr-2" />
              Critical Concerns
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {result.results.hard_blockers.map((blocker, i) => (
                <div
                  key={i}
                  className="p-3 bg-destructive/10 rounded-md text-destructive"
                >
                  <p className="font-medium">• {blocker}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Professional Details Section - Stacked Layout */}
      <div className="space-y-6">
        {/* Candidate Details */}
        <Card className="shadow-sm">
          <CardHeader className="bg-muted/30">
            <CardTitle className="flex items-center text-xl">
              <User className="h-6 w-6 text-primary mr-3" />
              Candidate Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <Accordion
              type="multiple"
              defaultValue={["summary", "experience", "education", "skills"]}
              className="w-full"
            >
              <AccordionItem value="summary" className="border-b">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  Professional Summary
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-muted-foreground leading-relaxed">
                      {
                        result.candidateResume.candidateDetails[
                          "Resume Summary"
                        ]
                      }
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="experience" className="border-b">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Work Experience
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="space-y-6">
                    {result.candidateResume.candidateDetails.Experience.map(
                      (exp, i) => (
                        <div
                          key={i}
                          className="border-l-4 border-primary/20 pl-6 pb-4"
                        >
                          <h4 className="text-lg font-semibold text-foreground mb-2">
                            {exp["Job Title"]}
                          </h4>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground mb-2">
                            <div className="flex items-center gap-1.5">
                              <Building className="h-4 w-4" />
                              <span className="font-medium">{exp.Company}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {exp["Start Date"]} - {exp["End Date"]}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="education" className="border-b">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Education
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.candidateResume.candidateDetails.Education.map(
                      (edu, i) => (
                        <div key={i} className="p-4 bg-muted/30 rounded-lg">
                          <h4 className="font-semibold text-foreground text-base mb-1">
                            {edu.Degree}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {edu.Institution}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Class of {edu["Graduation Year"]}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="skills">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  <Wrench className="h-5 w-5 mr-2" />
                  Technical Skills
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="flex flex-wrap gap-2">
                    {Object.values(
                      result.candidateResume.candidateDetails[
                        "Technical Skills"
                      ]
                    )
                      .flat()
                      .map((skill, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="font-normal px-3 py-1"
                        >
                          {skill as string}
                        </Badge>
                      ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Job Description Context */}
        <Card className="shadow-sm">
          <CardHeader className="bg-muted/30">
            <CardTitle className="flex items-center text-xl">
              <ClipboardList className="h-6 w-6 text-primary mr-3" />
              Job Requirements Context
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Job Overview */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground text-lg border-b pb-2">
                  Position Overview
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-muted/30 rounded-md">
                    <span className="font-medium text-foreground">
                      Position:
                    </span>
                    <p className="text-muted-foreground">
                      {result.jdContext.jobDetails.positionTitle}
                    </p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-md">
                    <span className="font-medium text-foreground">
                      Seniority:
                    </span>
                    <p className="text-muted-foreground">
                      {result.jdContext.jobDetails.seniorityLevel}
                    </p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-md">
                    <span className="font-medium text-foreground">
                      Experience:
                    </span>
                    <p className="text-muted-foreground">
                      {result.jdContext.jobDetails.minimumExperience}
                    </p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-md">
                    <span className="font-medium text-foreground">
                      Location:
                    </span>
                    <p className="text-muted-foreground">
                      {result.jdContext.jobDetails.preferredLocation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills and Responsibilities */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground text-lg border-b pb-2 mb-4">
                    Required Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.jdContext.jobDetails.requiredSkills.map(
                      (skill, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="font-normal"
                        >
                          {skill}
                        </Badge>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground text-lg border-b pb-2 mb-4">
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
      </div>
    </div>
  );
}
