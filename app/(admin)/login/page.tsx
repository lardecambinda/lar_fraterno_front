"use client";
import useAuth from "@/hooks/useAuth";
import { ILoginData } from "@/types/types";
import { useState } from "react";
import SubmitButton from "@/components/SubmitButton/SubmitButton";

export default function page() {
  const [loginData, setLoginData] = useState<ILoginData>({
    email: "",
    password: "",
  });
  const { signIn, authLoading } = useAuth();

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const { email, password } = loginData;
    if (email == "" || password == "") {
      return console.log("Por favor insira email e senha.");
    }

    signIn({ email, password });
  };

  return (
    <div className="flex items-center justify-center fixed inset-0 p-4 bg-violet">
      <div className="bg-white shadow-md p-4 w-full max-w-md">
        <h1 className="text-lg font-semibold mb-4 md:text-xl">
          Login do Admin
        </h1>
        <form className="flex flex-col">
          <div className="flex-1 flex flex-col mb-3">
            <label className="mb-2" htmlFor="email">
              Email:
            </label>
            <input
              className=" placeholder:text-sm w-full border h-11 px-2 outline-none focus:border-gray-800"
              name="email"
              type="email"
              placeholder="Digite seu e-mail"
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
          </div>
          <div className="flex-1 flex flex-col mb-3">
            <label className="mb-2" htmlFor="password">
              Senha:
            </label>
            <input
              className=" placeholder:text-sm w-full  border h-11 px-2 outline-none focus:border-gray-800"
              name="password"
              type="password"
              placeholder="Digite sua senha"
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
          </div>

          <SubmitButton
            onClick={(e) => handleLogin(e)}
            label="Entrar"
            loading={authLoading}
          />
        </form>
      </div>
    </div>
  );
}
