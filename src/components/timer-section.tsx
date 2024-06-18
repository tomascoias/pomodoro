import { AlarmClock, Brain, Clock2, Coffee } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "./ui/button"
import { Stopwatch } from "./stopwatch"
import { useTimerContext } from "./timer-provider"


export function TimerSection() {
  const [t] = useTranslation("global")

  const { status } = useTimerContext() //mode = ver o icon se é default ou isso

  return (
    <div>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-zinc-800 dark:text-zinc-400 text-2xl font-bold'>{JSON.stringify(t("timer.title")).replace(/\"/g, "")}</p>
          <p className='text-zinc-500 text-base'>{JSON.stringify(t("timer.description")).replace(/\"/g, "")}</p>
        </div>
        <span className='bg-zinc-300 dark:bg-zinc-800 p-2 rounded'><Clock2 className='text-zinc-500 dark:text-zinc-400' /></span>
      </div>
      <div className='w-full border-t border-zinc-800 my-4' />
      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <p className='text-zinc-800 dark:text-zinc-400 text-base font-semibold'>{JSON.stringify(t("timer.mode.title")).replace(/\"/g, "")}</p>
          <p className='text-zinc-500 text-xs font-medium'>{JSON.stringify(t("timer.mode.description")).replace(/\"/g, "")}</p>
        </div>
        <Button variant={status}>
          {(() => {
            switch (status) {
              case 'focus':
                return <Brain className='w-4 h-4' />
              case 'shortpause':
                return <AlarmClock className='w-4 h-4' />
              case 'longpause':
                return <Coffee className='w-4 h-4' />
            }
          })()}
          {JSON.stringify(t(`timer.mode.options.${status}`)).replace(/\"/g, "")}
        </Button>
      </div>
      <div className="flex items-center justify-center text-white h-80 mt-16">
        <Stopwatch />
      </div>
    </div>
  )
}