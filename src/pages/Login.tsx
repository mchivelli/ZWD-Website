import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { Vortex } from '@/components/ui/vortex'
import { Button } from '@/components/ui/stateful-button'
import { useAuth } from '@/contexts/AuthContext'
import { IconEye, IconEyeOff, IconLogin, IconPhone, IconMail, IconMapPin, IconClock } from '@tabler/icons-react'

export default function Login() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Redirect if already authenticated
  if (isAuthenticated()) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = async () => {
    setError('')

    const result = await login(formData.email, formData.password)
    
    if (!result.success) {
      setError('Ungültige Anmeldedaten. Bitte versuchen Sie es erneut.')
      throw new Error('Login failed') // This will prevent the success animation
    }
    
    // Check if user needs to change password on first login
    if (result.requiresPasswordChange) {
      navigate('/change-password', { replace: true })
      return
    }
    
    // Navigate to intended page or dashboard after successful login
    const from = (location.state as any)?.from?.pathname || '/'
    navigate(from, { replace: true })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-white">
      <Vortex
        backgroundColor="white"
        rangeY={800}
        particleCount={500}
        baseHue={200}
        className="flex items-center justify-center px-2 md:px-10 py-4 w-full h-full min-h-screen"
      >
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-8"
          >
            {/* Logo */}
            <div className="flex justify-center lg:justify-start">
              <img 
                src="/images/bmi_logo_borderless.svg" 
                alt="BMI Logo" 
                className="h-16 w-auto"
              />
            </div>

            {/* Welcome Text */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Willkommen beim
                <span className="block text-blue-600">Zivildienst Portal</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                Ihr zentraler Zugang für alle wichtigen Informationen, 
                Termine und Services während Ihres Zivildienstes.
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 space-y-4 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Kontakt & Zeiten</h3>
              
              <div className="grid gap-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <IconPhone className="h-5 w-5 text-blue-600" />
                  <span>+41 44 123 45 67</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <IconMail className="h-5 w-5 text-blue-600" />
                  <span>info@zivildienst-example.ch</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <IconMapPin className="h-5 w-5 text-blue-600" />
                  <span>Musterstrasse 123, 8000 Zürich</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <IconClock className="h-5 w-5 text-blue-600" />
                  <span>Mo-Do: 08:00-17:00, Fr: 08:00-16:00</span>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="space-y-3">
              <div className="bg-blue-50/80 backdrop-blur-sm border-l-4 border-blue-500 p-4 rounded-r-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Arbeitszeiten:</strong> Bitte halte die angegebenen Arbeitszeiten ein.
                </p>
              </div>
              <div className="bg-yellow-50/80 backdrop-blur-sm border-l-4 border-yellow-500 p-4 rounded-r-lg">
                <p className="text-yellow-800 text-sm">
                  <strong>Notfall:</strong> 24/7 erreichbar unter +41 44 987 65 43
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-md">
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Anmelden</h2>
                  <p className="text-gray-600">Zugang zu Ihrem Zivildienst Portal</p>
                </div>

                                 <div className="space-y-6">
                   <div>
                     <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                       E-Mail Adresse
                     </label>
                     <input
                       type="email"
                       id="email"
                       name="email"
                       value={formData.email}
                       onChange={handleInputChange}
                       required
                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80"
                       placeholder="ihre.email@example.com"
                     />
                   </div>
 
                   <div>
                     <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                       Passwort
                     </label>
                     <div className="relative">
                       <input
                         type={showPassword ? 'text' : 'password'}
                         id="password"
                         name="password"
                         value={formData.password}
                         onChange={handleInputChange}
                         required
                         className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80"
                         placeholder="Ihr Passwort"
                       />
                       <button
                         type="button"
                         onClick={() => setShowPassword(!showPassword)}
                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                       >
                         {showPassword ? <IconEyeOff className="h-5 w-5" /> : <IconEye className="h-5 w-5" />}
                       </button>
                     </div>
                   </div>
 
                   {error && (
                     <motion.div
                       initial={{ opacity: 0, y: -10 }}
                       animate={{ opacity: 1, y: 0 }}
                       className="bg-red-50 border border-red-200 rounded-lg p-3"
                     >
                       <p className="text-red-700 text-sm">{error}</p>
                     </motion.div>
                   )}
 
                   <div className="flex justify-center">
                     <Button 
                       onClick={handleSubmit}
                       className="w-full bg-blue-600 hover:bg-blue-700 hover:ring-blue-500 min-w-[200px]"
                       disabled={!formData.email || !formData.password}
                     >
                       <IconLogin className="h-5 w-5 mr-2" />
                       Anmelden
                     </Button>
                   </div>
                 </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="bg-gray-50 rounded-lg p-4">
                                         <h4 className="text-sm font-medium text-gray-800 mb-2">Demo-Zugang:</h4>
                     <p className="text-xs text-gray-600">
                       <strong>Admin:</strong> admin@zivildienst.ch / admin123
                     </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Vortex>
    </div>
  )
} 