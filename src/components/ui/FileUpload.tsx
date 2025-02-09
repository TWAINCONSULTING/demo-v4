```typescript
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, File, Image } from 'lucide-react'
import { useFileUpload } from '../../hooks/useFileUpload'
import { generateThumbnail } from '../../utils/file'
import { Button } from './Button'
import { cn } from '../../utils/cn'

interface FileUploadProps {
  onUpload: (files: File[]) => void
  maxFiles?: number
  accept?: Record<string, string[]>
  maxSize?: number
  className?: string
}

export function FileUpload({
  onUpload,
  maxFiles = 1,
  accept,
  maxSize,
  className
}: FileUploadProps) {
  const { uploadFile, uploading, progress } = useFileUpload()
  const [previews, setPreviews] = React.useState<string[]>([])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      // Generate thumbnails for images
      const newPreviews = await Promise.all(
        acceptedFiles.map(async file => {
          if (file.type.startsWith('image/')) {
            return await generateThumbnail(file)
          }
          return ''
        })
      )

      setPreviews(prev => [...prev, ...newPreviews])
      onUpload(acceptedFiles)
    } catch (error) {
      console.error('Error handling files:', error)
    }
  }, [onUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    accept,
    maxSize
  })

  return (
    <div className={className}>
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500',
          uploading && 'pointer-events-none opacity-50'
        )}
      >
        <input {...getInputProps()} />
        <Upload className="h-8 w-8 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600">
          {isDragActive
            ? 'Slipp filen her ...'
            : 'Dra og slipp filer her, eller klikk for å velge filer'}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Maks filstørrelse: {maxSize ? `${maxSize / 1024 / 1024}MB` : '10MB'}
        </p>
      </div>

      {previews.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative">
              {preview ? (
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                  <File className="h-8 w-8 text-gray-400" />
                </div>
              )}
              <Button
                size="sm"
                variant="outline"
                className="absolute top-2 right-2"
                onClick={() => {
                  setPreviews(prev => prev.filter((_, i) => i !== index))
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {uploading && (
        <div className="mt-4">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
```