"use client";
import useAuth from "@/hooks/useAuth";

export default function AdminHeader() {
  const { user } = useAuth();
  return (
    <header className="py-6  w-full ">
      <div className="max-lg:px-4">Olá, {user?.username}</div>
    </header>
  );
}
