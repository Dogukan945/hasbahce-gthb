import { useEffect, useState } from 'react';
import { subscribeToDailySpecial } from '@/lib/dailySpecialRepository';
import type { DailySpecial } from '@/lib/types';

export function useDailySpecial() {
  const [dailySpecial, setDailySpecial] = useState<DailySpecial | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToDailySpecial((data) => {
      setDailySpecial(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { dailySpecial, loading };
} 