import React from "react";

const CourseTable = ({ caption, headers, rows }) => (
  <div className="overflow-x-auto rounded-lg bg-[#f5f5f5] border border-[#141f54]/20 shadow-sm mb-6 mt-2">
    <table className="min-w-full text-left text-[#141f54]">
      {caption && (
        <caption className="text-base font-semibold text-[#141f54] bg-[#f5f5f5] px-4 py-2 rounded-t-lg">
          {caption}
        </caption>
      )}
      <thead>
        <tr>
          {headers.map((header, i) => (
            <th key={i} className="px-4 py-2 font-semibold bg-[#f5f5f5] text-[#a00c0c] border-b border-[#141f54]/20 text-base md:text-lg">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="even:bg-[#f5f5f5]">
            {row.map((cell, j) => (
              <td key={j} className="px-4 py-2 text-base md:text-lg whitespace-nowrap font-medium text-[#141f54]">
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
