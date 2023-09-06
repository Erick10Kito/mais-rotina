import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import "./globals.css";
import { ITarefas } from "./types/todo.ds";
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

function App() {
  const firebaseApp = initializeApp({
    apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
    authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
    storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_REACT_APP_ID,
  });

  console.log(import.meta.env.VITE_REACT_APP_API_KEY);

  const [newTask, setNewTask] = useState("");
  const [tarefas, setTarefas] = useState<ITarefas[]>([]);

  const db = getFirestore(firebaseApp);
  const taskCollectionRef = collection(db, "tasks");

  useEffect(() => {
    const getTasks = async () => {
      const { docs } = await getDocs(taskCollectionRef);

      const tarefa = docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTarefas(tarefa);
    };

    getTasks();
  }, []);

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  async function handleCreateTask(event: FormEvent) {
    event.preventDefault();
    const newTarefa = await addDoc(taskCollectionRef, {
      title: newTask,
      completed: false,
    });

    setTarefas([...tarefas, newTarefa]);
  }

  async function DeleteTask(TasktoDelete: string) {
    const taskDocRef = doc(db, "tasks", TasktoDelete);
    await deleteDoc(taskDocRef);
  }

  function updateCompletedtasks(taskId: string, completed: boolean) {
    const tasksWithUpdateInCompleted = tarefas.map((tarefa) => {
      if (tarefa.id === taskId) {
        const taskDocRef = doc(db, "tasks", taskId);
        updateDoc(taskDocRef, { completed: completed });
        return { ...tarefa, completed };
      }
      return tarefa;
    });
    setTarefas(tasksWithUpdateInCompleted);
  }
  console.log(tarefas);

  return (
    <>
      <Header />
      <div className="flex justify-center bg-[#1A1A1A]  ">
        <div className="max-w-7xl w-full h-screen">
          <div className="mt-[-26px] flex justify-center w-full">
            <SearchBar
              handleNewTaskChange={handleNewTaskChange}
              handleCreateTask={handleCreateTask}
            />
          </div>
          <div className="mt-16">
            <Dashboard
              tarefas={tarefas}
              DeleteTask={DeleteTask}
              updateCompletedtasks={updateCompletedtasks}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
