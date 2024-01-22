import { useContext } from "react";
import { Tarefa } from "../Tarefa";

import { Clipboard } from "@phosphor-icons/react";
import { TasksContext } from "../../context/TaskContext";

export function Dashboard() {
  const { TasksRepository } = useContext(TasksContext);
  const CompletedTasks = TasksRepository.read.filter(
    (tarefa) => tarefa.completed
  );
  const tasks = TasksRepository.read;

  const taskLength = tasks.length;
  const CompletedTasksTotal = CompletedTasks.length;

  return (
    <div>
      <header className="pb-[25px] border-b border-[#333] flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <p className="text-[#FB8C00] text-sm font-bold">Tarefas criadas</p>
          <span className="text-[#D9D9D9] bg-[#333] py-[2px] px-2 rounded-full text-xs font-bold">
            {taskLength}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-[#01579B] text-sm font-bold">Concluidas</p>
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
            {tasks.map((task) => (
              <div key={task.id}>
                <Tarefa
                  title={task.title ? task.title : ""}
                  id={task.id}
                  completed={task.completed ? task.completed : false}
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
