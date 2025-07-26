import { useState } from 'react'
import { IconPlus, IconThumbUp, IconThumbDown, IconStar, IconLeaf, IconAlertCircle, IconCalendar } from '@tabler/icons-react'

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
}

interface WeeklyPlan {
  [key: string]: FoodItem | null
}

export default function FoodVotes() {
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
      plannedFor: '2024-07-26'
    },
    {
      id: '2',
      name: 'Vegetarische Lasagne',
      description: 'Leckere Lasagne mit Gemüse und Béchamel-Sauce',
      author: 'Lisa Schmidt',
      votes: 12,
      hasUserVoted: false,
      dietaryTags: ['Vegetarisch'],
      createdAt: '2024-07-21'
    },
    {
      id: '3',
      name: 'Asiatisches Curry',
      description: 'Würziges Curry mit Gemüse und Kokosmilch',
      author: 'Tom Weber',
      votes: 8,
      hasUserVoted: false,
      dietaryTags: ['Vegan', 'Scharf'],
      createdAt: '2024-07-22'
    },
    {
      id: '4',
      name: 'Schweinebraten mit Knödel',
      description: 'Traditioneller Schweinebraten mit Semmelknödeln',
      author: 'Anna Müller',
      votes: 6,
      hasUserVoted: false,
      dietaryTags: ['Fleisch'],
      createdAt: '2024-07-23'
    },
    {
      id: '5',
      name: 'Quinoa Salat',
      description: 'Frischer Quinoa-Salat mit Gemüse und Kräutern',
      author: 'Sarah Klein',
      votes: 10,
      hasUserVoted: false,
      dietaryTags: ['Vegan', 'Glutenfrei'],
      createdAt: '2024-07-24'
    }
  ])

  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan>({
    'Montag': foodItems.find(item => item.id === '1') || null,
    'Dienstag': null,
    'Mittwoch': null,
    'Donnerstag': null,
    'Freitag': null
  })

  const [showCreateForm, setShowCreateForm] = useState(false)
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

  const handleCreateFoodItem = () => {
    if (newFoodItem.name.trim() && newFoodItem.description.trim()) {
      const foodItem: FoodItem = {
        id: Date.now().toString(),
        name: newFoodItem.name,
        description: newFoodItem.description,
        author: 'Du',
        votes: 0,
        hasUserVoted: false,
        dietaryTags: newFoodItem.dietaryTags,
        createdAt: new Date().toISOString().split('T')[0]
      }
      setFoodItems([foodItem, ...foodItems])
      setNewFoodItem({ name: '', description: '', dietaryTags: [] })
      setShowCreateForm(false)
    }
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
    setWeeklyPlan(prev => ({ ...prev, [day]: foodItem }))
    setFoodItems(prev => prev.map(item =>
      item.id === foodItem.id
        ? { ...item, plannedFor: new Date().toISOString().split('T')[0] }
        : item
    ))
  }

  const removePlannedMeal = (day: string) => {
    const plannedItem = weeklyPlan[day]
    if (plannedItem) {
      setFoodItems(prev => prev.map(item =>
        item.id === plannedItem.id
          ? { ...item, plannedFor: undefined }
          : item
      ))
    }
    setWeeklyPlan(prev => ({ ...prev, [day]: null }))
  }

  const getDietaryTagColor = (tag: string) => {
    switch (tag) {
      case 'Vegetarisch': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Vegan': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
      case 'Glutenfrei': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Fleisch': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'Scharf': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      case 'Süß': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const filteredFoodItems = filterTag === 'Alle' 
    ? foodItems 
    : foodItems.filter(item => item.dietaryTags.includes(filterTag))

  const sortedFoodItems = filteredFoodItems.sort((a, b) => b.votes - a.votes)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
            Essen Abstimmung
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Stimme für deine Lieblingsgerichte ab und plane die Woche
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <IconPlus className="h-4 w-4" />
          Gericht vorschlagen
        </button>
      </div>

      {/* Create Food Item Form */}
      {showCreateForm && (
        <div className="p-6 rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
            Neues Gericht vorschlagen
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Name des Gerichts
              </label>
              <input
                type="text"
                value={newFoodItem.name}
                onChange={(e) => setNewFoodItem({...newFoodItem, name: e.target.value})}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200"
                placeholder="z.B. Spaghetti Bolognese"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Beschreibung
              </label>
              <textarea
                value={newFoodItem.description}
                onChange={(e) => setNewFoodItem({...newFoodItem, description: e.target.value})}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200 h-24 resize-none"
                placeholder="Kurze Beschreibung des Gerichts..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
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
                        : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCreateFoodItem}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Gericht vorschlagen
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

      {/* Weekly Meal Planner */}
      <div className="p-6 rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
        <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4 flex items-center gap-2">
          <IconCalendar className="h-5 w-5" />
          Wochenplaner
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {Object.entries(weeklyPlan).map(([day, meal]) => (
            <div key={day} className="p-4 border border-neutral-200 dark:border-neutral-600 rounded-lg">
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">{day}</h3>
              {meal ? (
                <div className="space-y-2">
                  <h4 className="font-medium text-neutral-700 dark:text-neutral-300">{meal.name}</h4>
                  <div className="flex flex-wrap gap-1">
                    {meal.dietaryTags.map(tag => (
                      <span key={tag} className={`px-2 py-1 text-xs rounded ${getDietaryTagColor(tag)}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <IconStar className="h-4 w-4" />
                    {meal.votes} Stimmen
                  </div>
                  <button
                    onClick={() => removePlannedMeal(day)}
                    className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Entfernen
                  </button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">Noch nicht geplant</p>
                  <div className="text-xs text-neutral-400 dark:text-neutral-500">
                    Klicke auf "Planen" bei einem Gericht
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tags */}
      <div className="flex flex-wrap gap-2">
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setFilterTag(tag)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterTag === tag
                ? 'bg-blue-600 text-white'
                : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Food Items List */}
      <div className="space-y-4">
        {sortedFoodItems.map(item => (
          <div key={item.id} className="p-6 rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                  {item.name}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                  {item.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                  <span>von {item.author}</span>
                  <span>{new Date(item.createdAt).toLocaleDateString('de-DE')}</span>
                  {item.plannedFor && (
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      Geplant für diese Woche
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.dietaryTags.map(tag => (
                    <span key={tag} className={`px-2 py-1 text-xs rounded ${getDietaryTagColor(tag)}`}>
                      <IconLeaf className="h-3 w-3 inline mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleVote(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    item.hasUserVoted
                      ? 'bg-blue-600 text-white'
                      : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                  }`}
                >
                  <IconStar className="h-4 w-4" />
                  {item.votes}
                </button>
                <div className="relative">
                  <select
                    onChange={(e) => {
                      if (e.target.value && e.target.value !== 'none') {
                        planMeal(e.target.value, item)
                      }
                    }}
                    defaultValue="none"
                    className="px-3 py-2 border border-neutral-300 rounded-md dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200"
                  >
                    <option value="none">Planen für...</option>
                    {Object.keys(weeklyPlan).map(day => (
                      <option key={day} value={day} disabled={weeklyPlan[day] !== null}>
                        {day} {weeklyPlan[day] ? '(belegt)' : ''}
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
