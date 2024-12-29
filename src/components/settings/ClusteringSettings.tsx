import React, { useState } from 'react';

interface ClusteringRule {
  id: string;
  type: 'organization' | 'content' | 'domain';
  value: string;
}

export function ClusteringSettings() {
  const [rules, setRules] = useState<ClusteringRule[]>([]);

  const handleAddRule = (type: ClusteringRule['type']) => {
    const newRule: ClusteringRule = {
      id: Date.now().toString(),
      type,
      value: ''
    };
    setRules([...rules, newRule]);
  };

  const handleRemoveRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">クラスタリングルール</h3>
        <div className="flex gap-2">
          <button
            onClick={() => handleAddRule('organization')}
            className="px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            組織ルール追加
          </button>
          <button
            onClick={() => handleAddRule('content')}
            className="px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            内容ルール追加
          </button>
          <button
            onClick={() => handleAddRule('domain')}
            className="px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            ドメインルール追加
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {rules.map(rule => (
          <div key={rule.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">
                {rule.type === 'organization' && '組織ルール'}
                {rule.type === 'content' && '内容ルール'}
                {rule.type === 'domain' && 'ドメインルール'}
              </span>
              <button
                onClick={() => handleRemoveRule(rule.id)}
                className="text-red-500 hover:text-red-600"
              >
                削除
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {rule.type === 'organization' && '組織名'}
                {rule.type === 'content' && 'キーワード'}
                {rule.type === 'domain' && 'ドメイン'}
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                placeholder={
                  rule.type === 'organization' ? '例: 株式会社Example' :
                  rule.type === 'content' ? '例: 請求書,見積もり' :
                  '例: example.com'
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}