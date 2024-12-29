import React from 'react';
import { ArrowUpDown, Settings } from 'lucide-react';
import { EmailCard } from './EmailCard';
import { ColumnSettings } from './ColumnSettings';
import type { Email } from '../types/database';

interface EmailColumnProps {
  title: string;
  emails: Email[];
  selectedIndex: number;
  isEditingMemo: boolean;
  onUpdatePriority: (id: number, priority: number) => void;
  onUpdateMemo: (id: number, memo: string) => void;
  onToggleSort: () => void;
  onUpdateColumn: (settings: { title: string; algorithm: string }) => void;
}

export function EmailColumn({ 
  title, 
  emails,
  selectedIndex,
  isEditingMemo,
  onUpdatePriority, 
  onUpdateMemo,
  onToggleSort,
  onUpdateColumn
}: EmailColumnProps) {
  const [showSettings, setShowSettings] = React.useState(false);

  return (
    <div className="flex-1 min-w-[300px] max-w-md bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-full">
      <div className="flex justify-between items-center p-3 border-b">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleSort}
            className="p-1 hover:bg-gray-100 rounded"
            title="優先順位でソート"
          >
            <ArrowUpDown size={18} />
          </button>
          <button
            onClick={() => setShowSettings(true)}
            className="p-1 hover:bg-gray-100 rounded"
            title="カラム設定"
          >
            <Settings size={18} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {emails.map((email, index) => (
          <EmailCard
            key={email.id}
            email={email}
            isSelected={index === selectedIndex}
            isEditingMemo={isEditingMemo && index === selectedIndex}
            onUpdatePriority={onUpdatePriority}
            onUpdateMemo={onUpdateMemo}
          />
        ))}
      </div>
      {showSettings && (
        <ColumnSettings
          title={title}
          onClose={() => setShowSettings(false)}
          onUpdate={onUpdateColumn}
        />
      )}
    </div>
  );
}