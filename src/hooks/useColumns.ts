import { useState } from 'react';
import type { Column } from '../components/ColumnManager';

const defaultColumns: Column[] = [
  {
    id: 'inbox',
    title: '受信トレイ',
    filter: () => true,
  },
  {
    id: 'important',
    title: '重要',
    filter: (email) => email.priority === 3,
  },
  {
    id: 'unread',
    title: '未読',
    filter: (email) => !email.is_read,
  },
];

export function useColumns() {
  const [columns, setColumns] = useState(defaultColumns);

  const addColumn = () => {
    const newColumn: Column = {
      id: `custom-${Date.now()}`,
      title: 'カスタム',
      filter: () => true,
    };
    setColumns([...columns, newColumn]);
  };

  const removeColumn = (id: string) => {
    setColumns(columns.filter(column => column.id !== id));
  };

  const updateColumn = (columnId: string, settings: { title: string; algorithm: string }) => {
    setColumns(columns.map(column => 
      column.id === columnId 
        ? { ...column, title: settings.title }
        : column
    ));
  };

  return {
    columns,
    addColumn,
    removeColumn,
    updateColumn
  };
}