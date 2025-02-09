import React, { forwardRef } from 'react'
import { cn } from '../../utils/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'forum' | 'condo'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  className = 'sm:text-base text-sm',
  asChild = false,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors active:scale-[0.98]'
  
  const variants = {
    primary: 'bg-condo-dark text-light-3 lg:hover:bg-condo-med active:bg-condo-light',
    secondary: 'bg-dark-1 text-condo-dark border border-dark-2 hover:bg-dark-2 hover:border-condo-dark active:hover',
    filter: 'bg-dark-2 text-condo-dark border border-condo-dark hover:bg-condo-dark hover:border-condo-dark hover:text-condo-light active:hover',
    subtle: 'border border-gray-300 text-gray-700 hover:bg-dark-1 active:bg-light-2',
    orange: 'bg-condo-orange text-gray-800 border border-orange-8 hover:bg-orange-8 active:bg-orange-10',
    outline: 'border border-gray-300 text-gray-700 lg:hover:bg-gray-50 active:bg-gray-100',
    forum: 'border border-condo-light bg-light-2 hover:bg-condo-light text-condo-dark',
    condo: 'bg-condo-dark text-light-3 hover:bg-dark-1 hover:text-condo-dark border hover:border-condo-dark'

  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm whitespace-nowrap',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  }

  const Comp = asChild ? 'span' : 'button'

  return (
    <Comp
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    />
  )
})

Button.displayName = 'Button'