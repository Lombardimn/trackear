export function formatDate(isoString: string) {
  const date = new Date(isoString)
  
  const formatter = new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })

  return formatter.format(date)
}