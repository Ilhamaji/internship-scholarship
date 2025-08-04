"use client";

import React, { use, useEffect, useState } from "react";
import TabelLaporan from "@/components/dashboard/mahasiswa/root/tabelLaporan";
import { Spinner } from "@heroui/spinner";
import api from "@/lib/axios";
import Cookies from "js-cookie";
import TambahLaporan from "@/components/dashboard/mahasiswa/laporan/modal/tambahLaporan";
import { useUser } from "@/contexts/userData";

export default function page() {
  const [loading, setLoading] = useState(true);
  const [monevData, setMonevData] = useState();
  const [submitted, setSubmitted] = useState(false);
  const { userData, setUserData } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const resMonev = await api.get(`/monev/${Cookies.get("userId")}`);
      setMonevData(resMonev.data.data.laporan);

      setLoading(false);
    };

    fetchData();
  }, [submitted]);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!loading) {
    return (
      <div className="w-full">
        <div className="px-4 md:px-6 xl:px-36 flex flex-col md:flex-row gap-4 py-4">
          <div className="flex flex-col border bg-[#fff] px-8 w-full md:w-fit h-fit rounded-xl shadow-md">
            <div className="py-6 text-lg sm:text-xl">
              Selamat datang <div className="font-bold">{userData?.name}</div>
            </div>
            <hr />
            <div className="py-6">
              <div className="text-base sm:text-md">
                <span className="font-bold">{userData?.userId}</span>
              </div>
              <div className="text-base sm:text-md">
                <span className="font-base">
                  {userData?.studentDetails.prodi}
                </span>
              </div>
              <div className="text-base sm:text-md">
                <span className="font-base">
                  Angkatan {userData?.studentDetails.angkatan}
                </span>
              </div>
            </div>
            <hr />
            <div className="py-6 text-base sm:text-md">
              Beasiswa : {userData?.studentDetails.jenisBeasiswa} <br />
              Kelas : {userData?.studentDetails.kelas} <br />
              Jenis Kelamin : {userData?.studentDetails.jenisKelamin} <br />
              Alamat : {userData?.studentDetails.alamat} <br />
              No HP : {userData?.studentDetails.noHp} <br />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <TambahLaporan setSubmitted={setSubmitted} submitted={submitted} />
            <TabelLaporan
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
