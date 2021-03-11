import { useState } from "react";

interface PaginationProps {
  number: number;
  onChange: (index: number) => void;
}

const maxNumber = 36;

const Pagination = ({ number, onChange }: PaginationProps) => {
  const [selection, setSelection] = useState(0);

  const update = (index: number) => {
    setSelection(index);
    onChange(index);
  };

  const handleChange = (index: number) => () => {
    update(index);
  };

  const handlePrev = () => {
    if (selection >= 0) {
      update(selection - 1);
    }
  };
  const handleNext = () => {
    if (selection < number) {
      update(selection + 1);
    }
  };

  if (number <= 0) {
    return null;
  }

  const numbers = [];

  if (number > maxNumber) {
    for (let i = 0; i < maxNumber / 2; i++) {
      numbers.push(i + 1);
    }
    numbers.push("…");
    for (let i = number - maxNumber / 2; i < number; i++) {
      numbers.push(i + 1);
    }
  } else {
    for (let i = 0; i < number; i++) {
      numbers.push(i + 1);
    }
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className={`pagination ${number > maxNumber ? "pagination-sm" : ""}`}>
        <li className={`page-item ${selection <= 0 ? "disabled" : ""}`}>
          <button className="page-link" onClick={handlePrev}>
            Previous
          </button>
        </li>
        {numbers.map((_, i) => (
          <li
            key={`page-item-${i}`}
            className={`page-item ${selection + 1 === _ ? "active" : ""} ${
              _ === "…" ? "disabled" : ""
            }`}
          >
            <button className="page-link" onClick={handleChange((_ as number) - 1)}>
              {_}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${selection >= number - 1 ? "disabled" : ""}`}
        >
          <button className="page-link" onClick={handleNext}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
