import { useEffect, useState } from "react";

import { onSnapshot } from "firebase/firestore";

import "./globals.css";

import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { AddBar } from "./components/AddBar";

import { taskCollectionRef } from "./config/firebase/firebase";

import { ITarefa } from "./types/todo.ds";

function App() {
  const [tasks, setTasks] = useState<ITarefa[]>([]);

  //console.log(tarefas);

  useEffect(() => {
    console.log(tasks);
    const updatesInRealTime = onSnapshot(taskCollectionRef, (snapshot) => {
      const databaseTask = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTasks(databaseTask);
    });

    return () => updatesInRealTime();
  }, []);

  return (
    <>
      <Header />
      <div className="flex justify-center bg-[#1A1A1A]  ">
        <div className="max-w-7xl w-full h-screen">
          <div className="mt-[-26px] flex justify-center w-full">
            <AddBar />
          </div>
          <div className="mt-16">
            <Dashboard tasks={tasks} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
