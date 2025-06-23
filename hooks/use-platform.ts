"use client"
import { useState, useEffect } from 'react'

export function usePlatform() {
  const [platform, setPlatform] = useState('unknown')

  useEffect(() => {
    const detectPlatform = () => {
      if (typeof window === 'undefined') return 'unknown'
      
      const userAgent = window.navigator.userAgent.toLowerCase()
      const platform = window.navigator.platform?.toLowerCase() || ''
      
      // Check for Windows
      if (userAgent.includes('win') || platform.includes('win')) {
        return 'windows'
      }
      
      // Check for macOS
      if (
        userAgent.includes('mac') || 
        platform.includes('mac') ||
        userAgent.includes('darwin')
      ) {
        return 'mac'
      }
      
      // Check for Linux
      if (
        userAgent.includes('linux') || 
        platform.includes('linux') ||
        userAgent.includes('x11')
      ) {
        return 'linux'
      }
      
      // Check for mobile platforms
      if (userAgent.includes('android')) {
        return 'android'
      }
      
      if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
        return 'ios'
      }
      
      return 'unknown'
    }

    setPlatform(detectPlatform())
  }, [])

  return platform
}