import React from "react";
import { Card } from "@heroui/card";

export default function ukm() {
  return (
    <Card className="py-4 w-fit">
      <div className="px-10">
        <div className="text-2xl font-bold">Point Keaktifan UKM</div>
        <hr className="my-6" />
        <div className="grid grid-cols-1 gap-2 max-h-20 overflow-y-scroll">
          <div className="grid grid-cols-3">
            <div className="text-xl">CIT</div>
            <div className="text-xl"> : </div>
            <div className="text-xl text-end">220</div>
          </div>
          <div className="grid grid-cols-3">
            <div className="text-xl">PMKK</div>
            <div className="text-xl"> : </div>
            <div className="text-xl text-end">300</div>
          </div>
          <div className="grid grid-cols-3">
            <div className="text-xl">PMKK</div>
            <div className="text-xl"> : </div>
            <div className="text-xl text-end">300</div>
          </div>
          <div className="grid grid-cols-3">
            <div className="text-xl">PMKK</div>
            <div className="text-xl"> : </div>
            <div className="text-xl text-end">300</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
