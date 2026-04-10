'use client';

import React from 'react';
import { CleaningPanel } from '@/components/cleaning/CleaningPanel';

export default function CleanPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Data Cleaning</h1>
        <p className="text-gray-500 text-sm">Repair, normalize, and deduplicate your dataset.</p>
      </div>

      <CleaningPanel />
    </div>
  );
}
