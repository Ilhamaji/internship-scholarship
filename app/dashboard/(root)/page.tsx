"use client";

import React, { use, useEffect, useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import TabelLaporan from "@/components/dashboard/mahasiswa/root/tabelLaporan";
import Ukm from "@/components/dashboard/ukm";
import getUserData from "@/lib/action/getUserData";
import { Spinner } from "@heroui/spinner";
import api from "@/lib/axios";
import Cookies from "js-cookie";
import TambahLaporan from "@/components/dashboard/mahasiswa/laporan/modal/tambahLaporan";
import { useUser } from "@/contexts/userData";

export default function page() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState();
  const [monevData, setMonevData] = useState();
  const [submitted, setSubmitted] = useState(false);
  const { user, setUser } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const resUser = await api.get(`/users/${Cookies.get("userId")}`);
      setUserData(resUser.data.data);

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
        <TambahLaporan setSubmitted={setSubmitted} submitted={submitted} />
        <div className="px-4 md:px-10 lg:px-36 flex flex-row gap-4">
          <div className="md:flex md:flex-col md:visible hidden invisible border bg-[#fff] px-8 mt-4 w-fit rounded-xl shadow-md">
            <div className="py-6 text-2xl">
              Selamat datang <span className="font-bold">{userData?.name}</span>{" "}
              !
            </div>
            <hr />
            <div className="py-6">
              <div className="text-xl">
                <span className="font-bold">IPS</span> : 4.00{" "}
              </div>
              <div className="text-xl">
                <span className="font-bold">IPK</span> : 3.75{" "}
              </div>
              Beasiswa : Beasiswa Prestasi <br />
              Tanggal Mulai Beasiswa : 01 Januari 2023 <br />
              Tanggal Berakhir Beasiswa : 31 Desember 2023 <br />
              Status Beasiswa : Aktif <br />
              Semester: 5 <br />
              Jumlah SKS: 20 <br />
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full my-4">
            <div className="flex flex-row gap-4 w-full">
              <Card className="flex py-4 w-fit">
                <div className="px-10 my-auto">
                  <div className="text-2xl">
                    <span className="font-bold">IPS</span> : 4.00
                  </div>
                  <hr className="my-6" />
                  <div className="text-2xl">
                    <span className="font-bold">IPK</span> : 3.75
                  </div>
                </div>
              </Card>
              <Ukm />
            </div>
            <div className="flex flex-row gap-4 w-full">
              <TabelLaporan
                monevData={monevData}
                setSubmitted={setSubmitted}
                submitted={submitted}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
