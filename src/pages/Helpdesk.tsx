import { useState } from 'react'
import { Button } from '@/components/ui/stateful-button'
import { useAuth } from '@/contexts/AuthContext'
import { IconPlus, IconClock, IconCheck, IconAlertCircle, IconMessage, IconUser, IconUserPlus, IconX } from '@tabler/icons-react'

interface Comment {
  id: string
  ticketId: string
  author: string
  content: string
  createdAt: string
}

interface Ticket {
  id: string
  title: string
  description: string
  author: string
  priority: 'low' | 'medium' | 'high'
  status: 'open' | 'in-progress' | 'resolved' | 'closed'
  assignees: string[]
  createdAt: string
  resolvedAt?: string
  closedAt?: string
  isNew?: boolean
  lastViewedBy: Record<string, string> // userId -> timestamp
}

export default function Helpdesk() {
  const { user } = useAuth()
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: '1',
      title: 'Computer startet nicht',
      description: 'Der Computer im Büro startet seit heute morgen nicht mehr. Display bleibt schwarz.',
      author: 'Max Mustermann',
      priority: 'high',
      status: 'in-progress',
      assignees: ['Admin Support', 'Lisa Schmidt'],
      createdAt: '2024-07-24',
      isNew: true,
      lastViewedBy: {}
    },
    {
      id: '2',
      title: 'Drucker druckt nicht in Farbe',
      description: 'Der Drucker im 2. Stock druckt nur noch in schwarz-weiß, obwohl Farbpatrone voll ist.',
      author: 'Lisa Schmidt',
      priority: 'medium',
      status: 'open',
      assignees: [],
      createdAt: '2024-07-23',
      isNew: true,
      lastViewedBy: {}
    },
    {
      id: '3',
      title: 'Internet Verbindung langsam',
      description: 'Die Internetverbindung ist seit gestern sehr langsam. Kann kaum arbeiten.',
      author: 'Tom Weber',
      priority: 'medium',
      status: 'resolved',
      assignees: ['IT Support'],
      createdAt: '2024-07-22',
      resolvedAt: '2024-07-24',
      isNew: false,
      lastViewedBy: { [user?.id || '']: '2024-07-24' }
    },
    {
      id: '4',
      title: 'Passwort vergessen',
      description: 'Habe mein Passwort für das System vergessen und kann mich nicht anmelden.',
      author: 'Anna Müller',
      priority: 'low',
      status: 'closed',
      assignees: ['Admin Support'],
      createdAt: '2024-07-20',
      resolvedAt: '2024-07-21',
      closedAt: '2024-07-21',
      isNew: false,
      lastViewedBy: { [user?.id || '']: '2024-07-21' }
    }
  ])

  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      ticketId: '1',
      author: 'Admin Support',
      content: 'Ich schaue mir das Problem an. Könnte ein Hardware-Defekt sein.',
      createdAt: '2024-07-24T10:30:00'
    },
    {
      id: '2',
      ticketId: '1',
      author: 'Lisa Schmidt',
      content: 'Habe bereits versucht, das Netzkabel zu überprüfen. Problem besteht weiterhin.',
      createdAt: '2024-07-24T11:00:00'
    },
    {
      id: '3',
      ticketId: '3',
      author: 'IT Support',
      content: 'Router wurde neu gestartet. Verbindung sollte wieder normal funktionieren.',
      createdAt: '2024-07-24T09:00:00'
    }
  ])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null)
  const [newComment, setNewComment] = useState('')
  const [newAssignee, setNewAssignee] = useState('')
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high'
  })

  const availableAssignees = ['Admin Support', 'IT Support', 'Lisa Schmidt', 'Tom Weber', 'Max Mustermann']

  const handleCreateTicket = async () => {
    if (newTicket.title.trim() && newTicket.description.trim()) {
      const ticket: Ticket = {
        id: Date.now().toString(),
        title: newTicket.title,
        description: newTicket.description,
        author: user?.firstName + ' ' + user?.lastName || 'Unbekannt',
        priority: newTicket.priority,
        status: 'open',
        assignees: [],
        createdAt: new Date().toISOString().split('T')[0],
        isNew: true,
        lastViewedBy: {}
      }
      setTickets([ticket, ...tickets])
      setNewTicket({ title: '', description: '', priority: 'medium' })
      setShowCreateForm(false)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }

  const markTicketAsViewed = (ticketId: string) => {
    if (!user) return
    
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            isNew: false,
            lastViewedBy: { ...ticket.lastViewedBy, [user.id]: new Date().toISOString() }
          }
        : ticket
    ))
  }

  const addComment = async () => {
    if (!newComment.trim() || !selectedTicket || !user) return

    const comment: Comment = {
      id: Date.now().toString(),
      ticketId: selectedTicket,
      author: user.firstName + ' ' + user.lastName,
      content: newComment,
      createdAt: new Date().toISOString()
    }

    setComments(prev => [...prev, comment])
    setNewComment('')
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  const assignToTicket = async (ticketId: string, assignee: string) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId && !ticket.assignees.includes(assignee)
        ? { ...ticket, assignees: [...ticket.assignees, assignee] }
        : ticket
    ))
    setNewAssignee('')
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  const removeAssignee = async (ticketId: string, assignee: string) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId
        ? { ...ticket, assignees: ticket.assignees.filter(a => a !== assignee) }
        : ticket
    ))
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  const updateTicketStatus = async (ticketId: string, status: Ticket['status']) => {
    setTickets(prev => prev.map(ticket => {
      if (ticket.id === ticketId) {
        const updates: Partial<Ticket> = { status }
        if (status === 'resolved') {
          updates.resolvedAt = new Date().toISOString().split('T')[0]
        } else if (status === 'closed') {
          updates.closedAt = new Date().toISOString().split('T')[0]
          if (!ticket.resolvedAt) {
            updates.resolvedAt = new Date().toISOString().split('T')[0]
          }
        }
        return { ...ticket, ...updates }
      }
      return ticket
    }))
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'closed': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
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

  const isTicketNew = (ticket: Ticket) => {
    if (!user) return false
    const lastViewed = ticket.lastViewedBy[user.id]
    return ticket.isNew && !lastViewed
  }

  const filteredTickets = statusFilter === 'all' 
    ? tickets 
    : tickets.filter(ticket => ticket.status === statusFilter)

  const getTicketComments = (ticketId: string) => 
    comments.filter(comment => comment.ticketId === ticketId)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Helpdesk
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Support-Tickets erstellen und verwalten
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
          Neues Ticket
        </Button>
      </div>

      {/* Create Ticket Form */}
      {showCreateForm && (
        <div className="p-6 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Neues Support-Ticket erstellen
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Titel
              </label>
              <input
                type="text"
                value={newTicket.title}
                onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                placeholder="Kurze Beschreibung des Problems..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Priorität
              </label>
              <select
                value={newTicket.priority}
                onChange={(e) => setNewTicket({...newTicket, priority: e.target.value as 'low' | 'medium' | 'high'})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              >
                <option value="low">Niedrig</option>
                <option value="medium">Mittel</option>
                <option value="high">Hoch</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Beschreibung
              </label>
              <textarea
                value={newTicket.description}
                onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 h-32 resize-none"
                placeholder="Detaillierte Beschreibung des Problems..."
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={async () => {
                  await handleCreateTicket()
                }}
                variant="small"
                className="bg-green-600 hover:bg-green-700 hover:ring-green-500"
                disabled={!newTicket.title || !newTicket.description}
              >
                Ticket erstellen
              </Button>
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
          { key: 'resolved', label: 'Gelöst' },
          { key: 'closed', label: 'Geschlossen' }
        ].map(status => (
          <button
            key={status.key}
            onClick={() => setStatusFilter(status.key as any)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              statusFilter === status.key
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
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
            className="p-6 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => {
              setSelectedTicket(ticket.id)
              markTicketAsViewed(ticket.id)
            }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  {ticket.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span className="flex items-center gap-1">
                    <IconUser className="h-4 w-4" />
                    {ticket.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <IconClock className="h-4 w-4" />
                    {ticket.createdAt}
                  </span>
                  {ticket.assignees.length > 0 && (
                    <span className="flex items-center gap-1">
                      <IconUserPlus className="h-4 w-4" />
                      Zugewiesen: {ticket.assignees.map(a => a).join(', ')}
                    </span>
                  )}
                  {ticket.resolvedAt && (
                    <span className="flex items-center gap-1">
                      <IconCheck className="h-4 w-4" />
                      Gelöst am: {ticket.resolvedAt}
                    </span>
                  )}
                  {ticket.closedAt && (
                    <span className="flex items-center gap-1">
                      <IconX className="h-4 w-4" />
                      Geschlossen am: {ticket.closedAt}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority === 'high' ? 'Hoch' : ticket.priority === 'medium' ? 'Mittel' : 'Niedrig'}
                </span>
                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(ticket.status)}`}>
                  {ticket.status === 'open' ? 'Offen' : ticket.status === 'in-progress' ? 'In Bearbeitung' : ticket.status === 'resolved' ? 'Gelöst' : 'Geschlossen'}
                </span>
              </div>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {ticket.description}
            </p>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <IconMessage className="h-4 w-4" />
                {getTicketComments(ticket.id).length} Kommentare
              </span>
                             <span>Erstellt: {ticket.createdAt}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {tickets.find(t => t.id === selectedTicket)?.title}
              </h2>
              <button
                onClick={() => setSelectedTicket(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(tickets.find(t => t.id === selectedTicket)?.priority || 'medium')}`}>
                  {tickets.find(t => t.id === selectedTicket)?.priority === 'high' ? 'Hoch' : tickets.find(t => t.id === selectedTicket)?.priority === 'medium' ? 'Mittel' : 'Niedrig'}
                </span>
                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(tickets.find(t => t.id === selectedTicket)?.status || 'open')}`}>
                  {tickets.find(t => t.id === selectedTicket)?.status === 'open' ? 'Offen' : tickets.find(t => t.id === selectedTicket)?.status === 'in-progress' ? 'In Bearbeitung' : tickets.find(t => t.id === selectedTicket)?.status === 'resolved' ? 'Gelöst' : 'Geschlossen'}
                </span>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300">
                {tickets.find(t => t.id === selectedTicket)?.description}
              </p>
              
              <div className="border-t dark:border-gray-600 pt-4">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Kommentare
                </h3>
                <div className="space-y-3">
                  {getTicketComments(selectedTicket).map(comment => (
                    <div key={comment.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-gray-800 dark:text-gray-200">
                          {comment.author}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {comment.createdAt}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        {comment.content}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 h-24 resize-none"
                    placeholder="Neuer Kommentar..."
                  />
                  <Button
                    onClick={async () => {
                      await addComment()
                    }}
                    variant="small"
                    className="bg-blue-600 hover:bg-blue-700 hover:ring-blue-500 mt-2"
                    disabled={!newComment.trim()}
                  >
                    Kommentar hinzufügen
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
