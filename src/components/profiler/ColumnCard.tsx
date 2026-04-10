'use client';

import React from 'react';
import { ColumnProfile } from '@/types/csv';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatNumber } from '@/lib/utils';
import { 
  Hash, 
  Type, 
  Calendar, 
  ToggleLeft, 
  HelpCircle,
  BarChart2
} from 'lucide-react';

interface ColumnCardProps {
  profile: ColumnProfile;
}

export function ColumnCard({ profile }: ColumnCardProps) {
  const Icon = {
    numeric: Hash,
    categorical: BarChart2,
    date: Calendar,
    boolean: ToggleLeft,
    text: Type,
  }[profile.type] || HelpCircle;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${
              profile.type === 'numeric' ? 'bg-blue-50 text-blue-600' :
              profile.type === 'categorical' ? 'bg-green-50 text-green-600' :
              'bg-gray-50 text-gray-600'
            }`}>
              <Icon className="w-4 h-4" />
            </div>
            <CardTitle className="text-sm font-bold truncate max-w-[120px]">
              {profile.name}
            </CardTitle>
          </div>
          <Badge variant={profile.type} className="capitalize px-2 py-0">
            {profile.type}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0 space-y-4">
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase font-bold">Unique</span>
            <span className="text-sm font-semibold">{formatNumber(profile.uniqueCount)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase font-bold">Nulls</span>
            <span className="text-sm font-semibold text-orange-600">{formatNumber(profile.nullCount)}</span>
          </div>
        </div>

        {profile.type === 'numeric' && (
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-gray-400 uppercase font-bold">
              <span>Min: {formatNumber(profile.min as number)}</span>
              <span>Max: {formatNumber(profile.max as number)}</span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-[70%] opacity-30" />
            </div>
          </div>
        )}

        {profile.top5 && profile.top5.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-[10px] text-gray-400 uppercase font-bold">Top Values</span>
            <div className="space-y-1">
              {profile.top5.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-[11px]">
                  <span className="text-gray-600 truncate max-w-[100px]">{item.value}</span>
                  <span className="font-medium">{formatNumber(item.count)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
