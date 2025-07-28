"use client";

import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import Cookies from "js-cookie";
import React, { use, useEffect, useState } from "react";

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nim: "",
    role: "",
    prodi: "",
    jenisBeasiswa: "",
    angkatan: "",
    kelas: "",
    jenisKelamin: "",
    noHp: "",
    alamat: "",
  });
  const [cookieData, setCookieData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  useEffect(() => {
    const name = Cookies.get("name");
    const avatar = Cookies.get("avatar");
    const nim = Cookies.get("userId");
    const role = Cookies.get("role");
    if (name && avatar && nim && role) {
      setCookieData({ name, avatar, nim, role });
    }

    setLoading(false);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleEdit = () => {
    if (isEditing) {
      console.log("Data disimpan:", formData);
    }
    setIsEditing(!isEditing);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setProfilePhoto(null);
  };
  return (
    <div className="max-w-6xl mx-auto border p-6 rounded-md shadow-sm">
      {loading ? (
        <></>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* FOTO PROFIL */}
          <div className="flex flex-col items-center border p-4">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Profil Saya
            </h2>
            <div className="w-40 h-40 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center mb-4">
              <img
                src={cookieData.avatar}
                alt="Foto Profil"
                className="object-cover w-full h-full"
              />
            </div>
            <label className="w-full">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
              <div className="bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2 px-4 w-full text-center cursor-pointer mb-2">
                Pilih Foto
              </div>
            </label>
            <button
              onClick={handleRemovePhoto}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 w-full"
            >
              Hapus Foto
            </button>
          </div>

          {/* FORM PROFIL */}
          <div className="md:col-span-2 border p-4">
            <h2 className="text-xl font-semibold mb-4">Informasi Profil</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Form>
                <Input
                  errorMessage="Please enter a valid name"
                  label="Name"
                  labelPlacement="outside"
                  name="name"
                  placeholder="Enter your name"
                  type="name"
                  defaultValue={cookieData.name}
                  disabled={!isEditing}
                />
                <Input
                  errorMessage="Please enter a valid email"
                  label="Email"
                  labelPlacement="outside"
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  defaultValue={cookieData.email}
                  disabled={!isEditing}
                />
                <Input
                  errorMessage="Please enter a valid role"
                  label="Role"
                  labelPlacement="outside"
                  name="role"
                  placeholder="Enter your role"
                  type="role"
                  defaultValue={cookieData.role}
                  disabled={!isEditing}
                />
                <Input
                  errorMessage="Please enter a valid nim"
                  label="Nim"
                  labelPlacement="outside"
                  name="nim"
                  placeholder="Enter your nim"
                  type="nim"
                  defaultValue={cookieData.nim}
                  disabled={!isEditing}
                />
                <Button type="submit">Submit</Button>
              </Form>
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={toggleEdit}
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded"
              >
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  type FieldProps = {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    editable: boolean;
    full?: boolean;
  };

  function Field({
    label,
    name,
    value,
    onChange,
    editable,
    full = false,
  }: FieldProps) {
    return (
      <div className={`${full ? "sm:col-span-2" : ""}`}>
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          readOnly={!editable}
          className={`mt-1 block w-full rounded-md border px-3 py-2 ${
            editable
              ? "bg-white border-gray-400 text-black"
              : "bg-gray-200 border-gray-300 text-gray-700"
          }`}
        />
      </div>
    );
  }
}
