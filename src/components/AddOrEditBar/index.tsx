import { PlusCircle } from "@phosphor-icons/react";
import { TasksContext } from "../../context/TaskContext";
import { ChangeEvent, useContext, useEffect, useState } from "react";

interface IAddOrEditBar {
  type: "add" | "edit";
  id?: string;
  handleOpenAndClosePopup?: () => void;
}

export function AddOrEditBar({
  type,
  id,
  handleOpenAndClosePopup,
}: IAddOrEditBar) {
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
      onSubmit={(event) => {
        event.preventDefault();
        if (type === "add") {
          TasksRepository.create(event);
        } else if (id) {
          TasksRepository.edit(id, newEditTaskTitle);
          handleOpenAndClosePopup?.();
        }
      }}
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
      <div className="flex gap-2">
        <button
          type="submit"
          className="text-white text-sm font-bold bg-[#1E6F9F] flex p-4 gap-2 items-center rounded-lg "
        >
          {type === "add" ? "Criar" : "Salvar"}
          {type === "add" ? (
            <PlusCircle size={20} color="white" weight="bold" />
          ) : null}
        </button>
        {type === "edit" && (
          <button
            onClick={handleOpenAndClosePopup}
            className="text-white text-sm font-bold bg-red-700 flex p-4 items-center rounded-lg"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
