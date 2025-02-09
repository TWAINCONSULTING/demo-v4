import { format, isToday, isYesterday } from 'date-fns'
import { nb } from 'date-fns/locale'

export const formatDate = (date: Date): string => {
  if (isToday(date)) {
    return 'I dag'
  }
  if (isYesterday(date)) {
    return 'I går'
  }
  return format(date, "dd.MM.yyyy", { locale: nb })
}

export const formatTime = (date: Date): string => {
  return format(date, "HH:mm", { locale: nb })
}

export const formatDateTime = (date: Date): string => {
  return `${formatDate(date)} ${formatTime(date)}`
}