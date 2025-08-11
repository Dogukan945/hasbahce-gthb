"use client";

import clsx from "clsx";

export interface TabItem {
  id: string;
  label: string;
}

export default function Tabs({
  items,
  activeId,
  onChange,
  className,
}: {
  items: TabItem[];
  activeId: string;
  onChange: (id: TabItem['id']) => void;
  className?: string;
}) {
  return (
    <div className={clsx("bg-white rounded-2xl shadow-lg p-2", className)}>
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => onChange(it.id)}
            className={clsx(
              "px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all duration-200",
              activeId === it.id
                ? "bg-red-600 text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-700"
            )}
            aria-current={activeId === it.id ? "page" : undefined}
          >
            {it.label}
          </button>
        ))}
      </div>
    </div>
  );
}


