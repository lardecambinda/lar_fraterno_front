"use client";

import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export default function useAuth() {
  const { user, signIn } = useContext(AuthContext);

  return { user, signIn };
}
