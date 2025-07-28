import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/stateful-button'
import { useAuth } from '@/contexts/AuthContext'
import { IconKey, IconEye, IconEyeOff, IconCheck } from '@tabler/icons-react'

export default function ChangePassword() {
  const { user, changePassword, setPasswordAfterFirstLogin } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const isFirstLogin = user?.isFirstLogin

  const handleSubmit = async () => {
    setError('')
    setSuccess(false)

    // Validation
    if (!isFirstLogin && !formData.currentPassword) {
      setError('Aktuelles Passwort ist erforderlich')
      throw new Error('Current password required')
    }

    if (formData.newPassword.length < 6) {
      setError('Neues Passwort muss mindestens 6 Zeichen lang sein')
      throw new Error('Password too short')
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Neue Passwörter stimmen nicht überein')
      throw new Error('Passwords do not match')
    }

    try {
      let success = false
      
      if (isFirstLogin) {
        success = await setPasswordAfterFirstLogin(formData.newPassword)
      } else {
        success = await changePassword(user!.id, formData.newPassword, formData.currentPassword)
      }

      if (success) {
        setSuccess(true)
        setTimeout(() => {
          navigate('/')
        }, 2000)
      } else {
        setError(isFirstLogin ? 'Fehler beim Setzen des Passworts' : 'Aktuelles Passwort ist falsch')
        throw new Error('Password change failed')
      }
    } catch (err) {
      throw err
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
              <IconKey className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              {isFirstLogin ? 'Passwort setzen' : 'Passwort ändern'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {isFirstLogin 
                ? 'Bitte setzen Sie ein sicheres Passwort für Ihr Konto'
                : 'Ändern Sie Ihr aktuelles Passwort'
              }
            </p>
          </div>

          <div className="space-y-6">
            {!isFirstLogin && (
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-foreground mb-2">
                  Aktuelles Passwort
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 pr-12 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-background"
                    placeholder="Ihr aktuelles Passwort"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('current')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPasswords.current ? <IconEyeOff className="h-5 w-5" /> : <IconEye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-foreground mb-2">
                {isFirstLogin ? 'Neues Passwort' : 'Neues Passwort'}
              </label>
              <div className="relative">
                <input
                  type={showPasswords.new ? 'text' : 'password'}
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 pr-12 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-background"
                  placeholder="Mindestens 6 Zeichen"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('new')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPasswords.new ? <IconEyeOff className="h-5 w-5" /> : <IconEye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                Passwort bestätigen
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 pr-12 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-background"
                  placeholder="Passwort wiederholen"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirm')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPasswords.confirm ? <IconEyeOff className="h-5 w-5" /> : <IconEye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3"
              >
                <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3"
              >
                <p className="text-green-700 dark:text-green-300 text-sm">
                  Passwort erfolgreich {isFirstLogin ? 'gesetzt' : 'geändert'}! Weiterleitung...
                </p>
              </motion.div>
            )}

            <Button 
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 hover:ring-blue-500"
              disabled={!formData.newPassword || !formData.confirmPassword || (!isFirstLogin && !formData.currentPassword)}
            >
              <IconCheck className="h-5 w-5 mr-2" />
              {isFirstLogin ? 'Passwort setzen' : 'Passwort ändern'}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 