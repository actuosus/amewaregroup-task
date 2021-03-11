import { useState } from "react";

interface PaginationProps {
  number: number;
  onChange: (index: number) => void;
}

const Pagination = ({ number, onChange}: PaginationProps) => {
  const [selection, setSelection] = useState(0);

  const update = (index: number) => {
    setSelection(index);
    onChange(index);
  }

  const handleChange = (index: number) => () => {
    update(index);
  };

  const handlePrev = () => {
    if (selection >= 0) {
      update(selection - 1);
    }
  }
  const handleNext = () => {
    if (selection < number) {
      update(selection + 1);
    }
  }

  if (number <= 0) {
    return null;
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination pagination-sm">
        <li className={`page-item ${selection <= 0 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={handlePrev}>
            Previous
          </button>
        </li>
        {Array(number)
          .fill(null)
          .map((_, i) => (
            <li key={`page-item-${i}`} className={`page-item ${selection === i ? 'active' : ''}`}>
              <button className="page-link" onClick={handleChange(i)}>
                {i + 1}
              </button>
            </li>
          ))}
        <li className={`page-item ${selection >= number - 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={handleNext}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
