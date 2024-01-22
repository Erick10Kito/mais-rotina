import { PlusCircle } from "@phosphor-icons/react";
import { TasksContext } from "../../context/TaskContext";
import { ChangeEvent, useContext, useEffect, useState } from "react";

interface IAddOrEditBar {
  type: "add" | "edit";
  id?: string;
  handleOpenAndClosePopup?: () => void;
  title?:string
}

export function AddOrEditBar({
  type,
  id,
  handleOpenAndClosePopup,
  title
}: IAddOrEditBar) {
  const { TasksRepository, handleNewTitleTaskChange, newTitleOfTask } =
    useContext(TasksContext);

  const [newEditTaskTitle, setNewEditTaskTitle] = useState(title || '');


  function handleSetNewEditTaskTitle(event: ChangeEvent<HTMLInputElement>) {
    setNewEditTaskTitle(event.target.value);
  }

  return (
    <form
      action=""
      className={`w-full flex gap-2 focus:outline-0 ${
        type === "edit" && " grid grid-cols-[2fr_1fr] max-[479px]:grid-cols-1"
      }`}
      onSubmit={(event) => {
        event.preventDefault();
        if (type === "add") {
          TasksRepository.create(event);
        } else if (id) {
          TasksRepository.edit(id, newEditTaskTitle);
          newEditTaskTitle !== "" && handleOpenAndClosePopup?.();
        }
      }}
    >
      <input
        type="text"
        placeholder={
          type === "add" ? "Adicione uma nova tarefa" : "Edite sua tarefa"
        }
        className="bg-[#F5F5F5] border border-[#0D0D0D] p-4 w-full rounded-lg focus:outline-0 text-black"
        onChange={
          type === "add" ? handleNewTitleTaskChange : handleSetNewEditTaskTitle
        }
        value={type === "add" ? newTitleOfTask : newEditTaskTitle}
      />
      <div className={`${type === "edit" && " gap-2"} flex`}>
        <button
          type="submit"
          className={`text-white text-sm font-bold bg-[#01579B] flex p-4 gap-2 items-center rounded-lg  ${
            type === "edit" && "w-full flex justify-center items-center"
          }`}
        >
          {type === "add" ? "Criar" : "Salvar"}
          {type === "add" ? (
            <PlusCircle size={20} color="white" weight="bold" />
          ) : null}
        </button>
        {type === "edit" && (
          <button
            onClick={handleOpenAndClosePopup}
            className="text-white text-sm font-bold bg-red-500  p-4 rounded-lg w-full flex justify-center items-center"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
