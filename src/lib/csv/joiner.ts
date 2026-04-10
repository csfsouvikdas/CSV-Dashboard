import Papa from 'papaparse';

export type JoinType = 'inner' | 'left' | 'right';

export function joinCSVs(
  csv1: any[],
  csv2: any[],
  joinColumn: string,
  type: JoinType
): any[] {
  const result: any[] = [];
  
  if (type === 'left' || type === 'inner') {
    csv1.forEach(row1 => {
      const match = csv2.find(row2 => row2[joinColumn] === row1[joinColumn]);
      if (match) {
        result.push({ ...row1, ...match });
      } else if (type === 'left') {
        result.push({ ...row1 });
      }
    });
  } else if (type === 'right') {
    csv2.forEach(row2 => {
      const match = csv1.find(row1 => row1[joinColumn] === row2[joinColumn]);
      result.push(match ? { ...match, ...row2 } : { ...row2 });
    });
  }
  
  // Fix row2 scope in right join correctly
  if (type === 'right') {
    const finalResult: any[] = [];
    csv2.forEach(row2 => {
      const match = csv1.find(row1 => row1[joinColumn] === row2[joinColumn]);
      finalResult.push(match ? { ...match, ...row2 } : { ...row2 });
    });
    return finalResult;
  }

  return result;
}

export function detectCommonColumns(csv1: any[], csv2: any[]): string[] {
  if (csv1.length === 0 || csv2.length === 0) return [];
  const keys1 = Object.keys(csv1[0]);
  const keys2 = Object.keys(csv2[0]);
  return keys1.filter(k => keys2.includes(k));
}
