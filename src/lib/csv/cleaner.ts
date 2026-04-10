import { CSVData } from '@/types/csv';
import { profileColumn } from './profiler';

export type NullStrategy = 'drop' | 'mean' | 'median' | 'mode' | 'custom';

export function fillNulls(data: any[], col: string, strategy: NullStrategy, customValue?: any): any[] {
  const values = data.map(r => r[col]).filter(v => v !== null && v !== undefined && v !== '');
  
  let fillValue = customValue;
  
  if (strategy === 'mean') {
    const nums = values.map(Number).filter(n => !isNaN(n));
    fillValue = nums.length > 0 ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;
  } else if (strategy === 'median') {
    const nums = values.map(Number).filter(n => !isNaN(n)).sort((a, b) => a - b);
    fillValue = nums[Math.floor(nums.length / 2)] || 0;
  } else if (strategy === 'drop') {
    return data.filter(r => r[col] !== null && r[col] !== undefined && r[col] !== '');
  }

  return data.map(r => ({
    ...r,
    [col]: (r[col] === null || r[col] === undefined || r[col] === '') ? fillValue : r[col]
  }));
}

export function removeDuplicates(data: any[]): any[] {
  const seen = new Set();
  return data.filter(r => {
    const s = JSON.stringify(r);
    return seen.has(s) ? false : seen.add(s);
  });
}

export function renameColumn(data: any[], oldName: string, newName: string): any[] {
  return data.map(r => {
    const newRow = { ...r };
    newRow[newName] = newRow[oldName];
    delete newRow[oldName];
    return newRow;
  });
}
