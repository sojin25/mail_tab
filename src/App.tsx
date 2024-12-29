import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { EmailColumn } from './components/EmailColumn';
import { EmailDetail } from './components/EmailDetail';
import { Header } from './components/Header';
import { ColumnManager } from './components/ColumnManager';
import { mockEmails } from './mock/emails';
import { useColumns } from './hooks/useColumns';
import { useEmailFiltering } from './hooks/useEmailFiltering';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';

export function App() {
  const { columns, addColumn, removeColumn, updateColumn } = useColumns();
  const {
    searchQuery,
    setSearchQuery,
    dateFilter,
    setDateFilter,
    sortByPriority,
    setSortByPriority,
    sortedEmails
  } = useEmailFiltering(mockEmails);

  const [activeColumnIndex, setActiveColumnIndex] = useState(0);
  const activeEmails = sortedEmails.filter(columns[activeColumnIndex].filter);

  const {
    selectedIndex,
    selectedEmail,
    setSelectedEmail,
    isEditingMemo,
    setIsEditingMemo
  } = useKeyboardNavigation(
    activeEmails,
    activeColumnIndex,
    columns.length,
    setActiveColumnIndex
  );

  const handleUpdatePriority = (id: number, priority: number) => {
    console.log('Update priority:', id, priority);
  };

  const handleUpdateMemo = (id: number, memo: string) => {
    console.log('Update memo:', id, memo);
    setIsEditingMemo(false);
  };

  return (
    <Layout>
      <Header
        onAddColumn={addColumn}
        onSearch={setSearchQuery}
        onDateFilterChange={setDateFilter}
      />
      <ColumnManager
        columns={columns}
        onRemoveColumn={removeColumn}
      />
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 flex gap-4 overflow-auto p-4">
          {columns.map((column, index) => (
            <EmailColumn
              key={column.id}
              title={column.title}
              emails={sortedEmails.filter(column.filter)}
              selectedIndex={index === activeColumnIndex ? selectedIndex : -1}
              isEditingMemo={isEditingMemo && index === activeColumnIndex}
              onUpdatePriority={handleUpdatePriority}
              onUpdateMemo={handleUpdateMemo}
              onToggleSort={() => setSortByPriority(!sortByPriority)}
              onUpdateColumn={(settings) => updateColumn(column.id, settings)}
            />
          ))}
        </div>
        {selectedEmail && (
          <div className="h-1/3 border-t bg-white">
            <EmailDetail
              email={selectedEmail}
              onClose={() => setSelectedEmail(null)}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}