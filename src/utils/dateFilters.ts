import { Email } from '../types/database';

export type DateFilterType = 'all' | 'today' | 'yesterday' | 'week' | 'month' | 'custom';

export interface DateRange {
  start: Date;
  end: Date;
}

export function isInDateRange(date: Date, range: DateRange): boolean {
  return date >= range.start && date <= range.end;
}

export function getDateRange(filterType: DateFilterType, customRange?: DateRange): DateRange {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (filterType) {
    case 'today':
      return {
        start: today,
        end: now,
      };
    case 'yesterday': {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      return {
        start: yesterday,
        end: new Date(today),
      };
    }
    case 'week': {
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      return {
        start: weekAgo,
        end: now,
      };
    }
    case 'month': {
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      return {
        start: monthStart,
        end: now,
      };
    }
    case 'custom':
      return customRange || { start: new Date(0), end: now };
    default:
      return { start: new Date(0), end: now };
  }
}

export function filterEmailsByDate(
  emails: Email[],
  filterType: DateFilterType,
  customRange?: DateRange
): Email[] {
  const range = getDateRange(filterType, customRange);
  return emails.filter(email => {
    const emailDate = new Date(email.received_at);
    return isInDateRange(emailDate, range);
  });
}