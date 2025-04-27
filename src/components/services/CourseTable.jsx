import React from "react";

const CourseTable = ({ caption, headers, rows }) => (
  <div className="overflow-x-auto rounded-lg border-2 border-[#141f54] shadow-md mb-6 mt-2">
    <table className="min-w-full text-left outline outline-1 outline-[#141f54]">
      {caption && (
        <caption className="text-base font-semibold text-[#141f54] bg-[#f5f5f5] px-4 py-3 text-center border-b border-[#e0e0e0]">
          {caption}
        </caption>
      )}
      <thead>
        <tr>
          {headers.map((header, i) => (
            <th key={i} className="px-4 py-3 font-bold bg-[#f0f0f0] text-[#141f54] border-b-2 border-[#a00c0c] text-base md:text-lg">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-[#f9f9f9]'} hover:bg-[#f5f5f5] transition-colors`}>
            {row.map((cell, j) => (
              <td 
                key={j} 
                className={`px-4 py-3 text-base md:text-lg border-b border-[#e0e0e0] ${
                  j === 0 ? 'font-medium text-[#141f54]' : 'font-semibold text-[#a00c0c] text-right'
                }`}
              >
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
