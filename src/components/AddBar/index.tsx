import { ChangeEvent, FormEvent, useContext, useState } from "react";

import { addDoc, collection, doc } from "firebase/firestore";

import { db } from "../../config/firebase/firebase";

import { PlusCircle } from "@phosphor-icons/react";
import { Context } from "../../context/AuthContext";
import { keyTask, keyUserTasks } from "../../config/firebase/keys";

export function AddBar() {
  const { user } = useContext(Context);
  const [newTitleOfTask, setNewTitleOfTask] = useState("");
  function handleNewTitleTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTitleOfTask(event.target.value);
  }

  async function handleCreateTask(event: FormEvent) {
    event.preventDefault();
    const refT = doc(db, keyUserTasks, String(user?.uid));
    const collectionTask = collection(refT, keyTask);

    await addDoc(collectionTask, {
      title: newTitleOfTask,
      completed: false,
    });
    setNewTitleOfTask("");
  }

  return (
    <form
      action=""
      className="w-full flex gap-2 focus:outline-0"
      onSubmit={handleCreateTask}
    >
      <input
        type="text"
        placeholder="Adicione uma nova tarefa"
        className="bg-[#262626] border border-[#0D0D0D] p-4 w-full rounded-lg focus:outline-0 text-white"
        onChange={handleNewTitleTaskChange}
        value={newTitleOfTask}
      />
      <button
        type="submit"
        className="text-white text-sm font-bold bg-[#1E6F9F] flex p-4 gap-2 items-center rounded-lg "
      >
        Criar
        <PlusCircle size={20} color="white" weight="bold" />
      </button>
    </form>
  );
}
