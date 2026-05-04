"use client";
import useAuth from "@/hooks/useAuth";
import { LogOut } from "lucide-react";

export default function AdminHeader() {
  const { user, signOut } = useAuth();

  return (
    <header className="py-4 w-full border-b border-gray-200 bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="text-gray-700">
          Olá, <span className="font-semibold text-gray-900">{user?.user_name}</span>
        </div>

        <button
          onClick={() => signOut()}
          title="Sair"
          className="text-sm flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <span>Sair</span>
          <LogOut size={16} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
}
