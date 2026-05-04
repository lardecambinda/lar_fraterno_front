"use client";
import useAuth from "@/hooks/useAuth";
import UsersContainer from "@/components/UsersContainer/UsersContainer";

export default function UsersPage() {
  const { user } = useAuth();

  if (user && user.role !== "ADMIN") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-rose-500 text-lg font-medium">Acesso restrito a administradores</p>
          <p className="text-gray-600 text-sm mt-2">Você não tem permissão para acessar esta página</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <UsersContainer />
    </div>
  );
}
