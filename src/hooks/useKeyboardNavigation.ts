import { useEffect, useState } from 'react';
import type { Email } from '../types/database';

export function useKeyboardNavigation(
  emails: Email[],
  columnIndex: number,
  totalColumns: number,
  onChangeColumn: (index: number) => void
) {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isEditingMemo, setIsEditingMemo] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isEditingMemo) return;
      if (emails.length === 0) return;

      switch (e.key) {
        case 'Tab':
          e.preventDefault();
          if (e.shiftKey) {
            onChangeColumn(Math.max(0, columnIndex - 1));
          } else {
            onChangeColumn(Math.min(totalColumns - 1, columnIndex + 1));
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(0, prev - 1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(emails.length - 1, prev + 1));
          break;
        case 'Enter':
          if (e.metaKey && selectedEmail) {
            setIsEditingMemo(true);
          } else if (selectedIndex >= 0) {
            setSelectedEmail(emails[selectedIndex]);
          }
          break;
        case 'Escape':
          setSelectedEmail(null);
          setIsEditingMemo(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [emails, selectedIndex, columnIndex, totalColumns, isEditingMemo, selectedEmail]);

  useEffect(() => {
    if (selectedIndex >= 0 && selectedIndex < emails.length) {
      setSelectedEmail(emails[selectedIndex]);
    }
  }, [selectedIndex, emails]);

  return {
    selectedIndex,
    selectedEmail,
    setSelectedEmail,
    isEditingMemo,
    setIsEditingMemo
  };
}