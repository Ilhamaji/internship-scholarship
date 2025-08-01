"use client";

import api from "@/lib/axios";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { RadioGroup, Radio } from "@heroui/radio";
import { useParams } from "next/navigation";
import { ref } from "process";
import React, { useEffect, useState } from "react";

export default function page() {
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const [userData, setUserData] = useState(null);
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

  useEffect(() => {
    const fungsi = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/users/${params.userId}`);
        setUserData(res.data.data);

         window.scrollTo(0, 0);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        window.scrollTo(0, 0);
        console.log(error);
      }
    };

    fungsi();
  }, [refresh]);

  const handleEditMahasiswa = async () => {
    await api.patch(`/admin/users/edit/${params.userId}`, {
      name: name.length !== 0 ? name : userData?.name,
      email: email.length !== 0 ? email : userData?.email,
      userId: userId.length !== 0 ? userId : userData?.userId,
      role: role.length !== 0 ? role : userData?.role,
      studentDetails: {
        prodi: prodi.length !== 0 ? prodi : userData?.studentDetails.prodi,
        jenisBeasiswa:
          jenisBeasiswa.length !== 0
            ? jenisBeasiswa
            : userData?.studentDetails.jenisBeasiswa,
        angkatan:
          angkatan.length !== 0 ? angkatan : userData?.studentDetails.angkatan,
        kelas: kelas.length !== 0 ? kelas : userData?.studentDetails.kelas,
        jenisKelamin:
          jenisKelamin.length !== 0
            ? jenisKelamin
            : userData?.studentDetails.jenisKelamin,
        noHp: noHp.length !== 0 ? noHp : userData?.studentDetails.noHp,
        alamat: alamat.length !== 0 ? alamat : userData?.studentDetails.alamat,
      },
    });

    setMessage("success");
    setIsVisible(true);
    setRefresh(!refresh);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!loading) {
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
              />
            </div>
            <Button
              color="primary"
              onPress={() => handleEditMahasiswa()}
              radius="sm"
              size="lg"
            >
              Simpan
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
