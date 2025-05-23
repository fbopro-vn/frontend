'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@mui/material'

type NavButtonProps = {
  href?: string // giờ không bắt buộc
  icon: React.ReactNode
  label: string
  activePaths?: string[]
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  endIcon?: React.ReactNode // ví dụ icon mũi tên menu
}

const NavButton = ({
  href,
  icon,
  label,
  activePaths = [],
  onClick,
  endIcon
}: NavButtonProps) => {
  const pathname = usePathname()

  const isActive = activePaths.length > 0
    ? activePaths.some(path => pathname.startsWith(path))
    : (href === '/' ? pathname === '/' : href && pathname.startsWith(href))

  const button = (
    <Button
      startIcon={icon}
      endIcon={endIcon}
      onClick={onClick}
      sx={{
        color: isActive ? '#FFD700' : 'white',
        fontWeight: isActive ? 'bold' : 'normal',
        bgcolor: isActive ? 'rgba(255,255,255,0.2)' : 'transparent'
      }}
    >
      {label}
    </Button>
  )

  return href ? <Link href={href}>{button}</Link> : button
}

export default NavButton
