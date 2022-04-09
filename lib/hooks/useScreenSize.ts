import { useState, useEffect } from 'react'

export const useScreenSize = (size: number) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const getIsSize = () => window.innerWidth <= size

    const onResize = () => {
      setIsMobile(getIsSize())
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('load', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('load', onResize)
    }
  }, [size])

  return isMobile
}
