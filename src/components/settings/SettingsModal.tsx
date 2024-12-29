import React, { useState } from 'react';
import { X } from 'lucide-react';
import { AccountSettings } from './AccountSettings';
import { ClusteringSettings } from './ClusteringSettings';

type SettingsTab = 'accounts' | 'clustering';

interface SettingsModalProps {
  onClose: () => void;
}

export function SettingsModal({ onClose }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>('accounts');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[800px] max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">設定</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex border-b">
          <button
            className={`px-4 py-2 ${activeTab === 'accounts' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('accounts')}
          >
            メールアカウント
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'clustering' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('clustering')}
          >
            クラスタリング設定
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'accounts' ? (
            <AccountSettings />
          ) : (
            <ClusteringSettings />
          )}
        </div>
      </div>
    </div>
  );
}