export interface Account {
  id: number;
  email: string;
  name: string;
  imap_host: string;
  imap_port: number;
  smtp_host: string;
  smtp_port: number;
  created_at: string;
}

export interface Email {
  id: number;
  account_id: number;
  message_id: string;
  from_address: string;
  from_name: string;
  subject: string;
  received_at: string;
  content_preview: string;
  content_full: string;
  category: string;
  is_read: boolean;
  priority: number; // 1: 低, 2: 中, 3: 高
  memo: string;
}

export interface Attachment {
  id: number;
  email_id: number;
  filename: string;
  content_type: string;
  size: number;
  storage_path: string;
}