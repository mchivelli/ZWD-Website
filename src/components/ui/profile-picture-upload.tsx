import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconCamera, IconUpload, IconX, IconCheck } from '@tabler/icons-react'
import { Button } from './stateful-button'
import { cn } from '@/lib/utils'

interface ProfilePictureUploadProps {
  currentPicture?: string
  onUpload: (base64Image: string) => Promise<void>
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function ProfilePictureUpload({ 
  currentPicture, 
  onUpload, 
  className,
  size = 'md' 
}: ProfilePictureUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const sizeClasses = {
    sm: 'h-16 w-16',
    md: 'h-24 w-24',
    lg: 'h-32 w-32'
  }

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })
  }

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Bitte wählen Sie eine Bilddatei aus.')
      return
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('Die Datei ist zu groß. Bitte wählen Sie ein Bild unter 5MB.')
      return
    }

    try {
      setIsUploading(true)
      const base64 = await convertToBase64(file)
      setPreview(base64)
      await onUpload(base64)
    } catch (error) {
      console.error('Upload error:', error)
      alert('Fehler beim Hochladen des Bildes.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const currentImage = preview || currentPicture

  return (
    <div className={cn("relative group", className)}>
      <motion.div
        className={cn(
          "relative overflow-hidden rounded-full border-2 border-dashed transition-all duration-300",
          sizeClasses[size],
          isDragging 
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
            : "border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {currentImage ? (
          <img
            src={currentImage}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
            <IconCamera className="h-6 w-6 text-gray-400" />
          </div>
        )}

        {/* Overlay */}
        <AnimatePresence>
          {(isDragging || isUploading) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/50 text-white"
            >
              {isUploading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <IconUpload className="h-6 w-6" />
                </motion.div>
              ) : (
                <IconUpload className="h-6 w-6" />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <IconCamera className="h-6 w-6" />
        </motion.div>
      </motion.div>

      {/* Upload button for mobile/accessibility */}
      <motion.button
        className="absolute -bottom-2 -right-2 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
      >
        {isUploading ? (
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
            <IconUpload className="h-4 w-4" />
          </motion.div>
        ) : (
          <IconCamera className="h-4 w-4" />
        )}
      </motion.button>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Helper text */}
      <div className="mt-2 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Klicken oder Bild hierher ziehen
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Max. 5MB, JPG/PNG
        </p>
      </div>
    </div>
  )
} 