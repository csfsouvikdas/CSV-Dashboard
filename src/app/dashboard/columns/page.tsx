'use client';

import React from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { ColumnCard } from '@/components/profiler/ColumnCard';

export default function ColumnsPage() {
  const { data } = useDashboardStore();

  if (!data) return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <p className="text-gray-400">Please upload a CSV file to see column profiles.</p>
    </div>
  );

  const profiles = Object.values(data.profiles);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Column Profiles</h1>
        <p className="text-gray-500 text-sm">Detailed analysis of {profiles.length} detected columns.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {profiles.map((profile) => (
          <ColumnCard key={profile.name} profile={profile} />
        ))}
      </div>
    </div>
  );
}
