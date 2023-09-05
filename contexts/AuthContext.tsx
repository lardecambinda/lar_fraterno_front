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
}

interface IProps {
  children: JSX.Element | JSX.Element[];
}

export const AuthContext = createContext({} as IAuthContext);

export default function AuthContextProvider({ children }: IProps) {
  const [user, setUser] = useState<IUser | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const { "lar-fraterno_token": token } = parseCookies();

    if (!token) {
      return router.push("/login");
    }

    const tokenDecoded = jwt.decode(token) as ITokenData;
    const expired = checkTokenExpired(tokenDecoded.exp);

    if (expired) {
      console.log("token expired");

      destroyCookie(undefined, "lar-fraterno_token");

      return router.push("/login");
    } else {
      const userId = tokenDecoded.id;
      getMe(userId);

      router.push(pathname);
    }
  }, []);

  const getMe = async (id: string) => {
    const user = (await getUserById(id)) as IUser;
    setUser(user);
  };

  const signIn = async (loginData: ILoginData) => {
    const { email, password } = loginData;
    if (!email || !password) {
      return console.log("Por favor insira email e senha.");
    }

    const data = await signInRequest({ email, password });

    if (!data) {
      return console.log("Failed to log in...");
    }

    setUser(data.userReturned);
    setCookie(undefined, "lar-fraterno_token", data.token, {
      maxAge: 60 * 60 * 24, //24 hours
    });

    const token = jwt.decode(data.token) as ITokenData;
    console.log(checkTokenExpired(token.exp));

    router.push("/admin");
  };

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
