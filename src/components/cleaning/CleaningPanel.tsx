'use client';

import React, { useState } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Trash2, UserCheck, Edit3, Save, RotateCcw } from 'lucide-react';
import { removeDuplicates, fillNulls } from '@/lib/csv/cleaner';
import { profileColumn } from '@/lib/csv/profiler';

export function CleaningPanel() {
  const { data, setData } = useDashboardStore();
  const [isApplying, setIsApplying] = useState(false);

  if (!data) return null;

  const handleDedupe = () => {
    setIsApplying(true);
    setTimeout(() => {
      const cleanedRows = removeDuplicates(data.rows);
      const profiles: Record<string, any> = {};
      data.columns.forEach(col => {
        profiles[col] = profileColumn(col, cleanedRows.map(r => r[col]));
      });
      
      setData({
        ...data,
        rowCount: cleanedRows.length,
        rows: cleanedRows,
        profiles
      });
      setIsApplying(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-green-600" />
              <CardTitle>Deduplication</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-500">
              Remove rows that are exact duplicates across all columns.
            </p>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 font-bold uppercase">Current Rows</span>
                <span className="text-xl font-bold">{data.rowCount}</span>
              </div>
              <Button onClick={handleDedupe} disabled={isApplying} variant="outline">
                <Trash2 className="w-4 h-4 mr-2" />
                Remove Duplicates
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-blue-600" />
              <CardTitle>Basic Clean</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-500">
              Quick actions to normalize your data.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <RotateCcw className="w-5 h-5 text-orange-500" />
                <span className="text-xs">Trim Whitespace</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Save className="w-5 h-5 text-emerald-500" />
                <span className="text-xs">Normalize Dates</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Column-Specific Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                <tr>
                  <th className="px-6 py-3 font-bold">Column</th>
                  <th className="px-6 py-3 font-bold">Type</th>
                  <th className="px-6 py-3 font-bold">Nulls</th>
                  <th className="px-6 py-3 font-bold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {Object.values(data.profiles).map((p) => (
                  <tr key={p.name}>
                    <td className="px-6 py-4 font-medium">{p.name}</td>
                    <td className="px-6 py-4">
                      <Badge variant={p.type}>{p.type}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span className={p.nullCount > 0 ? "text-orange-600 font-bold" : "text-gray-400"}>
                        {p.nullCount}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select className="bg-transparent border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-xs">
                        <option>No Action</option>
                        <option>Drop Rows</option>
                        {p.type === 'numeric' && <option>Fill Mean</option>}
                        <option>Fill Custom</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
