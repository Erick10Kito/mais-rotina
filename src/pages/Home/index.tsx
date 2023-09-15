import { auth } from "../../config/firebase/firebase";
import { Header } from "../../components/Header";

import { Dashboard } from "../../components/Dashboard";
import { SignOut } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import { AddOrEditBar } from "../../components/AddOrEditBar";

export function Home() {
  const navigate = useNavigate();
  function handleSignOut() {
    auth.signOut().then(() => {
      navigate("/");
    });
  }

  return (
    <div className={` relative min-h-screen h-screen`}>
      <button
        title="Deslogar"
        onClick={handleSignOut}
        className="text-white text-sm font-normal bg-[#1E6F9F] flex p-3 items-center rounded-full hover:opacity-75 fixed right-3 bottom-3 max-[479px]:p-2"
      >
        <SignOut size={20} color="white" weight="bold" />
      </button>
      <Header />

      <div className="flex justify-center bg-[#1A1A1A]  px-4">
        <div className={`max-w-7xl w-full min-h-screen pb-10 `}>
          <div className="mt-[-26px] flex justify-center w-full">
            <AddOrEditBar type="add" />
          </div>
          <div className="mt-16">
            <Dashboard />
          </div>
        </div>
      </div>
    </div>
  );
}
