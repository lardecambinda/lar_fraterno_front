"use client";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  getUsers,
  updateUser,
  deleteUser,
  toggleUserStatus,
  generatePasswordResetToken,
} from "@/services/apolloAPI";
import { IUser } from "@/types/types";
import { toast } from "react-toastify";
import { Pencil, Trash2, UserCheck, UserX, Loader2, Plus, Key, Copy, Check, X } from "lucide-react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";

interface IFormValues {
  user_name: string;
  email: string;
  role: "ADMIN" | "EDITOR";
}

export default function UsersContainer() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";
  const [users, setUsers] = useState<IUser[]>([]);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [resetModalData, setResetModalData] = useState<{ user: IUser; url: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IFormValues>();

  const handleGenerateResetLink = async (targetUser: IUser) => {
    const res = await generatePasswordResetToken(targetUser.id);
    if (res?.token) {
      const url = `${window.location.origin}/reset-password?token=${res.token}`;
      setResetModalData({ user: targetUser, url });
      setCopied(false);
    }
  };

  const handleCopyLink = async () => {
    if (!resetModalData) return;
    try {
      await navigator.clipboard.writeText(resetModalData.url);
      setCopied(true);
      toast("Link copiado para a área de transferência", {
        type: "success",
        theme: "light",
        hideProgressBar: true,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast("Erro ao copiar link", {
        type: "error",
        theme: "light",
        hideProgressBar: true,
      });
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (editingUser) {
      setValue("user_name", editingUser.user_name);
      setValue("email", editingUser.email);
      setValue("role", editingUser.role);
    }
  }, [editingUser, setValue]);

  const loadUsers = async () => {
    setLoading(true);
    const data = await getUsers();
    if (data) setUsers(data);
    setLoading(false);
  };

  const handleEdit = (user: IUser) => {
    setEditingUser(user);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    reset();
  };

  const handleUpdate: SubmitHandler<IFormValues> = async (data) => {
    if (!editingUser) return;
    const result = await updateUser(editingUser.id, data);
    if (result) {
      toast("Usuário atualizado", {
        type: "success",
        theme: "light",
        hideProgressBar: true,
      });
      setEditingUser(null);
      reset();
      loadUsers();
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Deseja realmente excluir o usuário ${name}?`)) return;
    const result = await deleteUser(id);
    if (result) loadUsers();
  };

  const handleToggle = async (id: string) => {
    const result = await toggleUserStatus(id);
    if (result) {
      toast(`Usuário ${result.active ? "ativado" : "desativado"}`, {
        type: "success",
        theme: "light",
        hideProgressBar: true,
      });
      loadUsers();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Usuários</h1>
          <p className="text-sm text-gray-600 mt-1">
            Gerencie os usuários do sistema
          </p>
        </div>
        {isAdmin && (
          <Link
            href="/admin/users/new"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            Novo Usuário
          </Link>
        )}
      </div>

      {editingUser && isAdmin && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Editar Usuário
          </h3>
          <form className="space-y-4" onSubmit={handleSubmit(handleUpdate)}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Nome
                </label>
                <input
                  className={`h-11 border rounded-md outline-none px-4 transition-colors ${
                    errors.user_name
                      ? "border-rose-500"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                  {...register("user_name", { required: true })}
                />
                {errors.user_name && (
                  <p className="text-rose-500 text-xs">Nome é obrigatório</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className={`h-11 border rounded-md outline-none px-4 transition-colors ${
                    errors.email
                      ? "border-rose-500"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-rose-500 text-xs">Email é obrigatório</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Perfil
                </label>
                <select
                  className="h-11 border border-gray-300 rounded-md outline-none px-4 bg-white text-sm focus:border-blue-500"
                  {...register("role")}
                >
                  <option value="EDITOR">Editor</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Salvar Alterações
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors font-medium"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum usuário cadastrado</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Perfil
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  {isAdmin && (
                    <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {user.user_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.role === "ADMIN"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.active ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    {isAdmin && (
                      <td className="px-6 py-4 text-sm text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleGenerateResetLink(user)}
                            className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-800 transition-colors"
                            title="Gerar link de redefinição de senha"
                          >
                            <Key className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(user)}
                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                            title="Editar"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleToggle(user.id)}
                            className={`inline-flex items-center gap-1 transition-colors ${
                              user.active
                                ? "text-orange-600 hover:text-orange-800"
                                : "text-green-600 hover:text-green-800"
                            }`}
                            title={user.active ? "Desativar" : "Ativar"}
                          >
                            {user.active ? (
                              <UserX className="w-4 h-4" />
                            ) : (
                              <UserCheck className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(user.id, user.user_name)
                            }
                            className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 transition-colors"
                            title="Excluir"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {resetModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 space-y-4 border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2 text-purple-700 font-semibold text-lg">
                <Key className="w-5 h-5 text-purple-600" />
                Link de Redefinição de Senha
              </div>
              <button
                onClick={() => setResetModalData(null)}
                className="text-gray-400 hover:text-gray-600 rounded-lg p-1 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-gray-600">
              Gerado para <strong className="text-gray-900">{resetModalData.user.user_name}</strong> ({resetModalData.user.email}). Este link expira em <span className="font-semibold text-purple-700">15 minutos</span> e pode ser usado apenas 1 vez.
            </p>

            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-2.5">
              <input
                type="text"
                readOnly
                value={resetModalData.url}
                className="bg-transparent text-xs text-gray-700 flex-1 outline-none font-mono"
              />
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1.5 rounded-md font-medium transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copiado!" : "Copiar"}
              </button>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setResetModalData(null)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
