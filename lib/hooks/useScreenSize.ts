import { useState, useEffect } from 'react'

export const useScreenSize = (size: number) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const getIsSize = () => window.innerWidth <= size

    const onResize = () => {
      setIsMobile(getIsSize())
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [size])

  return isMobile
}
