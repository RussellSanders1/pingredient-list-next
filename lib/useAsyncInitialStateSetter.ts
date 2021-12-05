import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function useAsyncInitialStateSetter<T>(
  asyncCallback: () => Promise<T>,
): [T, boolean, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const get = async () => {
      setLoading(true);
      const val = await asyncCallback();

      if (mounted) {
        setValue(val);
        setLoading(false);
      }
    };

    get();
    return () => {
      mounted = false;
    };
  }, []);

  return [value as T, loading, setValue as Dispatch<SetStateAction<T>>];
}
