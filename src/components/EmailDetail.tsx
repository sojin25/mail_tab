import React from 'react';
import { X } from 'lucide-react';
import type { Email } from '../types/database';

interface EmailDetailProps {
  email: Email;
  onClose: () => void;
}

export function EmailDetail({ email, onClose }: EmailDetailProps) {
  return (
    <div className="w-1/2 bg-white border-l">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold">{email.subject}</h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <X size={20} />
        </button>
      </div>
      <div className="p-4">
        <div className="mb-4">
          <p className="font-semibold">{email.from_name}</p>
          <p className="text-gray-600">{email.from_address}</p>
          <p className="text-gray-500 text-sm">
            {new Date(email.received_at).toLocaleString()}
          </p>
        </div>
        <div className="prose max-w-none">
          {email.content_full}
        </div>
      </div>
    </div>
  );
}