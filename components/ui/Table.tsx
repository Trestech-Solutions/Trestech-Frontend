import React from 'react'

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode
}

export function Table({ children, className = '', ...props }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className={`w-full text-left text-sm ${className}`} {...props}>
        {children}
      </table>
    </div>
  )
}

interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode
}

export function TableHeader({ children, className = '', ...props }: TableHeaderProps) {
  return (
    <thead className={`border-b border-border bg-muted ${className}`} {...props}>
      {children}
    </thead>
  )
}

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode
}

export function TableBody({ children, className = '', ...props }: TableBodyProps) {
  return (
    <tbody className={`divide-y divide-border ${className}`} {...props}>
      {children}
    </tbody>
  )
}

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode
  isClickable?: boolean
}

export function TableRow({ children, isClickable = false, className = '', ...props }: TableRowProps) {
  return (
    <tr
      className={`${isClickable ? 'hover:bg-muted cursor-pointer' : ''} transition-colors ${className}`}
      {...props}
    >
      {children}
    </tr>
  )
}

interface TableCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
  isHeader?: boolean
}

export function TableCell({
  children,
  isHeader = false,
  className = '',
  ...props
}: TableCellProps) {
  const Component = isHeader ? 'th' : 'td'
  return (
    <Component
      className={`px-6 py-3 font-medium text-foreground ${isHeader ? 'font-semibold text-gray-700' : 'font-normal'} ${className}`}
      {...(props as any)}
    >
      {children}
    </Component>
  )
}
