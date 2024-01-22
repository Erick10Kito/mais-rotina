import { useContext, useState } from "react";
import { Pencil, Trash } from "@phosphor-icons/react";
import { TasksContext } from "../../context/TaskContext";
import { Modal } from "../Modal";

interface ITarefaProps {
  title: string;
  id: string;
  completed: boolean;
}

export function Tarefa({ title, id, completed }: ITarefaProps) {
  const { TasksRepository } = useContext(TasksContext);
  const [showPopupEdit, setShowPopupEdit] = useState(false);

  function handleOpenAndClosePopup() {
    setShowPopupEdit(!showPopupEdit);
  }

  return (
    <div className="flex items-s tart justify-between p-4 self-stretch rounded-lg border border-[#333] bg-[#e8e8e8] ">
      <div className="flex gap-2 items-start">
        <input
          className="relative cursor-pointer peer appearance-none w-6 h-6 min-w-[24px] border border-[#FB8C00] rounded-full focus:outline-none checked:bg-[#FB8C00] hover:ring hover:ring-gray-700
          after:content-[''] after:w-full after:h-full after:absolute after:left-0 after:bg-no-repeat after:bg-center after:bg-[length:15px]
          checked:after:bg-[url('https://i.imgur.com/L9oXjM2.png')]
          "
          type="checkbox"
          checked={completed}
          id="completedCheckboxInput"
          onChange={() => TasksRepository.completed(id, !completed)}
        />

        <p className="text-left m-0 text-black">{title}</p>
      </div>

      <div className="flex items-start">
        <button
          onClick={() => TasksRepository.delete(id)}
          className="w-6 h-6 rounded-full text-blue-500 border-blue-300 checked:bg-blue-500 checked:border-transparent focus:outline-none"
        >
          <Trash size={20} color="black" />
        </button>
        <button
          onClick={() => setShowPopupEdit(!showPopupEdit)}
          className="w-6 h-6 rounded-full text-blue-500 border-blue-300 checked:bg-blue-500 checked:border-transparent focus:outline-none"
        >
          <Pencil size={20} color="black" />
        </button>
      </div>
      {showPopupEdit && (
        <Modal id={id} handleOpenAndClosePopup={handleOpenAndClosePopup} title={title}/>
      )}
    </div>
  );
}
