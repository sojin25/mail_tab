import { useState } from 'react';
import { DateFilterType, DateRange, filterEmailsByDate } from '../utils/dateFilters';
import type { Email } from '../types/database';

export function useEmailFiltering(emails: Email[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState<DateFilterType>('all');
  const [customDateRange, setCustomDateRange] = useState<DateRange | undefined>();
  const [sortByPriority, setSortByPriority] = useState(false);

  const filteredEmails = filterEmailsByDate(
    emails.filter(email => {
      if (searchQuery) {
        return email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
               email.content_preview.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return true;
    }),
    dateFilter,
    customDateRange
  );

  const sortedEmails = sortByPriority 
    ? [...filteredEmails].sort((a, b) => b.priority - a.priority)
    : filteredEmails;

  return {
    searchQuery,
    setSearchQuery,
    dateFilter,
    setDateFilter,
    customDateRange,
    setCustomDateRange,
    sortByPriority,
    setSortByPriority,
    sortedEmails
  };
}