"use client";

import api from "@/lib/axios";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import React, { useState } from "react";

export default function page() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post(`/auth/register/admin`, {
        name,
        email,
        password,
      });

      console.log(response.data);
    } catch (error: any) {
      console.log(error);

      return setError(error.response?.data?.message);
    }
  };
  return (
    <Form onSubmit={(e) => handleRegister(e)}>
      <Input
        label="Nama"
        labelPlacement="outside"
        type="text"
        name="name"
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        label="Email"
        labelPlacement="outside"
        type="email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label="Password"
        labelPlacement="outside"
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Kirim</button>
    </Form>
  );
}
