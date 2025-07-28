import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/stateful-button'
import { useAuth } from '@/contexts/AuthContext'
import { IconPlus, IconBell, IconCalendar, IconClock, IconTrash, IconEdit, IconRepeat, IconEye, IconUser, IconCheck } from '@tabler/icons-react'

interface Reminder {
  id: string
  title: string
  description: string
  dueDate: string
  dueTime: string
  priority: 'low' | 'medium' | 'high'
  isRecurring: boolean
  recurringType?: 'daily' | 'weekly' | 'monthly'
  completed: boolean
  createdAt: string
  author: string
  isNew?: boolean
  viewedBy: Record<string, string> // userId -> timestamp
  completedBy: Record<string, boolean> // userId -> completed status
}

export default function Reminders() {
  const { user } = useAuth()
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: 'Wochenbericht einreichen',
      description: 'Wochenbericht für die vergangene Woche erstellen und einreichen',
      dueDate: '2024-07-26',
      dueTime: '14:00',
      priority: 'high',
      isRecurring: true,
      recurringType: 'weekly',
      completed: false,
      createdAt: '2024-07-20',
      author: 'Admin',
      isNew: true,
      viewedBy: {},
      completedBy: {}
    },
    {
      id: '2',
      title: 'Team Meeting',
      description: 'Wöchentliches Team Meeting im Konferenzraum',
      dueDate: '2024-07-26',
      dueTime: '10:00',
      priority: 'medium',
      isRecurring: true,
      recurringType: 'weekly',
      completed: false,
      createdAt: '2024-07-15',
      author: 'Lisa Schmidt',
      isNew: false,
      viewedBy: { [user?.id || '']: '2024-07-20' },
      completedBy: {}
    },
    {
      id: '3',
      title: 'Monatsabschluss',
      description: 'Monatsabschluss vorbereiten und alle Unterlagen zusammenstellen',
      dueDate: '2024-07-31',
      dueTime: '16:00',
      priority: 'medium',
      isRecurring: true,
      recurringType: 'monthly',
      completed: false,
      createdAt: '2024-07-01',
      author: 'Admin',
      isNew: false,
      viewedBy: { [user?.id || '']: '2024-07-15' },
      completedBy: {}
    }
  ])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all')
  const [newReminder, setNewReminder] = useState({
    title: '',
    description: '',
    dueDate: '',
    dueTime: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    isRecurring: false,
    recurringType: 'weekly' as 'daily' | 'weekly' | 'monthly'
  })
  const [notifications, setNotifications] = useState<string[]>([])

  // Check for new reminders and create notifications
  useEffect(() => {
    if (!user) return

    const newReminderNotifications = reminders
      .filter(reminder => isReminderNew(reminder))
      .map(reminder => `Neue Erinnerung: ${reminder.title}`)

    setNotifications(prev => [...prev, ...newReminderNotifications])
  }, [reminders, user])

  const handleCreateReminder = async () => {
    if (newReminder.title.trim() && newReminder.dueDate && newReminder.dueTime) {
      const reminder: Reminder = {
        id: Date.now().toString(),
        title: newReminder.title,
        description: newReminder.description,
        dueDate: newReminder.dueDate,
        dueTime: newReminder.dueTime,
        priority: newReminder.priority,
        isRecurring: newReminder.isRecurring,
        recurringType: newReminder.isRecurring ? newReminder.recurringType : undefined,
        completed: false,
        createdAt: new Date().toISOString().split('T')[0],
        author: user?.firstName + ' ' + user?.lastName || 'Unbekannt',
        isNew: true,
        viewedBy: { [user?.id || '']: new Date().toISOString() }, // Creator has already viewed it
        completedBy: {}
      }
      setReminders([reminder, ...reminders])
      setNewReminder({
        title: '',
        description: '',
        dueDate: '',
        dueTime: '',
        priority: 'medium',
        isRecurring: false,
        recurringType: 'weekly'
      })
      setShowCreateForm(false)

      // Add notification for other users
      setNotifications(prev => [...prev, `Neue Erinnerung erstellt: ${reminder.title}`])
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }

  const markReminderAsViewed = (reminderId: string) => {
    if (!user) return
    
    setReminders(prev => prev.map(reminder => 
      reminder.id === reminderId 
        ? { 
            ...reminder, 
            isNew: false,
            viewedBy: { ...reminder.viewedBy, [user.id]: new Date().toISOString() }
          }
        : reminder
    ))
  }

  const toggleCompleted = (id: string) => {
    if (!user) return
    
    setReminders(reminders.map(reminder => {
      if (reminder.id === id) {
        const newCompletedBy = { ...reminder.completedBy }
        newCompletedBy[user.id] = !newCompletedBy[user.id]
        
        // Check if all users have completed it (for simplicity, just check current user)
        const allCompleted = Object.values(newCompletedBy).every(Boolean)
        
        return { 
          ...reminder, 
          completedBy: newCompletedBy,
          completed: allCompleted // Overall completed status
        }
      }
      return reminder
    }))
  }

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(reminder => reminder.id !== id))
  }

  const dismissNotification = (index: number) => {
    setNotifications(prev => prev.filter((_, i) => i !== index))
  }

  const isReminderNew = (reminder: Reminder) => {
    if (!user) return false
    const lastViewed = reminder.viewedBy[user.id]
    return reminder.isNew && !lastViewed
  }

  const isReminderCompletedByUser = (reminder: Reminder) => {
    if (!user) return false
    return reminder.completedBy[user.id] || false
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const isOverdue = (dueDate: string, dueTime: string) => {
    const now = new Date()
    const due = new Date(`${dueDate}T${dueTime}`)
    return due < now
  }

  const filteredReminders = reminders.filter(reminder => {
    if (filter === 'all') return true
    if (filter === 'pending') return !isReminderCompletedByUser(reminder)
    if (filter === 'completed') return isReminderCompletedByUser(reminder)
    return true
  })

  const sortedReminders = filteredReminders.sort((a, b) => {
    const aCompleted = isReminderCompletedByUser(a)
    const bCompleted = isReminderCompletedByUser(b)
    
    if (aCompleted !== bCompleted) {
      return aCompleted ? 1 : -1
    }
    return new Date(`${a.dueDate}T${a.dueTime}`).getTime() - new Date(`${b.dueDate}T${b.dueTime}`).getTime()
  })

  return (
    <div className="space-y-6">
      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="space-y-2">
          {notifications.map((notification, index) => (
            <div key={index} className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <IconBell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-blue-800 dark:text-blue-200">{notification}</span>
              </div>
              <button
                onClick={() => dismissNotification(index)}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
              >
                <IconTrash className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Erinnerungen
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Verwalte deine Aufgaben und Termine
          </p>
        </div>
        <Button
          onClick={async () => {
            setShowCreateForm(!showCreateForm)
            await new Promise(resolve => setTimeout(resolve, 300))
          }}
          variant="small"
          className="bg-blue-600 hover:bg-blue-700 hover:ring-blue-500"
        >
          <IconPlus className="h-4 w-4 mr-2" />
          Neue Erinnerung
        </Button>
      </div>

      {/* Filter Options */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'all', label: 'Alle' },
          { key: 'pending', label: 'Ausstehend' },
          { key: 'completed', label: 'Erledigt' }
        ].map(filterOption => (
          <button
            key={filterOption.key}
            onClick={() => setFilter(filterOption.key as any)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              filter === filterOption.key
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-gray-200 dark:border-gray-600'
            }`}
          >
            {filterOption.label}
          </button>
        ))}
      </div>

      {/* Reminders List */}
      <div className="space-y-4">
        {sortedReminders.map(reminder => (
          <div 
            key={reminder.id} 
            className={`p-6 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer hover:shadow-md transition-shadow ${isReminderCompletedByUser(reminder) ? 'opacity-60' : ''}`}
            onClick={() => markReminderAsViewed(reminder.id)}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className={`text-lg font-semibold ${isReminderCompletedByUser(reminder) ? 'line-through' : ''} text-gray-800 dark:text-gray-200`}>
                    {reminder.title}
                  </h3>
                  {isReminderNew(reminder) && (
                    <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">NEU</span>
                  )}
                  {reminder.isRecurring && (
                    <IconRepeat className="h-4 w-4 text-blue-600" title="Wiederkehrend" />
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{reminder.description}</p>
                
                                 <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-300">
                   <span className="flex items-center gap-1">
                     <IconCalendar className="h-4 w-4" />
                     {reminder.dueDate}
                   </span>
                  <span className="flex items-center gap-1">
                    <IconClock className="h-4 w-4" />
                    {reminder.dueTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <IconUser className="h-4 w-4" />
                    Erstellt von: {reminder.author}
                  </span>
                  {Object.keys(reminder.viewedBy).length > 0 && (
                    <span className="flex items-center gap-1">
                      <IconEye className="h-4 w-4" />
                      Gesehen von: {Object.keys(reminder.viewedBy).length} Person(en)
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(reminder.priority)}`}>
                  {reminder.priority === 'high' ? 'Hoch' : reminder.priority === 'medium' ? 'Mittel' : 'Niedrig'}
                </span>
                
                {isOverdue(reminder.dueDate, reminder.dueTime) && !isReminderCompletedByUser(reminder) && (
                  <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded text-xs">
                    Überfällig
                  </span>
                )}
                
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleCompleted(reminder.id)
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    isReminderCompletedByUser(reminder)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 hover:bg-green-500 hover:text-white'
                  }`}
                  title={isReminderCompletedByUser(reminder) ? 'Als unerledigt markieren' : 'Als erledigt markieren'}
                >
                  <IconCheck className="h-4 w-4" />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteReminder(reminder.id)
                  }}
                  className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  title="Löschen"
                >
                  <IconTrash className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Reminder Form - keeping existing form but with author field */}
      {showCreateForm && (
        <div className="p-6 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Neue Erinnerung erstellen
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Titel
              </label>
              <input
                type="text"
                value={newReminder.title}
                onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                placeholder="Titel der Erinnerung..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Priorität
              </label>
              <select
                value={newReminder.priority}
                onChange={(e) => setNewReminder({...newReminder, priority: e.target.value as 'low' | 'medium' | 'high'})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              >
                <option value="low">Niedrig</option>
                <option value="medium">Mittel</option>
                <option value="high">Hoch</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Datum
              </label>
              <input
                type="date"
                value={newReminder.dueDate}
                onChange={(e) => setNewReminder({...newReminder, dueDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Uhrzeit
              </label>
              <input
                type="time"
                value={newReminder.dueTime}
                onChange={(e) => setNewReminder({...newReminder, dueTime: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Beschreibung
              </label>
              <textarea
                value={newReminder.description}
                onChange={(e) => setNewReminder({...newReminder, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 h-32 resize-none"
                placeholder="Detaillierte Beschreibung..."
              />
            </div>
            <div className="md:col-span-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="recurring"
                  checked={newReminder.isRecurring}
                  onChange={(e) => setNewReminder({...newReminder, isRecurring: e.target.checked})}
                  className="rounded border-gray-300 dark:border-gray-600"
                />
                <label htmlFor="recurring" className="text-sm text-gray-700 dark:text-gray-300">
                  Wiederkehrende Erinnerung
                </label>
              </div>
              {newReminder.isRecurring && (
                <select
                  value={newReminder.recurringType}
                  onChange={(e) => setNewReminder({...newReminder, recurringType: e.target.value as 'daily' | 'weekly' | 'monthly'})}
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                >
                  <option value="daily">Täglich</option>
                  <option value="weekly">Wöchentlich</option>
                  <option value="monthly">Monatlich</option>
                </select>
              )}
            </div>
          </div>
          <div className="flex gap-2 mt-6">
            <Button
              onClick={async () => {
                await handleCreateReminder()
              }}
              variant="small"
              className="bg-green-600 hover:bg-green-700 hover:ring-green-500"
              disabled={!newReminder.title || !newReminder.dueDate || !newReminder.dueTime}
            >
              Erinnerung erstellen
            </Button>
            <button
              onClick={() => {
                setShowCreateForm(false)
                setNewReminder({
                  title: '',
                  description: '',
                  dueDate: '',
                  dueTime: '',
                  priority: 'medium',
                  isRecurring: false,
                  recurringType: 'weekly'
                })
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Abbrechen
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
