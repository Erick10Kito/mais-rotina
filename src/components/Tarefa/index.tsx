import { useState } from "react";


interface ITarefaProps {
  title: string;
  DeleteTask: (TasktoDelete: string) => void;
  id: string;
  completed:boolean
  updateCompleted:(taskId: string, completed: boolean) => void

  
}

export function Tarefa({
  title,
  DeleteTask,
  id,
  completed,
  updateCompleted

}: ITarefaProps) {
const [ischecked, setIsChecked] = useState(completed)

  function handleDeleteTask() {
    DeleteTask(id);
  }

  function handleCheckBoxChange() {
    setIsChecked(!ischecked )
    updateCompleted(id, !ischecked)
  }

  return (
    <div className="flex items-s tart justify-between p-4 self-stretch rounded-lg border border-[#333] bg-[#262626] ">
      <div className="flex gap-2 items-start">
        <input
          type="checkbox"
          className="mt-[6px]"
          checked={ischecked}
          onChange={handleCheckBoxChange}
        
        />
        <p className="text-left m-0 text-[#F2F2F2]">{title}</p>
      </div>
      <button onClick={handleDeleteTask}>Excluir</button>
    </div>
  );
}
