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

    create: (event: FormEvent) => void;
    delete: (TasktoDelete: string) => Promise<null>;
    completed: (taskId: string, completed: boolean) => Promise<void>;
    edit: (id: string, newTitle: string) => Promise<void>;
  };
  handleNewTitleTaskChange: (event: ChangeEvent<HTMLInputElement>) => void;
  newTitleOfTask: string;
  setTasks: React.Dispatch<React.SetStateAction<ITarefa[]>>;
  collectionTask: CollectionReference<DocumentData, DocumentData>;
}

export const TasksContext = createContext({} as ITasksContextProps);

export function TasksProvider({ children }: ITaskProviderProps) {
  const { user } = useContext(Context);
  const [tasks, setTasks] = useState<ITarefa[]>([]);
 
  const [newTitleOfTask, setNewTitleOfTask] = useState("");

  const userRefTask = doc(db, keyUserTasks, String(user?.uid));
  // Aqui estou passando o banco de dados, a chave de referencia da coleção criada no banco de dados, e o id do usuario
  // keyUserTasks = é a chave da coleção onde os documentos do usuario estão armazenados
  // constante userRefTask está usando a função doc para criar uma referência ao documento do usuário atualmente autenticado no Firestore
  const collectionTask = collection(userRefTask, keyTask);
  // está criando uma referência para uma coleção específica no Firestore

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
    if (newTitleOfTask === "") {
      alert("Digite a sua tarefa");
    } else {
      event.preventDefault();
      const currentDate = new Date();
      await addDoc(collectionTask, {
        title: newTitleOfTask,
        completed: false,
        date: currentDate,
      });
      setNewTitleOfTask("");
    }
  }

  async function handleEditTask(id: string, newTitle: string) {
    if (newTitle === "") {
      alert("Edite sua tarefa");
    } else {
      const taskDocRef = doc(collectionTask, id);
      await updateDoc(taskDocRef, { title: newTitle });
    }
  }

  const TasksRepository = {
    read: tasks,
    edit: handleEditTask,
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
        collectionTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
