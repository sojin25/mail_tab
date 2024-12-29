import React, { useState } from 'react';
import { X } from 'lucide-react';
import { DateRange } from '../utils/dateFilters';

interface DateRangePickerProps {
  onSelect: (range: DateRange) => void;
  onClose: () => void;
}

export function DateRangePicker({ onSelect, onClose }: DateRangePickerProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (startDate && endDate) {
      onSelect({
        start: new Date(startDate),
        end: new Date(endDate),
      });
    }
  };

  return (
    <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border p-4 z-50 w-72">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium">期間を指定</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <X size={16} />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">開始日</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-sm"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">終了日</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-sm"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            適用
          </button>
        </div>
      </form>
    </div>
  );
}