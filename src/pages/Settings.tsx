import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/stateful-button'
import { ProfilePictureUpload } from '@/components/ui/profile-picture-upload'
import { useAuth } from '@/contexts/AuthContext'
import { IconKey, IconUser, IconBell, IconPalette, IconCheck, IconEdit } from '@tabler/icons-react'

export default function Settings() {
  const { user, updateUser, updateProfilePicture } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || ''
  })

  const handleProfileUpdate = async () => {
    if (!user) return
    
    const success = await updateUser(user.id, {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email
    })
    
    if (success) {
      setIsEditing(false)
    }
  }

  const handleProfilePictureUpload = async (base64Image: string) => {
    if (!user) return
    await updateProfilePicture(user.id, base64Image)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Einstellungen
        </h1>
        <p className="text-muted-foreground">
          Verwalten Sie Ihre Kontoeinstellungen und Präferenzen
        </p>
      </div>

      {/* Profile Picture Section */}
      <motion.div 
        className="p-6 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
          <IconUser className="h-5 w-5" />
          Profilbild
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <ProfilePictureUpload
            currentPicture={user?.profilePicture}
            onUpload={handleProfilePictureUpload}
            size="lg"
          />
          <div className="text-center md:text-left">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
              {user?.firstName} {user?.lastName}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              {user?.role === 'admin' ? 'Administrator' : 'Benutzer'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Profile Information */}
      <motion.div 
        className="p-6 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <IconEdit className="h-5 w-5" />
            Profil bearbeiten
          </h2>
          <motion.button
            onClick={() => setIsEditing(!isEditing)}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isEditing ? 'Abbrechen' : 'Bearbeiten'}
          </motion.button>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Vorname
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nachname
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                E-Mail
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleProfileUpdate}
                variant="small"
                className="bg-green-600 hover:bg-green-700 hover:ring-green-500"
              >
                <IconCheck className="h-4 w-4 mr-1" />
                Speichern
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Vorname
                </label>
                <p className="text-gray-800 dark:text-gray-200">{user?.firstName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nachname
                </label>
                <p className="text-gray-800 dark:text-gray-200">{user?.lastName}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                E-Mail
              </label>
              <p className="text-gray-800 dark:text-gray-200">{user?.email}</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Account Settings */}
      <motion.div 
        className="p-6 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
          <IconKey className="h-5 w-5" />
          Konto-Sicherheit
        </h2>
        <div className="space-y-4">
          <Link to="/change-password">
            <motion.div
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer group"
              whileHover={{ x: 4 }}
            >
              <div className="flex items-center gap-3">
                <IconKey className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">Passwort ändern</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Aktualisieren Sie Ihr Passwort</p>
                </div>
              </div>
              <svg className="h-5 w-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </Link>
        </div>
      </motion.div>

      {/* Preferences */}
      <motion.div 
        className="p-6 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
          <IconPalette className="h-5 w-5" />
          Einstellungen
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-600">
            <div className="flex items-center gap-3">
              <IconBell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <div>
                <h3 className="font-medium text-gray-800 dark:text-gray-200">Benachrichtigungen</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">E-Mail-Benachrichtigungen erhalten</p>
              </div>
            </div>
            <motion.label
              className="relative inline-flex items-center cursor-pointer"
              whileTap={{ scale: 0.95 }}
            >
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </motion.label>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
