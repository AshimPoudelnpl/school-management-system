import React from "react";

const Pagination = ({page,totalPages,onPageChange}) => {
  return (
    <div className="flex justify-end space-x-2">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium 
         hover:bg-blue-700 active:scale-95 transition-all shadow-sm
         disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed "
         disabled={page===1}
         onClick={()=>onPageChange(page-1)}
      >
        Prev
      </button>

      <span className="font-semibold"> {page}/{totalPages} </span>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium 
         hover:bg-blue-700 active:scale-95 transition-all shadow-sm
         disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed "
         disabled={page===totalPages}
         onClick={()=>onPageChange(page+1)}
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
