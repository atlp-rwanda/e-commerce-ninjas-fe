/* eslint-disable */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { Empty } from "antd";

const Table = ({ headers, rows, title }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const currentRows = rows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  return (
    <>
      <div className="table__header__">
        <h2 className="table__title">{title}</h2>
        <div className="pagination">
          <span>Page</span>
          <select
            name="page"
            id="page"
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
          >
            {[...Array(totalPages).keys()].map((page) => (
              <option key={page + 1} value={page + 1}>
                {page + 1}
              </option>
            ))}
          </select>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="btn-line"
          >
            <IoIosArrowRoundBack />
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <IoIosArrowRoundForward />
          </button>
        </div>
      </div>
      <div className="table__container">
        {rows.length <= 0 ? (
             <div className="empty-container">
             <Empty
               image={Empty.PRESENTED_IMAGE_SIMPLE}
               description={"No Data"}
             />
           </div>
        ): <table className="dynamic__table">
        <thead>
          <tr className="table__header">
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            currentRows.map((row, rowIndex) => (
              <tr key={rowIndex} className="table__body">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>}
        
      </div>
    </>
  );
};

Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default Table;
