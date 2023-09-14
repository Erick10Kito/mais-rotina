import { useContext, useEffect, useState } from "react";

import { collection, doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../config/firebase/firebase";
import { Header } from "../../components/Header";
import { AddBar } from "../../components/AddBar";
import { Dashboard } from "../../components/Dashboard";
import { ITarefa } from "../../types/todo.ds";
import { keyTask, keyUserTasks } from "../../config/firebase/keys";
import { Context } from "../../context/AuthContext";
import { SignOut } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const { user } = useContext(Context);
  const [tasks, setTasks] = useState<ITarefa[]>([]);
  const navigate = useNavigate();
  function handleSignOut() {
    auth.signOut().then(() => {
      navigate("/");
    });
  }

  //console.log(tarefas);

  useEffect(() => {
    console.log(tasks);
    const userRefTask = doc(db, keyUserTasks, String(user?.uid));
    const collectionTask = collection(userRefTask, keyTask);
    const updatesInRealTime = onSnapshot(collectionTask, (snapshot) => {
      const databaseTask = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTasks(databaseTask);
    });

    return () => updatesInRealTime();
  }, []);

  return (
    <div
      className={`${
        tasks.length <= 2 && "overflow-y-hidden max-h-screen"
      } relative`}
    >
      <button
        title="Deslogar"
        onClick={handleSignOut}
        className="text-white text-sm font-normal bg-[#1E6F9F] flex p-3 items-center rounded-full hover:opacity-75 fixed right-3 bottom-3 max-[479px]:p-2"
      >
        <SignOut size={20} color="white" weight="bold" />
      </button>
      <Header />

      <div className="flex justify-center bg-[#1A1A1A]  px-4">
        <div
          className={`max-w-7xl w-full h-screen pb-10 ${
            tasks.length > 6 && "max-[479px]:h-full"
          } `}
        >
          <div className="mt-[-26px] flex justify-center w-full">
            <AddBar />
          </div>
          <div className="mt-16">
            <Dashboard tasks={tasks} />
          </div>
        </div>
      </div>
    </div>
  );
}
