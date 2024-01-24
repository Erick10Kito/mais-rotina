import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../../components/Logo";
import { ChangeEvent, FormEvent, useState } from "react";

import { auth } from "../../config/firebase/firebase";

import { signInWithEmailAndPassword } from "firebase/auth";
import { InitialForm } from "../../components/InitialForm";

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
    <div className="flex justify-center bg-[#01579B] py-10">
      <div className="max-w-7xl bg-[#F5F5F5] h-screen w-full rounded flex flex-col items-center justify-center py-10 gap-5">
        <div className="">
          <Logo />
        </div>
        <div className="max-w-xl w-full">
        <InitialForm preTextAccount="Você não tem conta?" textAccount="Crie sua conta aqui" linkAccount="/cadastro" type="login"/>  
        </div>
      </div>
    </div>
  );
}
