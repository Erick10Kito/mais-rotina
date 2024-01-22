import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../../components/Logo";
import { useState } from "react";
import { auth } from "../../config/firebase/firebase";
import { ChangeEvent, FormEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

export function Cadastro() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex justify-center bg-[#01579B] py-10">
      <div className="max-w-7xl bg-[#F5F5F5] h-screen w-full rounded flex flex-col items-center justify-center py-10 gap-5">
        <div className="">
          <Logo />
        </div>
        <div className="max-w-xl w-full">
          <form className="flex flex-col gap-5">
            <input
              className="bg-[#F5F5F5] border border-[#0D0D0D] p-4 w-full rounded-lg focus:outline-0 text-black"
              type="text"
              name="email"
              id="email"
              placeholder="Digite seu e-mail"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />

            <input
              className="bg-[#F5F5F5] border border-[#0D0D0D] p-4 w-full rounded-lg focus:outline-0 text-black"
              type="password"
              name="password"
              id="password"
              placeholder="Digite sua senha"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />

            <button
              onClick={handleRegister}
              type="submit"
              className="text-white text-xl font-bold bg-[#01579B] p-4 rounded-lg hover:opacity-75 transition duration-[350ms] "
            >
              Cadastrar
            </button>
            <div className="flex gap-1 items-center">
              <p className="text-black text-base">Ja tem um conta?</p>
              <Link
                to="/"
                className="text-[#01579B] transition hover:underline text-base"
              >
                Entre aqui
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
