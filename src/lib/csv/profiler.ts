import { ColumnProfile, ColumnType } from '@/types/csv';
import { isValid, parseISO } from 'date-fns';

export function detectColumnType(values: any[]): ColumnType {
  const nonNullValues = values.filter(v => v !== null && v !== undefined && v !== '');
  if (nonNullValues.length === 0) return 'text';

  // Check for boolean
  const isBoolean = nonNullValues.every(v => 
    typeof v === 'boolean' || 
    (['true', 'false', '1', '0', 'yes', 'no'].includes(String(v).toLowerCase()))
  );
  if (isBoolean) return 'boolean';

  // Check for numeric
  const isNumeric = nonNullValues.every(v => !isNaN(Number(v)));
  if (isNumeric) return 'numeric';

  // Check for date
  const isDate = nonNullValues.every(v => isValid(new Date(v)) && String(v).length > 5);
  if (isDate) return 'date';

  // Categorical vs Text
  const uniqueRatio = new Set(nonNullValues).size / nonNullValues.length;
  if (uniqueRatio < 0.2 || new Set(nonNullValues).size < 15) return 'categorical';

  return 'text';
}

export function profileColumn(name: string, values: any[]): ColumnProfile {
  const type = detectColumnType(values);
  const nonNullValues = values.filter(v => v !== null && v !== undefined && v !== '');
  const nullCount = values.length - nonNullValues.length;
  const uniqueValues = Array.from(new Set(nonNullValues));
  const uniqueCount = uniqueValues.length;

  const profile: ColumnProfile = {
    name,
    type,
    nullCount,
    uniqueCount,
  };

  if (type === 'numeric') {
    const numbers = nonNullValues.map(Number);
    profile.min = Math.min(...numbers);
    profile.max = Math.max(...numbers);
    profile.mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
    
    // Simple histogram for distribution (10 bins)
    const binCount = 10;
    const range = (profile.max as number) - (profile.min as number);
    const binSize = range / binCount;
    const bins = new Array(binCount).fill(0);
    numbers.forEach(n => {
      const binIdx = Math.min(Math.floor((n - (profile.min as number)) / binSize), binCount - 1);
      bins[binIdx]++;
    });
    profile.distribution = bins.map((count, i) => ({
      value: (profile.min as number) + (i * binSize),
      count
    }));
  } else if (type === 'categorical' || type === 'boolean') {
    const counts: Record<string, number> = {};
    nonNullValues.forEach(v => {
      const s = String(v);
      counts[s] = (counts[s] || 0) + 1;
    });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    profile.top5 = sorted.slice(0, 5).map(([value, count]) => ({ value, count }));
    profile.distribution = sorted.map(([value, count]) => ({ value, count }));
  } else if (type === 'date') {
    const dates = nonNullValues.map(v => new Date(v).getTime());
    profile.min = new Date(Math.min(...dates)).toISOString();
    profile.max = new Date(Math.max(...dates)).toISOString();
    profile.dateRange = { start: profile.min, end: profile.max };
  }

  return profile;
}
