import { Button } from "react-bootstrap";

const PaginationControl = ({
  page,
  between,
  total,
  limit,
  changePage,
  ellipsis,
  links,
}) => {
  // ...

  const handlePageChange = (newPage) => {
    changePage(newPage);
  };

  const renderPageButtons = (
    currentPage,
    totalPages,
    limit,
    between,
    ellipsis,
    handlePageChange
  ) => {
    const pageButtons = [];

    // Calculate the range of page numbers to display
    const startPage = Math.max(1, currentPage - between);
    const endPage = Math.min(totalPages, currentPage + between);

    // Render page buttons for the range
    for (let page = startPage; page <= endPage; page++) {
      pageButtons.push(
        <Button
          key={page}
          className={page === currentPage ? "active" : ""}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Button>
      );
    }

    // Add ellipsis if needed
    if (startPage > ellipsis + 1) {
      pageButtons.unshift(
        <span key="start-ellipsis" className="ellipsis">
          ...
        </span>
      );
    }
    if (endPage < totalPages - ellipsis) {
      pageButtons.push(
        <span key="end-ellipsis" className="ellipsis">
          ...
        </span>
      );
    }

    return pageButtons;
  };

  return (
    <div className="pagination-control">
      {links.prevPage && (
        <Button
          variant="primary"
          className="prev-button"
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </Button>
      )}

      {renderPageButtons(
        page,
        total,
        limit,
        between,
        ellipsis,
        handlePageChange
      )}

      {links.nextPage && (
        <Button
          variant="primary"
          className="next-button"
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </Button>
      )}
    </div>
  );
};
export default PaginationControl;
