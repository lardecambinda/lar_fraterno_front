"use client";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { getCategories, createCategory, updateCategory, deleteCategory } from "@/services/apolloAPI";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { Tag, Pencil, Trash2, Loader2, Plus, X } from "lucide-react";

interface ICategory {
  id: string;
  name: string;
  user_id: string;
  status: string;
  createdAt: string;
  users?: { id: string; user_name: string };
}

interface IFormValues {
  name: string;
}

export default function CategoriesPage() {
  const { user } = useAuth();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(null);
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<IFormValues>();
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const isAdmin = user?.role === "ADMIN";

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (editingCategory) {
      setValue("name", editingCategory.name);
    } else {
      reset();
    }
  }, [editingCategory, setValue, reset]);

  const loadCategories = async () => {
    setLoadingList(true);
    const data = await getCategories();
    if (data) setCategories(data);
    setLoadingList(false);
  };

  const submit: SubmitHandler<IFormValues> = async ({ name }) => {
    setLoading(true);
    if (editingCategory) {
      const result = await updateCategory(editingCategory.id, name);
      if (result) {
        toast("Categoria atualizada", { type: "success", theme: "light", hideProgressBar: true });
        setEditingCategory(null);
        reset();
        loadCategories();
      }
    } else {
      const result = await createCategory(name);
      if (result) {
        toast("Categoria criada", { type: "success", theme: "light", hideProgressBar: true });
        reset();
        loadCategories();
      }
    }
    setLoading(false);
  };

  const handleEdit = (category: ICategory) => {
    setEditingCategory(category);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    reset();
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Deseja realmente excluir a categoria "${name}"?`)) return;
    const result = await deleteCategory(id);
    if (result) loadCategories();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gerenciamento de Categorias</h1>
        <p className="text-sm text-gray-600 mt-1">Organize o conteúdo com categorias personalizadas</p>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {editingCategory ? "Editar Categoria" : "Nova Categoria"}
          </h2>
        </div>
        <form className="p-6" onSubmit={handleSubmit(submit)}>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input
                className={`w-full h-11 border rounded-md outline-none px-4 transition-colors ${
                  errors.name ? "border-rose-500 focus:border-rose-500" : "border-gray-300 focus:border-blue-500"
                }`}
                placeholder="Nome da categoria"
                {...register("name", { required: true })}
              />
              {errors.name && <p className="text-rose-500 text-xs mt-1">Nome é obrigatório</p>}
            </div>
            <div className="flex gap-2">
              <button 
                type="submit" 
                disabled={loading}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : editingCategory ? (
                  <Pencil className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                {editingCategory ? "Atualizar" : "Criar"}
              </button>
              {editingCategory && (
                <button 
                  type="button" 
                  onClick={handleCancelEdit}
                  className="inline-flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors font-medium"
                >
                  <X className="w-4 h-4" />
                  Cancelar
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Categorias Cadastradas</h2>
          <p className="text-sm text-gray-600 mt-1">{categories.length} categoria(s) disponível(is)</p>
        </div>

        {loadingList ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12">
            <Tag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">Nenhuma categoria cadastrada</p>
            <p className="text-gray-400 text-sm mt-1">Crie sua primeira categoria acima</p>
          </div>
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {categories.map((category) => {
                const canEdit = isAdmin || category.user_id === user?.id;
                const isPending = category.status === 'PENDING';
                
                return (
                  <div 
                    key={category.id} 
                    className="group flex items-center justify-between bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 transition-colors"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <Tag className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium text-gray-900 truncate block">{category.name}</span>
                        {isPending && (
                          <span className="text-xs text-orange-600">Aguardando aprovação</span>
                        )}
                      </div>
                    </div>
                    {canEdit && (
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEdit(category)} 
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Editar"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(category.id, category.name)} 
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
