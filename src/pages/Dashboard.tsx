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
  IconShield
} from '@tabler/icons-react'

export default function Dashboard() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 md:p-12 text-white"
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full backdrop-blur-sm">
              <IconShield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Willkommen im Zivildienst Portal
              </h1>
              <p className="text-blue-100 mt-2 text-lg">
                Dein digitaler Begleiter für einen erfolgreichen Zivildienst
              </p>
            </div>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-blue-50 text-lg mb-8 max-w-2xl"
          >
            Verwalte deinen Zivildienst effizient, bleibe mit deiner Gemeinschaft verbunden 
            und nutze alle verfügbaren Ressourcen optimal.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2 group">
              Schnellstart
              <IconChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm">
              Hilfe & Support
            </button>
          </motion.div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          { 
            title: "Aktive Tickets", 
            value: "3", 
            icon: IconHelp,
            color: "from-red-500 to-pink-600", 
            bgColor: "bg-red-50 dark:bg-red-900/20",
            href: "/helpdesk" 
          },
          { 
            title: "Neue Nachrichten", 
            value: "7", 
            icon: IconMessages,
            color: "from-blue-500 to-cyan-600", 
            bgColor: "bg-blue-50 dark:bg-blue-900/20",
            href: "/blackboard" 
          },
          { 
            title: "Anstehende Termine", 
            value: "2", 
            icon: IconCalendar,
            color: "from-green-500 to-emerald-600", 
            bgColor: "bg-green-50 dark:bg-green-900/20",
            href: "/reminders" 
          },
          { 
            title: "Offene Abstimmungen", 
            value: "1", 
            icon: IconToolsKitchen2,
            color: "from-yellow-500 to-orange-600", 
            bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
            href: "/food-votes" 
          },
        ].map((card, idx) => {
          const IconComponent = card.icon;
          return (
            <motion.a
              key={idx}
              href={card.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
              className={cn(
                "group relative p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 transition-all duration-300 hover:shadow-lg hover:shadow-neutral-200/50 dark:hover:shadow-neutral-800/50 hover:-translate-y-1 cursor-pointer overflow-hidden",
                card.bgColor
              )}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn(
                    "flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r",
                    card.color
                  )}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <IconTrendingUp className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors" />
                </div>
                <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                  {card.title}
                </h3>
                <p className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">
                  {card.value}
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </motion.a>
          );
        })}
      </motion.div>
      
      {/* Content Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Recent Messages */}
        <div className="group p-6 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <IconMessages className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
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
                className={cn(
                  "p-4 rounded-lg border-l-4 transition-all duration-200 hover:shadow-md",
                  entry.priority === 'high' ? 'bg-red-50 dark:bg-red-900/20 border-red-400' :
                  entry.priority === 'medium' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400' :
                  'bg-green-50 dark:bg-green-900/20 border-green-400'
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 mb-1">
                      {entry.text}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {entry.time}
                    </p>
                  </div>
                  <div className={cn(
                    "w-2 h-2 rounded-full ml-3 mt-2 flex-shrink-0",
                    entry.priority === 'high' ? 'bg-red-400' :
                    entry.priority === 'medium' ? 'bg-yellow-400' :
                    'bg-green-400'
                  )} />
                </div>
              </motion.div>
            ))}
          </div>
          <a
            href="/blackboard"
            className="group inline-flex items-center gap-2 mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Alle Nachrichten anzeigen
            <IconChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        
        {/* Upcoming Events */}
        <div className="group p-6 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <IconCalendar className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
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
                className={cn(
                  "group/item p-4 rounded-lg border-l-4 transition-all duration-200 hover:shadow-md cursor-pointer",
                  event.urgent ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-400' :
                  'bg-blue-50 dark:bg-blue-900/20 border-blue-400'
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                        {event.title}
                      </p>
                      {event.urgent && (
                        <span className="px-2 py-1 text-xs bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 rounded-full">
                          Dringend
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      {event.date}
                    </p>
                  </div>
                  <IconBell className="w-4 h-4 text-neutral-400 group-hover/item:text-neutral-600 dark:group-hover/item:text-neutral-300 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
          <a
            href="/reminders"
            className="group inline-flex items-center gap-2 mt-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Alle Termine anzeigen
            <IconChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </motion.div>
    </div>
  )
}
