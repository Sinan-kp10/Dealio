import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import App from './App.tsx'
import { ToastProvider } from './app/providers/ToastProvider'
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from './app/lib/query-client.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    <ToastProvider />
  </StrictMode>
)
