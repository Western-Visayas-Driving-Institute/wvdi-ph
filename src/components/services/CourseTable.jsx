import React from "react";

const CourseTable = ({ caption, headers, rows }) => (
  <div className="overflow-x-auto rounded-lg bg-white border border-[#F57C00]/20 shadow-sm mb-4">
    <table className="min-w-full text-left text-[#333]">
      {caption && (
        <caption className="text-base font-semibold text-[#F57C00] bg-[#FFF3E0] px-4 py-2 rounded-t-lg">
          {caption}
        </caption>
      )}
      <thead>
        <tr>
          {headers.map((header, i) => (
            <th key={i} className="px-4 py-2 font-semibold bg-[#FFF3E0] text-[#F57C00] border-b border-[#F57C00]/20">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="even:bg-[#FFF8E1]">
            {row.map((cell, j) => (
              <td key={j} className="px-4 py-2 text-base whitespace-nowrap">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default CourseTable;
