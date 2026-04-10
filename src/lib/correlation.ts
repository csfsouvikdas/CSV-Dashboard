export function calculatePearsonCorrelation(x: number[], y: number[]): number {
  const n = x.length;
  if (n !== y.length || n === 0) return 0;

  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((a, b, i) => a + b * y[i], 0);
  const sumX2 = x.reduce((a, b) => a + b * b, 0);
  const sumY2 = y.reduce((a, b) => a + b * b, 0);

  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt(
    (n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY)
  );

  if (denominator === 0) return 0;
  return numerator / denominator;
}

export function computeCorrelationMatrix(data: any[], numericCols: string[]) {
  const matrix: Record<string, Record<string, number>> = {};

  numericCols.forEach((col1) => {
    matrix[col1] = {};
    numericCols.forEach((col2) => {
      const x = data.map((d) => Number(d[col1]) || 0);
      const y = data.map((d) => Number(d[col2]) || 0);
      matrix[col1][col2] = calculatePearsonCorrelation(x, y);
    });
  });

  return matrix;
}
