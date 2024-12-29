import React, { useState } from 'react';
import { Mail, Settings, Search, Calendar, Plus } from 'lucide-react';
import { DateFilter } from './DateFilter';
import { SearchBar } from './SearchBar';
import { SettingsModal } from './settings/SettingsModal';

interface HeaderProps {
  onAddColumn: () => void;
  onSearch: (query: string) => void;
  onDateFilterChange: (filter: string) => void;
}

export function Header({ onAddColumn, onSearch, onDateFilterChange }: HeaderProps) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <header className="bg-white border-b px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="text-blue-500" />
            <h1 className="text-xl font-semibold">メールクライアント</h1>
          </div>
          <div className="flex items-center gap-4">
            <SearchBar onSearch={onSearch} />
            <DateFilter onChange={onDateFilterChange} />
            <button
              onClick={onAddColumn}
              className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              <Plus size={16} />
              カラム追加
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
      </header>

      {showSettings && (
        <SettingsModal onClose={() => setShowSettings(false)} />
      )}
    </>
  );
}