import {
  FileText,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  TrendingUp,
  Mail,
  Phone,
  Star,
  Zap,
  ShieldAlert,
  Info,
  Briefcase,
  GraduationCap,
  Wrench,
  Award,
  Lightbulb,
  User,
  Building,
  Calendar,
  ClipboardList,
} from "lucide-react";
import type { IN8nUserResponse } from "../../types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

interface ResultsDisplayProps {
  loading: boolean;
  results: IN8nUserResponse[] | null;
}

const SectionHeader = ({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) => (
  <div className="flex items-center gap-3 mb-4">
    {icon}
    <h3 className="text-xl font-semibold text-foreground">{title}</h3>
  </div>
);

const ScoreDisplay = ({ title, score }: { title: string; score: string }) => (
  <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-card">
    <h4 className="text-sm font-medium text-muted-foreground mb-2">{title}</h4>
    <p className="text-4xl font-bold text-primary">{score}</p>
  </div>
);

export function ResultsDisplay({ loading, results }: ResultsDisplayProps) {
  const getRecommendationPill = (recommendation: string) => {
    switch (recommendation.toLowerCase()) {
      case "yes":
        return (
          <Badge variant="default" className="bg-green-500 hover:bg-green-600">
            <ThumbsUp className="h-4 w-4 mr-2" />
            Recommended
          </Badge>
        );
      case "no":
        return (
          <Badge variant="destructive">
            <ThumbsDown className="h-4 w-4 mr-2" />
            Not Recommended
          </Badge>
        );
      case "maybe":
        return (
          <Badge variant="secondary">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Maybe
          </Badge>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Replace with a proper skeleton loader
  }

  if (!results || results.length === 0) {
    return (
      <Card className="shadow-sm">
        <CardContent className="p-12 text-center">
          <TrendingUp className="h-16 w-16 text-muted-foreground/50 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            No Results to Display
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            It seems there are no results to show right now. Try uploading a new
            set of resumes to begin the analysis.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-12">
      {results.map((result, index) => (
        <Card key={index} className="overflow-hidden shadow-lg border">
          <CardHeader className="bg-muted/30 p-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  {result.candidateResume.candidateDetails["Candidate Name"]}
                </h2>
                <div className="flex items-center flex-wrap gap-x-6 gap-y-2 text-muted-foreground mt-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>
                      {
                        result.candidateResume.candidateDetails[
                          "Candidate Email"
                        ]
                      }
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>
                      {
                        result.candidateResume.candidateDetails[
                          "Candidate Contact"
                        ]
                      }
                    </span>
                  </div>
                </div>
              </div>
              {getRecommendationPill(result.results.recommendation)}
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Screening Results */}
              <div className="lg:col-span-2 space-y-8">
                <section>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <ScoreDisplay
                      title="Final Score"
                      score={result.results.final_score}
                    />
                    <ScoreDisplay
                      title="Confidence Score"
                      score={result.results.confidence_score}
                    />
                  </div>
                  <SectionHeader
                    icon={<FileText className="h-6 w-6 text-primary" />}
                    title="Justification"
                  />
                  <div className="prose prose-gray dark:prose-invert max-w-none text-muted-foreground leading-relaxed bg-muted/30 p-4 rounded-lg">
                    <p>{result.results.justification}</p>
                  </div>
                </section>

                <Separator />

                <section>
                  <SectionHeader
                    icon={<Star className="h-6 w-6 text-yellow-500" />}
                    title="Key Strengths"
                  />
                  <div className="flex flex-wrap gap-2">
                    {result.results.key_strengths.map((strength, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="text-green-700 border-green-500/50 bg-green-500/10"
                      >
                        {strength}
                      </Badge>
                    ))}
                  </div>
                </section>

                <section>
                  <SectionHeader
                    icon={<Zap className="h-6 w-6 text-orange-500" />}
                    title="Key Gaps"
                  />
                  <div className="flex flex-wrap gap-2">
                    {result.results.key_gaps.map((gap, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="text-orange-700 border-orange-500/50 bg-orange-500/10"
                      >
                        {gap}
                      </Badge>
                    ))}
                  </div>
                </section>

                {result.results.hard_blockers.length > 0 && (
                  <section>
                    <SectionHeader
                      icon={<ShieldAlert className="h-6 w-6 text-red-700" />}
                      title="Hard Blockers"
                    />
                    <div className="bg-destructive/10 border-l-4 border-destructive p-4 rounded-r-lg space-y-2">
                      {result.results.hard_blockers.map((blocker, i) => (
                        <p
                          key={i}
                          className="font-medium text-destructive flex items-center gap-2"
                        >
                          <Info className="h-5 w-5 flex-shrink-0" />
                          {blocker}
                        </p>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* Right Column: Job and Candidate Details */}
              <aside className="space-y-6 lg:border-l lg:pl-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <ClipboardList className="h-5 w-5" />
                      Job Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    <p>
                      <strong>Position:</strong>{" "}
                      {result.jdContext.jobDetails.positionTitle}
                    </p>
                    <p>
                      <strong>Seniority:</strong>{" "}
                      {result.jdContext.jobDetails.seniorityLevel}
                    </p>
                    <p>
                      <strong>Location:</strong>{" "}
                      {result.jdContext.jobDetails.preferredLocation}
                    </p>
                    <p>
                      <strong>Experience:</strong>{" "}
                      {result.jdContext.jobDetails.minimumExperience}
                    </p>
                    <p>
                      <strong>Education:</strong>{" "}
                      {result.jdContext.jobDetails.educationRequirement}
                    </p>
                    <div className="mt-4">
                      <h4 className="font-semibold">Core Responsibilities:</h4>
                      <ul className="list-disc list-inside">
                        {result.jdContext.jobDetails.coreResponsibilities.map(
                          (resp, i) => (
                            <li key={i}>{resp}</li>
                          )
                        )}
                      </ul>
                    </div>
                    <div className="mt-2">
                      <h4 className="font-semibold">Required Skills:</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {result.jdContext.jobDetails.requiredSkills.map(
                          (skill, i) => (
                            <Badge key={i} variant="secondary">
                              {skill}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                    <div className="mt-2">
                      <h4 className="font-semibold">Bonus Skills:</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {result.jdContext.jobDetails.bonusSkills.map(
                          (skill, i) => (
                            <Badge key={i} variant="outline">
                              {skill}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <User className="h-5 w-5" />
                      Resume Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    {result.candidateResume.candidateDetails["Resume Summary"]}
                  </CardContent>
                </Card>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="experience">
                    <AccordionTrigger className="text-lg font-semibold">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5" /> Experience
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      {result.candidateResume.candidateDetails.Experience.map(
                        (exp, i) => (
                          <div key={i} className="mb-4 p-4 border rounded-lg">
                            <h4 className="font-semibold text-base">
                              {exp["Job Title"]}
                            </h4>
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                              <Building className="h-4 w-4" /> {exp.Company}
                            </p>
                            <p className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                              <Calendar className="h-4 w-4" />{" "}
                              {exp["Start Date"]} - {exp["End Date"]}
                            </p>
                            <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground space-y-1">
                              {exp.Responsibilities.map((resp, j) => (
                                <li key={j}>{resp}</li>
                              ))}
                            </ul>
                          </div>
                        )
                      )}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="education">
                    <AccordionTrigger className="text-lg font-semibold">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5" /> Education
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      {result.candidateResume.candidateDetails.Education.map(
                        (edu, i) => (
                          <div key={i} className="mb-2 p-2 border-b">
                            <h4 className="font-semibold">{edu.Degree}</h4>
                            <p className="text-sm text-muted-foreground">
                              {edu.Institution} ({edu["Graduation Year"]})
                            </p>
                          </div>
                        )
                      )}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="skills">
                    <AccordionTrigger className="text-lg font-semibold">
                      <div className="flex items-center gap-2">
                        <Wrench className="h-5 w-5" /> Technical Skills
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      {Object.entries(
                        result.candidateResume.candidateDetails[
                          "Technical Skills"
                        ]
                      ).map(([category, skills]) => (
                        <div key={category} className="mb-2">
                          <h5 className="font-semibold text-sm">{category}</h5>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {(skills as string[]).map((skill, i) => (
                              <Badge key={i} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="projects">
                    <AccordionTrigger className="text-lg font-semibold">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5" /> Projects
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      {result.candidateResume.candidateDetails.Projects.map(
                        (proj, i) => (
                          <div key={i} className="mb-4 p-4 border rounded-lg">
                            <h4 className="font-semibold">
                              {proj["Project Name"]}
                            </h4>
                            <p className="text-sm text-muted-foreground italic">
                              {proj.Objective}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {proj["Technologies Used"].map((tech, j) => (
                                <Badge key={j} variant="outline">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="certifications">
                    <AccordionTrigger className="text-lg font-semibold">
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5" /> Certifications
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      {result.candidateResume.candidateDetails[
                        "Certifications & Training"
                      ].map((cert, i) => (
                        <div key={i} className="mb-2 p-2 border-b">
                          <h4 className="font-semibold">
                            {cert.Certification}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {cert["Issuing Organization"]} ({cert.Year})
                          </p>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </aside>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
