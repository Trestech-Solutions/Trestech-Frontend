export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function formatOrderStatus(status: string): string {
  const statusMap: Record<string, string> = {
    pending: 'Pending',
    preparing: 'Preparing',
    ready: 'Ready',
    completed: 'Completed',
    cancelled: 'Cancelled',
  }
  return statusMap[status] || status
}

export function getStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    pending: 'bg-amber-bg text-amber border-amber-bg',
    preparing: 'bg-blue-bg text-blue border-blue-border',
    ready: 'bg-green-bg text-green border-green-border',
    completed: 'bg-green-bg text-green border-green-border',
    cancelled: 'bg-red-bg text-red',
  }
  return colorMap[status] || 'bg-gray-100 text-gray-700'
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}
