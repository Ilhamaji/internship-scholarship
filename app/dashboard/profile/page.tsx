"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/axios";
import { useUser } from "@/contexts/userData";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { RadioGroup, Radio } from "@heroui/radio";

interface StudentDetails {
  prodi?: string | null;
  jenisBeasiswa?: string | null;
  angkatan?: string | null;
  kelas?: string | null;
  jenisKelamin?: string | null;
  noHp?: string | null;
  alamat?: string | null;
}

interface UserData {
  userId?: string;
  name?: string;
  email?: string | null;
  role?: string;
  studentDetails?: StudentDetails;
  avatar?: string;
}

const Page: React.FC = () => {
  const params = useParams();
  const { userData, loading: userLoading, refreshUserData } = useUser();

  // local editable form state (only fields user can edit)
  const [email, setEmail] = useState<string>("");
  const [noHp, setNoHp] = useState<string>("");
  const [alamat, setAlamat] = useState<string>("");

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [message, setMessage] = useState<"success" | "error" | "">("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  // initialize form from context userData
  useEffect(() => {
    if (!userData) return;
    setEmail(userData.email || "");
    setNoHp(userData.studentDetails?.noHp || "");
    setAlamat(userData.studentDetails?.alamat || "");
  }, [userData]);

  const handleEditMahasiswa = async () => {
    if (!userData?.userId) return;
    setSaving(true);

    if (email === "" || noHp === "" || alamat === "") {
      try {
        await api.patch(`/users/edit/${userData.userId}`, {
          email: email || userData.email,
          noHp: noHp || userData.studentDetails?.noHp,
          alamat: alamat || userData.studentDetails?.alamat,
        });

        setMessage("success");
        setIsVisible(true);
        setIsEdit(false);
        await refreshUserData();
        window.scrollTo(0, 0);
      } catch (err) {
        console.error("Update failed:", err);
        setMessage("error");
        setIsVisible(true);
        window.scrollTo(0, 0);
      } finally {
        setSaving(false);
      }
    }
  };

  // derived for readability
  const user = userData as UserData | null;

  if (userLoading) {
    return <div className="p-4">Loading...</div>;
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
              value={user?.name || ""}
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
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
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
              value={user?.userId || ""}
              required
              disabled
            />
            <Input
              errorMessage="Masukkan role dengan benar"
              label="Role"
              labelPlacement="outside"
              placeholder="Masukkan Role"
              type="text"
              value={user?.role || ""}
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
              value={user?.studentDetails?.prodi || ""}
              required
              disabled
            />
            <Input
              errorMessage="Masukkan jenis beasiswa dengan benar"
              label="Jenis Beasiswa"
              labelPlacement="outside"
              placeholder="Masukkan jenis beasiswa"
              type="text"
              size="lg"
              value={user?.studentDetails?.jenisBeasiswa || ""}
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
              value={user?.studentDetails?.angkatan || ""}
              required
              disabled
            />
            <Input
              errorMessage="Masukkan kelas dengan benar"
              label="Kelas"
              labelPlacement="outside"
              placeholder="Masukkan Kelas"
              type="text"
              size="lg"
              value={user?.studentDetails?.kelas || ""}
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
              defaultValue={user?.studentDetails?.jenisKelamin || ""}
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
              size="lg"
              value={noHp}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNoHp(e.target.value)
              }
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
              size="lg"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              disabled={!isEdit}
            />
          </div>

          {isEdit ? (
            <Button
              color="primary"
              onPress={handleEditMahasiswa}
              radius="sm"
              size="lg"
              disabled={saving}
            >
              {saving ? "Menyimpan..." : "Simpan"}
            </Button>
          ) : (
            <Button
              color="warning"
              radius="sm"
              size="lg"
              className="text-white"
              onPress={() => setIsEdit(true)}
            >
              Edit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
