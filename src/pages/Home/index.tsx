import { useContext, useEffect, useState } from "react";

import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase/firebase";
import { Header } from "../../components/Header";
import { AddBar } from "../../components/AddBar";
import { Dashboard } from "../../components/Dashboard";
import { ITarefa } from "../../types/todo.ds";
import { keyTask, keyUserTasks } from "../../config/firebase/keys";
import { Context } from "../../context/AuthContext";

export function Home() {
  const { user } = useContext(Context);
  const [tasks, setTasks] = useState<ITarefa[]>([]);

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
    <div className={`${tasks.length <= 2 && "overflow-y-hidden max-h-screen"}`}>
      <Header />
      <h1></h1>
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
