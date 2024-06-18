import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'

import global_pt from "./translations/pt/global.json"
import global_es from "./translations/es/global.json"
import global_en from "./translations/en/global.json"
import i18next from 'i18next'
import { I18nextProvider } from 'react-i18next'
import { TimerProvider } from './components/timer-provider.tsx'
import { Toaster } from 'sonner'

i18next.init({
  interpolation: {escapeValue: false},
  lng: "en",
  resources: {
    en:{
      global: global_en
    },
    pt:{
      global: global_pt
    },
    es:{
      global: global_es
    },
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <I18nextProvider i18n={i18next}>
        <TimerProvider>
          <App />
          <Toaster />
        </TimerProvider>
      </I18nextProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
