import { useState } from 'react'
import { IconPlus, IconCheck, IconX, IconHeart, IconShoppingCart, IconUser, IconCalendar } from '@tabler/icons-react'

interface WishlistItem {
  id: string
  title: string
  description: string
  category: string
  author: string
  upvotes: number
  hasUserVoted: boolean
  status: 'pending' | 'approved' | 'fulfilled' | 'rejected'
  estimatedCost?: string
  createdAt: string
  fulfilledAt?: string
  rejectedReason?: string
}

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: '1',
      title: 'Neue Kaffeemaschine',
      description: 'Eine bessere Kaffeemaschine für die Küche, die mehr Tassen gleichzeitig zubereiten kann',
      category: 'Küche',
      author: 'Max Mustermann',
      upvotes: 23,
      hasUserVoted: true,
      status: 'fulfilled',
      estimatedCost: '300-500€',
      createdAt: '2024-07-01',
      fulfilledAt: '2024-07-15'
    },
    {
      id: '2',
      title: 'Ergonomische Bürostühle',
      description: 'Bessere Bürostühle für den Arbeitsplatz, die den Rücken entlasten',
      category: 'Büro',
      author: 'Lisa Schmidt',
      upvotes: 18,
      hasUserVoted: false,
      status: 'approved',
      estimatedCost: '150-250€ pro Stuhl',
      createdAt: '2024-07-05'
    },
    {
      id: '3',
      title: 'Tischkicker für Pausenraum',
      description: 'Ein Tischkicker würde die Pausen viel unterhaltsamer machen',
      category: 'Freizeit',
      author: 'Tom Weber',
      upvotes: 15,
      hasUserVoted: true,
      status: 'pending',
      estimatedCost: '400-600€',
      createdAt: '2024-07-10'
    },
    {
      id: '4',
      title: 'Bessere Beleuchtung',
      description: 'LED-Lampen für bessere Beleuchtung in den Arbeitsräumen',
      category: 'Büro',
      author: 'Anna Müller',
      upvotes: 12,
      hasUserVoted: false,
      status: 'pending',
      estimatedCost: '100-200€',
      createdAt: '2024-07-12'
    },
    {
      id: '5',
      title: 'Klimaanlage',
      description: 'Eine Klimaanlage für die heißen Sommertage',
      category: 'Komfort',
      author: 'Sarah Klein',
      upvotes: 8,
      hasUserVoted: false,
      status: 'rejected',
      estimatedCost: '2000-3000€',
      createdAt: '2024-07-08',
      rejectedReason: 'Budget zu hoch für dieses Jahr'
    }
  ])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newWishlistItem, setNewWishlistItem] = useState({
    title: '',
    description: '',
    category: 'Allgemein',
    estimatedCost: ''
  })
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'fulfilled' | 'rejected'>('all')

  const categories = ['Allgemein', 'Küche', 'Büro', 'Freizeit', 'Komfort', 'Technik']

  const handleVote = (id: string) => {
    setWishlistItems(wishlistItems.map(item => {
      if (item.id === id) {
        if (item.hasUserVoted) {
          return { ...item, upvotes: item.upvotes - 1, hasUserVoted: false }
        } else {
          return { ...item, upvotes: item.upvotes + 1, hasUserVoted: true }
        }
      }
      return item
    }))
  }

  const handleCreateWishlistItem = () => {
    if (newWishlistItem.title.trim() && newWishlistItem.description.trim()) {
      const wishlistItem: WishlistItem = {
        id: Date.now().toString(),
        title: newWishlistItem.title,
        description: newWishlistItem.description,
        category: newWishlistItem.category,
        author: 'Du',
        upvotes: 0,
        hasUserVoted: false,
        status: 'pending',
        estimatedCost: newWishlistItem.estimatedCost || undefined,
        createdAt: new Date().toISOString().split('T')[0]
      }
      setWishlistItems([wishlistItem, ...wishlistItems])
      setNewWishlistItem({ title: '', description: '', category: 'Allgemein', estimatedCost: '' })
      setShowCreateForm(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'approved': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'fulfilled': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Ausstehend'
      case 'approved': return 'Genehmigt'
      case 'fulfilled': return 'Erfüllt'
      case 'rejected': return 'Abgelehnt'
      default: return status
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Küche': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      case 'Büro': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Freizeit': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'Komfort': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Technik': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      default: return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200'
    }
  }

  const filteredItems = statusFilter === 'all' 
    ? wishlistItems 
    : wishlistItems.filter(item => item.status === statusFilter)

  const sortedItems = filteredItems.sort((a, b) => {
    // Sort by status priority first, then by upvotes
    const statusPriority = { 'pending': 1, 'approved': 2, 'fulfilled': 3, 'rejected': 4 }
    const statusDiff = statusPriority[a.status] - statusPriority[b.status]
    if (statusDiff !== 0) return statusDiff
    return b.upvotes - a.upvotes
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
            Wunschliste
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Schlage Verbesserungen vor und stimme für die besten Ideen ab
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <IconPlus className="h-4 w-4" />
          Wunsch hinzufügen
        </button>
      </div>

      {/* Create Wishlist Item Form */}
      {showCreateForm && (
        <div className="p-6 rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
            Neuen Wunsch hinzufügen
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Titel
              </label>
              <input
                type="text"
                value={newWishlistItem.title}
                onChange={(e) => setNewWishlistItem({...newWishlistItem, title: e.target.value})}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200"
                placeholder="Was wünschst du dir?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Beschreibung
              </label>
              <textarea
                value={newWishlistItem.description}
                onChange={(e) => setNewWishlistItem({...newWishlistItem, description: e.target.value})}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 h-24 resize-none"
                placeholder="Beschreibe deinen Wunsch detailliert..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Kategorie
                </label>
                <select
                  value={newWishlistItem.category}
                  onChange={(e) => setNewWishlistItem({...newWishlistItem, category: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Geschätzte Kosten (optional)
                </label>
                <input
                  type="text"
                  value={newWishlistItem.estimatedCost}
                  onChange={(e) => setNewWishlistItem({...newWishlistItem, estimatedCost: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200"
                  placeholder="z.B. 100-200€"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCreateWishlistItem}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Wunsch hinzufügen
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
          { key: 'pending', label: 'Ausstehend' },
          { key: 'approved', label: 'Genehmigt' },
          { key: 'fulfilled', label: 'Erfüllt' },
          { key: 'rejected', label: 'Abgelehnt' }
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

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Ausstehend', count: wishlistItems.filter(item => item.status === 'pending').length, color: 'bg-yellow-100 dark:bg-yellow-900' },
          { label: 'Genehmigt', count: wishlistItems.filter(item => item.status === 'approved').length, color: 'bg-blue-100 dark:bg-blue-900' },
          { label: 'Erfüllt', count: wishlistItems.filter(item => item.status === 'fulfilled').length, color: 'bg-green-100 dark:bg-green-900' },
          { label: 'Abgelehnt', count: wishlistItems.filter(item => item.status === 'rejected').length, color: 'bg-red-100 dark:bg-red-900' }
        ].map(stat => (
          <div key={stat.label} className={`p-4 rounded-lg ${stat.color}`}>
            <div className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{stat.count}</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Wishlist Items */}
      <div className="space-y-4">
        {sortedItems.map(item => (
          <div key={item.id} className="p-6 rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                  {item.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                  {item.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                  <span className="flex items-center gap-1">
                    <IconUser className="h-4 w-4" />
                    {item.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <IconCalendar className="h-4 w-4" />
                    {new Date(item.createdAt).toLocaleDateString('de-DE')}
                  </span>
                  {item.estimatedCost && (
                    <span className="flex items-center gap-1">
                      <IconShoppingCart className="h-4 w-4" />
                      {item.estimatedCost}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs ${getStatusColor(item.status)}`}>
                    {getStatusLabel(item.status)}
                  </span>
                </div>
                {item.status === 'fulfilled' && item.fulfilledAt && (
                  <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                    <IconCheck className="h-4 w-4" />
                    Erfüllt am {new Date(item.fulfilledAt).toLocaleDateString('de-DE')}
                  </div>
                )}
                {item.status === 'rejected' && item.rejectedReason && (
                  <div className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400">
                    <IconX className="h-4 w-4" />
                    Grund: {item.rejectedReason}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleVote(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    item.hasUserVoted
                      ? 'bg-red-600 text-white'
                      : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-red-50 dark:hover:bg-red-900/20'
                  }`}
                  disabled={item.status === 'fulfilled' || item.status === 'rejected'}
                >
                  <IconHeart className="h-4 w-4" />
                  {item.upvotes}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
