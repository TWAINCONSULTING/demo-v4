import { useState, useMemo } from 'react'

interface UsePaginationOptions {
  totalItems: number
  initialPage?: number
  pageSize?: number
  maxPages?: number
}

export function usePagination({
  totalItems,
  initialPage = 1,
  pageSize = 10,
  maxPages = 5
}: UsePaginationOptions) {
  const [currentPage, setCurrentPage] = useState(initialPage)

  const totalPages = Math.ceil(totalItems / pageSize)

  // Ensure current page is within bounds
  if (currentPage > totalPages) {
    setCurrentPage(totalPages)
  }

  const pageNumbers = useMemo(() => {
    const pages: number[] = []
    const halfMaxPages = Math.floor(maxPages / 2)
    
    let startPage = Math.max(currentPage - halfMaxPages, 1)
    let endPage = Math.min(startPage + maxPages - 1, totalPages)
    
    if (endPage - startPage + 1 < maxPages) {
      startPage = Math.max(endPage - maxPages + 1, 1)
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    
    return pages
  }, [currentPage, totalPages, maxPages])

  return {
    currentPage,
    totalPages,
    pageNumbers,
    setCurrentPage,
    nextPage: () => setCurrentPage(page => Math.min(page + 1, totalPages)),
    prevPage: () => setCurrentPage(page => Math.max(page - 1, 1)),
    firstPage: () => setCurrentPage(1),
    lastPage: () => setCurrentPage(totalPages),
    pageSize,
    startIndex: (currentPage - 1) * pageSize,
    endIndex: Math.min(currentPage * pageSize, totalItems)
  }
}