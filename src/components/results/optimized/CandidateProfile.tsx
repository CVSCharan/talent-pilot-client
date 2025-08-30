import { memo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  Building,
  Calendar,
  Award,
  BookOpen,
  HeartHandshake,
  GitFork,
  Languages,
  Trophy,
  Rocket,
  CheckCircle,
  FileText,
} from "lucide-react";
import { Badge } from "../../ui/badge";
import type { IN8nUserResponse } from "../../../types";

interface CandidateProfileProps {
  result: IN8nUserResponse;
}

const reconstructStringFromObject = (obj: any) => {
  if (typeof obj === 'string') return obj;
  if (typeof obj !== 'object' || obj === null) return '';

  return Object.keys(obj)
    .filter(key => !isNaN(parseInt(key)))
    .sort((a, b) => parseInt(a) - parseInt(b))
    .map(key => obj[key])
    .join('');
};

const CandidateProfile = memo(({ result }: CandidateProfileProps) => {
  const { candidateDetails } = result.candidateResume;

  const hasOtherInfo =
    (candidateDetails["Other Notable Information"]?.Awards?.length > 0) ||
    (candidateDetails["Other Notable Information"]?.Publications?.length > 0) ||
    (candidateDetails["Other Notable Information"]?.["Volunteer Work"]?.length > 0) ||
    (candidateDetails["Other Notable Information"]?.["Open Source Contributions"]?.length > 0) ||
    (candidateDetails["Other Notable Information"]?.Languages?.length > 0);

  return (
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
          defaultValue={[
            "summary",
            "experience",
            "projects",
            "education",
            "certifications",
            "skills",
            "other-info",
          ]}
          className="w-full space-y-4"
        >
          <AccordionItem value="summary" className="bg-muted/20 p-4 rounded-lg">
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
              <FileText className="h-5 w-5 mr-2" />
              Professional Summary
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-muted-foreground leading-relaxed">
                  {candidateDetails["Resume Summary"]}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          {candidateDetails.Experience && candidateDetails.Experience.length > 0 && (
            <AccordionItem value="experience" className="bg-muted/20 p-4 rounded-lg">
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
              <Briefcase className="h-5 w-5 mr-2" />
              Work Experience
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <div className="space-y-6">
                {candidateDetails.Experience.map((exp, i) => (
                  <div
                    key={i}
                    className="border-l-4 border-primary/20 pl-6 pb-4 last:pb-0"
                  >
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      {exp["Job Title"]}
                    </h4>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground mb-4">
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

                    {exp.Responsibilities && exp.Responsibilities.length > 0 && (
                      <div className="mb-3">
                        <h5 className="font-semibold text-sm mb-2">Responsibilities:</h5>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          {exp.Responsibilities.map((resp, j) => (
                            <li key={j}>{resp}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {exp.Achievements && exp.Achievements.length > 0 && (
                      <div>
                        <h5 className="font-semibold text-sm mb-2">Achievements:</h5>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          {exp.Achievements.map((ach, j) => (
                            <li key={j}>{ach}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>)}

          {candidateDetails.Projects && candidateDetails.Projects.length > 0 && (
            <AccordionItem value="projects" className="bg-muted/20 p-4 rounded-lg">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                <Rocket className="h-5 w-5 mr-2" />
                Projects
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <div className="space-y-4">
                  {candidateDetails.Projects.map((proj, i) => (
                    <div key={i} className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-semibold text-base mb-1">{proj["Project Name"]}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{proj.Objective}</p>
                      <div className="flex flex-wrap gap-2">
                        {proj["Technologies Used"].map((tech, j) => (
                          <Badge key={j} variant="secondary">{tech}</Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          <AccordionItem value="education" className="bg-muted/20 p-4 rounded-lg">
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
              <GraduationCap className="h-5 w-5 mr-2" />
              Education
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {candidateDetails.Education.map((edu, i) => (
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
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {candidateDetails["Certifications & Training"] && candidateDetails["Certifications & Training"].length > 0 && (
            <AccordionItem value="certifications" className="bg-muted/20 p-4 rounded-lg">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                <Trophy className="h-5 w-5 mr-2" />
                Certifications & Training
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <div className="space-y-3">
                  {candidateDetails["Certifications & Training"].map((cert, i) => (
                    <div key={i} className="p-3 bg-muted/30 rounded-lg">
                      <p className="font-semibold">{cert.Certification}</p>
                      <p className="text-sm text-muted-foreground">{cert["Issuing Organization"]} - {cert.Year}</p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          <AccordionItem value="skills" className="bg-muted/20 p-4 rounded-lg">
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
              <Wrench className="h-5 w-5 mr-2" />
              Technical Skills
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <div className="flex flex-wrap gap-2">
                {Object.values(candidateDetails["Technical Skills"])
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

          {hasOtherInfo && (
            <AccordionItem value="other-info" className="bg-muted/20 p-4 rounded-lg">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                <CheckCircle className="h-5 w-5 mr-2" />
                Additional Information
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                {candidateDetails["Other Notable Information"].Awards && candidateDetails["Other Notable Information"].Awards.length > 0 && (
                  <div>
                    <h5 className="font-semibold flex items-center mb-2"><Award className="h-4 w-4 mr-2"/>Awards</h5>
                    {candidateDetails["Other Notable Information"].Awards.map((award, i) => (
                      <div key={i} className="p-3 bg-muted/30 rounded-lg mb-2">
                        <p className="font-semibold">{award.name} ({award.year})</p>
                        <p className="text-sm text-muted-foreground">{award.issuer}</p>
                      </div>
                    ))}
                  </div>
                )}
                {candidateDetails["Other Notable Information"].Publications && candidateDetails["Other Notable Information"].Publications.length > 0 && (
                  <div>
                    <h5 className="font-semibold flex items-center mb-2"><BookOpen className="h-4 w-4 mr-2"/>Publications</h5>
                    {candidateDetails["Other Notable Information"].Publications.map((pub, i) => (
                      <div key={i} className="p-3 bg-muted/30 rounded-lg mb-2">
                        <p className="font-semibold">{pub.title} ({pub.year})</p>
                        <p className="text-sm text-muted-foreground">{pub.journalOrVenue}</p>
                      </div>
                    ))}
                  </div>
                )}
                {candidateDetails["Other Notable Information"]["Volunteer Work"] && candidateDetails["Other Notable Information"]["Volunteer Work"].length > 0 && (
                  <div>
                    <h5 className="font-semibold flex items-center mb-2"><HeartHandshake className="h-4 w-4 mr-2"/>Volunteer Work</h5>
                    <div className="space-y-2">
                      {candidateDetails["Other Notable Information"]["Volunteer Work"].map((work, i) => (
                        <div key={i} className="p-3 bg-muted/30 rounded-lg">
                          <p className="font-semibold">{reconstructStringFromObject(work)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {candidateDetails["Other Notable Information"]["Open Source Contributions"] && candidateDetails["Other Notable Information"]["Open Source Contributions"].length > 0 && (
                  <div>
                    <h5 className="font-semibold flex items-center mb-2"><GitFork className="h-4 w-4 mr-2"/>Open Source</h5>
                    {candidateDetails["Other Notable Information"]["Open Source Contributions"].map((contrib, i) => (
                      <div key={i} className="p-3 bg-muted/30 rounded-lg mb-2">
                        <p className="font-semibold">{contrib.projectName}</p>
                        <a href={contrib.repository} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">Repository</a>
                      </div>
                    ))}
                  </div>
                )}
                {candidateDetails["Other Notable Information"].Languages && candidateDetails["Other Notable Information"].Languages.length > 0 && (
                  <div>
                    <h5 className="font-semibold flex items-center mb-2"><Languages className="h-4 w-4 mr-2"/>Languages</h5>
                    <div className="flex flex-wrap gap-2">
                      {candidateDetails["Other Notable Information"].Languages.map((lang, i) => (
                        <Badge key={i} variant="outline">{reconstructStringFromObject(lang)}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </CardContent>
    </Card>
  );
});

export default CandidateProfile;
