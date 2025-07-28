import { useState } from 'react'
import { Button } from '@/components/ui/stateful-button'
import { useAuth } from '@/contexts/AuthContext'
import { IconPlus, IconThumbUp, IconThumbDown, IconStar, IconLeaf, IconAlertCircle, IconCalendar, IconEye, IconChefHat, IconCurrencyEuro, IconCreditCard, IconCheck, IconEdit } from '@tabler/icons-react'

interface FoodItem {
  id: string
  name: string
  description: string
  author: string
  votes: number
  hasUserVoted: boolean
  dietaryTags: string[]
  createdAt: string
  plannedFor?: string
  isNew?: boolean
  viewedBy: Record<string, string> // userId -> timestamp
}

interface CookingAssignment {
  day: string
  foodItem: FoodItem | null
  cook?: string
  costPerPerson?: number
  iban?: string
  hasPaid?: Record<string, boolean> // userId -> paid status
}

interface WeeklyPlan {
  [day: string]: CookingAssignment
}

export default function FoodVotes() {
  const { user, users } = useAuth()
  const [foodItems, setFoodItems] = useState<FoodItem[]>([
    {
      id: '1',
      name: 'Spaghetti Carbonara',
      description: 'Klassische italienische Pasta mit Ei, Speck und Parmesan',
      author: 'Max Mustermann',
      votes: 15,
      hasUserVoted: true,
      dietaryTags: ['Fleisch'],
      createdAt: '2024-07-20',
      plannedFor: '2024-07-26',
      isNew: false,
      viewedBy: { [user?.id || '']: '2024-07-20T10:00:00' }
    },
    {
      id: '2',
      name: 'Vegetarische Lasagne',
      description: 'Leckere Lasagne mit Gemüse und Béchamel-Sauce',
      author: 'Lisa Schmidt',
      votes: 12,
      hasUserVoted: false,
      dietaryTags: ['Vegetarisch'],
      createdAt: '2024-07-21',
      isNew: true,
      viewedBy: {}
    },
    {
      id: '3',
      name: 'Asiatisches Curry',
      description: 'Würziges Curry mit Gemüse und Kokosmilch',
      author: 'Tom Weber',
      votes: 8,
      hasUserVoted: false,
      dietaryTags: ['Vegan', 'Scharf'],
      createdAt: '2024-07-22',
      isNew: true,
      viewedBy: {}
    },
    {
      id: '4',
      name: 'Schweinebraten mit Knödel',
      description: 'Traditioneller Schweinebraten mit Semmelknödeln',
      author: 'Anna Müller',
      votes: 6,
      hasUserVoted: false,
      dietaryTags: ['Fleisch'],
      createdAt: '2024-07-23',
      isNew: false,
      viewedBy: { [user?.id || '']: '2024-07-23T14:00:00' }
    },
    {
      id: '5',
      name: 'Quinoa Salat',
      description: 'Frischer Quinoa-Salat mit Gemüse und Kräutern',
      author: 'Sarah Klein',
      votes: 10,
      hasUserVoted: false,
      dietaryTags: ['Vegan', 'Glutenfrei'],
      createdAt: '2024-07-24',
      isNew: true,
      viewedBy: {}
    }
  ])

  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan>({
    'Montag': { 
      day: 'Montag',
      foodItem: foodItems.find(item => item.id === '1') || null,
      cook: 'Max Mustermann',
      costPerPerson: 8.50,
      iban: 'DE89 3704 0044 0532 0130 00',
      hasPaid: {}
    },
    'Dienstag': { day: 'Dienstag', foodItem: null },
    'Mittwoch': { day: 'Mittwoch', foodItem: null },
    'Donnerstag': { day: 'Donnerstag', foodItem: null },
    'Freitag': { day: 'Freitag', foodItem: null }
  })

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingDay, setEditingDay] = useState<string | null>(null)
  const [newFoodItem, setNewFoodItem] = useState({
    name: '',
    description: '',
    dietaryTags: [] as string[]
  })
  const [filterTag, setFilterTag] = useState('Alle')

  const dietaryOptions = ['Vegetarisch', 'Vegan', 'Glutenfrei', 'Fleisch', 'Scharf', 'Süß']
  const allTags = ['Alle', ...dietaryOptions]

  const handleVote = (id: string) => {
    setFoodItems(foodItems.map(item => {
      if (item.id === id) {
        if (item.hasUserVoted) {
          return { ...item, votes: item.votes - 1, hasUserVoted: false }
        } else {
          return { ...item, votes: item.votes + 1, hasUserVoted: true }
        }
      }
      return item
    }))
  }

  const handleCreateFoodItem = async () => {
    if (newFoodItem.name.trim() && newFoodItem.description.trim()) {
      const foodItem: FoodItem = {
        id: Date.now().toString(),
        name: newFoodItem.name,
        description: newFoodItem.description,
        author: user?.firstName + ' ' + user?.lastName || 'Unbekannt',
        votes: 0,
        hasUserVoted: false,
        dietaryTags: newFoodItem.dietaryTags,
        createdAt: new Date().toISOString().split('T')[0],
        isNew: true,
        viewedBy: { [user?.id || '']: new Date().toISOString() } // Creator has already viewed it
      }
      setFoodItems([foodItem, ...foodItems])
      setNewFoodItem({ name: '', description: '', dietaryTags: [] })
      setShowCreateForm(false)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }

  const markFoodItemAsViewed = (itemId: string) => {
    if (!user) return
    
    setFoodItems(prev => prev.map(item => 
      item.id === itemId 
        ? { 
            ...item, 
            isNew: false,
            viewedBy: { ...item.viewedBy, [user.id]: new Date().toISOString() }
          }
        : item
    ))
  }

  const handleDietaryTagToggle = (tag: string) => {
    setNewFoodItem(prev => ({
      ...prev,
      dietaryTags: prev.dietaryTags.includes(tag)
        ? prev.dietaryTags.filter(t => t !== tag)
        : [...prev.dietaryTags, tag]
    }))
  }

  const planMeal = (day: string, foodItem: FoodItem) => {
    setWeeklyPlan(prev => ({ 
      ...prev, 
      [day]: { 
        day,
        foodItem,
        cook: prev[day]?.cook,
        costPerPerson: prev[day]?.costPerPerson,
        iban: prev[day]?.iban,
        hasPaid: prev[day]?.hasPaid || {}
      }
    }))
    setFoodItems(prev => prev.map(item =>
      item.id === foodItem.id
        ? { ...item, plannedFor: new Date().toISOString().split('T')[0] }
        : item
    ))
  }

  const removePlannedMeal = (day: string) => {
    const plannedItem = weeklyPlan[day]?.foodItem
    if (plannedItem) {
      setFoodItems(prev => prev.map(item =>
        item.id === plannedItem.id
          ? { ...item, plannedFor: undefined }
          : item
      ))
    }
    setWeeklyPlan(prev => ({ 
      ...prev, 
      [day]: { day, foodItem: null }
    }))
  }

  const updateCookingDetails = async (day: string, cook: string, costPerPerson: number, iban: string) => {
    setWeeklyPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        cook,
        costPerPerson,
        iban,
        hasPaid: prev[day]?.hasPaid || {}
      }
    }))
    setEditingDay(null)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  const markAsPaid = (day: string) => {
    if (!user) return
    
    setWeeklyPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        hasPaid: {
          ...prev[day]?.hasPaid,
          [user.id]: true
        }
      }
    }))
  }

  const getDietaryTagColor = (tag: string) => {
    switch (tag) {
      case 'Vegetarisch': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Vegan': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
      case 'Glutenfrei': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Fleisch': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'Scharf': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      case 'Süß': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const isFoodItemNew = (item: FoodItem) => {
    if (!user) return false
    const lastViewed = item.viewedBy[user.id]
    return item.isNew && !lastViewed
  }

  const filteredFoodItems = filterTag === 'Alle'
    ? foodItems
    : foodItems.filter(item => item.dietaryTags.includes(filterTag))

  const sortedFoodItems = filteredFoodItems.sort((a, b) => {
    // Sort new items first
    const aIsNew = isFoodItemNew(a)
    const bIsNew = isFoodItemNew(b)
    
    if (aIsNew !== bIsNew) {
      return aIsNew ? -1 : 1
    }
    
    // Then sort by votes
    return b.votes - a.votes
  })

  const CookingDetailsForm = ({ day, assignment }: { day: string, assignment: CookingAssignment }) => {
    const [cook, setCook] = useState(assignment.cook || '')
    const [cost, setCost] = useState(assignment.costPerPerson?.toString() || '')
    const [iban, setIban] = useState(assignment.iban || '')

    return (
      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Koch-Details bearbeiten</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Koch/Köchin
            </label>
            <select
              value={cook}
              onChange={(e) => setCook(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 text-sm"
            >
              <option value="">Koch auswählen...</option>
              {users.map(user => (
                <option key={user.id} value={user.firstName + ' ' + user.lastName}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Kosten pro Person (€)
            </label>
            <input
              type="number"
              step="0.50"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 text-sm"
              placeholder="z.B. 8.50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              IBAN für Überweisung
            </label>
            <input
              type="text"
              value={iban}
              onChange={(e) => setIban(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 text-sm"
              placeholder="DE89 3704 0044 0532 0130 00"
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={async () => {
                if (cook && cost && iban) {
                  await updateCookingDetails(day, cook, parseFloat(cost), iban)
                }
              }}
              variant="small"
              className="bg-green-600 hover:bg-green-700 hover:ring-green-500"
              disabled={!cook || !cost || !iban}
            >
              <IconCheck className="h-4 w-4 mr-1" />
              Speichern
            </Button>
            <button
              onClick={() => setEditingDay(null)}
              className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Abbrechen
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Essen Abstimmung
          </h1>
          <p className="text-muted-foreground">
            Stimme für deine Lieblingsgerichte ab und plane die Woche
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
          Gericht vorschlagen
        </Button>
      </div>

      {/* Weekly Meal Planner - TOP POSITION */}
      <div className="p-6 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
          <IconCalendar className="h-6 w-6" />
          Wochenplaner
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {Object.entries(weeklyPlan).map(([day, assignment]) => (
            <div key={day} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">{day}</h3>
              {assignment.foodItem ? (
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300">{assignment.foodItem.name}</h4>
                  <div className="flex flex-wrap gap-1">
                    {assignment.foodItem.dietaryTags.map(tag => (
                      <span key={tag} className={`px-2 py-1 text-xs rounded ${getDietaryTagColor(tag)}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {assignment.cook && assignment.costPerPerson && assignment.iban ? (
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-1">
                          <IconChefHat className="h-4 w-4 text-green-600" />
                          <span className="font-medium">Koch:</span> {assignment.cook}
                        </div>
                        <div className="flex items-center gap-1">
                          <IconCurrencyEuro className="h-4 w-4 text-green-600" />
                          <span className="font-medium">Kosten:</span> {assignment.costPerPerson}€ pro Person
                        </div>
                        <div className="flex items-center gap-1">
                          <IconCreditCard className="h-4 w-4 text-green-600" />
                          <span className="font-medium">IBAN:</span> 
                          <span className="font-mono text-xs">{assignment.iban}</span>
                        </div>
                        
                        {user && assignment.hasPaid?.[user.id] ? (
                          <div className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-medium">
                            ✅ Bezahlt
                          </div>
                        ) : (
                          <Button
                            onClick={async () => {
                              markAsPaid(day)
                              await new Promise(resolve => setTimeout(resolve, 300))
                            }}
                            variant="small"
                            className="bg-green-600 hover:bg-green-700 hover:ring-green-500 w-full"
                          >
                            <IconCheck className="h-4 w-4 mr-1" />
                            Als bezahlt markieren
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded border border-orange-200 dark:border-orange-800">
                      <p className="text-orange-800 dark:text-orange-200 text-sm mb-2">
                        Koch-Details noch nicht festgelegt
                      </p>
                      <button
                        onClick={() => setEditingDay(day)}
                        className="text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-200 text-sm flex items-center gap-1"
                      >
                        <IconEdit className="h-4 w-4" />
                        Details hinzufügen
                      </button>
                    </div>
                  )}
                  
                  {editingDay === day && (
                    <CookingDetailsForm day={day} assignment={assignment} />
                  )}
                  
                  <div className="flex gap-2">
                    {assignment.cook && assignment.costPerPerson && assignment.iban && (
                      <button
                        onClick={() => setEditingDay(day)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 text-sm flex items-center gap-1"
                      >
                        <IconEdit className="h-4 w-4" />
                        Bearbeiten
                      </button>
                    )}
                    <button
                      onClick={() => removePlannedMeal(day)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 text-sm"
                    >
                      Entfernen
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm">Noch nicht geplant</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Create Food Item Form */}
      {showCreateForm && (
        <div className="p-6 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Neues Gericht vorschlagen
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name des Gerichts
              </label>
              <input
                type="text"
                value={newFoodItem.name}
                onChange={(e) => setNewFoodItem({...newFoodItem, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                placeholder="z.B. Spaghetti Bolognese"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Beschreibung
              </label>
              <textarea
                value={newFoodItem.description}
                onChange={(e) => setNewFoodItem({...newFoodItem, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 h-24 resize-none"
                placeholder="Kurze Beschreibung des Gerichts..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Diätetische Eigenschaften
              </label>
              <div className="flex flex-wrap gap-2">
                {dietaryOptions.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleDietaryTagToggle(tag)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      newFoodItem.dietaryTags.includes(tag)
                        ? getDietaryTagColor(tag)
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={async () => {
                  await handleCreateFoodItem()
                }}
                variant="small"
                className="bg-green-600 hover:bg-green-700 hover:ring-green-500"
                disabled={!newFoodItem.name}
              >
                Gericht vorschlagen
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

      {/* Dietary Filter */}
      <div className="flex flex-wrap gap-2">
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setFilterTag(tag)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              filterTag === tag
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-gray-200 dark:border-gray-600'
            }`}
          >
            <IconLeaf className="h-3 w-3 inline mr-1" />
            {tag}
          </button>
        ))}
      </div>

      {/* Food Items List */}
      <div className="grid gap-6">
        {sortedFoodItems.map(item => (
          <div 
            key={item.id} 
            className="p-6 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => markFoodItemAsViewed(item.id)}
          >
            <div className="flex items-start gap-6">
              {/* Main Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    {item.name}
                  </h3>
                  {isFoodItemNew(item) && (
                    <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">NEU</span>
                  )}
                  {item.plannedFor && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs rounded">
                      Geplant
                    </span>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.dietaryTags.map(tag => (
                    <span key={tag} className={`px-2 py-1 text-xs rounded ${getDietaryTagColor(tag)}`}>
                      <IconLeaf className="h-3 w-3 inline mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                  <span>Von: {item.author}</span>
                  <span>{item.createdAt}</span>
                  {Object.keys(item.viewedBy).length > 0 && (
                    <span className="flex items-center gap-1">
                      <IconEye className="h-4 w-4" />
                      Gesehen von: {Object.keys(item.viewedBy).length} Person(en)
                    </span>
                  )}
                </div>
              </div>

              {/* Actions Area */}
              <div className="flex flex-col items-center gap-4 flex-shrink-0">
                {/* Voting Section */}
                <div className="flex flex-col items-center justify-center min-w-[80px]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleVote(item.id)
                    }}
                    className={`mb-2 w-12 h-12 rounded-lg transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      item.hasUserVoted
                        ? 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500 text-white transform hover:scale-105'
                        : 'bg-gray-200 dark:bg-gray-700 hover:bg-yellow-500 focus:ring-yellow-500 hover:text-white text-gray-600 dark:text-gray-400 transform hover:scale-105'
                    }`}
                    title="Abstimmen"
                  >
                    <IconStar className="h-6 w-6" />
                  </button>
                  <span className="text-xl font-bold text-gray-700 dark:text-gray-300 text-center">
                    {item.votes}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    {item.votes === 1 ? 'Stimme' : 'Stimmen'}
                  </span>
                </div>

                {/* Planning Dropdown */}
                <div className="w-full min-w-[140px]">
                  <select
                    onChange={(e) => {
                      e.stopPropagation()
                      if (e.target.value && e.target.value !== 'none') {
                        planMeal(e.target.value, item)
                      }
                    }}
                    defaultValue="none"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 bg-white text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="none">Planen für...</option>
                    {Object.keys(weeklyPlan).map(day => (
                      <option key={day} value={day} disabled={weeklyPlan[day]?.foodItem !== null}>
                        {day} {weeklyPlan[day]?.foodItem ? '(belegt)' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
