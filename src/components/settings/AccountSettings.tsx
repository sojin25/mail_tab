import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { Account } from '../../types/database';

export function AccountSettings() {
  const [accounts, setAccounts] = useState<Account[]>([]);

  const handleAddAccount = () => {
    const newAccount: Account = {
      id: Date.now(),
      email: '',
      name: '',
      imap_host: '',
      imap_port: 993,
      smtp_host: '',
      smtp_port: 587,
      created_at: new Date().toISOString()
    };
    setAccounts([...accounts, newAccount]);
  };

  const handleRemoveAccount = (id: number) => {
    setAccounts(accounts.filter(account => account.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">メールアカウント</h3>
        <button
          onClick={handleAddAccount}
          className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <Plus size={16} />
          アカウント追加
        </button>
      </div>

      <div className="space-y-4">
        {accounts.map(account => (
          <div key={account.id} className="border rounded-lg p-4">
            <div className="flex justify-between mb-4">
              <h4 className="font-medium">アカウント設定</h4>
              <button
                onClick={() => handleRemoveAccount(account.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  メールアドレス
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="example@domain.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  表示名
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="表示名"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  IMAPサーバー
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="imap.example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  IMAPポート
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-md"
                  defaultValue={993}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SMTPサーバー
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="smtp.example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SMTPポート
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-md"
                  defaultValue={587}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}