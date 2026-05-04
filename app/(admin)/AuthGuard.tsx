"use client";
import useAuth from "@/hooks/useAuth";
import Skeleton from "@/components/Skeleton/Skeleton";

function DashboardSkeleton() {
  return (
    <div className="pb-[100px] md:pb-0 space-y-6">
      {/* Título */}
      <div>
        <Skeleton height={32} width={160} />
        <Skeleton height={16} width={200} className="mt-2" />
      </div>

      {/* Infocards — mesma estrutura do Infocard.tsx */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-4 rounded-md shadow-md bg-white flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Skeleton height={40} width={40} className="rounded-full" />
              <Skeleton height={20} width={96} />
            </div>
            <Skeleton height={36} width={48} className="ml-4" />
          </div>
        ))}
      </div>

      {/* Acesso rápido */}
      <div>
        <Skeleton height={24} width={144} className="mb-3" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Skeleton height={40} width={40} className="rounded-lg" />
                <div className="space-y-1">
                  <Skeleton height={16} width={112} />
                  <Skeleton height={12} width={64} className="mt-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PostsContainer — mesma estrutura com header + filtros + lista */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        {/* Header do PostsContainer */}
        <div className="flex items-center mb-4 gap-2">
          <Skeleton height={36} width={36} className="rounded-full" />
          <Skeleton height={20} width={120} />
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Skeleton height={36} className="flex-1 min-w-[140px]" />
          <Skeleton height={36} width={80} />
          <Skeleton height={36} width={80} />
          <Skeleton height={36} width={110} />
        </div>

        {/* Linhas de posts — mesma altura do item real */}
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="mb-2 max-w-[98%] mx-auto" height={90} />
        ))}
      </div>
    </div>
  );
}

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { authLoading } = useAuth();

  if (authLoading) return <DashboardSkeleton />;

  return <>{children}</>;
}
