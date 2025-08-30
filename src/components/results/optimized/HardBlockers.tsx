import { memo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { ShieldAlert } from "lucide-react";
import type { IN8nUserResponse } from "../../../types";

interface HardBlockersProps {
  result: IN8nUserResponse;
}

const HardBlockers = memo(({ result }: HardBlockersProps) => {
  if (result.results.hard_blockers.length === 0) {
    return null;
  }

  return (
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
  );
});

export default HardBlockers;
