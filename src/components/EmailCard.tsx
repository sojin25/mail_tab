import React, { useState, useEffect, useRef } from 'react';
import { Star, Edit3, Flag } from 'lucide-react';
import type { Email } from '../types/database';

interface EmailCardProps {
  email: Email;
  isSelected: boolean;
  isEditingMemo: boolean;
  onUpdatePriority: (id: number, priority: number) => void;
  onUpdateMemo: (id: number, memo: string) => void;
}

export function EmailCard({ 
  email, 
  isSelected, 
  isEditingMemo,
  onUpdatePriority, 
  onUpdateMemo 
}: EmailCardProps) {
  const [memo, setMemo] = useState(email.memo);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const priorityColors = {
    1: 'text-gray-400',
    2: 'text-yellow-500',
    3: 'text-red-500'
  };

  useEffect(() => {
    if (isEditingMemo && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditingMemo]);

  const handleMemoKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.metaKey) {
      e.preventDefault();
      onUpdateMemo(email.id, memo);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${
      isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
    } p-3 hover:shadow-md transition-all`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-gray-900">{email.subject}</h3>
          <p className="text-sm text-gray-600">{email.from_name}</p>
          <p className="text-xs text-gray-500">{email.from_address}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onUpdatePriority(email.id, ((email.priority % 3) + 1))}
            className={`${priorityColors[email.priority as keyof typeof priorityColors]}`}
          >
            <Flag size={18} />
          </button>
        </div>
      </div>
      
      {(isSelected || memo) && (
        <div className="mt-2">
          {isEditingMemo ? (
            <textarea
              ref={textareaRef}
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              onKeyDown={handleMemoKeyDown}
              placeholder="メモを入力（⌘+Enterで保存）"
              className="w-full p-2 border rounded-md text-sm min-h-[60px] focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          ) : memo ? (
            <div className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
              {memo}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}