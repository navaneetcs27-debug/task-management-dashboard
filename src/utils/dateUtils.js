export const formatDate = (dateString) => {
  if (!dateString) return '-';
  try {
    const [year, month, day] = dateString.split('-');
    if (!year || !month || !day) return dateString;
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
};

export const isOverdue = (dateString, status) => {
  if (!dateString || status === 'Completed') return false;
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [year, month, day] = dateString.split('-');
    const due = new Date(year, month - 1, day);
    return due < today;
  } catch {
    return false;
  }
};
