import { useState, useEffect, useRef } from 'react'

export const useDropdownVisible = () => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as any)
    ) {
      setDropdownIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return { dropdownRef, dropdownIsOpen, setDropdownIsOpen }
}
