"use client";
import useAuth from "@/hooks/useAuth";
import { ILoginData } from "@/types/types";
import { useState } from "react";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import Image from "next/image";

export default function LoginPage() {
  const [loginData, setLoginData] = useState<ILoginData>({ email: "", password: "" });
  const { signIn, authLoading } = useAuth();

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) return;
    signIn(loginData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4" style={{ background: "linear-gradient(135deg, #f7f0fb 0%, #e8d5f0 100%)" }}>
      <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-8 w-full max-w-sm border border-[var(--violet)]">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[var(--violet)] flex items-center justify-center mb-4">
            <Image
              alt="logo"
              width={44}
              height={44}
              src="/images/larFraternoIconBlack.png"
              priority
            />
          </div>
          <h1 className="text-xl font-bold text-[var(--black)]">Lar Fraterno</h1>
          <p className="text-xs text-gray-500 mt-1">Área Administrativa</p>
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="border border-gray-200 rounded-xl h-11 px-4 text-sm outline-none focus:border-[var(--secondary)] transition-colors bg-gray-50 focus:bg-white"
              type="email"
              placeholder="seu@email.com"
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              className="border border-gray-200 rounded-xl h-11 px-4 text-sm outline-none focus:border-[var(--secondary)] transition-colors bg-gray-50 focus:bg-white"
              type="password"
              placeholder="••••••••"
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
          </div>

          <div className="pt-2">
            <SubmitButton onClick={handleLogin} label="Entrar" loading={authLoading} />
          </div>
        </form>
      </div>
    </div>
  );
}
