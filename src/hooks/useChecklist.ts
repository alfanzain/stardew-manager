import { useState, useEffect } from 'react';

export function useChecklist(storageKey: string) {
  const [checked, setChecked] = useState<Set<string>>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify([...checked]));
  }, [checked, storageKey]);

  const toggle = (id: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const isChecked = (id: string) => checked.has(id);
  
  const progress = (total: number) => ({
    completed: checked.size,
    total,
    percentage: total > 0 ? Math.round((checked.size / total) * 100) : 0
  });

  return { checked, toggle, isChecked, progress };
}
