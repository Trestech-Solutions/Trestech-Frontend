import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-border bg-card p-6 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  action?: React.ReactNode
}

export function CardHeader({
  title,
  subtitle,
  action,
  className = '',
  ...props
}: CardHeaderProps) {
  return (
    <div className={`mb-4 flex items-start justify-between ${className}`} {...props}>
      <div>
        {title && <h3 className="text-lg font-semibold text-foreground">{title}</h3>}
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function CardBody({ children, className = '', ...props }: CardBodyProps) {
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  )
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function CardFooter({ children, className = '', ...props }: CardFooterProps) {
  return (
    <div className={`mt-4 border-t border-border pt-4 ${className}`} {...props}>
      {children}
    </div>
  )
}
