import { useState } from 'react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/stateful-button'
import { useAuth, User } from '@/contexts/AuthContext'
import { 
  IconPlus, 
  IconEdit, 
  IconTrash, 
  IconSearch, 
  IconUser, 
  IconShield,
  IconX,
  IconCheck,
  IconKey
} from '@tabler/icons-react'

export default function UserManagement() {
  const { users, createUser, updateUser, deleteUser, changePassword, isAdmin } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [passwordUserId, setPasswordUserId] = useState<string>('')
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    role: 'user' as 'admin' | 'user'
  })
  const [newPassword, setNewPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Redirect if not admin
  if (!isAdmin()) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Zugriff verweigert</h1>
        <p className="text-gray-600">Sie haben keine Berechtigung, diese Seite zu besuchen.</p>
      </div>
    )
  }

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOpenModal = (user?: User) => {
    if (user) {
      setEditingUser(user)
      setFormData({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      })
    } else {
      setEditingUser(null)
      setFormData({
        email: '',
        firstName: '',
        lastName: '',
        role: 'user'
      })
    }
    setError('')
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingUser(null)
    setError('')
  }

  const handleSubmit = async () => {
    setError('')

    try {
      let success = false
      
      if (editingUser) {
        success = await updateUser(editingUser.id, formData)
      } else {
        success = await createUser(formData)
      }

      if (success) {
        handleCloseModal()
      } else {
        setError(editingUser ? 'Fehler beim Aktualisieren des Benutzers' : 'Fehler beim Erstellen des Benutzers. Benutzername bereits vergeben?')
        throw new Error('Operation failed') // Prevent success animation
      }
    } catch (err) {
      setError('Ein unerwarteter Fehler ist aufgetreten')
      throw err // Re-throw to prevent success animation
    }
  }

  const handleDelete = async (user: User) => {
    if (window.confirm(`Sind Sie sicher, dass Sie den Benutzer "${user.email}" löschen möchten?`)) {
      const success = await deleteUser(user.id)
      if (!success) {
        alert('Fehler beim Löschen des Benutzers')
      }
    }
  }

  const handlePasswordChange = async () => {
    const success = await changePassword(passwordUserId, newPassword)
    
    if (success) {
      setShowPasswordModal(false)
      setPasswordUserId('')
      setNewPassword('')
      // The success will be shown by the button animation
    } else {
      throw new Error('Fehler beim Ändern des Passworts')
    }
  }

  const openPasswordModal = (userId: string) => {
    setPasswordUserId(userId)
    setNewPassword('')
    setShowPasswordModal(true)
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Benutzerverwaltung
          </h1>
          <p className="text-muted-foreground">
            Verwalten Sie Benutzerkonten und Berechtigungen
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <IconPlus className="h-4 w-4" />
          Neuer Benutzer
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Benutzer suchen..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
        />
      </div>

      {/* Users List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Benutzer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  E-Mail
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Rolle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Letzter Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Aktionen
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <IconUser className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {user.firstName} {user.lastName}
                        </div>
                                                 <div className="text-sm text-gray-500 dark:text-gray-400">
                           {user.email}
                         </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}>
                      {user.role === 'admin' ? <IconShield className="h-3 w-3" /> : <IconUser className="h-3 w-3" />}
                      {user.role === 'admin' ? 'Administrator' : 'Benutzer'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleString('de-CH') : 'Nie'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenModal(user)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <IconEdit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => openPasswordModal(user.id)}
                        className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300"
                      >
                        <IconKey className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <IconTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                {editingUser ? 'Benutzer bearbeiten' : 'Neuer Benutzer'}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <IconX className="h-5 w-5" />
              </button>
            </div>

                         <div className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                     Vorname
                   </label>
                   <input
                     type="text"
                     value={formData.firstName}
                     onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                     required
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
                     required
                     className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                   />
                 </div>
               </div>
 
                              <div className="col-span-2">
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                   E-Mail Adresse
                 </label>
                 <input
                   type="email"
                   value={formData.email}
                   onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                   required
                   disabled={!!editingUser}
                   className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                   placeholder="benutzer@example.com"
                 />
                 {editingUser && (
                   <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                     E-Mail kann nach der Erstellung nicht geändert werden
                   </p>
                 )}
               </div>
 
               <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                   Rolle
                 </label>
                 <select
                   value={formData.role}
                   onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as 'admin' | 'user' }))}
                   className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                 >
                   <option value="user">Benutzer</option>
                   <option value="admin">Administrator</option>
                 </select>
               </div>

               {!editingUser && (
                 <div className="col-span-2">
                   <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                     <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                       Passwort Information
                     </h4>
                     <p className="text-xs text-blue-700 dark:text-blue-300">
                       Neue Benutzer erhalten automatisch das Standardpasswort "password123" und werden beim ersten Login aufgefordert, es zu ändern.
                     </p>
                   </div>
                 </div>
               )}
 
               {error && (
                 <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
                   <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                 </div>
               )}
 
               <div className="flex justify-between items-center pt-4">
                 <button
                   type="button"
                   onClick={handleCloseModal}
                   className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                 >
                   Abbrechen
                 </button>
                 <Button
                   onClick={handleSubmit}
                   className="bg-blue-600 hover:bg-blue-700 hover:ring-blue-500"
                   disabled={!formData.firstName || !formData.lastName || !formData.email}
                 >
                   <IconCheck className="h-4 w-4 mr-2" />
                   {editingUser ? 'Aktualisieren' : 'Erstellen'}
                 </Button>
               </div>
             </div>
          </motion.div>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Passwort ändern
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <IconX className="h-5 w-5" />
              </button>
            </div>

                         <div className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                   Neues Passwort
                 </label>
                 <input
                   type="password"
                   value={newPassword}
                   onChange={(e) => setNewPassword(e.target.value)}
                   required
                   minLength={6}
                   className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                   placeholder="Mindestens 6 Zeichen"
                 />
               </div>
 
               <div className="flex justify-between items-center pt-4">
                 <button
                   type="button"
                   onClick={() => setShowPasswordModal(false)}
                   className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                 >
                   Abbrechen
                 </button>
                 <Button
                   onClick={handlePasswordChange}
                   className="bg-yellow-600 hover:bg-yellow-700 hover:ring-yellow-500"
                   disabled={!newPassword || newPassword.length < 6}
                 >
                   <IconKey className="h-4 w-4 mr-2" />
                   Passwort ändern
                 </Button>
               </div>
             </div>
          </motion.div>
        </div>
      )}
    </div>
  )
} 