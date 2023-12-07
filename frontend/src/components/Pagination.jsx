const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const maxButtons = 5;
  
    const handlePageChange = (newPage) => {
      if (newPage >= 1 && newPage <= totalPages) {
        onPageChange(newPage);
      }
    };
  
    const renderPaginationButtons = () => {
      const buttons = [];
      const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  
      for (let i = startPage; i < Math.min(startPage + maxButtons, totalPages + 1); i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-3 py-1 mx-1 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-full ${currentPage === i ? 'bg-gray-300' : ''}`}
          >
            {i}
          </button>
        );
      }
  
      return buttons;
    };
  
    return (
      <div className="flex justify-center overflow-x-auto m-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-3 py-1 mx-1 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-full ${currentPage === 1 ? 'bg-gray-300' : ''}`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {renderPaginationButtons()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-3 py-1 mx-1 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-full ${currentPage === totalPages ? 'bg-gray-300' : ''}`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };
export default Pagination;