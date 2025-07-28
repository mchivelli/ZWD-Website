import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { hashPassword, verifyPassword, generateDefaultPassword } from '@/lib/password'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'admin' | 'user'
  createdAt: string
  lastLogin?: string
  isFirstLogin?: boolean
  profilePicture?: string // Base64 encoded image or URL
}

interface AuthContextType {
  user: User | null
  users: User[]
  login: (email: string, password: string) => Promise<{ success: boolean; requiresPasswordChange?: boolean }>
  logout: () => void
  isAdmin: () => boolean
  isAuthenticated: () => boolean
  createUser: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<boolean>
  updateUser: (id: string, userData: Partial<User>) => Promise<boolean>
  deleteUser: (id: string) => Promise<boolean>
  changePassword: (userId: string, newPassword: string, currentPassword?: string) => Promise<boolean>
  setPasswordAfterFirstLogin: (newPassword: string) => Promise<boolean>
  updateProfilePicture: (userId: string, profilePicture: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock data - in real app this would come from your backend
const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'admin@zivildienst.ch',
    firstName: 'System',
    lastName: 'Administrator',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-12-17T10:30:00Z',
    isFirstLogin: false,
    profilePicture: undefined
  }
]

// Securely hashed passwords - in real app this would be handled by backend
const initializePasswords = (): Record<string, string> => {
  return {
    'admin@zivildienst.ch': hashPassword('admin123')
  }
}

let MOCK_PASSWORDS: Record<string, string> = initializePasswords()

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>(MOCK_USERS)

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('auth_user')
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
      } catch (error) {
        localStorage.removeItem('auth_user')
      }
    }
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; requiresPasswordChange?: boolean }> => {
    try {
      // Find user by email
      const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase())
      if (!foundUser) {
        return { success: false }
      }

      // Check password securely using hash verification
      const hashedPassword = MOCK_PASSWORDS[foundUser.email]
      if (!hashedPassword || !verifyPassword(password, hashedPassword)) {
        return { success: false }
      }

      // Update last login
      const updatedUser = {
        ...foundUser,
        lastLogin: new Date().toISOString()
      }

      setUser(updatedUser)
      setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u))
      localStorage.setItem('auth_user', JSON.stringify(updatedUser))
      
      return { 
        success: true, 
        requiresPasswordChange: foundUser.isFirstLogin 
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth_user')
  }

  const isAdmin = (): boolean => {
    return user?.role === 'admin'
  }

  const isAuthenticated = (): boolean => {
    return user !== null
  }

  const createUser = async (userData: Omit<User, 'id' | 'createdAt'>): Promise<boolean> => {
    try {
      if (!isAdmin()) {
        return false
      }

      // Check if email already exists
      if (users.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
        return false
      }

      const newUser: User = {
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        isFirstLogin: true
      }

      setUsers(prev => [...prev, newUser])
      
      // Set temporary password for first login
      const tempPassword = generateDefaultPassword()
      MOCK_PASSWORDS[userData.email] = hashPassword(tempPassword)
      
      return true
    } catch (error) {
      console.error('Create user error:', error)
      return false
    }
  }

  const updateUser = async (id: string, userData: Partial<User>): Promise<boolean> => {
    if (!isAdmin() && user?.id !== id) {
      return false
    }

    setUsers(prev => prev.map(u => 
      u.id === id ? { ...u, ...userData } : u
    ))

    // Update current user if editing self
    if (user?.id === id) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem('auth_user', JSON.stringify(updatedUser))
    }

    return true
  }

  const deleteUser = async (id: string): Promise<boolean> => {
    try {
      const userToDelete = users.find(u => u.id === id)
      if (!userToDelete) return false
      
      setUsers(prev => prev.filter(u => u.id !== id))
      
      // Remove password from MOCK_PASSWORDS
      delete MOCK_PASSWORDS[userToDelete.email]
      
      return true
    } catch (error) {
      console.error('Delete user error:', error)
      return false
    }
  }

  const changePassword = async (userId: string, newPassword: string, currentPassword?: string): Promise<boolean> => {
    try {
      const targetUser = users.find(u => u.id === userId)
      if (!targetUser) {
        return false
      }

      // Check permissions: admin can change any password, users can only change their own
      const isOwnPassword = user?.id === userId
      if (!isAdmin() && !isOwnPassword) {
        return false
      }

      // If user is changing their own password, verify current password
      if (isOwnPassword && !isAdmin() && currentPassword) {
        const currentHashedPassword = MOCK_PASSWORDS[targetUser.email]
        if (!verifyPassword(currentPassword, currentHashedPassword)) {
          return false
        }
      }

      // Hash the new password securely
      MOCK_PASSWORDS[targetUser.email] = hashPassword(newPassword)
      
      return true
    } catch (error) {
      console.error('Change password error:', error)
      return false
    }
  }

  const setPasswordAfterFirstLogin = async (newPassword: string): Promise<boolean> => {
    try {
      if (!user || !user.isFirstLogin) {
        return false
      }

      // Hash the new password securely
      MOCK_PASSWORDS[user.email] = hashPassword(newPassword)
      
      // Update user to mark they're no longer first login
      const updatedUser = { ...user, isFirstLogin: false }
      setUser(updatedUser)
      setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u))
      localStorage.setItem('auth_user', JSON.stringify(updatedUser))
      
      return true
    } catch (error) {
      console.error('Set password error:', error)
      return false
    }
  }

  const updateProfilePicture = async (userId: string, profilePicture: string): Promise<boolean> => {
    try {
      const updatedUsers = users.map(u => 
        u.id === userId ? { ...u, profilePicture } : u
      )
      setUsers(updatedUsers)
      
      // Update current user if it's the same user
      if (user?.id === userId) {
        const updatedUser = { ...user, profilePicture }
        setUser(updatedUser)
        localStorage.setItem('auth_user', JSON.stringify(updatedUser))
      }
      
      return true
    } catch (error) {
      console.error('Update profile picture error:', error)
      return false
    }
  }

  const value: AuthContextType = {
    user,
    users,
    login,
    logout,
    isAdmin,
    isAuthenticated,
    createUser,
    updateUser,
    deleteUser,
    changePassword,
    setPasswordAfterFirstLogin,
    updateProfilePicture
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 