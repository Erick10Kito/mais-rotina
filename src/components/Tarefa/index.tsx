import { useState } from "react";

interface ITarefaProps {
  title: string;
  DeleteTask: (TasktoDelete: string) => void;
  id: string;
  handleCompletedTask: () => void;
}

export function Tarefa({
  title,
  DeleteTask,
  id,
  handleCompletedTask,
}: ITarefaProps) {
  function handleDeleteTask() {
    DeleteTask(id);
  }

  return (
    <div className="flex items-s tart justify-between p-4 self-stretch rounded-lg border border-[#333] bg-[#262626] ">
      <div className="flex gap-2 items-start">
        <input
          type="checkbox"
          className="mt-[6px]"
          onChange={handleCompletedTask}
        />
        <p className="text-left m-0 text-[#F2F2F2]">{title}</p>
      </div>
      <button onClick={handleDeleteTask}>Excluir</button>
    </div>
  );
}
