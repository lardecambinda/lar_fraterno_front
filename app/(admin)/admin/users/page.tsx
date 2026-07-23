"use client";
import useAuth from "@/hooks/useAuth";
import UsersContainer from "@/components/UsersContainer/UsersContainer";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UsersPage() {
  const { user } = useAuth();
  const router = useRouter();

  if (user && user.role !== "ADMIN") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-rose-500 text-lg font-medium">
            Acesso restrito a administradores
          </p>
          <p className="text-gray-600 text-sm mt-2">
            Você não tem permissão para acessar esta página
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-[var(--secondary)] w-fit mb-4"
      >
        <ArrowLeft size={16} /> Voltar
      </button>
      <UsersContainer />
    </div>
  );
}
