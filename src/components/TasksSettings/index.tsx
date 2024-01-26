import { useContext, useState } from "react"
import { TasksContext } from "../../context/TaskContext";
import { ConfigurationOptions } from "./ConfigurationOptions";
import { TaskSettingsContext } from "../../context/ListSettingsContext";
import { DotsThreeVertical } from "@phosphor-icons/react";

export function TasksSettings() {
    const { handleOcultCompletedTasks, ocultedTask } = useContext(TaskSettingsContext);
    const [openOptionsList, setOpenOptionsList] = useState(false) 
    function handleOpenOptionsList() {
        setOpenOptionsList(!openOptionsList)
    }
    return (
        <div>
            <button className="text-[#D9D9D9] bg-[#01579B] py-[5px] px-4 rounded-full text-xs font-bold sm:flex hidden" onClick={handleOcultCompletedTasks}>{!ocultedTask ? "Ocultar tarefas concluidas" : "Mostrar tarefas concluidas"}</button>
            <button className="text-[#D9D9D9] py-[2px] px-2 rounded-full text-xs font-bold sm:hidden flex" onClick={handleOpenOptionsList}><DotsThreeVertical size={32} color="#4e272b" weight="bold" /></button>
           <ConfigurationOptions openOptionsList={openOptionsList}/>
        </div>
    )
}