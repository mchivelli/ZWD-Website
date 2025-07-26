import { useState } from 'react'
import { IconPlus, IconThumbUp, IconThumbDown, IconEdit, IconTrash, IconTag } from '@tabler/icons-react'

interface BlackboardEntry {
  id: string
  title: string
  content: string
  author: string
  category: string
  upvotes: number
  downvotes: number
  createdAt: string
  hasUserVoted: 'up' | 'down' | null
}

export default function Blackboard() {
  const [entries, setEntries] = useState<BlackboardEntry[]>([
    {
      id: '1',
      title: 'Neue Kaffeemaschine in der Küche',
      content: 'Die neue Kaffeemaschine ist jetzt einsatzbereit. Bitte beachtet die Bedienungsanleitung für die richtige Verwendung.',
      author: 'Max Mustermann',
      category: 'Küche',
      upvotes: 12,
      downvotes: 1,
      createdAt: 'vor 2 Stunden',
      hasUserVoted: null
    },
    {
      id: '2',
      title: 'Wartungsarbeiten am Samstag',
      content: 'Am Samstag, den 27. Juli, finden Wartungsarbeiten am Heizungssystem statt. Das Gebäude wird zwischen 8:00 und 12:00 Uhr nicht zugänglich sein.',
      author: 'Admin',
      category: 'Wartung',
      upvotes: 8,
      downvotes: 0,
      createdAt: 'vor 1 Tag',
      hasUserVoted: 'up'
    },
    {
      id: '3',
      title: 'Grillabend nächste Woche',
      content: 'Wir organisieren einen Grillabend am Freitag, den 2. August. Alle sind herzlich eingeladen! Bitte meldet euch bis Mittwoch an.',
      author: 'Lisa Schmidt',
      category: 'Veranstaltung',
      upvotes: 15,
      downvotes: 2,
      createdAt: 'vor 2 Tagen',
      hasUserVoted: null
    }
  ])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('Alle')
  const [newEntry, setNewEntry] = useState({ title: '', content: '', category: 'Allgemein' })

  const categories = ['Alle', 'Küche', 'Wartung', 'Veranstaltung', 'Allgemein', 'Informationen']

  const handleVote = (id: string, voteType: 'up' | 'down') => {
    setEntries(entries.map(entry => {
      if (entry.id === id) {
        let newUpvotes = entry.upvotes
        let newDownvotes = entry.downvotes
        let newHasUserVoted = entry.hasUserVoted

        if (entry.hasUserVoted === voteType) {
          // Remove vote
          if (voteType === 'up') newUpvotes--
          else newDownvotes--
          newHasUserVoted = null
        } else {
          // Add or change vote
          if (entry.hasUserVoted === 'up') newUpvotes--
          else if (entry.hasUserVoted === 'down') newDownvotes--
          
          if (voteType === 'up') newUpvotes++
          else newDownvotes++
          newHasUserVoted = voteType
        }

        return { ...entry, upvotes: newUpvotes, downvotes: newDownvotes, hasUserVoted: newHasUserVoted }
      }
      return entry
    }))
  }

  const handleCreateEntry = () => {
    if (newEntry.title.trim() && newEntry.content.trim()) {
      const entry: BlackboardEntry = {
        id: Date.now().toString(),
        title: newEntry.title,
        content: newEntry.content,
        author: 'Du',
        category: newEntry.category,
        upvotes: 0,
        downvotes: 0,
        createdAt: 'gerade eben',
        hasUserVoted: null
      }
      setEntries([entry, ...entries])
      setNewEntry({ title: '', content: '', category: 'Allgemein' })
      setShowCreateForm(false)
    }
  }

  const filteredEntries = selectedCategory === 'Alle' 
    ? entries 
    : entries.filter(entry => entry.category === selectedCategory)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
            Schwarzes Brett
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Teile Informationen und Ankündigungen mit der Gemeinschaft
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <IconPlus className="h-4 w-4" />
          Neuer Eintrag
        </button>
      </div>

      {/* Create Entry Form */}
      {showCreateForm && (
        <div className="p-6 rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
            Neuen Eintrag erstellen
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Titel
              </label>
              <input
                type="text"
                value={newEntry.title}
                onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200"
                placeholder="Titel eingeben..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Kategorie
              </label>
              <select
                value={newEntry.category}
                onChange={(e) => setNewEntry({...newEntry, category: e.target.value})}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200"
              >
                {categories.filter(cat => cat !== 'Alle').map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Inhalt
              </label>
              <textarea
                value={newEntry.content}
                onChange={(e) => setNewEntry({...newEntry, content: e.target.value})}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 h-32 resize-none"
                placeholder="Inhalt eingeben..."
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCreateEntry}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Veröffentlichen
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

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600'
            }`}
          >
            <IconTag className="h-4 w-4 inline mr-1" />
            {category}
          </button>
        ))}
      </div>

      {/* Entries List */}
      <div className="space-y-4">
        {filteredEntries.map(entry => (
          <div key={entry.id} className="p-6 rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                  {entry.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                  <span>von {entry.author}</span>
                  <span>{entry.createdAt}</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                    {entry.category}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300">
                  <IconEdit className="h-4 w-4" />
                </button>
                <button className="text-neutral-400 hover:text-red-600 dark:hover:text-red-400">
                  <IconTrash className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <p className="text-neutral-700 dark:text-neutral-300 mb-4">
              {entry.content}
            </p>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleVote(entry.id, 'up')}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
                  entry.hasUserVoted === 'up'
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                    : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-green-50 dark:hover:bg-green-900/50'
                }`}
              >
                <IconThumbUp className="h-4 w-4" />
                {entry.upvotes}
              </button>
              <button
                onClick={() => handleVote(entry.id, 'down')}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
                  entry.hasUserVoted === 'down'
                    ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-red-50 dark:hover:bg-red-900/50'
                }`}
              >
                <IconThumbDown className="h-4 w-4" />
                {entry.downvotes}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
