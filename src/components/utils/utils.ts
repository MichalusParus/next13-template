export const getResponsiveValues = (array: any[]) => {
  return [array[0], array[1] ? array[1] : array[0], array[2] ? array[2] : array[1] ? array[1] : array[0]]
}

export const slugify = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const availablePages = (data: any[], itemsPerPage: number) => {
  const x = data.length % itemsPerPage === 0 ? data.length / itemsPerPage - 1 : data.length / itemsPerPage
  const result = []
  for (let i = 0; i <= x; i++) {
    result.push(i + 1)
  }
  return result
}
