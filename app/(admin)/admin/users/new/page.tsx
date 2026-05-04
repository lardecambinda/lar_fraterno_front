"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { registerUser } from "@/services/apolloAPI";
import useAuth from "@/hooks/useAuth";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { UserPlus, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface IFormValues {
  user_name: string;
  email: string;
  password: string;
  role: "ADMIN" | "EDITOR";
}

export default function NewUserPage() {
  const { user } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormValues>({
    defaultValues: { role: "EDITOR" },
  });
  const [loading, setLoading] = useState(false);

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

  const submit: SubmitHandler<IFormValues> = async ({
    user_name,
    email,
    password,
    role,
  }) => {
    setLoading(true);
    const result = await registerUser({ user_name, email, password, role });
    setLoading(false);
    if (result) {
      toast(`Usuário ${result.user_name} criado com sucesso`, {
        type: "success",
        theme: "light",
        hideProgressBar: true,
      });
      reset();
      setTimeout(() => router.push("/admin/users"), 1500);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Novo Usuário</h1>
          <p className="text-sm text-gray-600 mt-1">
            Cadastre um novo usuário no sistema
          </p>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <form className="p-6" onSubmit={handleSubmit(submit)}>
          <div className="space-y-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Nome Completo
              </label>
              <input
                className={`h-11 border rounded-md outline-none px-4 transition-colors ${
                  errors.user_name
                    ? "border-rose-500 focus:border-rose-500"
                    : "border-gray-300 focus:border-blue-500"
                }`}
                placeholder="Digite o nome completo"
                {...register("user_name", { required: true })}
              />
              {errors.user_name && (
                <p className="text-rose-500 text-xs">Nome é obrigatório</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className={`h-11 border rounded-md outline-none px-4 transition-colors ${
                  errors.email
                    ? "border-rose-500 focus:border-rose-500"
                    : "border-gray-300 focus:border-blue-500"
                }`}
                placeholder="email@exemplo.com"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-rose-500 text-xs">Email é obrigatório</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Senha</label>
              <input
                type="password"
                className={`h-11 border rounded-md outline-none px-4 transition-colors ${
                  errors.password
                    ? "border-rose-500 focus:border-rose-500"
                    : "border-gray-300 focus:border-blue-500"
                }`}
                placeholder="Mínimo 6 caracteres"
                {...register("password", { required: true, minLength: 6 })}
              />
              {errors.password && (
                <p className="text-rose-500 text-xs">
                  Senha mínima de 6 caracteres
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Perfil de Acesso
              </label>
              <select
                className="h-11 border border-gray-300 rounded-md outline-none px-4 bg-white text-sm focus:border-blue-500 transition-colors"
                {...register("role")}
              >
                <option value="EDITOR">
                  Editor - Pode criar e editar conteúdo
                </option>
                <option value="ADMIN">Admin - Acesso total ao sistema</option>
              </select>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <SubmitButton label="Cadastrar Usuário" loading={loading} />
            <Link
              href="/admin/users"
              className="inline-flex items-center justify-center px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
