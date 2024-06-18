import { createContext, useContext, useState } from "react";

type TimerProviderProps = {
  children: React.ReactNode
}

type TimerProviderState = {
  status: "focus" | "shortpause" | "longpause" | "custom"
  setStatus: (status: "focus" | "shortpause" | "longpause" | "custom") => void
  workMinutes: number
  setWorkMinutes: (workMinutes: number) => void
  shortBreakMinutes: number
  setShortBreakMinutes: (shortBreakMinutes: number) => void
  longBreakMinutes: number
  setLongBreakMinutes: (longBreakMinutes: number) => void
  secondsLeft: number
  setSecondsLeft: (secondsLeft: number) => void
  changedMinutes: boolean
  setChangedMinutes: (changedMinutes: boolean) => void
  taskCompleted: boolean
  setTaskCompleted: (taskCompleted: boolean) => void
}

const initialState: TimerProviderState = {
  status: "focus",
  setStatus: () => null,
  workMinutes: 20,
  setWorkMinutes: () => null,
  shortBreakMinutes: 5,
  setShortBreakMinutes: () => null,
  longBreakMinutes: 10,
  setLongBreakMinutes: () => null,
  secondsLeft: 0,
  setSecondsLeft: () => null,
  changedMinutes: false,
  setChangedMinutes: () => null,
  taskCompleted: false,
  setTaskCompleted: () => null,
}

const TimerContext = createContext(initialState)

export function TimerProvider({children} : TimerProviderProps){
  const [status, setStatus] = useState<"focus" | "shortpause" | "longpause" | "custom">(initialState.status)
  const [workMinutes, setWorkMinutes] = useState(initialState.workMinutes)
  const [shortBreakMinutes, setShortBreakMinutes] = useState(initialState.shortBreakMinutes)
  const [longBreakMinutes, setLongBreakMinutes] = useState(initialState.longBreakMinutes)
  const [secondsLeft, setSecondsLeft] = useState(workMinutes * 60)

  const [changedMinutes, setChangedMinutes] = useState(initialState.changedMinutes)

  const [taskCompleted, setTaskCompleted] = useState(initialState.taskCompleted)

  return (
    <TimerContext.Provider value={{status, setStatus, workMinutes, setWorkMinutes, shortBreakMinutes, setShortBreakMinutes, longBreakMinutes, setLongBreakMinutes, secondsLeft, setSecondsLeft, changedMinutes, setChangedMinutes, taskCompleted, setTaskCompleted}}>
      {children}
    </TimerContext.Provider>
  )
}

export function useTimerContext(){
  const context = useContext(TimerContext)

  if(context === undefined) {
    throw new Error("Not inside a context")
  }

  return context
}