"use client";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Tag,
  Users,
  UserPlus,
  Mic,
} from "lucide-react";
import useAuth from "@/hooks/useAuth";

export default function AdminNav() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="bg-light-black fixed w-full bottom-0 h-20 md:h-full md:w-64 z-50 border-r border-gray-800">
      <div className="flex md:flex-col h-full">
        {/* Logo */}
        <div className="hidden md:block p-6 border-b border-gray-800">
          <Link
            className="block"
            title="lar fraterno de cambinda"
            href={"/admin"}
          >
            <div className="flex items-center gap-3">
              <Image
                alt="logo"
                width={48}
                height={48}
                src={"/images/larFraternoIconBlack.png"}
                className="rounded-lg logo"
                priority
              />
              <div>
                <p className="text-white font-semibold text-sm leading-tight">
                  Lar Fraterno
                </p>
                <p className="text-gray-400 text-xs">
                  {isAdmin ? "Admin" : "Editor"}
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex md:flex-col w-full">
          <ul className="flex md:flex-col w-full md:p-3 md:space-y-1">
            <li className="flex-1 flex items-center justify-center md:flex-none">
              <Link
                href="/admin"
                className="flex w-full items-center justify-center md:justify-start gap-3 px-4 md:px-4 py-4 md:py-3 text-gray-300 hover:text-white hover:bg-white/5 md:rounded-lg transition-all group"
                title="Dashboard"
              >
                <LayoutDashboard className="w-5 h-5" strokeWidth={1.5} />
                <span className="hidden md:block text-sm font-medium">
                  Dashboard
                </span>
              </Link>
            </li>

            <li className="flex-1 flex items-center justify-center md:flex-none">
              <Link
                href="/admin/posts"
                className="flex w-full items-center justify-center md:justify-start gap-3 px-4 md:px-4 py-4 md:py-3 text-gray-300 hover:text-white hover:bg-white/5 md:rounded-lg transition-all group"
                title="Publicações"
              >
                <FileText className="w-5 h-5" strokeWidth={1.5} />
                <span className="hidden md:block text-sm font-medium">
                  Publicações
                </span>
              </Link>
            </li>

            <li className="flex-1 flex items-center justify-center md:flex-none">
              <Link
                href="/admin/categories"
                className="flex w-full items-center justify-center md:justify-start gap-3 px-4 md:px-4 py-4 md:py-3 text-gray-300 hover:text-white hover:bg-white/5 md:rounded-lg transition-all group"
                title="Categorias"
              >
                <Tag className="w-5 h-5" strokeWidth={1.5} />
                <span className="hidden md:block text-sm font-medium">
                  Categorias
                </span>
              </Link>
            </li>

            <li className="flex-1 flex items-center justify-center md:flex-none">
              <Link
                href="/admin/transcriptions"
                className="flex w-full items-center justify-center md:justify-start gap-3 px-4 md:px-4 py-4 md:py-3 text-gray-300 hover:text-white hover:bg-white/5 md:rounded-lg transition-all group"
                title="Transcrições"
              >
                <Mic className="w-5 h-5" strokeWidth={1.5} />
                <span className="hidden md:block text-sm font-medium">
                  Transcrições
                </span>
              </Link>
            </li>

            {isAdmin && (
              <>
                <li className="hidden md:block">
                  <div className="px-4 py-2 mt-4 mb-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Usuários
                    </p>
                  </div>
                </li>

                <li className="flex-1 flex items-center justify-center md:flex-none">
                  <Link
                    href="/admin/users"
                    className="flex w-full items-center justify-center md:justify-start gap-3 px-4 md:px-4 py-4 md:py-3 text-gray-300 hover:text-white hover:bg-white/5 md:rounded-lg transition-all group"
                    title="Gerenciar Usuários"
                  >
                    <Users className="w-5 h-5" strokeWidth={1.5} />
                    <span className="hidden md:block text-sm font-medium">
                      Gerenciar
                    </span>
                  </Link>
                </li>

                <li className="flex-1 flex items-center justify-center md:flex-none">
                  <Link
                    href="/admin/users/new"
                    className="flex w-full items-center justify-center md:justify-start gap-3 px-4 md:px-4 py-4 md:py-3 text-gray-300 hover:text-white hover:bg-white/5 md:rounded-lg transition-all group"
                    title="Novo Usuário"
                  >
                    <UserPlus className="w-5 h-5" strokeWidth={1.5} />
                    <span className="hidden md:block text-sm font-medium">
                      Novo Usuário
                    </span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Mobile Logo */}
        <div className="md:hidden flex items-center justify-center px-4">
          <Link href="/admin">
            <Image
              alt="logo"
              width={40}
              height={40}
              src={"/images/larFraternoIconBlack.png"}
              className="rounded-lg logo"
              priority
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
