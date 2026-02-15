/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react'

const SidebarContext = createContext()

export const SidebarProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('')

  const toggleSidebar = () => setIsCollapsed(prevState => !prevState)
  const toggleModal = () => setIsModalOpen(prevState => !prevState)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        toggleSidebar,
        activeTab,
        setActiveTab,
        isModalOpen,
        toggleModal,
        openModal,
        closeModal,
        setIsModalOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => useContext(SidebarContext)
