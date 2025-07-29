import React from "react";

import { Tooltip } from "@heroui/tooltip";
import { useRouter } from "next/navigation";
import EditIcon from "@/components/icon/iconEdit";
import { Button } from "@heroui/button";

export default function edit({ laporanId }: { laporanId: string }) {
  const router = useRouter();

  return (
    <>
      <Tooltip content="Edit">
        <span
          onClick={() => router.push(`/admin/laporan/${laporanId}/edit`)}
          className="my-auto text-lg text-default-400 cursor-pointer hover:text-default-600 active:opacity-50"
        >
          <EditIcon />
        </span>
      </Tooltip>
    </>
  );
}
