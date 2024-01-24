import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase/firebase";

interface IInitialForm {
    preTextAccount:string
    textAccount:string
    linkAccount: string
    type: 'login' | 'register'
}

export function InitialForm({type,linkAccount,textAccount,preTextAccount}:IInitialForm) {
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

      async function handleRegister(e: FormEvent) {
        e.preventDefault();
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          navigate("/");
        } catch (error) {
          console.error(error);
        }
      }

      const SubmitClick = type === 'login' ? handleSignIn : handleRegister



    return (
        <form className="flex flex-col gap-5">
            <input
              className="bg-[#F5F5F5] border border-[#0D0D0D] p-4 w-full rounded-lg focus:outline-0 text-black"
              type="text"
              name="email"
              id="email"
              placeholder="johndoe@gmail.com"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />

            <input
              className="bg-[#F5F5F5] border border-[#0D0D0D] p-4 w-full rounded-lg focus:outline-0 text-black"
              type="password"
              name="password"
              id="password"
              placeholder="********************"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
           {type ==='login' && (
             <a
             href="#"
             className="text-[#01579B] flex justify-center transition hover:underline text-base"
           >
             Esqueceu sua senha?
           </a>
           )}
            <button
              onClick={SubmitClick}
              type="submit"
              className="text-white text-xl font-bold bg-[#01579B] p-4 rounded-lg hover:opacity-75 transition duration-[350ms] "
            >
              Entrar
            </button>
            <div className="flex gap-1 items-center">
              <p className="text-black text-base">{preTextAccount}</p>
              <Link
                to={linkAccount}
                className="text-[#01579B] transition hover:underline text-base"
              >
                {textAccount}
              </Link>
            </div>
          </form>
    )
}