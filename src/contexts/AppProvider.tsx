import React, { ReactNode } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { SidebarProvider } from '../contexts/SidebarContext'
import { NotificationProvider } from '../contexts/NotifcationContext'
import { ThemeProvider } from './ThemeContext'

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <NotificationProvider>
          <Router>
            {children}
          </Router>
        </NotificationProvider>
      </SidebarProvider>
    </ThemeProvider>
  )
}
