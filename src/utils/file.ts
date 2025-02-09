```typescript
export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export const ALLOWED_FILE_TYPES = {
  image: ['image/jpeg', 'image/png', 'image/gif'],
  document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  all: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
}

export function validateFile(file: File, options: {
  maxSize?: number;
  allowedTypes?: string[];
}): { valid: boolean; error?: string } {
  const { maxSize = MAX_FILE_SIZE, allowedTypes = ALLOWED_FILE_TYPES.all } = options

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `Filen er for stor. Maksimal størrelse er ${maxSize / 1024 / 1024}MB`
    }
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Filtypen er ikke støttet'
    }
  }

  return { valid: true }
}

export async function compressImage(file: File, options: {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
} = {}): Promise<Blob> {
  const { maxWidth = 1920, maxHeight = 1080, quality = 0.8 } = options

  return new Promise((resolve, reject) => {
    const img = new Image()
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    img.onload = () => {
      let width = img.width
      let height = img.height

      if (width > maxWidth) {
        height = (height * maxWidth) / width
        width = maxWidth
      }

      if (height > maxHeight) {
        width = (width * maxHeight) / height
        height = maxHeight
      }

      canvas.width = width
      canvas.height = height

      ctx?.drawImage(img, 0, 0, width, height)

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob)
          } else {
            reject(new Error('Kunne ikke komprimere bildet'))
          }
        },
        'image/jpeg',
        quality
      )
    }

    img.onerror = () => reject(new Error('Kunne ikke laste bildet'))
    img.src = URL.createObjectURL(file)
  })
}

export function generateThumbnail(file: File, size: number = 200): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Ikke et bilde'))
      return
    }

    const img = new Image()
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    img.onload = () => {
      const scale = size / Math.max(img.width, img.height)
      canvas.width = img.width * scale
      canvas.height = img.height * scale

      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
      resolve(canvas.toDataURL('image/jpeg', 0.7))
    }

    img.onerror = () => reject(new Error('Kunne ikke generere miniatyrbilde'))
    img.src = URL.createObjectURL(file)
  })
}
```