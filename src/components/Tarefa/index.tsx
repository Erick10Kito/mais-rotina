import { Trash } from "@phosphor-icons/react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase/firebase";
import { keyTask } from "../../config/firebase/keys";

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
          type="checkbox"
          className="mt-[6px]"
          checked={completed}
          onChange={() => updateCompletedTasks(id, !completed)}
        />
        <p className="text-left m-0 text-[#F2F2F2]">{title}</p>
      </div>
      <button
        onClick={() => handleDeleteTask(id)}
        className="hover:bg-zinc-700 w-8 h-8 flex justify-center items-center rounded-full"
      >
        <Trash size={20} color="white" />
      </button>
    </div>
  );
}
