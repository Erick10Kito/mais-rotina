import { Trash } from "@phosphor-icons/react";

interface ITarefaProps {
  title: string;
  DeleteTask: (TasktoDelete: string) => void;
  id: string;
  completed: boolean;
  updateCompletedtasks: (taskId: string, isCompleted: boolean) => void;
}

export function Tarefa({
  title,
  DeleteTask,
  id,
  completed,
  updateCompletedtasks,
}: ITarefaProps) {
  function handleDeleteTask() {
    DeleteTask(id);
  }

  function handleChangeCheckBox() {
    updateCompletedtasks(id, !completed);
  }

  return (
    <div className="flex items-s tart justify-between p-4 self-stretch rounded-lg border border-[#333] bg-[#262626] ">
      <div className="flex gap-2 items-start">
        <input
          type="checkbox"
          className="mt-[6px]"
          checked={completed}
          onChange={handleChangeCheckBox}
        />
        <p className="text-left m-0 text-[#F2F2F2]">{title}</p>
      </div>
      <button
        onClick={handleDeleteTask}
        className="hover:bg-zinc-700 w-8 h-8 flex justify-center items-center rounded-full"
      >
        <Trash size={20} color="white" />
      </button>
    </div>
  );
}
