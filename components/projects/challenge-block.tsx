import type { ProjectChallenge } from "@/types/project";

/**
 * One engineering challenge as narrative — Problem / Approach / Outcome with
 * only the lead word bolded. Deliberately not labelled "Situation/Task/etc.".
 */
export function ChallengeBlock({
  challenge,
  index,
}: {
  challenge: ProjectChallenge;
  index: number;
}) {
  return (
    <div className="border-l-2 border-primary/40 pl-5">
      <h3 className="font-semibold text-foreground">
        <span className="mr-2 text-primary/60">
          {String(index + 1).padStart(2, "0")}
        </span>
        {challenge.title}
      </h3>
      <div className="mt-3 flex flex-col gap-2 text-foreground/70 leading-relaxed">
        <p>
          <span className="font-semibold text-foreground">Problem. </span>
          {challenge.problem}
        </p>
        <p>
          <span className="font-semibold text-foreground">Approach. </span>
          {challenge.approach}
        </p>
        <p>
          <span className="font-semibold text-foreground">Outcome. </span>
          {challenge.outcome}
        </p>
      </div>
    </div>
  );
}
