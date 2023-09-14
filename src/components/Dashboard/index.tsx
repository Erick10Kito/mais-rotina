import { useState, useEffect } from "react";
import { Tarefa } from "../Tarefa";

import { ITarefa } from "../../types/todo.ds";

import { Clipboard } from "@phosphor-icons/react";

interface IDashboardProps {
  tasks: ITarefa[];
}

export function Dashboard({ tasks }: IDashboardProps) {
  const CompletedTasks = tasks.filter((tarefa) => tarefa.completed);
  const [CompletedTasksTotal, setCompletedTasksTotal] = useState(0);
  const [taskLength, setTasksLength] = useState(0);
  useEffect(() => {
    setCompletedTasksTotal(CompletedTasks.length);
    setTasksLength(tasks.length);
  }, [tasks]);

  return (
    <div>
      <header className="pb-[25px] border-b border-[#333] flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <p className="text-[#4EA8DE] text-sm font-bold">Tarefas criadas</p>
          <span className="text-[#D9D9D9] bg-[#333] py-[2px] px-2 rounded-full text-xs font-bold">
            {taskLength}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-[#8284FA] text-sm font-bold">Concluidas</p>
          <span className="text-[#D9D9D9] bg-[#333] py-[2px] px-2 rounded-full text-xs font-bold">
            {CompletedTasksTotal} de {taskLength}
          </span>
        </div>
      </header>
      <div
        className={`${
          tasks.length >= 6 && "overflow-y-scroll max-h-[465px]"
        } mt-5`}
      >
        {tasks.length > 0 ? (
          <div className="flex flex-col gap-3">
            {tasks.map((tasks) => (
              <div key={tasks.id}>
                <Tarefa
                  title={tasks.title ? tasks.title : ""}
                  id={tasks.id}
                  completed={tasks.completed ? tasks.completed : false}
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
