"use client";

import React, { useEffect, useState, ChangeEvent, useCallback } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/axios";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { RadioGroup, Radio } from "@heroui/radio";

type StudentDetails = {
  prodi?: string | null;
  jenisBeasiswa?: string | null;
  angkatan?: string | null;
  kelas?: string | null;
  jenisKelamin?: string | null;
  noHp?: string | null;
  alamat?: string | null;
};

type UserData = {
  userId?: string;
  name?: string;
  email?: string | null;
  role?: string;
  avatar?: string;
  studentDetails?: StudentDetails;
};

type PatchPayload = {
  name?: string;
  email?: string | null;
  userId?: string;
  role?: string;
  studentDetails?: StudentDetails;
};

const Page: React.FC = () => {
  const params = useParams();
  const userIdParam = (params as { userId?: string }).userId || "";

  const [loading, setLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserData | null>(null);

  // form state
  const [form, setForm] = useState<{
    name: string;
    email: string;
    userId: string;
    role: string;
    prodi: string;
    jenisBeasiswa: string;
    angkatan: string;
    kelas: string;
    jenisKelamin: string;
    noHp: string;
    alamat: string;
  }>({
    name: "",
    email: "",
    userId: "",
    role: "",
    prodi: "",
    jenisBeasiswa: "",
    angkatan: "",
    kelas: "",
    jenisKelamin: "",
    noHp: "",
    alamat: "",
  });

  const [message, setMessage] = useState<"success" | "error" | "">("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`/users/${userIdParam}`);
      const data: UserData = res.data.data;
      setUserData(data);

      // populate form with fetched data (fallback to empty string)
      setForm({
        name: data.name || "",
        email: data.email || "",
        userId: data.userId || "",
        role: data.role || "",
        prodi: data.studentDetails?.prodi || "",
        jenisBeasiswa: data.studentDetails?.jenisBeasiswa || "",
        angkatan: data.studentDetails?.angkatan || "",
        kelas: data.studentDetails?.kelas || "",
        jenisKelamin: data.studentDetails?.jenisKelamin || "",
        noHp: data.studentDetails?.noHp || "",
        alamat: data.studentDetails?.alamat || "",
      });

      window.scrollTo(0, 0);
    } catch (err) {
      console.error("Failed fetching user:", err);
    } finally {
      setLoading(false);
    }
  }, [userIdParam]);

  useEffect(() => {
    if (!userIdParam) return;
    void fetchUser();
  }, [fetchUser, refreshKey, userIdParam]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleJenisKelaminChange = (value: string) => {
    setForm((prev) => ({ ...prev, jenisKelamin: value }));
  };

  const handleEditMahasiswa = async () => {
    if (!userIdParam) return;
    setLoading(true);
    try {
      const payload: PatchPayload = {
        name: form.name,
        email: form.email,
        userId: form.userId,
        role: form.role,
        studentDetails: {
          prodi: form.prodi,
          jenisBeasiswa: form.jenisBeasiswa,
          angkatan: form.angkatan,
          kelas: form.kelas,
          jenisKelamin: form.jenisKelamin,
          noHp: form.noHp,
          alamat: form.alamat,
        },
      };

      await api.patch(`/admin/users/edit/${userIdParam}`, payload);

      setMessage("success");
      setIsVisible(true);
      setRefreshKey((k) => k + 1);
    } catch (err) {
      console.error("Update failed:", err);
      setMessage("error");
      setIsVisible(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="px-4 md:px-6 xl:px-36 py-4">
      {isVisible && message === "success" && (
        <Alert
          color="success"
          description="Berhasil mengubah data"
          isVisible
          title="Success"
          variant="faded"
          onClose={() => setIsVisible(false)}
        />
      )}
      {isVisible && message === "error" && (
        <Alert
          color="danger"
          description="Gagal mengubah data"
          isVisible
          title="Fail"
          variant="faded"
          onClose={() => setIsVisible(false)}
        />
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
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Input
              errorMessage="Masukkan email dengan benar"
              label="Email"
              labelPlacement="outside"
              placeholder="Masukkan email"
              type="email"
              size="lg"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              label="NIM"
              labelPlacement="outside"
              placeholder="Masukkan NIM"
              type="text"
              size="lg"
              name="userId"
              value={form.userId}
              onChange={handleChange}
              required
              disabled
            />
            <Input
              errorMessage="Masukkan role dengan benar"
              label="Role"
              labelPlacement="outside"
              placeholder="Masukkan Role"
              type="text"
              name="role"
              value={form.role}
              onChange={handleChange}
              required
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
              name="prodi"
              value={form.prodi}
              onChange={handleChange}
              required
            />
            <Input
              errorMessage="Masukkan jenis beasiswa dengan benar"
              label="Jenis Beasiswa"
              labelPlacement="outside"
              placeholder="Masukkan jenis beasiswa"
              type="text"
              name="jenisBeasiswa"
              value={form.jenisBeasiswa}
              onChange={handleChange}
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
              name="angkatan"
              value={form.angkatan}
              onChange={handleChange}
              required
            />
            <Input
              errorMessage="Masukkan kelas dengan benar"
              label="Kelas"
              labelPlacement="outside"
              placeholder="Masukkan Kelas"
              type="text"
              name="kelas"
              value={form.kelas}
              onChange={handleChange}
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
              onChange={(e) => handleJenisKelaminChange(e.target.value)}
              defaultValue={form.jenisKelamin}
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
              name="noHp"
              value={form.noHp}
              onChange={handleChange}
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
              name="alamat"
              value={form.alamat}
              onChange={handleChange}
              size="lg"
            />
          </div>

          <Button
            color="primary"
            onPress={handleEditMahasiswa}
            radius="sm"
            size="lg"
          >
            Simpan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
