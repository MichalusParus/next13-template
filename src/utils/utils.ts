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

export const getSelectOptions = (array: string[]) => {
  const selectOptions = array.map((label) => ({ label: label, value: slugify(label) }))
  return selectOptions
}
