import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { AddBar } from "./components/AddBar";
import "./globals.css";
import { ITarefa } from "./types/todo.ds";

import {
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db, keyTask, taskCollectionRef } from "./config/firebase/firebase";

function App() {
  const [newTitleOfTask, setNewTitleOfTask] = useState("");
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

  function handleNewTitleTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTitleOfTask(event.target.value);
  }

  async function handleCreateTask(event: FormEvent) {
    event.preventDefault();
    await addDoc(taskCollectionRef, {
      title: newTitleOfTask,
      completed: false,
    });
  }

  async function DeleteTask(TasktoDelete: string) {
    const taskDocRef = doc(db, keyTask, TasktoDelete);
    await deleteDoc(taskDocRef);
  }

  async function updateCompletedTasks(taskId: string, completed: boolean) {
    const taskDocRef = doc(db, keyTask, taskId);
    await updateDoc(taskDocRef, { completed: completed });
  }

  return (
    <>
      <Header />
      <div className="flex justify-center bg-[#1A1A1A]  ">
        <div className="max-w-7xl w-full h-screen">
          <div className="mt-[-26px] flex justify-center w-full">
            <AddBar
              handleNewTitleTaskChange={handleNewTitleTaskChange}
              handleCreateTask={handleCreateTask}
            />
          </div>
          <div className="mt-16">
            <Dashboard
              tasks={tasks}
              DeleteTask={DeleteTask}
              updateCompletedTasks={updateCompletedTasks}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
