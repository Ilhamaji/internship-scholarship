"use client";

import { UserProvider } from "@/contexts/userData";

interface Props {
  children: React.ReactNode;
}

export default function ClientProvider({ children }: Props) {
  return <UserProvider>{children}</UserProvider>;
}
