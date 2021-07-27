import { useCallback, useState } from "react";
import { v4 } from "uuid";

export interface FileProcessResult {
  href: string;
  download: string;
}

export interface ProcessData {
  id: string;
  file: File;
  result?: FileProcessResult;
  loading: boolean;
  error?: string;
}

async function processFile(
  file: File,
  vipsInstance: typeof vips
): Promise<FileProcessResult> {
  const originalImageBuffer = await file.arrayBuffer();
  const image: vips.Image =
    vipsInstance.Image.newFromBuffer(originalImageBuffer);

  const webpImageBuffer = new Uint8Array(image.writeToBuffer(".webp"));

  const blob = new Blob([webpImageBuffer], {
    type: "image/webp",
  });

  const url = URL.createObjectURL(blob);

  return {
    href: url,
    download:
      file.name
        .split(".")
        .filter((_, i, all) => {
          return i < all.length - 1;
        })
        .join("") + ".webp",
  };
}

export const useProcessFiles = (vipsInstance?: typeof vips) => {
  const [processes, setProcesses] = useState<Record<string, ProcessData>>({});
  const [processing, setProcessing] = useState(false);

  const setIsLoading = useCallback(
    ({ id, file }: { id: string; file: File }) =>
      setProcesses((p) => ({
        ...p,
        [id]: { id, file, loading: true },
      })),
    []
  );

  const setSuccess = useCallback(
    ({ id, result, file }: Pick<ProcessData, "id" | "result" | "file">) => {
      setProcesses((p) => ({
        ...p,
        [id]: { id, loading: false, result, file },
      }));
    },
    []
  );

  const setError = useCallback(
    ({ id, error, file }: Pick<ProcessData, "id" | "file" | "error">) => {
      setProcesses((p) => ({
        ...p,
        [id]: { id, file, loading: false, error: error },
      }));
    },
    []
  );

  const handleFiles = useCallback(
    (files: File[]) => {
      if (!files || !files.length) {
        return;
      }

      setProcessing(true);

      Promise.all(
        files.map((file) => {
          const id = v4();
          if (!vipsInstance) return;

          setIsLoading({ id, file });

          return processFile(file, vipsInstance)
            .then((result) => {
              setSuccess({ id, file, result });
            })
            .catch((error) => {
              setError({ id, file, error: error.message || error.toString() });
            });
        })
      ).then(() => {
        setProcessing(false);
      });
    },
    [setError, setIsLoading, setSuccess, vipsInstance]
  );

  return {
    processes: Object.values(processes),
    processing,
    handleFiles,
  };
};
