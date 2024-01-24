import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../../components/Logo";
import { useState } from "react";
import { auth } from "../../config/firebase/firebase";
import { ChangeEvent, FormEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { InitialForm } from "../../components/InitialForm";

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
         <InitialForm preTextAccount="Ja tem um conta?" textAccount="Entre aqui" linkAccount="/" type="register"/>
        </div>
      </div>
    </div>
  );
}
