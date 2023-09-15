import { useContext } from "react";

import { FloppyDiskBack, PlusCircle } from "@phosphor-icons/react";
import { TasksContext } from "../../context/TaskContext";

interface IAddOrEditBar {
  type: "add" | "edit";
}

export function AddOrEditBar({ type }: IAddOrEditBar) {
  const { TasksRepository, handleNewTitleTaskChange, newTitleOfTask } =
    useContext(TasksContext);

  return (
    <form
      action=""
      className="w-full flex gap-2 focus:outline-0"
      onSubmit={
        type === "add" ? TasksRepository.create : TasksRepository.create
      }
    >
      <input
        type="text"
        placeholder={
          type === "add" ? "Adicione uma nova tarefa" : "Edite sua tarefa"
        }
        className="bg-[#262626] border border-[#0D0D0D] p-4 w-full rounded-lg focus:outline-0 text-white"
        onChange={handleNewTitleTaskChange}
        value={newTitleOfTask}
      />
      <button
        type="submit"
        className="text-white text-sm font-bold bg-[#1E6F9F] flex p-4 gap-2 items-center rounded-lg "
      >
        {type === "add" ? "Criar" : "Salvar"}
        {type === "add" ? (
          <PlusCircle size={20} color="white" weight="bold" />
        ) : (
          <FloppyDiskBack size={20} color="white" weight="bold" />
        )}
      </button>
    </form>
  );
}
