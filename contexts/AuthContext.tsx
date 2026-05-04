"use client";
import { ILoginData, ITokenData, IUser } from "@/types/types";
import { createContext, useState, useEffect } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { useRouter, usePathname } from "next/navigation";
import { getUserById, signInRequest } from "@/services/apolloAPI";
import * as jwt from "jsonwebtoken";
import checkTokenExpired from "@/utils/checkTokenExpired";

interface IAuthContext {
  user: IUser | null;
  signIn: (data: ILoginData) => void;
  signOut: () => void;
  authLoading: boolean;
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const AuthContext = createContext({} as IAuthContext);

export default function AuthContextProvider({ children }: IProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const { "lar-fraterno_token": token } = parseCookies();

    if (!token) {
      setAuthLoading(false);
      return router.push("/login");
    }

    const tokenDecoded = jwt.decode(token) as ITokenData;
    const expired = checkTokenExpired(tokenDecoded.exp);

    if (expired) {
      destroyCookie(undefined, "lar-fraterno_token");
      setAuthLoading(false);
      return router.push("/login");
    }

    // Bloquear acesso ao /admin para não-ADMIN
    if (pathname?.startsWith("/admin") && tokenDecoded.role !== "ADMIN" && tokenDecoded.role !== "EDITOR") {
      setAuthLoading(false);
      return router.push("/login");
    }

    getMe(tokenDecoded.id);
  }, [pathname]);

  const getMe = async (id: string) => {
    setAuthLoading(true);
    try {
      const user = (await getUserById(id)) as IUser;
      setUser(user);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      destroyCookie(undefined, "lar-fraterno_token");
      router.push("/login");
    } finally {
      setAuthLoading(false);
    }
  };

  const signIn = async (loginData: ILoginData) => {
    const { email, password } = loginData;
    if (!email || !password) return;

    setAuthLoading(true);
    const data = await signInRequest({ email, password });
    setAuthLoading(false);

    if (!data) return;

    setUser(data.userReturned);
    setCookie(undefined, "lar-fraterno_token", data.token, {
      maxAge: 60 * 60 * 24, // 24 horas
      path: "/",
      secure: process.env.NODE_ENV === "production", // HTTPS apenas em produção
      sameSite: "strict", // Proteção contra CSRF
      httpOnly: false, // Precisa ser false para Next.js client-side
    });

    router.push("/admin");
  };

  const signOut = async () => {
    destroyCookie(undefined, "lar-fraterno_token");
    return router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
