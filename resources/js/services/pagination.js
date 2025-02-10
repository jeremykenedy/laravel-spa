export function generatePagination(currentPage, totalPages, visiblePages = 5) {
  const pagination = [];
  const halfVisible = Math.floor(visiblePages / 2);

  if (totalPages <= visiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      pagination.push(i);
    }
  } else {
    if (currentPage <= halfVisible) {
      for (let i = 1; i <= visiblePages; i++) {
        pagination.push(i);
      }
      pagination.push('...');
      pagination.push(totalPages);
    } else if (currentPage > totalPages - halfVisible) {
      pagination.push(1);
      pagination.push('...');
      for (let i = totalPages - visiblePages + 1; i <= totalPages; i++) {
        pagination.push(i);
      }
    } else {
      pagination.push(1);
      pagination.push('...');
      for (let i = currentPage - halfVisible + (visiblePages % 2 === 0 ? 1 : 0); i <= currentPage + halfVisible; i++) {
        pagination.push(i);
      }
      pagination.push('...');
      pagination.push(totalPages);
    }
  }

  return pagination;
}
