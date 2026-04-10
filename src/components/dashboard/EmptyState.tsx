'use client';

import React from 'react';
import { UploadZone } from '@/components/upload/UploadZone';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          Build your <span className="text-[#185FA5]">Insights</span>.
        </h1>
        <p className="text-gray-500 text-lg max-w-md mx-auto">
          Upload a CSV file and watch as we automatically profile, analyze, and visualize your data.
        </p>
      </div>
      
      <div className="w-full max-w-2xl">
        <UploadZone />
      </div>
    </div>
  );
}
