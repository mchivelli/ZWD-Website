import { useState } from 'react'
import { IconPlus, IconClock, IconCheck, IconAlertCircle, IconMessage, IconUser } from '@tabler/icons-react'

interface Ticket {
  id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  status: 'open' | 'in-progress' | 'resolved'
  author: string
  assignee?: string
  createdAt: string
  updatedAt: string
  comments: Comment[]
}

interface Comment {
  id: string
  author: string
  content: string
  createdAt: string
}

export default function Helpdesk() {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: '1',
      title: 'Kaffeemaschine defekt',
      description: 'Die Kaffeemaschine in der Küche funktioniert nicht mehr. Sie macht komische Geräusche und brüht keinen Kaffee.',
      priority: 'high',
      status: 'open',
      author: 'Max Mustermann',
      assignee: 'Admin',
      createdAt: '2024-07-25 09:30',
      updatedAt: '2024-07-25 10:15',
      comments: [
        { id: '1', author: 'Admin', content: 'Ticket erhalten, werde mich heute darum kümmern.', createdAt: '2024-07-25 10:15' }
      ]
    },
    {
      id: '2',
      title: 'Heizung zu kalt',
      description: 'Die Heizung in Raum 204 funktioniert nicht richtig. Es ist sehr kalt dort.',
      priority: 'medium',
      status: 'in-progress',
      author: 'Lisa Schmidt',
      assignee: 'Hausmeister',
      createdAt: '2024-07-24 14:20',
      updatedAt: '2024-07-25 08:00',
      comments: [
        { id: '2', author: 'Hausmeister', content: 'Werde heute Nachmittag vorbeischauen.', createdAt: '2024-07-25 08:00' }
      ]
    },
    {
      id: '3',
      title: 'WiFi Probleme',
      description: 'Das WiFi ist sehr langsam und bricht häufig ab.',
      priority: 'low',
      status: 'resolved',
      author: 'Tom Weber',
      assignee: 'IT-Support',
      createdAt: '2024-07-23 16:45',
      updatedAt: '2024-07-24 09:30',
      comments: [
        { id: '3', author: 'IT-Support', content: 'Router wurde neu gestartet, Problem sollte behoben sein.', createdAt: '2024-07-24 09:30' }
      ]
    }
  ])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [newTicket, setNewTicket] = useState({ title: '', description: '', priority: 'medium' as 'low' | 'medium' | 'high' })
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'in-progress' | 'resolved'>('all')

  const handleCreateTicket = () => {
    if (newTicket.title.trim() && newTicket.description.trim()) {
      const ticket: Ticket = {
        id: Date.now().toString(),
        title: newTicket.title,
        description: newTicket.description,
        priority: newTicket.priority,
        status: 'open',
        author: 'Du',
        createdAt: new Date().toLocaleString('de-DE'),
        updatedAt: new Date().toLocaleString('de-DE'),
        comments: []
      }
      setTickets([ticket, ...tickets])
      setNewTicket({ title: '', description: '', priority: 'medium' })
      setShowCreateForm(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'in-progress': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open': return 'Offen'
      case 'in-progress': return 'In Bearbeitung'
      case 'resolved': return 'Gelöst'
      default: return status
    }
  }

  const filteredTickets = statusFilter === 'all' 
    ? tickets 
    : tickets.filter(ticket => ticket.status === statusFilter)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
            Helpdesk
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Support-Tickets erstellen und verwalten
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <IconPlus className="h-4 w-4" />
          Neues Ticket
        </button>
      </div>

      {/* Create Ticket Form */}
      {showCreateForm && (
        <div className="p-6 rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
            Neues Support-Ticket erstellen
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Titel
              </label>
              <input
                type="text"
                value={newTicket.title}
                onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200"
                placeholder="Kurze Beschreibung des Problems..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Priorität
              </label>
              <select
                value={newTicket.priority}
                onChange={(e) => setNewTicket({...newTicket, priority: e.target.value as 'low' | 'medium' | 'high'})}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200"
              >
                <option value="low">Niedrig</option>
                <option value="medium">Mittel</option>
                <option value="high">Hoch</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Beschreibung
              </label>
              <textarea
                value={newTicket.description}
                onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 h-32 resize-none"
                placeholder="Detaillierte Beschreibung des Problems..."
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCreateTicket}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Ticket erstellen
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

      {/* Status Filter */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'all', label: 'Alle' },
          { key: 'open', label: 'Offen' },
          { key: 'in-progress', label: 'In Bearbeitung' },
          { key: 'resolved', label: 'Gelöst' }
        ].map(status => (
          <button
            key={status.key}
            onClick={() => setStatusFilter(status.key as any)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              statusFilter === status.key
                ? 'bg-blue-600 text-white'
                : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600'
            }`}
          >
            {status.label}
          </button>
        ))}
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.map(ticket => (
          <div
            key={ticket.id}
            className="p-6 rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedTicket(ticket)}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                  {ticket.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                  <span className="flex items-center gap-1">
                    <IconUser className="h-4 w-4" />
                    {ticket.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <IconClock className="h-4 w-4" />
                    {ticket.createdAt}
                  </span>
                  {ticket.assignee && (
                    <span className="flex items-center gap-1">
                      <IconUser className="h-4 w-4" />
                      Zugewiesen: {ticket.assignee}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority === 'high' ? 'Hoch' : ticket.priority === 'medium' ? 'Mittel' : 'Niedrig'}
                </span>
                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(ticket.status)}`}>
                  {getStatusLabel(ticket.status)}
                </span>
              </div>
            </div>
            
            <p className="text-neutral-700 dark:text-neutral-300 mb-4">
              {ticket.description}
            </p>
            
            <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
              <span className="flex items-center gap-1">
                <IconMessage className="h-4 w-4" />
                {ticket.comments.length} Kommentare
              </span>
              <span>Zuletzt aktualisiert: {ticket.updatedAt}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
                {selectedTicket.title}
              </h2>
              <button
                onClick={() => setSelectedTicket(null)}
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(selectedTicket.priority)}`}>
                  {selectedTicket.priority === 'high' ? 'Hoch' : selectedTicket.priority === 'medium' ? 'Mittel' : 'Niedrig'}
                </span>
                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedTicket.status)}`}>
                  {getStatusLabel(selectedTicket.status)}
                </span>
              </div>
              
              <p className="text-neutral-700 dark:text-neutral-300">
                {selectedTicket.description}
              </p>
              
              <div className="border-t dark:border-neutral-600 pt-4">
                <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                  Kommentare
                </h3>
                <div className="space-y-3">
                  {selectedTicket.comments.map(comment => (
                    <div key={comment.id} className="p-3 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-neutral-800 dark:text-neutral-200">
                          {comment.author}
                        </span>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
                          {comment.createdAt}
                        </span>
                      </div>
                      <p className="text-neutral-700 dark:text-neutral-300">
                        {comment.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
