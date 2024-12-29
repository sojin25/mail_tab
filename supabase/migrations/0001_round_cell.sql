-- メールテーブルに新しいカラムを追加
ALTER TABLE emails ADD COLUMN priority INTEGER DEFAULT 1;
ALTER TABLE emails ADD COLUMN memo TEXT;