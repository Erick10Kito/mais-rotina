import { ChangeEvent, useContext, useState } from "react";

import { FloppyDiskBack, PlusCircle } from "@phosphor-icons/react";
import { TasksContext } from "../../context/TaskContext";

interface IAddOrEditBar {
  type: "add" | "edit";
  id?: string;
}

export function AddOrEditBar({ type, id }: IAddOrEditBar) {
  const { TasksRepository, handleNewTitleTaskChange, newTitleOfTask } =
    useContext(TasksContext);

  const [newEditTaskTitle, setNewEditTaskTitle] = useState(newTitleOfTask);

  function handleSetNewEditTaskTitle(event: ChangeEvent<HTMLInputElement>) {
    setNewEditTaskTitle(event.target.value);
  }

  return (
    <form
      action=""
      className="w-full flex gap-2 focus:outline-0"
      onSubmit={
        // (event) => {
        //   event.preventDefault();
        //   if (type === "add") {
        //     TasksRepository.create;
        //   } else {
        //     TasksRepository.edit(id ? id : "", newEditTaskTitle);
        //   }
        // }
        type === "add"
          ? TasksRepository.create
          : TasksRepository.edit(id ? id : "", newEditTaskTitle)
      }
    >
      <input
        type="text"
        placeholder={
          type === "add" ? "Adicione uma nova tarefa" : "Edite sua tarefa"
        }
        className="bg-[#262626] border border-[#0D0D0D] p-4 w-full rounded-lg focus:outline-0 text-white"
        onChange={
          type === "add" ? handleNewTitleTaskChange : handleSetNewEditTaskTitle
        }
        value={type === "add" ? newTitleOfTask : newEditTaskTitle}
      />
      <button
        type="submit"
        className="text-white text-sm font-bold bg-[#1E6F9F] flex p-4 gap-2 items-center rounded-lg "
      >
        {type === "add" ? "Criar" : "Salvar"}
        {type === "add" ? (
          <PlusCircle size={20} color="white" weight="bold" />
        ) : null}
      </button>
    </form>
  );
}
