import { Dispatch, SetStateAction, useEffect } from 'react';

export default function useAsyncInitialStateSetter<T>(
  asyncCallback: () => Promise<T>,
  stateSetter: Dispatch<SetStateAction<T | null>>,
) {
  useEffect(() => {
    let mounted = true;
    const get = async () => {
      const value = await asyncCallback();

      if (mounted) {
        stateSetter(value);
      }
    };

    get();
    return () => {
      mounted = false;
    };
  }, [asyncCallback, stateSetter]);
}
