import { useState } from 'react'
import { Outlet, useNavigate, Link } from 'react-router-dom'
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useAuth } from '@/contexts/AuthContext'
import {
  IconHome,
  IconInfoCircle,
  IconMessages,
  IconHelp,
  IconBell,
  IconToolsKitchen2,
  IconHeart,
  IconSettings,
  IconLogout,
  IconUsers,
  IconShield,
} from '@tabler/icons-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function Layout() {
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const baseLinks = [
    {
      label: "Dashboard",
      href: "/",
      icon: (
        <IconHome className="h-5 w-5 shrink-0 text-foreground" />
      ),
    },
    {
      label: "Informationen",
      href: "/info",
      icon: (
        <IconInfoCircle className="h-5 w-5 shrink-0 text-foreground" />
      ),
    },
    {
      label: "Schwarzes Brett",
      href: "/blackboard",
      icon: (
        <IconMessages className="h-5 w-5 shrink-0 text-foreground" />
      ),
    },
    {
      label: "Helpdesk",
      href: "/helpdesk",
      icon: (
        <IconHelp className="h-5 w-5 shrink-0 text-foreground" />
      ),
    },
    {
      label: "Erinnerungen",
      href: "/reminders",
      icon: (
        <IconBell className="h-5 w-5 shrink-0 text-foreground" />
      ),
    },
    {
      label: "Essen Abstimmung",
      href: "/food-votes",
      icon: (
        <IconToolsKitchen2 className="h-5 w-5 shrink-0 text-foreground" />
      ),
    },
    {
      label: "Wunschliste",
      href: "/wishlist",
      icon: (
        <IconHeart className="h-5 w-5 shrink-0 text-foreground" />
      ),
    },
    {
      label: "Einstellungen",
      href: "/settings",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-foreground" />
      ),
    },
  ]

  // Add admin links if user is admin
  const adminLinks = isAdmin() ? [
    {
      label: "Benutzerverwaltung",
      href: "/admin/users",
      icon: (
        <IconUsers className="h-5 w-5 shrink-0 text-blue-600" />
      ),
    },
  ] : []

  const links = [...baseLinks, ...adminLinks]

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div className={cn(
        "bg-card border-r border-border shadow-sm transition-all duration-300 flex-shrink-0",
        open ? "w-80" : "w-20"
      )}>
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10 bg-card h-full">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink 
                    key={idx} 
                    link={link} 
                    className="hover:bg-muted rounded-lg transition-colors text-foreground" 
                  />
                ))}
              </div>
            </div>
            <div className="space-y-4 border-t border-border pt-4">
              <div className="flex justify-center">
                <ThemeToggle />
              </div>
              <div className="px-2">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <motion.div
                      className="h-8 w-8 shrink-0 rounded-full overflow-hidden border-2 border-transparent hover:border-blue-500 transition-colors cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate('/settings')}
                    >
                      {user?.profilePicture ? (
                        <img
                          src={user.profilePicture}
                          alt={`${user.firstName} ${user.lastName}`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white text-sm font-bold">
                          {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                        </div>
                      )}
                    </motion.div>
                    {open && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="min-w-0 flex-1"
                      >
                        <div className="text-sm font-medium text-foreground truncate">
                          {user?.firstName} {user?.lastName}
                        </div>
                        <div className="text-xs text-muted-foreground truncate flex items-center gap-1">
                          {user?.role === 'admin' && <IconShield className="h-3 w-3" />}
                          {user?.email}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
              <motion.button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-2 mx-2 hover:bg-muted rounded-lg transition-all duration-200 text-foreground group"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <IconLogout className="h-5 w-5 shrink-0 text-foreground group-hover:text-red-500 transition-colors" />
                {open && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="group-hover:text-red-500 transition-colors"
                  >
                    Abmelden
                  </motion.span>
                )}
              </motion.button>
            </div>
          </SidebarBody>
        </Sidebar>
      </div>
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-auto bg-background">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export const Logo = () => {
  return (
    <motion.a
      href="/"
      className="relative z-20 flex items-center space-x-3 py-3 px-2 text-sm font-normal text-gray-900 bg-white rounded-lg transition-colors shadow-sm border border-gray-200"
      whileHover={{ scale: 1.02 }}
    >
      <img 
        src="/images/bmi_logo_borderless.svg" 
        alt="BMI Logo" 
        className="h-8 w-8 shrink-0"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-semibold whitespace-pre text-gray-900"
      >
        Zivildienst Portal
      </motion.span>
    </motion.a>
  )
}

export const LogoIcon = () => {
  return (
    <motion.a
      href="/"
      className="relative z-20 flex items-center justify-center p-3 text-sm font-normal text-gray-900 bg-white hover:bg-gray-50 rounded-lg transition-colors shadow-sm border border-gray-200"
      whileHover={{ scale: 1.1 }}
    >
      <img 
        src="/images/bmi_logo_borderless.svg" 
        alt="BMI Logo" 
        className="h-8 w-8 shrink-0"
      />
    </motion.a>
  )
}
