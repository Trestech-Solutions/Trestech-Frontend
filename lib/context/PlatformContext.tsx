'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type Platform = 'omnichannelal' | 'whatsapp' | 'website'

interface PlatformContextType {
  activePlatform: Platform
  setActivePlatform: (platform: Platform) => void
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined)

export function PlatformProvider({ children }: { children: ReactNode }) {
  const [activePlatform, setActivePlatform] = useState<Platform>('omnichannelal')

  return (
    <PlatformContext.Provider value={{ activePlatform, setActivePlatform }}>
      {children}
    </PlatformContext.Provider>
  )
}

export function usePlatform() {
  const context = useContext(PlatformContext)
  if (!context) {
    throw new Error('usePlatform must be used within PlatformProvider')
  }
  return context
}
