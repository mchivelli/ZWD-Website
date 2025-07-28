import { useState } from 'react'
import { Button } from '@/components/ui/stateful-button'
import { IconEdit, IconDeviceFloppy, IconX } from '@tabler/icons-react'

export default function InfoPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [contactInfo, setContactInfo] = useState({
    phone: '+41 44 123 45 67',
    email: 'info@zivildienst-example.ch',
    address: 'Musterstrasse 123, 8000 Zürich',
    emergencyPhone: '+41 44 987 65 43'
  })
  
  const [schedule, setSchedule] = useState([
    { day: 'Montag', morning: '08:00 - 12:00', afternoon: '13:00 - 17:00' },
    { day: 'Dienstag', morning: '08:00 - 12:00', afternoon: '13:00 - 17:00' },
    { day: 'Mittwoch', morning: '08:00 - 12:00', afternoon: '13:00 - 17:00' },
    { day: 'Donnerstag', morning: '08:00 - 12:00', afternoon: '13:00 - 17:00' },
    { day: 'Freitag', morning: '08:00 - 12:00', afternoon: '13:00 - 16:00' },
    { day: 'Samstag', morning: 'Frei', afternoon: 'Frei' },
    { day: 'Sonntag', morning: 'Frei', afternoon: 'Frei' },
  ])

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Informationen
          </h1>
          <p className="text-muted-foreground">
            Kontaktdaten und Dienstplan verwalten
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isEditing ? (
            <>
              <IconX className="h-4 w-4" />
              Abbrechen
            </>
          ) : (
            <>
              <IconEdit className="h-4 w-4" />
              Bearbeiten
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="p-6 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Kontaktinformationen
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Telefon
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-400">{contactInfo.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                E-Mail
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-400">{contactInfo.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Adresse
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={contactInfo.address}
                  onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-400">{contactInfo.address}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Notfall-Telefon
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={contactInfo.emergencyPhone}
                  onChange={(e) => setContactInfo({...contactInfo, emergencyPhone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-400">{contactInfo.emergencyPhone}</p>
              )}
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="p-6 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Dienstplan (Zeitplan)
          </h2>
          <div className="space-y-3">
            {schedule.map((day, idx) => (
              <div key={idx} className="grid grid-cols-3 gap-4 py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                <div className="font-medium text-gray-700 dark:text-gray-300">
                  {day.day}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {isEditing ? (
                    <input
                      type="text"
                      value={day.morning}
                      onChange={(e) => {
                        const newSchedule = [...schedule]
                        newSchedule[idx].morning = e.target.value
                        setSchedule(newSchedule)
                      }}
                      className="w-full px-2 py-1 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                    />
                  ) : (
                    day.morning
                  )}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {isEditing ? (
                    <input
                      type="text"
                      value={day.afternoon}
                      onChange={(e) => {
                        const newSchedule = [...schedule]
                        newSchedule[idx].afternoon = e.target.value
                        setSchedule(newSchedule)
                      }}
                      className="w-full px-2 py-1 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                    />
                  ) : (
                    day.afternoon
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {isEditing && (
            <div className="mt-4">
              <Button
                onClick={async () => {
                  // Simulate save operation
                  await new Promise(resolve => setTimeout(resolve, 1000))
                  setIsEditing(false)
                }}
                variant="small"
                className="bg-green-600 hover:bg-green-700 hover:ring-green-500"
              >
                <IconDeviceFloppy className="h-4 w-4 mr-2" />
                Speichern
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Additional Information */}
      <div className="p-6 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Wichtige Hinweise
        </h2>
        <div className="space-y-4 text-gray-600 dark:text-gray-400">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Arbeitszeiten</h3>
            <p>Bitte halte die angegebenen Arbeitszeiten ein. Bei Verspätungen oder Abwesenheiten melde dich frühzeitig.</p>
          </div>
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
            <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Notfälle</h3>
            <p>Im Notfall verwende die Notfall-Telefonnummer. Diese ist 24/7 erreichbar.</p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
            <h3 className="font-medium text-green-800 dark:text-green-200 mb-2">Kommunikation</h3>
            <p>Nutze das Portal für interne Kommunikation und das Schwarze Brett für Ankündigungen.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
