"use client";

import React, { useEffect } from "react";
import { logout } from "@/lib/auth";

export default function page() {
  useEffect(() => {
    logout();
  }, []);
}
