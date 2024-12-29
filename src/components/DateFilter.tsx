import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { DateFilterType, DateRange } from '../utils/dateFilters';
import { DateRangePicker } from './DateRangePicker';

interface DateFilterProps {
  onChange: (filter: DateFilterType, customRange?: DateRange) => void;
}

export function DateFilter({ onChange }: DateFilterProps) {
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [filterType, setFilterType] = useState<DateFilterType>('all');

  const handleFilterChange = (type: DateFilterType) => {
    setFilterType(type);
    if (type !== 'custom') {
      onChange(type);
    } else {
      setShowCustomPicker(true);
    }
  };

  const handleCustomRange = (range: DateRange) => {
    onChange('custom', range);
    setShowCustomPicker(false);
  };

  return (
    <div className="flex items-center gap-2 relative">
      <Calendar size={18} className="text-gray-500" />
      <select
        value={filterType}
        onChange={(e) => handleFilterChange(e.target.value as DateFilterType)}
        className="border-gray-300 rounded-md text-sm"
      >
        <option value="all">すべて</option>
        <option value="today">今日</option>
        <option value="yesterday">昨日</option>
        <option value="week">今週</option>
        <option value="month">今月</option>
        <option value="custom">期間を指定</option>
      </select>

      {showCustomPicker && (
        <DateRangePicker
          onSelect={handleCustomRange}
          onClose={() => setShowCustomPicker(false)}
        />
      )}
    </div>
  );
}