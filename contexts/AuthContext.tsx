"use client";
import { ILoginData, IUser } from "@/types/types";
import { createContext, useState, useEffect } from "react";
import { setCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";

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

  // useEffect(() => {
  //   const { "lar-fraterno_token": token } = parseCookies();

  //   if (token) {
  //     getMe(token);
  //   }
  // }, []);

  const getMe = async (token: string) => {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_ROUTE}/users/me`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!resp.ok) {
      return console.log(resp);
    }

    const data = await resp.json();

    setUser(data.user);
  };

  const signIn = async (loginData: ILoginData) => {
    const { email, password } = loginData;
    if (!email || !password) {
      return console.log("Por favor insira email e senha.");
    }

    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_ROUTE}/auth/login`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      }
    );

    if (!resp.ok) {
      return console.log("Error...");
    }

    const data = await resp.json();

    setUser(data.user);
    setCookie(undefined, "lar-fraterno_token", data.token, {
      maxAge: 60 * 60 * 2, //2 hours
    });

    router.push("/admin");
  };

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
