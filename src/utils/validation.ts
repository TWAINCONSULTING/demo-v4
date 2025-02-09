export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): boolean => {
  return password.length >= 8
}

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0
}

export const validateApartmentNumber = (apartment: string): boolean => {
  const apartmentRegex = /^\d{1,3}[A-Za-z]?$/
  return apartmentRegex.test(apartment)
}

export const getValidationError = (field: string, value: string): string | null => {
  switch (field) {
    case 'email':
      return !validateEmail(value) ? 'Ugyldig e-postadresse' : null
    case 'password':
      return !validatePassword(value) ? 'Passordet må være minst 8 tegn' : null
    case 'apartment':
      return !validateApartmentNumber(value) ? 'Ugyldig leilighetsnummer' : null
    default:
      return !validateRequired(value) ? 'Dette feltet er påkrevd' : null
  }
}