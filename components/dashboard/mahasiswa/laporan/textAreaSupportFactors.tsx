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
        label="Faktor Pendukung"
        labelPlacement="inside"
        onChange={(e) => setSupportFactors(e.target.value)}
        defaultValue={
          supportFactors === undefined 
            ? studentEvaluations.supportFactors
            : supportFactors
        }
      />
    </>
  );
}
