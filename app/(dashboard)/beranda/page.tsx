import React from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import UserTable from "@/components/dashboard/table";
import Ukm from "@/components/dashboard/ukm";

export default function page() {
  return (
    <div className="w-full">
      <div className="px-36 flex flex-row gap-4">
        <div className="flex flex-col border bg-[#fff] px-8 mt-4 w-fit rounded-xl shadow-md">
          <div className="py-6 text-2xl">
            Selamat datang <span className="font-bold">User</span> !
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
            <UserTable />
          </div>
        </div>
      </div>
    </div>
  );
}
