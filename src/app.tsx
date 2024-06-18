import './app.css'
import { useTranslation } from 'react-i18next'
import { useTheme } from './components/theme-provider'
import { Popover, PopoverContent, PopoverTrigger } from './components/ui/popover'
import { Languages, Moon, Sun } from 'lucide-react'
import { TimerSection } from './components/timer-section'
import { TaskSection } from './components/task-section'

// OnClick Edit Task  | adicionar as settings a um modal
// Mode passa a ser os modes que existem default, custom, etc... | status passa a ser "focus" , "shortpause", "longpause"
// Ver se é possivel retirar o work e o break de qualquer variavel senao adicionar com o nome de ""

export function App() {
  const { theme, setTheme } = useTheme()
  const [t, i18n] = useTranslation("global")
  

  function handleChangeLanguage(lang: string) {
    i18n.changeLanguage(lang)
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='w-[1120px]'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-zinc-800 dark:text-zinc-200 text-[40px] font-extrabold'>Pomodoro</p>
            <p className='text-zinc-500 text-xl leading-3 font-medium'>{JSON.stringify(t("description")).replace(/\"/g, "")}</p>
          </div>
          <div className='flex items-center gap-2'>
            {theme === "dark" && (
              <button className='bg-zinc-800 text-zinc-500 rounded p-2' onClick={() => setTheme('light')}><Sun className='w-4 h-4' /></button>
            )}
            {theme === "light" && (
              <button className='bg-zinc-300 text-zinc-500 rounded p-2' onClick={() => setTheme('dark')}><Moon className='w-4 h-4' /></button>
            )}
            <Popover>
              <PopoverTrigger className='bg-zinc-300 dark:bg-zinc-800 text-zinc-500 rounded p-2'><Languages className='w-4 h-4' /></PopoverTrigger>
              <PopoverContent className='bg-zinc-300 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400 font-medium rounded shadow-md'>
                <div className='flex flex-col gap-2'>
                  <p className='flex items-center gap-2 cursor-pointer' onClick={() => handleChangeLanguage("en")}><img src='/en-flag.svg' className='h-4 w-4' />{JSON.stringify(t("translation.en")).replace(/\"/g, "")}</p>
                  <p className='flex items-center gap-2 cursor-pointer' onClick={() => handleChangeLanguage("es")}><img src='/es-flag.svg' className='h-4 w-4' />{JSON.stringify(t("translation.es")).replace(/\"/g, "")}</p>
                  <p className='flex items-center gap-2 cursor-pointer' onClick={() => handleChangeLanguage("pt")}><img src='/pt-flag.svg' className='h-4 w-4' />{JSON.stringify(t("translation.pt")).replace(/\"/g, "")}</p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <div className='mt-14 flex items-center justify-center gap-10'>
        <div className='w-[550px] h-[645px] border border-zinc-800 rounded p-6'>
          <TaskSection />
        </div>
        <div className='w-[550px] h-[645px] border border-zinc-800 rounded p-6'>
          <TimerSection />
        </div>
      </div>
    </div>
  )
}
