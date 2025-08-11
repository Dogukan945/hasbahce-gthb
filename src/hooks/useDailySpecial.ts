import { useEffect, useState } from 'react';
import { subscribeToDailySpecial } from '@/lib/dailySpecialRepository';
import type { DailySpecial } from '@/lib/types';

export function useDailySpecial() {
  const [dailySpecial, setDailySpecial] = useState<DailySpecial | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsub: (() => void) | undefined;
    subscribeToDailySpecial((data) => {
      setDailySpecial(data);
      setLoading(false);
    }).then((u) => { unsub = u; }).catch(() => {/* noop */});
    return () => { if (unsub) unsub(); };
  }, []);

  return { dailySpecial, loading };
} 