```typescript
import { useState, useCallback } from 'react'
import { validateFile, compressImage, ALLOWED_FILE_TYPES } from '../utils/file'
import { useNotificationStore } from '../store/notificationStore'
import { storage } from '../utils/storage'

interface UploadOptions {
  maxSize?: number
  allowedTypes?: string[]
  compress?: boolean
  onProgress?: (progress: number) => void
}

export function useFileUpload() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const { addNotification } = useNotificationStore()

  const uploadFile = useCallback(async (
    file: File,
    options: UploadOptions = {}
  ) => {
    const {
      maxSize,
      allowedTypes = ALLOWED_FILE_TYPES.all,
      compress = true,
      onProgress
    } = options

    try {
      setUploading(true)
      setProgress(0)

      // Validate file
      const validation = validateFile(file, { maxSize, allowedTypes })
      if (!validation.valid) {
        throw new Error(validation.error)
      }

      // Compress image if needed
      let fileToUpload: File | Blob = file
      if (compress && file.type.startsWith('image/')) {
        fileToUpload = await compressImage(file)
      }

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const next = prev + 10
          onProgress?.(next)
          return next > 90 ? 90 : next
        })
      }, 500)

      // Store in local storage for demo
      const fileId = crypto.randomUUID()
      const fileData = {
        id: fileId,
        name: file.name,
        size: fileToUpload.size,
        type: fileToUpload.type,
        uploadedAt: new Date().toISOString()
      }

      storage.set(`file_${fileId}`, fileData)

      // Clear progress interval
      clearInterval(progressInterval)
      setProgress(100)
      onProgress?.(100)

      addNotification({
        type: 'success',
        message: 'Fil lastet opp',
        duration: 3000
      })

      return fileData
    } catch (error) {
      addNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'Kunne ikke laste opp fil',
        duration: 5000
      })
      throw error
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }, [])

  return {
    uploadFile,
    uploading,
    progress
  }
}
```