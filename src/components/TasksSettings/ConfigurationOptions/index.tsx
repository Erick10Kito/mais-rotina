import { useContext } from "react";
import { TaskSettingsContext } from "../../../context/ListSettingsContext";

interface IConfigurationOptionsProps {
    openOptionsList:boolean
}
export function ConfigurationOptions({openOptionsList}:IConfigurationOptionsProps) {
    const { handleOcultCompletedTasks, ocultedTask } = useContext(TaskSettingsContext);
    return (
       <div className="sm:hidden flex"> 
        {openOptionsList && (
        <ul className="bg-white border border-black rounded absolute right-8 grid grid-[1fr] justify-end">
        <button className="hover:bg-gray-200 p-2 bg-gray-50 text-left" onClick={handleOcultCompletedTasks}>{!ocultedTask ? 'Ocultar tarefas concluídas':"Mostrar tarefas concluídas"}</button>
        
        </ul>
    )}
    </div>
    )
}