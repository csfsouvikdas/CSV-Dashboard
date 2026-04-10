'use client';

import React from 'react';
import { CorrelationMatrix } from '@/components/correlations/CorrelationMatrix';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export default function CorrelationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Correlation Matrix</h1>
        <p className="text-gray-500 text-sm">Discover relationships between numeric variables using Pearson's r.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Variable Relationships</CardTitle>
        </CardHeader>
        <CardContent>
          <CorrelationMatrix />
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-500">
            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 dark:text-gray-100">How to read this?</h4>
              <p>Positive values (Blue) indicate that as one variable increases, the other also tends to increase. Negative values (Red) indicate that as one variable increases, the other tends to decrease.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 dark:text-gray-100">Significance</h4>
              <p>Cells with a star (★) represent strong correlations (|r| &gt; 0.7). These might indicate redundancy in your dataset or important causal relationships.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
