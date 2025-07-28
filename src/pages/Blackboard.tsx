import { useState } from 'react'
import { Button } from '@/components/ui/stateful-button'
import { useAuth } from '@/contexts/AuthContext'
import { IconPlus, IconThumbUp, IconThumbDown, IconEdit, IconTrash, IconTag, IconEye } from '@tabler/icons-react'

interface Entry {
  id: string
  title: string
  content: string
  author: string
  category: string
  upvotes: number
  downvotes: number
  hasUserVoted: 'up' | 'down' | null
  createdAt: string
  isNew?: boolean
  viewedBy: Record<string, string> // userId -> timestamp
}

export default function Blackboard() {
  const { user } = useAuth()
  const [entries, setEntries] = useState<Entry[]>([
    {
      id: '1',
      title: 'Neuer Kaffeeautomat verfügbar',
      content: 'Ab sofort steht ein neuer Kaffeeautomat im 2. Stock zur Verfügung. Bitte bringt euer eigenes Geld mit!',
      author: 'Admin',
      category: 'Ankündigungen',
      upvotes: 5,
      downvotes: 0,
      hasUserVoted: null,
      createdAt: '2024-07-25',
      isNew: true,
      viewedBy: {}
    },
    {
      id: '2',
      title: 'Sommerfest Organisation',
      content: 'Wer hat Lust bei der Organisation des Sommerfests zu helfen? Wir treffen uns Freitag um 15:00 im Konferenzraum.',
      author: 'Lisa Schmidt',
      category: 'Events',
      upvotes: 8,
      downvotes: 1,
      hasUserVoted: 'up',
      createdAt: '2024-07-24',
      isNew: false,
      viewedBy: { [user?.id || '']: '2024-07-24T10:00:00' }
    },
    {
      id: '3',
      title: 'Verlorenes Handy',
      content: 'Hat jemand ein schwarzes iPhone 13 gesehen? Wurde heute Morgen im Pausenraum vergessen.',
      author: 'Tom Weber',
      category: 'Fundstücke',
      upvotes: 2,
      downvotes: 0,
      hasUserVoted: null,
      createdAt: '2024-07-23',
      isNew: true,
      viewedBy: {}
    },
    {
      id: '4',
      title: 'Mitfahrgelegenheit nach München',
      content: 'Fahre morgen nach München und habe noch 2 Plätze frei. Abfahrt um 14:00 vom Parkplatz.',
      author: 'Max Mustermann',
      category: 'Transport',
      upvotes: 4,
      downvotes: 0,
      hasUserVoted: null,
      createdAt: '2024-07-22',
      isNew: false,
      viewedBy: { [user?.id || '']: '2024-07-22T16:00:00' }
    }
  ])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    category: 'Allgemein'
  })
  const [categoryFilter, setCategoryFilter] = useState('Alle')

  const categories = ['Alle', 'Ankündigungen', 'Events', 'Fundstücke', 'Transport', 'Allgemein']

  const handleCreateEntry = async () => {
    if (newEntry.title.trim() && newEntry.content.trim()) {
      const entry: Entry = {
        id: Date.now().toString(),
        title: newEntry.title,
        content: newEntry.content,
        author: user?.firstName + ' ' + user?.lastName || 'Unbekannt',
        category: newEntry.category,
        upvotes: 0,
        downvotes: 0,
        hasUserVoted: null,
        createdAt: new Date().toISOString().split('T')[0],
        isNew: true,
        viewedBy: { [user?.id || '']: new Date().toISOString() } // Creator has already viewed it
      }
      setEntries([entry, ...entries])
      setNewEntry({ title: '', content: '', category: 'Allgemein' })
      setShowCreateForm(false)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }

  const markEntryAsViewed = (entryId: string) => {
    if (!user) return
    
    setEntries(prev => prev.map(entry => 
      entry.id === entryId 
        ? { 
            ...entry, 
            isNew: false,
            viewedBy: { ...entry.viewedBy, [user.id]: new Date().toISOString() }
          }
        : entry
    ))
  }

  const handleVote = (id: string, type: 'up' | 'down') => {
    setEntries(entries.map(entry => {
             if (entry.id === id) {
         let newUpvotes = entry.upvotes
         let newDownvotes = entry.downvotes
         let newVoteState: 'up' | 'down' | null = type

         // Remove previous vote if exists
         if (entry.hasUserVoted === 'up') {
           newUpvotes--
         } else if (entry.hasUserVoted === 'down') {
           newDownvotes--
         }

         // Add new vote or remove if voting the same
         if (entry.hasUserVoted === type) {
           newVoteState = null
         } else if (type === 'up') {
           newUpvotes++
         } else {
           newDownvotes++
         }

         return {
           ...entry,
           upvotes: newUpvotes,
           downvotes: newDownvotes,
           hasUserVoted: newVoteState
         }
      }
      return entry
    }))
  }

  const isEntryNew = (entry: Entry) => {
    if (!user) return false
    const lastViewed = entry.viewedBy[user.id]
    return entry.isNew && !lastViewed
  }

  const filteredEntries = categoryFilter === 'Alle'
    ? entries
    : entries.filter(entry => entry.category === categoryFilter)

  const sortedEntries = filteredEntries.sort((a, b) => {
    // Sort new entries first
    const aIsNew = isEntryNew(a)
    const bIsNew = isEntryNew(b)
    
    if (aIsNew !== bIsNew) {
      return aIsNew ? -1 : 1
    }
    
    // Then sort by date
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Schwarzes Brett
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Teile Informationen und Ankündigungen mit der Gemeinschaft
          </p>
        </div>
        <Button
          onClick={async () => {
            setShowCreateForm(!showCreateForm)
            // Simulate quick action
            await new Promise(resolve => setTimeout(resolve, 300))
          }}
          variant="small"
          className="bg-blue-600 hover:bg-blue-700 hover:ring-blue-500"
        >
          <IconPlus className="h-4 w-4 mr-2" />
          Neuer Eintrag
        </Button>
      </div>

      {/* Create Entry Form */}
      {showCreateForm && (
        <div className="p-6 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Neuen Eintrag erstellen
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Titel
              </label>
              <input
                type="text"
                value={newEntry.title}
                onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                placeholder="Titel eingeben..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Kategorie
              </label>
              <select
                value={newEntry.category}
                onChange={(e) => setNewEntry({...newEntry, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              >
                {categories.filter(cat => cat !== 'Alle').map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Inhalt
              </label>
              <textarea
                value={newEntry.content}
                onChange={(e) => setNewEntry({...newEntry, content: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 h-32 resize-none"
                placeholder="Inhalt eingeben..."
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={async () => {
                  await handleCreateEntry()
                }}
                variant="small"
                className="bg-green-600 hover:bg-green-700 hover:ring-green-500"
                disabled={!newEntry.title || !newEntry.content}
              >
                Veröffentlichen
              </Button>
              <button
                onClick={() => {
                  setShowCreateForm(false)
                  setNewEntry({ title: '', content: '', category: 'Allgemein' })
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setCategoryFilter(category)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              categoryFilter === category
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-gray-200 dark:border-gray-600'
            }`}
          >
            <IconTag className="h-3 w-3 inline mr-1" />
            {category}
          </button>
        ))}
      </div>

      {/* Entries List */}
      <div className="space-y-4">
        {sortedEntries.map(entry => (
          <div 
            key={entry.id} 
            className="p-6 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => markEntryAsViewed(entry.id)}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {entry.title}
                  </h3>
                  {isEntryNew(entry) && (
                    <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">NEU</span>
                  )}
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                    {entry.category}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{entry.content}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                  <span>Von: {entry.author}</span>
                  <span>{entry.createdAt}</span>
                  {Object.keys(entry.viewedBy).length > 0 && (
                    <span className="flex items-center gap-1">
                      <IconEye className="h-4 w-4" />
                      Gesehen von: {Object.keys(entry.viewedBy).length} Person(en)
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleVote(entry.id, 'up')
                  }}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
                    entry.hasUserVoted === 'up'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 hover:bg-green-500 hover:text-white'
                  }`}
                >
                  <IconThumbUp className="h-4 w-4" />
                  {entry.upvotes}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleVote(entry.id, 'down')
                  }}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
                    entry.hasUserVoted === 'down'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 hover:bg-red-500 hover:text-white'
                  }`}
                >
                  <IconThumbDown className="h-4 w-4" />
                  {entry.downvotes}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
