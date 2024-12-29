import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ColumnSettingsProps {
  title: string;
  onClose: () => void;
  onUpdate: (settings: { title: string; algorithm: string }) => void;
}

export function ColumnSettings({ title, onClose, onUpdate }: ColumnSettingsProps) {
  const [columnTitle, setColumnTitle] = useState(title);
  const [algorithm, setAlgorithm] = useState('simple');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ title: columnTitle, algorithm });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">カラム設定</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                カラム名
              </label>
              <input
                type="text"
                value={columnTitle}
                onChange={(e) => setColumnTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                クラスタリングアルゴリズム
              </label>
              <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="simple">シンプル（送信者/件名ベース）</option>
                <option value="content">コンテンツベース</option>
                <option value="time">時系列ベース</option>
                <option value="custom">カスタム</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                キャンセル
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                保存
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}