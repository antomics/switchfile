import { useEffect, useState } from "react";

export interface UseVipsData {
  loading: boolean;
  errored: boolean;
  vipsInstance: typeof vips | undefined;
}

export const useVips = () => {
  const [state, setState] = useState<UseVipsData>({
    vipsInstance: undefined,
    loading: true,
    errored: false,
  });

  useEffect(() => {
    const checkForVips = () => {
      if ((window as any).Vips) {
        try {
          (window as any)
            .Vips()
            .then((v: any) =>
              setState((s) => ({ ...s, loading: false, vipsInstance: v }))
            );
        } catch (e) {
          setState({ errored: true, loading: false, vipsInstance: undefined });
        }
      } else {
        setTimeout(checkForVips, 100);
      }
    };
    checkForVips();
  }, []);

  return state;
};
