import { useEffect } from 'react'
import { X } from 'lucide-react'
import { useNotificationStore, NotificationType } from '../../store/notificationStore'
import { cn } from '../../utils/cn'

const notificationStyles: Record<NotificationType, string> = {
  success: 'bg-green-50 text-green-800 border-green-200',
  error: 'bg-red-50 text-red-800 border-red-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200'
}

export function Notifications() {
  const { notifications, removeNotification } = useNotificationStore()

  useEffect(() => {
    return () => {
      notifications.forEach((notification) => {
        if (notification.duration) {
          const timer = setTimeout(() => {
            removeNotification(notification.id)
          }, notification.duration)
          return () => clearTimeout(timer)
        }
      })
    }
  }, [notifications, removeNotification])

  if (notifications.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg border shadow-sm',
            notificationStyles[notification.type]
          )}
        >
          <p>{notification.message}</p>
          <button
            onClick={() => removeNotification(notification.id)}
            className="p-1 hover:bg-black/5 rounded-full transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
}