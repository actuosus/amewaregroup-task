import React, { useState } from "react";
import { SearchResultsResponse } from "../../lib/api";
import useDarkMode from "../../lib/hooks/useDarkMode";
import Pagination from "../Pagination";
import SearchResultItem from "../SearchResultItem";

interface SearchResultListProps {
  data: SearchResultsResponse;
  pageSize?: number;
}

const SearchResultList = ({ data, pageSize = 10 }: SearchResultListProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const isDarkMode = useDarkMode();
  const pageAmount = Math.round(data.data.length / pageSize);

  const pageItems = data.data.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const handlePageChange = (index: number) => {
    setCurrentPage(index);
  }

  return (
    <div>
      <div className="">
        {pageItems.map((item) => (
          <SearchResultItem key={`item-${item.id}`} item={item} />
        ))}
      </div>
      <p className={`${isDarkMode ? 'text-light' : 'text-dark'}`}>{pageItems.length} of {data.total} total</p>
      <Pagination number={pageAmount} onChange={handlePageChange} />
    </div>
  );
};

export default SearchResultList;
