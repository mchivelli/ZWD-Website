import { useState } from 'react'
import { Button } from '@/components/ui/stateful-button'
import { useAuth } from '@/contexts/AuthContext'
import { IconPlus, IconCheck, IconX, IconHeart, IconShoppingCart, IconUser, IconCalendar, IconEye } from '@tabler/icons-react'

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
  isNew?: boolean
  viewedBy: Record<string, string> // userId -> timestamp
}

export default function Wishlist() {
  const { user } = useAuth()
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
      fulfilledAt: '2024-07-15',
      isNew: false,
      viewedBy: { [user?.id || '']: '2024-07-15T10:00:00' }
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
      createdAt: '2024-07-05',
      isNew: true,
      viewedBy: {}
    },
    {
      id: '3',
      title: 'Tischkicker für Pausenraum',
      description: 'Ein Tischkicker würde die Pausen viel unterhaltsamer machen',
      category: 'Freizeit',
      author: 'Tom Weber',
      upvotes: 12,
      hasUserVoted: false,
      status: 'pending',
      estimatedCost: '400-600€',
      createdAt: '2024-07-10',
      isNew: true,
      viewedBy: {}
    },
    {
      id: '4',
      title: 'Pflanzen für das Büro',
      description: 'Einige Grünpflanzen würden die Arbeitsatmosphäre verbessern',
      category: 'Büro',
      author: 'Anna Müller',
      upvotes: 8,
      hasUserVoted: false,
      status: 'approved',
      estimatedCost: '50-100€',
      createdAt: '2024-07-12',
      isNew: false,
      viewedBy: { [user?.id || '']: '2024-07-12T14:00:00' }
    },
    {
      id: '5',
      title: 'Besseres WLAN',
      description: 'Das aktuelle WLAN ist zu langsam für unsere Bedürfnisse',
      category: 'Technik',
      author: 'Sarah Klein',
      upvotes: 25,
      hasUserVoted: true,
      status: 'rejected',
      rejectedReason: 'Budget nicht verfügbar in diesem Jahr',
      createdAt: '2024-06-20',
      isNew: false,
      viewedBy: { [user?.id || '']: '2024-06-20T09:00:00' }
    }
  ])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('Alle')
  const [newWishlistItem, setNewWishlistItem] = useState({
    title: '',
    description: '',
    category: 'Büro',
    estimatedCost: ''
  })

  const categories = ['Alle', 'Küche', 'Büro', 'Freizeit', 'Technik', 'Transport', 'Sonstiges']
  const statuses = [
    { key: 'all', label: 'Alle' },
    { key: 'pending', label: 'Ausstehend' },
    { key: 'approved', label: 'Genehmigt' },
    { key: 'fulfilled', label: 'Erfüllt' },
    { key: 'rejected', label: 'Abgelehnt' }
  ]

  const handleCreateWishlistItem = async () => {
    if (newWishlistItem.title.trim() && newWishlistItem.description.trim()) {
      const wishlistItem: WishlistItem = {
        id: Date.now().toString(),
        title: newWishlistItem.title,
        description: newWishlistItem.description,
        category: newWishlistItem.category,
        author: user?.firstName + ' ' + user?.lastName || 'Unbekannt',
        upvotes: 0,
        hasUserVoted: false,
        status: 'pending',
        estimatedCost: newWishlistItem.estimatedCost,
        createdAt: new Date().toISOString().split('T')[0],
        isNew: true,
        viewedBy: { [user?.id || '']: new Date().toISOString() } // Creator has already viewed it
      }
      setWishlistItems([wishlistItem, ...wishlistItems])
      setNewWishlistItem({ title: '', description: '', category: 'Büro', estimatedCost: '' })
      setShowCreateForm(false)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }

  const markWishlistItemAsViewed = (itemId: string) => {
    if (!user) return
    
    setWishlistItems(prev => prev.map(item => 
      item.id === itemId 
        ? { 
            ...item, 
            isNew: false,
            viewedBy: { ...item.viewedBy, [user.id]: new Date().toISOString() }
          }
        : item
    ))
  }

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

  const isWishlistItemNew = (item: WishlistItem) => {
    if (!user) return false
    const lastViewed = item.viewedBy[user.id]
    return item.isNew && !lastViewed
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

  const filteredItems = wishlistItems
    .filter(item => statusFilter === 'all' || item.status === statusFilter)
    .filter(item => categoryFilter === 'Alle' || item.category === categoryFilter)

  const sortedItems = filteredItems.sort((a, b) => {
    // Sort new items first
    const aIsNew = isWishlistItemNew(a)
    const bIsNew = isWishlistItemNew(b)
    
    if (aIsNew !== bIsNew) {
      return aIsNew ? -1 : 1
    }
    
    // Then sort by votes
    return b.upvotes - a.upvotes
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Wunschliste
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Schlage Verbesserungen vor und stimme für die besten Ideen ab
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
          Wunsch hinzufügen
        </Button>
      </div>

      {/* Create Wishlist Item Form */}
      {showCreateForm && (
        <div className="p-6 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Neuen Wunsch hinzufügen
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Titel
              </label>
              <input
                type="text"
                value={newWishlistItem.title}
                onChange={(e) => setNewWishlistItem({...newWishlistItem, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                placeholder="Was wünschst du dir?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Kategorie
              </label>
              <select
                value={newWishlistItem.category}
                onChange={(e) => setNewWishlistItem({...newWishlistItem, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              >
                {categories.filter(cat => cat !== 'Alle').map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Geschätzte Kosten (optional)
              </label>
              <input
                type="text"
                value={newWishlistItem.estimatedCost}
                onChange={(e) => setNewWishlistItem({...newWishlistItem, estimatedCost: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                placeholder="z.B. 100-200€"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Beschreibung
              </label>
              <textarea
                value={newWishlistItem.description}
                onChange={(e) => setNewWishlistItem({...newWishlistItem, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 h-32 resize-none"
                placeholder="Warum ist das wichtig? Wie würde es helfen?"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={async () => {
                  await handleCreateWishlistItem()
                }}
                variant="small"
                className="bg-green-600 hover:bg-green-700 hover:ring-green-500"
                disabled={!newWishlistItem.title || !newWishlistItem.description}
              >
                Wunsch hinzufügen
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

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Status:</span>
          {statuses.map(status => (
            <button
              key={status.key}
              onClick={() => setStatusFilter(status.key)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                statusFilter === status.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-gray-200 dark:border-gray-600'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Kategorie:</span>
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
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Wishlist Items */}
      <div className="space-y-4">
        {sortedItems.map(item => (
          <div 
            key={item.id} 
            className="p-6 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => markWishlistItemAsViewed(item.id)}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {item.title}
                  </h3>
                  {isWishlistItemNew(item) && (
                    <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">NEU</span>
                  )}
                  <span className={`px-2 py-1 rounded text-xs ${getStatusColor(item.status)}`}>
                    {getStatusLabel(item.status)}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                    {item.category}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{item.description}</p>
                
                                 <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-2">
                   <span>Von: {item.author}</span>
                   <span>{item.createdAt}</span>
                  {item.estimatedCost && (
                    <span>Kosten: {item.estimatedCost}</span>
                  )}
                  {Object.keys(item.viewedBy).length > 0 && (
                    <span className="flex items-center gap-1">
                      <IconEye className="h-4 w-4" />
                      Gesehen von: {Object.keys(item.viewedBy).length} Person(en)
                    </span>
                  )}
                </div>

                {item.status === 'fulfilled' && item.fulfilledAt && (
                  <div className="text-sm text-green-600 dark:text-green-400 mb-2">
                    <IconCheck className="h-4 w-4 inline mr-1" />
                    Erfüllt am: {item.fulfilledAt}
                  </div>
                )}

                {item.status === 'rejected' && item.rejectedReason && (
                  <div className="text-sm text-red-600 dark:text-red-400 mb-2">
                    <IconX className="h-4 w-4 inline mr-1" />
                    Grund der Ablehnung: {item.rejectedReason}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleVote(item.id)
                  }}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
                    item.hasUserVoted
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 hover:bg-red-500 hover:text-white'
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
