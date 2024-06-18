import { CirclePlus, Trash } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { useTimerContext } from "./timer-provider";

interface Task {
  id: string,
  content: string,
  checked: boolean,
}

export function TaskSection() {
  const [t] = useTranslation("global")

  const { setTaskCompleted } = useTimerContext()

  const [isPending, setPending] = useState(false)
  const [tasks, setTask] = useState<Task[]>([])

  function addTask(content: string) {
    const newTask = {
      id: crypto.randomUUID(),
      content,
      checked: false,
    }

    if ((content != " ") && (content != "")) {
      const taskArray = [newTask, ...tasks]
      setPending(false)
      setTask(taskArray)
    }
  }

  function removeTask(id: string) {
    const taskArray = tasks.filter(task => {
      return task.id != id
    })
    setTask(taskArray)
  }

  const allTask = tasks.length
  let countChecked = 0
  {tasks.map((task) => {
    if (task.checked) {
      countChecked++
    }
    return countChecked
  })}

  if((allTask === countChecked) && (allTask != 0)){
    setTaskCompleted(true)
  }else{
    setTaskCompleted(false)
  }

  function onChecked(idChecked: string) {
    const taskArray = tasks.filter(task => {
      if (task.id == idChecked) {
        task.checked ? task.checked = false : task.checked = true
      }
      return tasks
    })

    setTask(taskArray)
  }

  return (
    <div>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-zinc-800 dark:text-zinc-400 text-2xl font-bold'>{JSON.stringify(t("tasklist.title")).replace(/\"/g, "")}</p>
          <p className='text-zinc-500 text-base'>{JSON.stringify(t("tasklist.description")).replace(/\"/g, "")}</p>
        </div>
        <button onClick={() => setPending(true)}><CirclePlus className='text-zinc-500 dark:text-zinc-400' /></button>
      </div>
      <div className='w-full border-t border-zinc-800 my-4' />
      <div className='flex flex-col gap-y-4 overflow-y-auto h-[500px]'>
        {tasks.map((eachTask) => (
          <div key={eachTask.id} className='flex gap-2 w-full leading-5 pr-2'>
            <Checkbox onClick={() => { onChecked(eachTask.id) }} checked={eachTask.checked} />
            <p className='bg-background text-zinc-600 dark:text-zinc-500 focus:outline-none flex-1 text-wrap break-all'>
              {eachTask.content}
            </p>
            <button className='text-zinc-600 dark:text-zinc-500 hover:text-black dark:hover:text-zinc-300' onClick={() => removeTask(eachTask.id)}><Trash className='h-4 w-4' /></button>
          </div>
        )).reverse()}
        {isPending && (
          <div className='flex items-center gap-2 pr-2'>
            <Checkbox />
            <Input type='text' placeholder='Type your tasks here...' className='bg-background dark:placeholder:text-zinc-700 placeholder:text-zinc-400 focus:outline-none text-sm' onKeyUp={(e) => {
              if (e.key === "Enter")
                addTask((e.target as HTMLTextAreaElement).value)
            }} />
          </div>
        )}
      </div>
    </div>
  )
}