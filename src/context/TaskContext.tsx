import {
  ReactNode,
  createContext,
  useContext,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import { ITarefa } from "../types/todo.ds";
import { Context } from "./AuthContext";
import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
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
  setTasks:React.Dispatch<React.SetStateAction<ITarefa[]>>
  collectionTask:CollectionReference<DocumentData, DocumentData>
}


export const TasksContext = createContext({} as ITasksContextProps);

export function TasksProvider({ children }: ITaskProviderProps) {
  const { user } = useContext(Context);
  const [tasks, setTasks] = useState<ITarefa[]>([]);

  const [newTitleOfTask, setNewTitleOfTask] = useState("");

  const userRefTask = doc(db, keyUserTasks, String(user?.uid));
  const collectionTask = collection(userRefTask, keyTask);


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
        setTasks,
        collectionTask
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
