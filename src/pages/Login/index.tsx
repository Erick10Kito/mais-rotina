import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../../components/Logo";
import { ChangeEvent, FormEvent, useState } from "react";

import { auth } from "../../config/firebase/firebase";

import { signInWithEmailAndPassword } from "firebase/auth";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSignIn(e: FormEvent) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex justify-center bg-[#1A1A1A] py-10">
      <div className="max-w-7xl bg-[#0D0D0D] h-screen w-full rounded flex flex-col items-center justify-center py-10 gap-5">
        <div className="">
          <Logo />
        </div>
        <div className="max-w-xl w-full">
          <form className="flex flex-col gap-5">
            <input
              className="bg-[#262626] border border-[#0D0D0D] p-4 w-full rounded-lg focus:outline-0 text-white"
              type="text"
              name="email"
              id="email"
              placeholder="johndoe@gmail.com"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />

            <input
              className="bg-[#262626] border border-[#0D0D0D] p-4 w-full rounded-lg focus:outline-0 text-white"
              type="password"
              name="password"
              id="password"
              placeholder="********************"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
            <a
              href="#"
              className="text-[#5E60CE] flex justify-center transition hover:underline text-base"
            >
              Esqueceu sua senha?
            </a>
            <button
              onClick={handleSignIn}
              type="submit"
              className="text-white text-xl font-bold bg-[#1E6F9F] p-4 rounded-lg hover:opacity-75 transition duration-[350ms] "
            >
              Entrar
            </button>
            <div className="flex gap-1 items-center">
              <p className="text-white text-base">Você não tem conta?</p>
              <Link
                to="/cadastro"
                className="text-[#5E60CE] transition hover:underline text-base"
              >
                Crie sua conta aqui
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
