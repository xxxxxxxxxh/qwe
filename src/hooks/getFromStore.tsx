import type { Product } from '@/interfaces';
import { useEffect, useState } from 'react';

export function useFromStore<T>(
  store: (callback: (state: T) => Product[]) => Product[],
  storeCallBack: (state: T) => Product[]
) {
  const result = store(storeCallBack);
  const [state, setState] = useState<Product[]>([]);
  useEffect(() => {
    setState(result);
  }, [result]);
  return state;
}
