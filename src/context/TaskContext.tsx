import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import { ITarefa } from "../types/todo.ds";
import { Context } from "./AuthContext";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase/firebase";
import { keyTask, keyUserTasks } from "../config/firebase/keys";

interface ITaskProviderProps {
  children: ReactNode;
}
interface ITasksContextProps {
  TasksRepository: {
    read: ITarefa[];
    update: string;
    create: (event: FormEvent) => void;
    delete: (TasktoDelete: string) => Promise<null>;
    completed: (taskId: string, completed: boolean) => Promise<void>;
  };
  handleNewTitleTaskChange: (event: ChangeEvent<HTMLInputElement>) => void;
  newTitleOfTask: string;
}
interface IDatabaseTask {
  id: string;
  date?: string;
}

export const TasksContext = createContext({} as ITasksContextProps);

export function TasksProvider({ children }: ITaskProviderProps) {
  const { user } = useContext(Context);
  const [tasks, setTasks] = useState<ITarefa[]>([]);

  const [newTitleOfTask, setNewTitleOfTask] = useState("");

  const userRefTask = doc(db, keyUserTasks, String(user?.uid));
  const collectionTask = collection(userRefTask, keyTask);

  useEffect(() => {
    const updatesInRealTime = onSnapshot(collectionTask, (snapshot) => {
      const databaseTask: IDatabaseTask[] = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const databaseTaskDates = databaseTask.filter((item) => item.date);

      const databaseTaskOrder = databaseTaskDates.sort((a, b) => {
        return Number(b.date) - Number(a.date);
      });

      setTasks(databaseTaskOrder);
    });

    return () => updatesInRealTime();
  }, []);

  async function handleDeleteTask(id: string) {
    if (confirm("Deseja excluir essa tarefa?")) {
      const taskDocRef = doc(collectionTask, id);
      await deleteDoc(taskDocRef);
    }
    return null;
  }
  async function updateCompletedTasks(id: string, completed: boolean) {
    const taskDocRef = doc(collectionTask, id);
    await updateDoc(taskDocRef, { completed: completed });
  }

  function handleNewTitleTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTitleOfTask(event.target.value);
  }

  async function handleCreateTask(event: FormEvent) {
    event.preventDefault();
    const currentDate = new Date();
    await addDoc(collectionTask, {
      title: newTitleOfTask,
      completed: false,
      date: currentDate,
    });
    setNewTitleOfTask("");
  }

  const TasksRepository = {
    read: tasks,
    update: "",
    create: handleCreateTask,
    delete: handleDeleteTask,
    completed: updateCompletedTasks,
  };
  return (
    <TasksContext.Provider
      value={{
        TasksRepository,
        handleNewTitleTaskChange,
        newTitleOfTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
