import { useState } from 'react'
import { IconUser, IconBell, IconShield, IconPalette, IconTrash } from '@tabler/icons-react'
import { useTheme } from '@/contexts/ThemeContext'

export default function Settings() {
  const { theme, setTheme } = useTheme()
  
  const [userSettings, setUserSettings] = useState({
    name: 'Max Mustermann',
    email: 'max.mustermann@example.com',
    position: 'Zivildienstleistender',
    phone: '+41 79 123 45 67',
    language: 'de'
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    reminderAlerts: true,
    ticketUpdates: true,
    blackboardPosts: false,
    foodVoteReminders: true
  })

  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    sessionTimeout: 30,
    loginAlerts: true
  })

  const [isEditing, setIsEditing] = useState(false)

  const handleUserSettingsChange = (field: string, value: string) => {
    setUserSettings(prev => ({ ...prev, [field]: value }))
  }

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [field]: value }))
  }

  const handleSecurityChange = (field: string, value: boolean | number) => {
    setSecurity(prev => ({ ...prev, [field]: value }))
  }

  const handleSaveSettings = () => {
    // In a real app, this would save to a backend
    setIsEditing(false)
    // Show success message
  }

  const handleResetSettings = () => {
    if (confirm('Möchtest du alle Einstellungen auf die Standardwerte zurücksetzen?')) {
      // Reset to default values
      setNotifications({
        emailNotifications: true,
        pushNotifications: true,
        reminderAlerts: true,
        ticketUpdates: true,
        blackboardPosts: false,
        foodVoteReminders: true
      })
      setSecurity({
        twoFactorEnabled: false,
        sessionTimeout: 30,
        loginAlerts: true
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
            Einstellungen
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Verwalte deine Konto- und Anwendungseinstellungen
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <IconUser className="h-4 w-4" />
          {isEditing ? 'Abbrechen' : 'Bearbeiten'}
        </button>
      </div>

      {/* User Profile Settings */}
      <div className="p-6 rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
        <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4 flex items-center gap-2">
          <IconUser className="h-5 w-5" />
          Profil
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={userSettings.name}
                onChange={(e) => handleUserSettingsChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200"
              />
            ) : (
              <p className="text-neutral-600 dark:text-neutral-400 py-2">{userSettings.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              E-Mail
            </label>
            {isEditing ? (
              <input
                type="email"
                value={userSettings.email}
                onChange={(e) => handleUserSettingsChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200"
              />
            ) : (
              <p className="text-neutral-600 dark:text-neutral-400 py-2">{userSettings.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Position
            </label>
            {isEditing ? (
              <input
                type="text"
                value={userSettings.position}
                onChange={(e) => handleUserSettingsChange('position', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200"
              />
            ) : (
              <p className="text-neutral-600 dark:text-neutral-400 py-2">{userSettings.position}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Telefon
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={userSettings.phone}
                onChange={(e) => handleUserSettingsChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200"
              />
            ) : (
              <p className="text-neutral-600 dark:text-neutral-400 py-2">{userSettings.phone}</p>
            )}
          </div>
        </div>
        {isEditing && (
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleSaveSettings}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Speichern
            </button>
          </div>
        )}
      </div>

      {/* Theme Settings */}
      <div className="p-6 rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
        <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4 flex items-center gap-2">
          <IconPalette className="h-5 w-5" />
          Design
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Theme
            </label>
            <div className="flex gap-2">
              {[
                { value: 'light', label: 'Hell' },
                { value: 'dark', label: 'Dunkel' },
                { value: 'system', label: 'System' }
              ].map(themeOption => (
                <button
                  key={themeOption.value}
                  onClick={() => setTheme(themeOption.value as any)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    theme === themeOption.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600'
                  }`}
                >
                  {themeOption.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Sprache
            </label>
            <select
              value={userSettings.language}
              onChange={(e) => handleUserSettingsChange('language', e.target.value)}
              className="px-3 py-2 border border-neutral-300 rounded-md dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200"
            >
              <option value="de">Deutsch</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="p-6 rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
        <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4 flex items-center gap-2">
          <IconBell className="h-5 w-5" />
          Benachrichtigungen
        </h2>
        <div className="space-y-4">
          {[
            { key: 'emailNotifications', label: 'E-Mail Benachrichtigungen', description: 'Erhalte Updates per E-Mail' },
            { key: 'pushNotifications', label: 'Push Benachrichtigungen', description: 'Browser-Benachrichtigungen aktivieren' },
            { key: 'reminderAlerts', label: 'Erinnerungswarnungen', description: 'Benachrichtigungen für anstehende Termine' },
            { key: 'ticketUpdates', label: 'Ticket Updates', description: 'Updates zu deinen Support-Tickets' },
            { key: 'blackboardPosts', label: 'Schwarzes Brett', description: 'Neue Beiträge im Schwarzen Brett' },
            { key: 'foodVoteReminders', label: 'Essen Abstimmungen', description: 'Erinnerungen für Essensabstimmungen' }
          ].map(notification => (
            <div key={notification.key} className="flex items-center justify-between py-2">
              <div>
                <h3 className="font-medium text-neutral-800 dark:text-neutral-200">
                  {notification.label}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {notification.description}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications[notification.key as keyof typeof notifications] as boolean}
                  onChange={(e) => handleNotificationChange(notification.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div className="p-6 rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
        <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4 flex items-center gap-2">
          <IconShield className="h-5 w-5" />
          Sicherheit
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <h3 className="font-medium text-neutral-800 dark:text-neutral-200">
                Zwei-Faktor-Authentifizierung
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Zusätzliche Sicherheit für dein Konto
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={security.twoFactorEnabled}
                onChange={(e) => handleSecurityChange('twoFactorEnabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between py-2">
            <div>
              <h3 className="font-medium text-neutral-800 dark:text-neutral-200">
                Session Timeout
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Automatische Abmeldung nach Inaktivität
              </p>
            </div>
            <select
              value={security.sessionTimeout}
              onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value))}
              className="px-3 py-2 border border-neutral-300 rounded-md dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-200"
            >
              <option value={15}>15 Minuten</option>
              <option value={30}>30 Minuten</option>
              <option value={60}>1 Stunde</option>
              <option value={120}>2 Stunden</option>
              <option value={0}>Nie</option>
            </select>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <h3 className="font-medium text-neutral-800 dark:text-neutral-200">
                Login Warnungen
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Benachrichtigungen bei neuen Anmeldungen
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={security.loginAlerts}
                onChange={(e) => handleSecurityChange('loginAlerts', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="p-6 rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
        <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4 flex items-center gap-2">
          <IconTrash className="h-5 w-5" />
          Daten Management
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
            <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
              Einstellungen zurücksetzen
            </h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
              Alle Einstellungen auf die Standardwerte zurücksetzen
            </p>
            <button
              onClick={handleResetSettings}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Einstellungen zurücksetzen
            </button>
          </div>
          
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
            <h3 className="font-medium text-red-800 dark:text-red-200 mb-2">
              Konto löschen
            </h3>
            <p className="text-sm text-red-700 dark:text-red-300 mb-3">
              Dein Konto und alle deine Daten werden permanent gelöscht
            </p>
            <button
              onClick={() => {
                if (confirm('Bist du sicher, dass du dein Konto löschen möchtest? Diese Aktion kann nicht rückgängig gemacht werden.')) {
                  // Handle account deletion
                }
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Konto löschen
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
