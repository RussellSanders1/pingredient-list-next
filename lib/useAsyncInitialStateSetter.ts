import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function useAsyncInitialStateSetter<T>(
  asyncCallback: () => Promise<T>,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>();

  useEffect(() => {
    let mounted = true;
    const get = async () => {
      const val = await asyncCallback();

      if (mounted) {
        setValue(val);
      }
    };

    get();
    return () => {
      mounted = false;
    };
  }, []);

  return [value as T, setValue as Dispatch<SetStateAction<T>>];
}
