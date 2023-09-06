import { deleteDoc, doc, updateDoc } from "firebase/firestore";

import { db } from "../../config/firebase/firebase";
import { keyTask } from "../../config/firebase/keys";

import { Trash } from "@phosphor-icons/react";

interface ITarefaProps {
  title: string;

  id: string;
  completed: boolean;
}

export function Tarefa({ title, id, completed }: ITarefaProps) {
  async function handleDeleteTask(TasktoDelete: string) {
    const taskDocRef = doc(db, keyTask, TasktoDelete);
    await deleteDoc(taskDocRef);
  }
  async function updateCompletedTasks(taskId: string, completed: boolean) {
    const taskDocRef = doc(db, keyTask, taskId);
    await updateDoc(taskDocRef, { completed: completed });
  }

  return (
    <div className="flex items-s tart justify-between p-4 self-stretch rounded-lg border border-[#333] bg-[#262626] ">
      <div className="flex gap-2 items-start">
        <input
          className="relative cursor-pointer peer appearance-none w-6 h-6 border rounded-full focus:outline-none checked:bg-[#5E60CE] hover:ring hover:ring-gray-700
          after:content-[''] after:w-full after:h-full after:absolute after:left-0 after:bg-no-repeat after:bg-center after:bg-[length:20px]
          checked:after:bg-[url('https://o.remove.bg/downloads/7498f271-06f6-4ba6-a713-c6a0379a1ad4/image-removebg-preview.png')]
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
