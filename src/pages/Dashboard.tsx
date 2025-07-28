import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { 
  IconCalendar, 
  IconBell,
  IconHelp,
  IconMessages,
  IconToolsKitchen2,
  IconChevronRight,
  IconTrendingUp,
  IconSparkles
} from '@tabler/icons-react'
import { useTheme } from '@/contexts/ThemeContext'

export default function Dashboard() {
  const { theme } = useTheme()
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

  return (
    <div className="space-y-8 bg-background text-foreground">
      {/* Hero Section - Modern Theme */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-2xl p-6 md:p-8 mb-8 overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
        style={{ backgroundColor: isDark ? '#374151' : '#ffffff' }}
      >
        <div className="dark:hidden">
            {/* Light mode decorative elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gray-50 rounded-full -translate-y-24 translate-x-24" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gray-50 rounded-full translate-y-16 -translate-x-16" />
        </div>
        <div className="hidden dark:block">
            {/* Dark mode decorative elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gray-700/50 rounded-full -translate-y-24 translate-x-24" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gray-700/50 rounded-full translate-y-16 -translate-x-16" />
        </div>
        <div className="relative z-10 flex flex-col justify-between h-full max-w-4xl">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: isDark ? '#f3f4f6' : '#111827' }}
            >
              Willkommen im Zivildienst Portal
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg mb-8 max-w-2xl"
              style={{ color: isDark ? '#d1d5db' : '#6b7280' }}
            >
              Verwalte deinen Zivildienst effizient, bleibe mit deiner Gemeinschaft verbunden 
              und nutze alle verfügbaren Ressourcen optimal.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mt-4"
          >
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2 group">
              <IconSparkles className="w-4 h-4" />
              Schnellstart
              <IconChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-border text-foreground px-4 py-2 rounded-lg font-semibold hover:bg-muted transition-colors">
              Hilfe & Support
            </button>
          </motion.div>
        </div>
        
        {/* BMI Logo on the right side */}
        <div className="absolute top-0 right-0 bottom-0 w-1/4 md:w-1/5 flex items-center justify-center p-4">
          <img 
            src="/images/bmi_logo_borderless.svg" 
            alt="BMI Logo" 
            className="w-full h-full object-contain opacity-80"
          />
        </div>
      </motion.div>

      {/* Stats Cards - Responsive to theme */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {/* Card 1: Aktive Tickets - RED ACCENT */}
        <motion.a 
          href="/helpdesk" 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.1 }} 
          className="group relative p-6 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer overflow-hidden shadow-sm"
          style={{ backgroundColor: isDark ? '#374151' : '#fef2f2' }}
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl" style={{ backgroundColor: isDark ? '#4b5563' : '#fee2e2' }}>
                <IconHelp className="w-6 h-6" style={{ color: isDark ? '#ef4444' : '#dc2626' }} />
              </div>
              <IconTrendingUp className="w-4 h-4" style={{ color: isDark ? '#9ca3af' : '#9ca3af' }} />
            </div>
            <h3 className="text-sm font-medium mb-2" style={{ color: isDark ? '#d1d5db' : '#374151' }}>Aktive Tickets</h3>
            <p className="text-3xl font-bold" style={{ color: isDark ? '#ef4444' : '#dc2626' }}>3</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </motion.a>
        
        {/* Card 2: Neue Nachrichten - BLUE ACCENT */}
        <motion.a 
          href="/blackboard" 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.2 }} 
          className="group relative p-6 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer overflow-hidden shadow-sm"
          style={{ backgroundColor: isDark ? '#374151' : '#eff6ff' }}
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl" style={{ backgroundColor: isDark ? '#4b5563' : '#dbeafe' }}>
                <IconMessages className="w-6 h-6" style={{ color: isDark ? '#3b82f6' : '#2563eb' }} />
              </div>
              <IconTrendingUp className="w-4 h-4" style={{ color: isDark ? '#9ca3af' : '#9ca3af' }} />
            </div>
            <h3 className="text-sm font-medium mb-2" style={{ color: isDark ? '#d1d5db' : '#374151' }}>Neue Nachrichten</h3>
            <p className="text-3xl font-bold" style={{ color: isDark ? '#3b82f6' : '#2563eb' }}>7</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </motion.a>
        
        {/* Card 3: Anstehende Termine - GREEN ACCENT */}
        <motion.a 
          href="/reminders" 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.3 }} 
          className="group relative p-6 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer overflow-hidden shadow-sm"
          style={{ backgroundColor: isDark ? '#374151' : '#f0fdf4' }}
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl" style={{ backgroundColor: isDark ? '#4b5563' : '#dcfce7' }}>
                <IconCalendar className="w-6 h-6" style={{ color: isDark ? '#22c55e' : '#16a34a' }} />
              </div>
              <IconTrendingUp className="w-4 h-4" style={{ color: isDark ? '#9ca3af' : '#9ca3af' }} />
            </div>
            <h3 className="text-sm font-medium mb-2" style={{ color: isDark ? '#d1d5db' : '#374151' }}>Anstehende Termine</h3>
            <p className="text-3xl font-bold" style={{ color: isDark ? '#22c55e' : '#16a34a' }}>2</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </motion.a>
        
        {/* Card 4: Offene Abstimmungen - YELLOW ACCENT */}
        <motion.a 
          href="/food-votes" 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.4 }} 
          className="group relative p-6 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer overflow-hidden shadow-sm"
          style={{ backgroundColor: isDark ? '#374151' : '#fefce8' }}
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl" style={{ backgroundColor: isDark ? '#4b5563' : '#fef3c7' }}>
                <IconToolsKitchen2 className="w-6 h-6" style={{ color: isDark ? '#eab308' : '#ca8a04' }} />
              </div>
              <IconTrendingUp className="w-4 h-4" style={{ color: isDark ? '#9ca3af' : '#9ca3af' }} />
            </div>
            <h3 className="text-sm font-medium mb-2" style={{ color: isDark ? '#d1d5db' : '#374151' }}>Offene Abstimmungen</h3>
            <p className="text-3xl font-bold" style={{ color: isDark ? '#eab308' : '#ca8a04' }}>1</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </motion.a>
      </motion.div>
      
      {/* Content Grid - Responsive to theme */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Recent Messages */}
        <div className="group p-8 rounded-2xl hover:shadow-xl transition-all duration-300 shadow-sm" style={{ backgroundColor: isDark ? '#374151' : '#ffffff' }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl" style={{ backgroundColor: isDark ? '#4b5563' : '#dbeafe' }}>
              <IconMessages className="w-6 h-6" style={{ color: isDark ? '#3b82f6' : '#2563eb' }} />
            </div>
            <h2 className="text-xl font-semibold" style={{ color: isDark ? '#f3f4f6' : '#111827' }}>
              Neueste Einträge - Schwarzes Brett
            </h2>
          </div>
          <div className="space-y-4">
            {[
              { text: "Neue Kaffeemaschine in der Küche verfügbar", time: "vor 2 Stunden", priority: "high" },
              { text: "Wartungsarbeiten am Samstag - Bitte beachten", time: "vor 1 Tag", priority: "medium" },
              { text: "Gemeinsamer Grillabend nächste Woche", time: "vor 2 Tagen", priority: "low" },
            ].map((entry, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="p-4 rounded-xl border-l-4 transition-all duration-200 hover:shadow-md cursor-pointer"
                style={{
                  backgroundColor: isDark ? '#4b5563' : 
                    (entry.priority === 'high' ? '#fef2f2' : 
                     entry.priority === 'medium' ? '#fefce8' : '#f0fdf4'),
                  borderLeftColor: entry.priority === 'high' ? '#f87171' : 
                                  entry.priority === 'medium' ? '#facc15' : '#4ade80'
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-1" style={{ color: isDark ? '#f3f4f6' : '#111827' }}>
                      {entry.text}
                    </p>
                    <p className="text-xs" style={{ color: isDark ? '#d1d5db' : '#6b7280' }}>
                      {entry.time}
                    </p>
                  </div>
                  <div className="w-2 h-2 rounded-full ml-3 mt-2 flex-shrink-0" style={{
                    backgroundColor: entry.priority === 'high' ? '#f87171' :
                                    entry.priority === 'medium' ? '#facc15' : '#4ade80'
                  }} />
                </div>
              </motion.div>
            ))}
          </div>
          <a
            href="/blackboard"
            className="group inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl font-medium shadow-sm transition-colors"
            style={{ backgroundColor: '#2563eb', color: '#ffffff' }}
          >
            Alle Nachrichten anzeigen
            <IconChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        
        {/* Upcoming Events */}
        <div className="group p-8 rounded-2xl hover:shadow-xl transition-all duration-300 shadow-sm" style={{ backgroundColor: isDark ? '#374151' : '#ffffff' }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl" style={{ backgroundColor: isDark ? '#4b5563' : '#dcfce7' }}>
              <IconCalendar className="w-6 h-6" style={{ color: isDark ? '#22c55e' : '#16a34a' }} />
            </div>
            <h2 className="text-xl font-semibold" style={{ color: isDark ? '#f3f4f6' : '#111827' }}>
              Kommende Termine
            </h2>
          </div>
          <div className="space-y-4">
            {[
              { title: "Team-Meeting", date: "Heute, 14:00", type: "meeting", urgent: true },
              { title: "Einsatzplanung", date: "Morgen, 10:00", type: "planning", urgent: false },
              { title: "Schulung Erste Hilfe", date: "Fr, 09:00", type: "training", urgent: false },
            ].map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="group/item p-4 rounded-xl border-l-4 transition-all duration-200 hover:shadow-md cursor-pointer"
                style={{
                  backgroundColor: isDark ? '#4b5563' : (event.urgent ? '#fef2f2' : '#eff6ff'),
                  borderLeftColor: event.urgent ? '#fb923c' : '#60a5fa'
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium" style={{ color: isDark ? '#f3f4f6' : '#111827' }}>
                        {event.title}
                      </p>
                      {event.urgent && (
                        <span className="px-2 py-1 text-xs rounded-full font-medium" style={{ backgroundColor: '#fed7aa', color: '#c2410c' }}>
                          Dringend
                        </span>
                      )}
                    </div>
                    <p className="text-xs mt-1" style={{ color: isDark ? '#d1d5db' : '#6b7280' }}>
                      {event.date}
                    </p>
                  </div>
                  <IconBell className="w-4 h-4" style={{ color: isDark ? '#d1d5db' : '#9ca3af' }} />
                </div>
              </motion.div>
            ))}
          </div>
          <a
            href="/reminders"
            className="group inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl font-medium shadow-sm transition-colors"
            style={{ backgroundColor: '#16a34a', color: '#ffffff' }}
          >
            Alle Termine anzeigen
            <IconChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </motion.div>
    </div>
  )
}
