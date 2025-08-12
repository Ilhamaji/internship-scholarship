import { Textarea } from "@heroui/input";
import React from "react";

export default function textArea({
  studentEvaluations,
  supportFactors,
  setSupportFactors,
}: {
  setSupportFactors: any;
  studentEvaluations: any;
  supportFactors: any;
}) {
  return (
    <>
      <Textarea
        size="lg"
        onChange={(e) => setSupportFactors(e.target.value)}
        defaultValue={
          supportFactors === undefined ||
          supportFactors === null ||
          supportFactors === ""
            ? studentEvaluations
              ? studentEvaluations[0].supportFactors
              : supportFactors
            : supportFactors
        }
      />
    </>
  );
}
