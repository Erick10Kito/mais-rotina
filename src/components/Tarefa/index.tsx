import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";

import { db } from "../../config/firebase/firebase";
import { keyTask, keyUserTasks } from "../../config/firebase/keys";

import { Trash } from "@phosphor-icons/react";
import { Context } from "../../context/AuthContext";
import { useContext } from "react";

interface ITarefaProps {
  title: string;

  id: string;
  completed: boolean;
}

export function Tarefa({ title, id, completed }: ITarefaProps) {
  const { user } = useContext(Context);

  async function handleDeleteTask(TasktoDelete: string) {
    const refT = doc(db, keyUserTasks, String(user?.uid));
    const collectionTask = collection(refT, keyTask);

    const taskDocRef = doc(collectionTask, TasktoDelete);
    await deleteDoc(taskDocRef);
  }
  async function updateCompletedTasks(taskId: string, completed: boolean) {
    const refT = doc(db, keyUserTasks, String(user?.uid));
    const collectionTask = collection(refT, keyTask);

    const taskDocRef = doc(collectionTask, taskId);
    await updateDoc(taskDocRef, { completed: completed });
  }

  return (
    <div className="flex items-s tart justify-between p-4 self-stretch rounded-lg border border-[#333] bg-[#262626] ">
      <div className="flex gap-2 items-start">
        <input
          className="relative cursor-pointer peer appearance-none w-6 h-6 min-w-[24px] border rounded-full focus:outline-none checked:bg-[#5E60CE] hover:ring hover:ring-gray-700
          after:content-[''] after:w-full after:h-full after:absolute after:left-0 after:bg-no-repeat after:bg-center after:bg-[length:15px]
          checked:after:bg-[url('https://i.imgur.com/L9oXjM2.png')]
          "
          type="checkbox"
          checked={completed}
          id="completedCheckboxInput"
          onChange={() => updateCompletedTasks(id, !completed)}
        />

        <p className="text-left m-0 text-[#F2F2F2]">{title}</p>
      </div>
      <button
        onClick={() => handleDeleteTask(id)}
        className="w-6 h-6 rounded-full text-blue-500 border-blue-300 checked:bg-blue-500 checked:border-transparent focus:outline-none"
      >
        <Trash size={20} color="white" />
      </button>
    </div>
  );
}
