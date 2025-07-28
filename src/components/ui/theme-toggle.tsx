import { motion, AnimatePresence } from 'framer-motion'
import { IconMoon, IconSun } from '@tabler/icons-react'
import { useTheme } from '@/contexts/ThemeContext'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <motion.button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="relative flex items-center justify-center w-11 h-11 rounded-xl border border-border bg-card hover:bg-muted transition-all duration-300 text-foreground overflow-hidden group"
      aria-label="Toggle theme"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ rotate: 0 }}
      animate={{ rotate: theme === 'dark' ? 180 : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Background animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 dark:from-blue-600/20 dark:to-purple-600/20"
        animate={{
          opacity: theme === 'light' ? 1 : 0,
          scale: theme === 'light' ? 1 : 0.8
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Icons container */}
      <div className="relative w-5 h-5">
        <AnimatePresence mode="wait">
          {theme === 'light' ? (
            <motion.div
              key="sun"
              initial={{ scale: 0, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <IconSun className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ scale: 0, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <IconMoon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hover effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      
      <span className="sr-only">Toggle theme</span>
    </motion.button>
  )
}
