export function exportToCSV<T extends Record<string, any>>(
  data: T[],
  filename: string = 'export.csv'
): void {
  if (!data || data.length === 0) {
    alert('No data available to export.');
    return;
  }

  // Get keys from first object
  const keys = Object.keys(data[0]);

  // Build CSV header line
  const header = keys.join(',');

  // Build CSV row lines
  const rows = data.map((row) => {
    return keys
      .map((key) => {
        let value = row[key];
        if (value === null || value === undefined) {
          value = '';
        }
        // Stringify if object or array
        if (typeof value === 'object') {
          value = JSON.stringify(value);
        }
        // Escape quotes and wrap in quotes if contains comma or quote
        const strValue = String(value).replace(/"/g, '""');
        if (strValue.includes(',') || strValue.includes('\n') || strValue.includes('"')) {
          return `"${strValue}"`;
        }
        return strValue;
      })
      .join(',');
  });

  const csvContent = [header, ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
