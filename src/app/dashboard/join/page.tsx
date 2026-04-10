'use client';

import React from 'react';
import { JoinPanel } from '@/components/join/JoinPanel';

export default function JoinPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Multi-CSV Join</h1>
        <p className="text-gray-500 text-sm">Combine data from two different CSV files using a common key.</p>
      </div>

      <JoinPanel />
    </div>
  );
}
