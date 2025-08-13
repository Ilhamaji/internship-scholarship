"use client";

import React, { use, useEffect, useState } from "react";
import TabelLaporanAcc from "@/components/riwayat-laporan/tabelLaporanAcc";
import { Spinner } from "@heroui/spinner";
import { useUser } from "@/contexts/userData";
import { Image } from "@heroui/image";
import { Progress } from "@heroui/progress";
import { useMonev } from "@/contexts/monevData";

export default function page() {
  const [submitted, setSubmitted] = useState(false);
  const { userData, setUserData } = useUser();
  const { monevData, datas, refreshMonev, loading } = useMonev();

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  function toTitleCase(str: string) {
    // Handle empty or non-string input
    if (!str || typeof str !== "string") {
      return "";
    }

    return str
      .toLowerCase() // Convert the entire string to lowercase
      .split(" ") // Split the string into an array of words
      .map((word) => {
        // Capitalize the first letter of each word
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" "); // Join the words back into a single string
  }

  if (!loading) {
    return (
      <div className="w-full">
        <div className="px-4 md:px-6 xl:px-36 flex flex-col md:flex-row gap-4 py-4">
          <div className="flex flex-col border bg-[#fff] px-8 w-96 h-fit rounded-xl shadow-md">
            <div className="flex mx-auto pt-6">
              <Image
                src={userData?.avatar}
                width={100}
                height={100}
                className="mx-auto rounded-full"
              />
            </div>
            <div className="py-6 text-lg text-center">
              {toTitleCase(userData?.name ?? "")}
            </div>
            <hr />
            <div className="flex flex-col gap-1 py-6">
              <div className="text-base sm:text-md font-bold">
                {userData?.userId}
              </div>
              <div className="text-base sm:text-md font-base">
                {datas?.user.prodi}
              </div>
              <div className="text-base sm:text-md">
                Angkatan {userData?.studentDetails.angkatan}
              </div>
            </div>
            <hr />
            <div className="flex flex-col gap-2 py-6 text-base sm:text-md">
              <div className="">
                Beasiswa : {userData?.studentDetails.jenisBeasiswa}
              </div>
              <div className="">Kelas : {userData?.studentDetails.kelas}</div>
              <div className="">
                Jenis Kelamin : {userData?.studentDetails.jenisKelamin}
              </div>
              <div className="">Alamat : {userData?.studentDetails.alamat}</div>
              <div className="">No HP : {userData?.studentDetails.noHp}</div>
            </div>
            <hr />
            <div className="flex flex-col gap-2 py-6 text-base sm:text-md">
              <Progress
                label="Laporan terajukan"
                showValueLabel={true}
                valueLabel={`${datas?.user.submittedCount ?? "0"}/8`}
                aria-label="Progress..."
                size="lg"
                value={
                  datas?.user.submittedCount
                    ? (datas?.user.submittedCount / 8) * 100
                    : 0
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <div className="text-lg sm:text-xl md:text-2xl font-bold">
              Riwayat Laporan
            </div>
            <TabelLaporanAcc
              monevData={monevData}
              setSubmitted={setSubmitted}
              submitted={submitted}
            />
          </div>
        </div>
      </div>
    );
  }
}
