import { useEffect, useState } from "react";

export interface UseVipsData {
  loading: boolean;
  vipsInstance: typeof vips | undefined;
}

export const useVips = () => {
  const [state, setState] = useState<UseVipsData>({
    vipsInstance: undefined,
    loading: true,
  });

  useEffect(() => {
    const checkForVips = () => {
      if ((window as any).Vips) {
        (window as any)
          .Vips()
          .then((v: any) =>
            setState((s) => ({ ...s, loading: false, vipsInstance: v }))
          );
      } else {
        setTimeout(checkForVips, 100);
      }
    };
    checkForVips();
  }, []);

  return state;
};
