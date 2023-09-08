"use client";

import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export default function useAuth() {
  const { user, signIn, signOut, authLoading } = useContext(AuthContext);

  return { user, signIn, signOut, authLoading };
}
