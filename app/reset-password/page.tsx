"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { validatePasswordResetToken, resetPassword } from "@/services/apolloAPI";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import Image from "next/image";
import { toast } from "react-toastify";
import { CheckCircle2, AlertCircle, Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [tokenInfo, setTokenInfo] = useState<{ valid: boolean; email?: string; user_name?: string; error_message?: string } | null>(null);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setTokenInfo({ valid: false, error_message: "Nenhum token fornecido" });
      setLoading(false);
      return;
    }

    validatePasswordResetToken(token).then((res) => {
      setTokenInfo(res);
      setLoading(false);
    });
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!newPassword || newPassword.length < 6) {
      setErrorMsg("A senha deve ter no mínimo 6 caracteres");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg("As senhas não coincidem");
      return;
    }

    if (!token) return;

    setSubmitting(true);
    const result = await resetPassword(token, newPassword);
    setSubmitting(false);

    if (result) {
      setSuccess(true);
      toast("Senha alterada com sucesso!", { type: "success", theme: "light", hideProgressBar: true });
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4"
      style={{ background: "linear-gradient(135deg, #f7f0fb 0%, #e8d5f0 100%)" }}
    >
      <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-8 w-full max-w-md border border-[var(--violet)]">
        {/* Header/Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-[var(--violet)] flex items-center justify-center mb-3">
            <Image
              alt="logo"
              width={44}
              height={44}
              src="/images/larFraternoIconBlack.png"
              priority
            />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Redefinir Senha</h1>
          <p className="text-xs text-gray-500 mt-1">Lar Fraterno de Cambinda</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-600 font-medium">Validando link de redefinição...</p>
          </div>
        ) : success ? (
          <div className="text-center py-6 space-y-4">
            <div className="flex justify-center">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 animate-in zoom-in duration-200" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Senha Alterada!</h2>
            <p className="text-sm text-gray-600">
              Sua senha foi redefinida com sucesso. Redirecionando para a tela de login...
            </p>
            <div className="pt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-purple-700 hover:text-purple-900 font-medium text-sm"
              >
                <ArrowLeft className="w-4 h-4" /> Ir para Login agora
              </Link>
            </div>
          </div>
        ) : tokenInfo && !tokenInfo.valid ? (
          <div className="text-center py-6 space-y-4">
            <div className="flex justify-center">
              <AlertCircle className="w-16 h-16 text-rose-500" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Link Inválido ou Expirado</h2>
            <p className="text-sm text-gray-600">
              {tokenInfo.error_message || "O link de redefinição expirou ou já foi utilizado. Solicite um novo link ao administrador."}
            </p>
            <div className="pt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Voltar para o Login
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {tokenInfo?.email && (
              <div className="bg-purple-50 border border-purple-100 rounded-xl p-3 text-xs text-purple-900 mb-1">
                Redefinindo senha para: <strong>{tokenInfo.user_name || tokenInfo.email}</strong> ({tokenInfo.email})
              </div>
            )}

            {errorMsg && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-xl p-3 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {errorMsg}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-1.5" htmlFor="newPassword">
                <Lock className="w-3.5 h-3.5" /> Nova Senha
              </label>
              <input
                id="newPassword"
                type="password"
                className="border border-gray-200 rounded-xl h-11 px-4 text-sm outline-none focus:border-purple-600 transition-colors bg-gray-50 focus:bg-white"
                placeholder="No mínimo 6 caracteres"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide flex items-center gap-1.5" htmlFor="confirmPassword">
                <Lock className="w-3.5 h-3.5" /> Confirmar Nova Senha
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="border border-gray-200 rounded-xl h-11 px-4 text-sm outline-none focus:border-purple-600 transition-colors bg-gray-50 focus:bg-white"
                placeholder="Repita a nova senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="pt-2">
              <SubmitButton label="Salvar Nova Senha" loading={submitting} />
            </div>

            <div className="text-center pt-2">
              <Link href="/login" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                Cancelar e voltar ao login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen p-4" style={{ background: "linear-gradient(135deg, #f7f0fb 0%, #e8d5f0 100%)" }}>
          <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-8 w-full max-w-md border border-[var(--violet)] text-center py-8">
            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-gray-600">Carregando...</p>
          </div>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
