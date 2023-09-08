"use client";
import { ILoginData, ITokenData, IUser } from "@/types/types";
import { createContext, useState, useEffect } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/navigation";
import { getUserById, signInRequest } from "@/services/apolloAPI";
import * as jwt from "jsonwebtoken";
import checkTokenExpired from "@/utils/checkTokenExpired";
import { usePathname } from "next/navigation";

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
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const { "lar-fraterno_token": token } = parseCookies();

    if (!token) {
      return router.push("/login");
    }

    setAuthLoading(true);

    const tokenDecoded = jwt.decode(token) as ITokenData;
    const expired = checkTokenExpired(tokenDecoded.exp);

    if (expired) {
      console.log("token expired");

      destroyCookie(undefined, "lar-fraterno_token");

      setAuthLoading(false);

      return router.push("/login");
    } else {
      const userId = tokenDecoded.id;
      getMe(userId);

      setAuthLoading(false);

      return router.push(pathname);
    }
  }, []);

  const getMe = async (id: string) => {
    setAuthLoading(true);
    const user = (await getUserById(id)) as IUser;
    setAuthLoading(false);
    setUser(user);
  };

  const signIn = async (loginData: ILoginData) => {
    const { email, password } = loginData;
    if (!email || !password) {
      return console.log("Por favor insira email e senha.");
    }

    setAuthLoading(true);

    const data = await signInRequest({ email, password });

    setAuthLoading(false);

    if (!data) {
      return console.log("Failed to log in...");
    }

    setAuthLoading(false);
    setUser(data.userReturned);
    setCookie(undefined, "lar-fraterno_token", data.token, {
      maxAge: 60 * 60 * 24, //24 hours
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
