import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="flex-1 flex flex-col min-h-0">
        {children}
      </div>
    </div>
  );
}