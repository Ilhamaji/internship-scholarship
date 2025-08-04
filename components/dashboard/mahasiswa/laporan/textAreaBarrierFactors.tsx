import { Textarea } from "@heroui/input";
import React from "react";

export default function textArea({
  studentEvaluations,
  setBarrierFactors,
  barrierFactors,
}: {
  studentEvaluations: any;
  setBarrierFactors: any;
  barrierFactors: any;
}) {
  return (
    <>
      <Textarea
        size="lg"
        label="Faktor Penghambat"
        labelPlacement="inside"
        onChange={(e) => setBarrierFactors(e.target.value)}
        defaultValue={
          barrierFactors === undefined ||
          barrierFactors === null ||
          barrierFactors === ""
            ? studentEvaluations
              ? studentEvaluations[0].barrierFactors
              : barrierFactors
            : barrierFactors
        }
      />
    </>
  );
}
