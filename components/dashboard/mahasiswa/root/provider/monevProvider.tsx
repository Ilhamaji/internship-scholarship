"use client";

import { MonevProvider } from "@/contexts/monevData";

interface Props {
  children: React.ReactNode;
}

export default function ClientProvider({ children }: Props) {
  return <MonevProvider>{children}</MonevProvider>;
}
