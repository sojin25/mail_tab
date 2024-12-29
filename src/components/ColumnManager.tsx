import React from 'react';
import { X } from 'lucide-react';

export interface Column {
  id: string;
  title: string;
  filter: (email: any) => boolean;
}

interface ColumnManagerProps {
  columns: Column[];
  onRemoveColumn: (id: string) => void;
}

export function ColumnManager({ columns, onRemoveColumn }: ColumnManagerProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-b">
      {columns.map((column) => (
        <div
          key={column.id}
          className="flex items-center gap-1 px-2 py-1 bg-white rounded border"
        >
          <span className="text-sm">{column.title}</span>
          <button
            onClick={() => onRemoveColumn(column.id)}
            className="p-0.5 hover:bg-gray-100 rounded"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}