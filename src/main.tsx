import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.tsx'
import { GlobalStateProvider } from './context/GlobalStateContext.tsx'
import { AuthProvider } from './context/GlobalAuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <GlobalStateProvider>
    <RouterProvider router={router} />
    </GlobalStateProvider>
    </AuthProvider>
  </StrictMode>,
)
