import { ITarefas } from "../../types/todo.ds";
import { Clipboard } from "@phosphor-icons/react";
import { Tarefa } from "../Tarefa";

interface IDashboardProps {
  tarefas: ITarefas[];
  DeleteTask: (TasktoDelete: string) => void;
  updateCompletedtasks: (taskId: string, isCompleted: boolean) => void;
}

export function Dashboard({
  tarefas,
  DeleteTask,
  updateCompletedtasks,
}: IDashboardProps) {
  const CompletedTasks = tarefas.filter((tarefa) => tarefa.completed);

  return (
    <div>
      <header className="pb-[25px] border-b border-[#333] flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <p className="text-[#4EA8DE] text-sm font-bold">Tarefas criadas</p>
          <span className="text-[#D9D9D9] bg-[#333] py-[2px] px-2 rounded-full text-xs font-bold">
            {tarefas.length}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-[#8284FA] text-sm font-bold">Concluidas</p>
          <span className="text-[#D9D9D9] bg-[#333] py-[2px] px-2 rounded-full text-xs font-bold">
            {CompletedTasks.length} de {tarefas.length}
          </span>
        </div>
      </header>
      <div
        className={`${
          tarefas.length >= 6 && "overflow-y-scroll max-h-[465px]"
        }`}
      >
        {tarefas.length > 0 ? (
          <div className="flex flex-col gap-3">
            {tarefas.map((tarefa) => (
              <div key={tarefa.id}>
                <Tarefa
                  title={tarefa.title}
                  DeleteTask={DeleteTask}
                  id={tarefa.id}
                  completed={tarefa.completed}
                  updateCompletedtasks={updateCompletedtasks}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 flex justify-center items-center flex-col">
            <Clipboard size={56} color="#808080" />
            <p className="text-[#808080] text-base grid mt-4">
              <span className="font-bold">
                Você ainda não tem tarefas cadastradas
              </span>
              Crie tarefas e organize seus itens a fazer
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
