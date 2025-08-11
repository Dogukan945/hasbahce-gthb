import dynamic, { type Loader } from 'next/dynamic';
import type { ReactElement, ComponentType } from 'react';

export const dynamicNoSSR = <P extends object>(
  loader: Loader<ComponentType<P>>,
  fallback: ReactElement | null = null
) =>
  dynamic<ComponentType<P>>(loader, {
    ssr: false,
    loading: () => fallback,
  });


