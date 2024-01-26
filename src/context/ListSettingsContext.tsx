import {ReactNode, createContext, useState} from "react";

  interface ITaskSettingsProviderProps {
    children: ReactNode;
  }
  interface ITaskSettingsProps {
    ocultedTask:boolean;
    handleOcultCompletedTasks: () => void
  }
  
  export const TaskSettingsContext = createContext({} as ITaskSettingsProps);
  
  export function TaskSettingsProvider({ children }: ITaskSettingsProviderProps) {
    const [ocultedTask, setOcultedTask] = useState(false)

    function handleOcultCompletedTasks() {
        console.log("TESTE")
        setOcultedTask(!ocultedTask)
     }
  

    return (
      <TaskSettingsContext.Provider
        value={{
            ocultedTask,
            handleOcultCompletedTasks
        }}
      >
        {children}
      </TaskSettingsContext.Provider>
    );
  }
  