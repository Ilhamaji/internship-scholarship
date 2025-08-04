"use client";

import { useUser } from "@/contexts/userData";
import api from "@/lib/axios";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { RadioGroup, Radio } from "@heroui/radio";
import { useParams } from "next/navigation";
import { ref } from "process";
import React, { useEffect, useState } from "react";

export default function page() {
  const params = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [prodi, setProdi] = useState("");
  const [jenisBeasiswa, setJenisBeasiswa] = useState("");
  const [angkatan, setAngkatan] = useState("");
  const [kelas, setKelas] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [noHp, setNoHp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { userData, loading: userLoading, refreshUserData } = useUser();

  const handleEditMahasiswa = async () => {
    await api.patch(`/users/edit/${userData.userId}`, {
      email: email.length !== 0 ? email : userData?.email,
      noHp: noHp.length !== 0 ? noHp : userData?.studentDetails.noHp,
      alamat: alamat.length !== 0 ? alamat : userData?.studentDetails.alamat,
    });


    setIsEdit(!isEdit);
    setMessage("success");
    setIsVisible(true);
    setRefresh(!refresh);
    refreshUserData();
     window.scrollTo(0, 0);
  };

  if (userLoading) {
    return <div>Loading...</div>;
  }
  if (!userLoading) {
    return (
      <div className="px-4 md:px-6 xl:px-36 py-4">
        {message === "success" && isVisible ? (
          <Alert
            color="success"
            description="Berhasil mengubah data"
            isVisible
            title="Success"
            variant="faded"
            onClose={() => setIsVisible(false)}
          />
        ) : isVisible ? (
          <Alert
            color="danger"
            description="Gagal mengubah data"
            isVisible
            title="Fail"
            variant="faded"
            onClose={() => setIsVisible(false)}
          />
        ) : (
          <></>
        )}
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="flex flex-col gap-4 p-10 w-full bg-white shadow-md rounded-lg">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                errorMessage="Masukkan nama lengkap dengan benar"
                label="Nama"
                labelPlacement="outside"
                placeholder="Masukkan nama lengkap"
                type="text"
                size="lg"
                defaultValue={userData?.name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled
              />
              <Input
                errorMessage="Masukkan email dengan benar"
                label="Email"
                labelPlacement="outside"
                placeholder="Masukkan email"
                type="email"
                size="lg"
                onChange={(e) => setEmail(e.target.value)}
                defaultValue={userData?.email}
                disabled={!isEdit}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                label="NIM"
                labelPlacement="outside"
                placeholder="Masukkan NIM"
                type="text"
                size="lg"
                onChange={(e) => setUserId(e.target.value)}
                defaultValue={userData?.userId}
                required
                disabled
              />
              <Input
                errorMessage="Masukkan role dengan benar"
                label="Role"
                labelPlacement="outside"
                placeholder="Masukkan Role"
                type="text"
                onChange={(e) => setRole(e.target.value)}
                required
                defaultValue={userData?.role}
                size="lg"
                disabled
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                errorMessage="Masukkan program studi dengan benar"
                label="Program Studi"
                labelPlacement="outside"
                placeholder="Masukkan Program Studi"
                type="text"
                size="lg"
                onChange={(e) => setProdi(e.target.value)}
                defaultValue={userData?.studentDetails.prodi}
                required
                disabled
              />
              <Input
                errorMessage="Masukkan jenis beasiswa dengan benar"
                label="Jenis Beasiswa"
                labelPlacement="outside"
                placeholder="Masukkan jenis beasiswa"
                type="text"
                onChange={(e) => setJenisBeasiswa(e.target.value)}
                defaultValue={userData?.studentDetails.jenisBeasiswa}
                size="lg"
                disabled
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                errorMessage="Masukkan angkatan dengan benar"
                label="Angkatan"
                labelPlacement="outside"
                placeholder="Masukkan Angkatan"
                type="text"
                size="lg"
                onChange={(e) => setAngkatan(e.target.value)}
                defaultValue={userData?.studentDetails.angkatan}
                required
                disabled
              />
              <Input
                errorMessage="Masukkan kelas dengan benar"
                label="Kelas"
                labelPlacement="outside"
                placeholder="Masukkan Kelas"
                type="text"
                onChange={(e) => setKelas(e.target.value)}
                defaultValue={userData?.studentDetails.kelas}
                size="lg"
                disabled
              />
            </div>
            <div className="w-full pt-2">
              <hr />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <RadioGroup
                label="Jenis Kelamin"
                orientation="horizontal"
                onChange={(e) => setJenisKelamin(e.target.value)}
                defaultValue={userData?.studentDetails.jenisKelamin}
                isDisabled
              >
                <Radio value="Laki-laki">Laki-laki</Radio>
                <Radio value="Perempuan">Perempuan</Radio>
              </RadioGroup>
            </div>
            <div className="w-full">
              <Input
                errorMessage="Masukkan nomor handphone dengan benar"
                label="No Hp"
                labelPlacement="outside"
                placeholder="Masukkan Nomor Handphone"
                type="text"
                onChange={(e) => setNoHp(e.target.value)}
                defaultValue={userData?.studentDetails.noHp}
                size="lg"
                disabled={!isEdit}
              />
            </div>
            <div className="w-full">
              <Textarea
                errorMessage="Masukkan alamat dengan benar"
                label="Alamat"
                labelPlacement="outside"
                placeholder="Masukkan Alamat"
                type="text"
                onChange={(e) => setAlamat(e.target.value)}
                defaultValue={userData?.studentDetails.alamat}
                size="lg"
                disabled={!isEdit}
              />
            </div>
            {isEdit === false ? (<Button
              color="warning"
              radius="sm"
              size="lg"
              className="text-white"
              onPress={() => setIsEdit(!isEdit)}
            >
              Edit
            </Button>):(<Button
              color="primary"
              onPress={() => handleEditMahasiswa()}
              radius="sm"
              size="lg"
            >
              Simpan
            </Button>) }
            
          </div>
        </div>
      </div>
    );
  }
}
