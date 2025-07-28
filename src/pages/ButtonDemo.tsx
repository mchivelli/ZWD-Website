import { useState } from 'react'
import { Button } from '@/components/ui/stateful-button'
import { 
  IconLogin, 
  IconUserPlus, 
  IconDeviceFloppy, 
  IconKey, 
  IconSend,
  IconDownload,
  IconUpload,
  IconTrash,
  IconEdit,
  IconCheck 
} from '@tabler/icons-react'

export default function ButtonDemo() {
  const [count, setCount] = useState(0)

  const simulateAsyncOperation = (delay: number = 2000) => {
    return new Promise((resolve) => {
      setTimeout(resolve, delay)
    })
  }

  const simulateFailure = () => {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Operation failed')), 1000)
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Stateful Button Demo
        </h1>
        <p className="text-muted-foreground">
          Beautiful animated buttons with loading and success states
        </p>
      </div>

      {/* Authentication Buttons */}
      <div className="p-6 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Authentication Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          <Button 
            onClick={() => simulateAsyncOperation()}
            className="bg-blue-600 hover:bg-blue-700 hover:ring-blue-500"
          >
            <IconLogin className="h-5 w-5 mr-2" />
            Anmelden
          </Button>
          
          <Button 
            onClick={() => simulateAsyncOperation()}
            className="bg-green-600 hover:bg-green-700 hover:ring-green-500"
          >
            <IconUserPlus className="h-5 w-5 mr-2" />
            Benutzer Erstellen
          </Button>
          
          <Button 
            onClick={() => simulateAsyncOperation()}
            className="bg-yellow-600 hover:bg-yellow-700 hover:ring-yellow-500"
          >
            <IconKey className="h-5 w-5 mr-2" />
            Passwort Ändern
          </Button>
        </div>
      </div>

      {/* Different Variants */}
      <div className="p-6 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Button Variants
        </h2>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[80px]">Default:</span>
            <Button onClick={() => simulateAsyncOperation()}>
              <IconSend className="h-5 w-5 mr-2" />
              Send Message
            </Button>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[80px]">Small:</span>
            <Button 
              variant="small" 
              onClick={() => simulateAsyncOperation(1500)}
              className="bg-purple-600 hover:bg-purple-700 hover:ring-purple-500"
            >
              <IconDeviceFloppy className="h-4 w-4 mr-2" />
              Speichern
            </Button>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[80px]">Icon:</span>
            <Button 
              variant="icon" 
              onClick={() => simulateAsyncOperation(1000)}
              className="bg-red-600 hover:bg-red-700 hover:ring-red-500"
              title="Delete"
            >
              <IconTrash className="h-4 w-4" />
            </Button>
            <Button 
              variant="icon" 
              onClick={() => simulateAsyncOperation(1000)}
              className="bg-blue-600 hover:bg-blue-700 hover:ring-blue-500"
              title="Edit"
            >
              <IconEdit className="h-4 w-4" />
            </Button>
            <Button 
              variant="icon" 
              onClick={() => simulateAsyncOperation(1000)}
              title="Check"
            >
              <IconCheck className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* File Operations */}
      <div className="p-6 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          File Operations
        </h2>
        <div className="flex flex-wrap gap-4">
          <Button 
            onClick={() => simulateAsyncOperation(3000)}
            className="bg-indigo-600 hover:bg-indigo-700 hover:ring-indigo-500"
          >
            <IconDownload className="h-5 w-5 mr-2" />
            Download Report
          </Button>
          
          <Button 
            onClick={() => simulateAsyncOperation(2500)}
            className="bg-orange-600 hover:bg-orange-700 hover:ring-orange-500"
          >
            <IconUpload className="h-5 w-5 mr-2" />
            Upload File
          </Button>
        </div>
      </div>

      {/* Error Handling */}
      <div className="p-6 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Error Handling
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This button simulates a failed operation - it will show loading but no success animation.
          </p>
          <Button 
            onClick={() => simulateFailure()}
            className="bg-red-600 hover:bg-red-700 hover:ring-red-500"
          >
            <IconTrash className="h-5 w-5 mr-2" />
            Simulate Error
          </Button>
        </div>
      </div>

      {/* Interactive Counter */}
      <div className="p-6 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Interactive Example
        </h2>
        <div className="flex items-center gap-4">
          <span className="text-lg font-medium">Count: {count}</span>
          <Button 
            onClick={async () => {
              await simulateAsyncOperation(1000)
              setCount(prev => prev + 1)
            }}
            variant="small"
            className="bg-teal-600 hover:bg-teal-700 hover:ring-teal-500"
          >
            Increment
          </Button>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="p-6 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Usage in Authentication System
        </h2>
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Login Form</h3>
            <p>Uses default variant with blue styling for the main login action.</p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
            <h3 className="font-medium text-green-800 dark:text-green-200 mb-2">User Management</h3>
            <p>Uses default variant for create/update operations and yellow variant for password changes.</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
            <h3 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Information Page</h3>
            <p>Uses small variant for save operations in forms.</p>
          </div>
        </div>
      </div>
    </div>
  )
} 