"use client";
import useAuth from "@/hooks/useAuth";
import { LogOut } from "lucide-react";

export default function AdminHeader() {
  const { user, signOut } = useAuth();
  return (
    <header className="py-6  w-full ">
      <div className="max-lg:px-4 flex items-center justify-between w-full">
        <div>Olá, {user?.user_name}</div>

        <div>
          <button
            onClick={() => signOut()}
            title="sair"
            className="text-sm flex items-center justify-center gap-1 hover:border-b hover:border-black"
          >
            <span>Sair</span>
            <LogOut size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </header>
  );
}
