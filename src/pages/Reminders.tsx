import { useState } from 'react'
import { IconPlus, IconBell, IconCalendar, IconClock, IconTrash, IconEdit, IconRepeat } from '@tabler/icons-react'

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
}

export default function Reminders() {
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
      createdAt: '2024-07-20'
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
      createdAt: '2024-07-15'
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
      createdAt: '2024-07-01'
    },
    {
      id: '4',
      title: 'Büromaterial bestellen',
      description: 'Neue Stifte, Papier und andere Büromaterialien bestellen',
      dueDate: '2024-07-25',
      dueTime: '12:00',
      priority: 'low',
      isRecurring: false,
      completed: true,
      createdAt: '2024-07-23'
    }
  ])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newReminder, setNewReminder] = useState({
    title: '',
    description: '',
    dueDate: '',
    dueTime: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    isRecurring: false,
    recurringType: 'weekly' as 'daily' | 'weekly' | 'monthly'
  })
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('pending')

  const handleCreateReminder = () => {
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
        createdAt: new Date().toISOString().split('T')[0]
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
    }
  }

  const toggleCompleted = (id: string) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
    ))
  }

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(reminder => reminder.id !== id))
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
    if (filter === 'pending') return !reminder.completed
    if (filter === 'completed') return reminder.completed
    return true
  })

  const sortedReminders = filteredReminders.sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }
    return new Date(`${a.dueDate}T${a.dueTime}`).getTime() - new Date(`${b.dueDate}T${b.dueTime}`).getTime()
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
            Erinnerungen
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Verwalte deine Aufgaben und Termine
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <IconPlus className="h-4 w-4" />
          Neue Erinnerung
        </button>
      </div>

      {/* Create Reminder Form */}
      {showCreateForm && (
        <div className="p-6 rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
            Neue Erinnerung erstellen
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Titel
              </label>
              <input
                type="text"
                value={newReminder.title}
                onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200"
                placeholder="Erinnerungstitel eingeben..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Beschreibung
              </label>
              <textarea
                value={newReminder.description}
                onChange={(e) => setNewReminder({...newReminder, description: e.target.value})}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 h-24 resize-none"
                placeholder="Beschreibung (optional)..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Datum
                </label>
                <input
                  type="date"
                  value={newReminder.dueDate}
                  onChange={(e) => setNewReminder({...newReminder, dueDate: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Uhrzeit
                </label>
                <input
                  type="time"
                  value={newReminder.dueTime}
                  onChange={(e) => setNewReminder({...newReminder, dueTime: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Priorität
              </label>
              <select
                value={newReminder.priority}
                onChange={(e) => setNewReminder({...newReminder, priority: e.target.value as 'low' | 'medium' | 'high'})}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200"
              >
                <option value="low">Niedrig</option>
                <option value="medium">Mittel</option>
                <option value="high">Hoch</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newReminder.isRecurring}
                  onChange={(e) => setNewReminder({...newReminder, isRecurring: e.target.checked})}
                  className="rounded"
                />
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  Wiederkehrend
                </span>
              </label>
              {newReminder.isRecurring && (
                <select
                  value={newReminder.recurringType}
                  onChange={(e) => setNewReminder({...newReminder, recurringType: e.target.value as 'daily' | 'weekly' | 'monthly'})}
                  className="px-3 py-2 border border-neutral-300 rounded-md dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200"
                >
                  <option value="daily">Täglich</option>
                  <option value="weekly">Wöchentlich</option>
                  <option value="monthly">Monatlich</option>
                </select>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCreateReminder}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Erinnerung erstellen
              </button>
              <button
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'pending', label: 'Ausstehend' },
          { key: 'completed', label: 'Erledigt' },
          { key: 'all', label: 'Alle' }
        ].map(filterOption => (
          <button
            key={filterOption.key}
            onClick={() => setFilter(filterOption.key as any)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === filterOption.key
                ? 'bg-blue-600 text-white'
                : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600'
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
            className={`p-6 rounded-lg border bg-white dark:bg-neutral-800 ${
              reminder.completed 
                ? 'border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20' 
                : isOverdue(reminder.dueDate, reminder.dueTime) && !reminder.completed
                ? 'border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900/20'
                : 'border-neutral-200 dark:border-neutral-700'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <input
                  type="checkbox"
                  checked={reminder.completed}
                  onChange={() => toggleCompleted(reminder.id)}
                  className="mt-1 rounded"
                />
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold mb-2 ${
                    reminder.completed 
                      ? 'line-through text-neutral-500 dark:text-neutral-400' 
                      : 'text-neutral-800 dark:text-neutral-200'
                  }`}>
                    {reminder.title}
                  </h3>
                  {reminder.description && (
                    <p className={`text-sm mb-3 ${
                      reminder.completed 
                        ? 'text-neutral-400 dark:text-neutral-500' 
                        : 'text-neutral-600 dark:text-neutral-400'
                    }`}>
                      {reminder.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                    <span className="flex items-center gap-1">
                      <IconCalendar className="h-4 w-4" />
                      {new Date(reminder.dueDate).toLocaleDateString('de-DE')}
                    </span>
                    <span className="flex items-center gap-1">
                      <IconClock className="h-4 w-4" />
                      {reminder.dueTime}
                    </span>
                    {reminder.isRecurring && (
                      <span className="flex items-center gap-1">
                        <IconRepeat className="h-4 w-4" />
                        {reminder.recurringType === 'daily' ? 'Täglich' : 
                         reminder.recurringType === 'weekly' ? 'Wöchentlich' : 'Monatlich'}
                      </span>
                    )}
                    {isOverdue(reminder.dueDate, reminder.dueTime) && !reminder.completed && (
                      <span className="text-red-600 dark:text-red-400 font-medium">
                        Überfällig
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(reminder.priority)}`}>
                  {reminder.priority === 'high' ? 'Hoch' : reminder.priority === 'medium' ? 'Mittel' : 'Niedrig'}
                </span>
                <button
                  onClick={() => deleteReminder(reminder.id)}
                  className="text-neutral-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                >
                  <IconTrash className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
