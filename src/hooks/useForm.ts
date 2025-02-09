import { useState, useCallback } from 'react'
import { getValidationError } from '../utils/validation'

interface FormConfig<T> {
  initialValues: T
  onSubmit: (values: T) => void | Promise<void>
  validateOnChange?: boolean
}

export function useForm<T extends Record<string, any>>({ 
  initialValues, 
  onSubmit,
  validateOnChange = false
}: FormConfig<T>) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateField = useCallback((name: keyof T, value: string) => {
    const error = getValidationError(name as string, value)
    setErrors(prev => ({
      ...prev,
      [name]: error
    }))
    return !error
  }, [])

  const validateForm = useCallback(() => {
    const newErrors: Partial<Record<keyof T, string>> = {}
    let isValid = true

    Object.keys(values).forEach((key) => {
      const error = getValidationError(key, values[key])
      if (error) {
        newErrors[key as keyof T] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }, [values])

  const handleChange = useCallback((
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setValues(prev => ({
      ...prev,
      [name]: value
    }))

    if (validateOnChange) {
      validateField(name as keyof T, value)
    }
  }, [validateOnChange, validateField])

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      await onSubmit(values)
    } finally {
      setIsSubmitting(false)
    }
  }, [values, validateForm, onSubmit])

  const resetForm = useCallback(() => {
    setValues(initialValues)
    setErrors({})
  }, [initialValues])

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setValues,
    setErrors
  }
}