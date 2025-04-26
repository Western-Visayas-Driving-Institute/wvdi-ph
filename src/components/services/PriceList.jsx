import React from "react";

const PriceList = ({ items }) => (
  <ul className="divide-y divide-[#F57C00]/20 bg-white rounded-lg border border-[#F57C00]/20 shadow-sm">
    {items.map(([label, price], i) => (
      <li key={i} className="flex justify-between px-4 py-2 text-base">
        <span>{label}</span>
        <span className="font-semibold text-[#F57C00]">{price}</span>
      </li>
    ))}
  </ul>
);

export default PriceList;
