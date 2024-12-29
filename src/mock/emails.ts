import type { Email } from '../types/database';

export const mockEmails: Email[] = [
  {
    id: 1,
    account_id: 1,
    message_id: '1',
    from_address: 'sender1@example.com',
    from_name: '送信者1',
    subject: 'プロジェクトの進捗について',
    received_at: '2024-03-20T10:00:00Z',
    content_preview: 'プロジェクトの進捗状況をご報告いたします...',
    content_full: 'プロジェクトの進捗状況をご報告いたします。\n\n現在の進捗は予定通り80%となっております。',
    category: 'work',
    is_read: false,
    priority: 3,
    memo: '要対応'
  },
  {
    id: 2,
    account_id: 1,
    message_id: '2',
    from_address: 'sender2@example.com',
    from_name: '送信者2',
    subject: '週末の予定確認',
    received_at: '2024-03-20T09:30:00Z',
    content_preview: '週末の予定について確認させていただきたく...',
    content_full: '週末の予定について確認させていただきたく、メールいたしました。',
    category: 'personal',
    is_read: true,
    priority: 2,
    memo: ''
  },
  // 必要に応じてさらにモックデータを追加
];