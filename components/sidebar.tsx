"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { LayoutDashboard, Users, Activity, Upload, Settings, Menu, X, LogOut } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { logout } from "@/app/actions/auth-actions"
import { useRouter } from 'next/navigation'

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent background scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleLogout = async () => {
    const result = await logout()
    if (result.success) {
      router.push('/login')
    }
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Users, label: 'Talent Profiles', href: '/talent-profiles' },
    { icon: Activity, label: 'Activity Tracker', href: '/activity-tracker' },
    { icon: Upload, label: 'Bulk Upload', href: '/bulk-upload' },
    { icon: Settings, label: 'Account Settings', href: '/account-settings' },
    { icon: LogOut, label: 'Logout', onClick: handleLogout },
  ]

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Button */}
      <Button
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        variant="outline"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <div 
        className={`
          fixed left-0 top-0 h-full w-64 bg-[#004E64] text-white p-4
          transform transition-transform duration-200 ease-in-out z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:z-30
        `}
      >
        <div className="mb-8 mt-12 md:mt-0">
          <img
            src="https://fcoa.org/images/JobGraze_vert_2023.png"
            alt="JobGraze Logo"
            className="h-16 w-auto"
          />
        </div>
        
        <nav className="space-y-1">
          {menuItems.map(({ icon: Icon, label, href, onClick }) => (
            <div key={label}>
              {onClick ? (
                <button
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors w-full text-left
                    text-white hover:bg-[#F2994A]
                  `}
                  onClick={onClick}
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </button>
              ) : (
                <Link
                  href={href || '#'}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                    ${pathname === href ? 'bg-[#F2994A] text-white' : 'text-white hover:bg-[#F2994A]'}
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  )
}

