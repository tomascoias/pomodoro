import { useTranslation } from "react-i18next";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { FormEvent } from "react";
import { useTimerContext } from "./timer-provider";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useTheme } from "./theme-provider";

export function SettingsModal() {
  const [t] = useTranslation("global")
  const { theme } = useTheme()

  const { setStatus, setWorkMinutes, setShortBreakMinutes, setLongBreakMinutes, setSecondsLeft, setChangedMinutes } = useTimerContext()

  function onSubmit(event: FormEvent) {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement);

    const nextWorkMinutes = formData.get('workMinutes') as string
    const nextShortBreakMinutes = formData.get('shortBreakMinutes') as string
    const nextLongBreakMinutes = formData.get('longBreakMinutes') as string

    if ((Number(nextWorkMinutes) != 0) && (Number(nextShortBreakMinutes) != 0) && (Number(nextLongBreakMinutes) != 0)) {
      setWorkMinutes(Number(nextWorkMinutes))
      setShortBreakMinutes(Number(nextShortBreakMinutes))
      setLongBreakMinutes(Number(nextLongBreakMinutes))

      setStatus("focus")
      setSecondsLeft(Number(nextWorkMinutes) * 60)
      setChangedMinutes(true)
    }
  }

  function submitMode(mode: string){
    let modeWorkMinutes = 0
    let modeShortBreakMinutes = 0
    let modeLongBreakMinutes = 0
    switch(mode){
      case "classic":
        modeWorkMinutes = 20
        modeShortBreakMinutes = 5
        modeLongBreakMinutes = 10
        break;
      case "work":
        modeWorkMinutes = 60
        modeShortBreakMinutes = 10
        modeLongBreakMinutes = 20
        break;
      case "study":
        modeWorkMinutes = 90
        modeShortBreakMinutes = 15
        modeLongBreakMinutes = 20
        break;
    }
    setWorkMinutes(modeWorkMinutes)
    setShortBreakMinutes(modeShortBreakMinutes)
    setLongBreakMinutes(modeLongBreakMinutes)
    setStatus("focus")
    setSecondsLeft(modeWorkMinutes * 60)
    setChangedMinutes(true)
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{JSON.stringify(t("settings.title")).replace(/\"/g, "")}</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col items-center w-full gap-2">
            <div className="flex items-center justify-between w-full gap-4">
              {JSON.stringify(t("modal.workMinutes")).replace(/\"/g, "")}:
              <Input type="text" className="h-8" name="workMinutes" />
            </div>
            <div className="flex items-center justify-between w-full gap-4">
              {JSON.stringify(t("modal.shortBreakMinutes")).replace(/\"/g, "")}:
              <Input type="text" className="h-8" name="shortBreakMinutes" />
            </div>
            <div className="flex items-center justify-between w-full gap-4">
              {JSON.stringify(t("modal.longBreakMinutes")).replace(/\"/g, "")}:
              <Input type="text" className="h-8" name="longBreakMinutes" />
            </div>
            <input type='submit' value={JSON.stringify(t("modal.enter")).replace(/\"/g, "")} className="flex items-center self-end px-4 py-1 bg-zinc-300 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 hover:bg-zinc-500 hover:text-zinc-300 dark:hover:bg-zinc-400 dark:hover:text-zinc-800 rounded font-medium cursor-pointer" />
          </div>
        </form>
        <div className="w-full h-[0.5px] bg-zinc-300 dark:bg-zinc-700 my-4" />
        <div className="flex flex-col gap-2">
          {JSON.stringify(t("modal.mode.title")).replace(/\"/g, "")}:
          <div className="flex items-center justify-center gap-10">
            <Button className="cursor-pointer" variant={theme === "dark" ? "modesDark" : "modesLight"} onClick={() => submitMode("classic")}>{JSON.stringify(t("modal.mode.classic")).replace(/\"/g, "")}</Button>
            <Button className="cursor-pointer" variant={theme === "dark" ? "modesDark" : "modesLight"} onClick={() => submitMode("work")}>{JSON.stringify(t("modal.mode.work")).replace(/\"/g, "")}</Button>
            <Button className="cursor-pointer" variant={theme === "dark" ? "modesDark" : "modesLight"} onClick={() => submitMode("study")}>{JSON.stringify(t("modal.mode.study")).replace(/\"/g, "")}</Button>
          </div>
        </div>
      </DialogDescription>
    </DialogContent>
  )
}