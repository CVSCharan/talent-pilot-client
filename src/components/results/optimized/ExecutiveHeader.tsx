import { memo } from "react";
import { CardHeader, CardTitle, CardDescription } from "../../ui/card";
import { Mail, Phone } from "lucide-react";
import RecommendationBadge from "./RecommendationBadge";
import type { IN8nUserResponse } from "../../../types";

interface ExecutiveHeaderProps {
  result: IN8nUserResponse;
}

const ExecutiveHeader = memo(({ result }: ExecutiveHeaderProps) => {
  const candidateName = result.candidateResume.candidateDetails["Candidate Name"];
  const candidateEmail = result.candidateResume.candidateDetails["Candidate Email"];
  const candidateContact = result.candidateResume.candidateDetails["Candidate Contact"];

  return (
    <CardHeader className="p-8 bg-muted/20">
      <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-6">
        <div className="flex-1">
          <CardTitle className="text-3xl mb-4">
            {candidateName || "Candidate Profile"}
          </CardTitle>
          <CardDescription className="flex flex-col sm:flex-row gap-6 text-base">
            {candidateEmail && (
              <a
                href={`mailto:${candidateEmail}`}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                {candidateEmail}
              </a>
            )}
            {candidateContact && (
              <a
                href={`tel:${candidateContact}`}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                {candidateContact}
              </a>
            )}
          </CardDescription>
        </div>
        <div className="flex-shrink-0">
          <RecommendationBadge recommendation={result.results.recommendation} />
        </div>
      </div>
    </CardHeader>
  );
});

export default ExecutiveHeader;
