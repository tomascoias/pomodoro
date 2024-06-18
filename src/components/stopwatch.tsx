import { Pause, Play, RotateCcw, Settings } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useTheme } from "./theme-provider";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { SettingsModal } from "./settings-modal";
import { useTimerContext } from "./timer-provider";
import { toast } from "sonner";

import Confetti from "react-confetti"
import { useWindowSize } from "react-use"
import { useTranslation } from "react-i18next";


export function Stopwatch() {
  const [t] = useTranslation("global")

  const { width, height } = useWindowSize()
  const { theme } = useTheme()
  const { status, setStatus, workMinutes, shortBreakMinutes, longBreakMinutes, secondsLeft, setSecondsLeft, changedMinutes, setChangedMinutes, taskCompleted, setTaskCompleted } = useTimerContext()

  const [count, setCount] = useState(0);
  const [isPause, setIsPaused] = useState(true)

  const countRef = useRef(count)
  const isPauseRef = useRef(isPause)
  const statusRef = useRef(status)
  const secondsLeftRef = useRef(secondsLeft)

  if (changedMinutes) {
    secondsLeftRef.current = secondsLeft
    statusRef.current = status
    setChangedMinutes(false)
  }

  let progressBarColor = ""
  switch (status) {
    case 'focus':
      if (theme === "dark") {
        progressBarColor = "#10B981"
      } else {
        progressBarColor = "#6EE7B7"
      }
      break
    case 'shortpause':
      progressBarColor = "#F59E0B"
      break
    case 'longpause':
      progressBarColor = "#06B6D4"
      break
    case 'custom':
      if (theme === "dark") {
        progressBarColor = "#A3A3A3"
      } else {
        progressBarColor = "#0A0A0A"
      }
      break
    default:
      return null
  }

  function switchMode() {
    const nextStatus = statusRef.current === 'focus'
      ? countRef.current >= 3
        ? "longpause"
        : "shortpause"
      : "focus"
    const nextSeconds = nextStatus === 'focus'
      ? workMinutes * 60
      : countRef.current >= 3
        ? longBreakMinutes * 60
        : shortBreakMinutes * 60
    countRef.current++
    setCount(countRef.current)
    statusRef.current = nextStatus
    setStatus(nextStatus)
    secondsLeftRef.current = nextSeconds
    setSecondsLeft(nextSeconds)
  }

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current)
  }

  function initTimer() {
    setSecondsLeft(workMinutes * 60)
  }

  const totalSeconds = status === 'focus'
    ? workMinutes * 60
    : countRef.current >= 3
      ? longBreakMinutes * 60
      : shortBreakMinutes * 60

  const percentage = Math.round((secondsLeft / totalSeconds) * 100)

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60
  let sString = ""

  if (seconds < 10) {
    sString = "0"
  } else {
    sString = ""
  }

  function handlePlay() {
    if (isPause === true) {
      setIsPaused(false);
      isPauseRef.current = false
    } else {
      setIsPaused(true);
      isPauseRef.current = true
    }
  }

  function restartTimer(byTask?: boolean) {
    setIsPaused(true);
    isPauseRef.current = true

    setStatus("focus")
    statusRef.current = "focus"

    setCount(0)
    countRef.current = 0

    setSecondsLeft(workMinutes * 60)
    secondsLeftRef.current = workMinutes * 60

    if (byTask) {
      setTaskCompleted(false)
      toast.success(JSON.stringify(t("sonner.taskCompleted")).replace(/\"/g, ""))
    }
  }

  useEffect(() => {
    initTimer()
    const interval = setInterval(() => {
      if (isPauseRef.current) {
        return
      }
      if (secondsLeftRef.current === 0) {
        return switchMode()
      }
      if (taskCompleted) {
        return restartTimer(true)
      }

      tick()
    }, 100)

    return () => clearInterval(interval)
  }, [workMinutes, shortBreakMinutes, longBreakMinutes, taskCompleted])

  return (
    <>
      {taskCompleted
        ? <Confetti width={width} height={height} recycle={false} numberOfPieces={500} tweenDuration={10000} />
        : ""
      }
      <div className='flex flex-col items-center justify-center gap-4 relative group/settings'>
        <div className="h-full w-full flex items-center justify-center">
          <CircularProgressbar
            className='w-64 h-64 group-hover/settings:blur-sm'
            value={percentage}
            styles={buildStyles({
              pathColor: progressBarColor,
              trailColor: theme === "light" ? "rgb(228, 228, 231)" : "rgb(39, 39, 42)",
            })}
          />
          <p className='absolute font-bold font-timer text-[40px] group-hover/settings:blur-[2px] text-black dark:text-white'>
            {minutes + ':' + sString + seconds}
          </p>
        </div>
        <div className='group-hover/settings:visible flex items-center gap-2 absolute top-52 invisible'>
          <Dialog>
            <DialogTrigger className="h-12 w-12 border border-zinc-100 dark:border-zinc-900 shadow-lg text-zinc-500 bg-zinc-300 dark:text-zinc-400 dark:bg-zinc-800 flex items-center justify-center rounded-full"><Settings className='h-[22px] w-[22px]' /></DialogTrigger>
            <SettingsModal />
          </Dialog>
          <button className='h-[70px] w-[70px] border border-zinc-100 dark:border-zinc-900 shadow-lg text-zinc-500 bg-zinc-300 dark:text-zinc-400 dark:bg-zinc-800 flex items-center justify-center rounded-full' onClick={handlePlay}>{isPause ? <Play className='h-[30px] w-[30px]' /> : <Pause className='h-[30px] w-[30px]' />}</button>
          <button className='h-12 w-12 border border-zinc-100 dark:border-zinc-900 shadow-lg text-zinc-500 bg-zinc-300 dark:text-zinc-400 dark:bg-zinc-800 flex items-center justify-center rounded-full' onClick={() => restartTimer()}><RotateCcw className='h-[22px] w-[22px]' /></button>
        </div>
      </div>
    </>
  )
}