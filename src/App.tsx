import { ChangeEvent, FormEvent, useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import "./globals.css";
import { ITarefas } from "./types/todo.ds";

// const tarefas: ITarefas[] = [
//   { id: "1", title: "TESTE", conclued: false },
//   { id: "2", title: "TESTE", conclued: true },
//   { id: "3", title: "TESTE", conclued: false },
//   { id: "4", title: "TESTE", conclued: false },
// ];

function App() {
  const [newTask, setNewTask] = useState("");
  const [tarefas, setTarefas] = useState<ITarefas[]>([]);
  



  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }
  function handleCreateTask(event: FormEvent) {
    event.preventDefault();
    const newTarefa: ITarefas = {
      id: Math.random().toString(),
      title: newTask,
      completed:false

    };
    setTarefas([...tarefas, newTarefa]);
  }

  function DeleteTask(TasktoDelete: string) {
    const tasksWithoutDeleted = tarefas.filter(
      (tarefa) => tarefa.id !== TasktoDelete
    );
    setTarefas(tasksWithoutDeleted);
  }

  
  function updateCompleted(taskId:string, completed:boolean) {
    const updateTarefas = tarefas.map((tarefa)=> {
      if(tarefa.id === taskId) {
        return{...tarefa,completed}
      }
      return tarefa
    })
    setTarefas(updateTarefas)
      }

  return (
    <>
      <Header />
      <div className="flex justify-center bg-[#1A1A1A]  ">
        <div className="max-w-7xl w-full h-screen">
          <div className="mt-[-26px] flex justify-center w-full">
            <SearchBar
              handleNewTaskChange={handleNewTaskChange}
              handleCreateTask={handleCreateTask}
            />
          </div>
          <div className="mt-16">
            <Dashboard
              tarefas={tarefas}
              DeleteTask={DeleteTask}
              updateCompleted={updateCompleted}
       
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
