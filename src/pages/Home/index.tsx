import { useContext, useEffect, useState } from "react";

import { doc, onSnapshot, collection } from "firebase/firestore";
import { db } from "../../config/firebase/firebase";
import { Header } from "../../components/Header";
import { AddBar } from "../../components/AddBar";
import { Dashboard } from "../../components/Dashboard";
import { ITarefa } from "../../types/todo.ds";
import { Context } from "../../context/AuthContext";
import { keyTask, keyUserTasks } from "../../config/firebase/keys";

export function Home() {
  const [tasks, setTasks] = useState<ITarefa[]>([]);
  const { user } = useContext(Context);

  useEffect(() => {
    console.log(tasks);
    const refT = doc(db, keyUserTasks, String(user?.uid));
    const collectionTask = collection(refT, keyTask);

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
    <div className="">
      <Header />
      <h1></h1>
      <div className="flex justify-center bg-[#1A1A1A]  px-4">
        <div className="max-w-7xl w-full h-screen max-[479px]:h-full pb-10">
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
