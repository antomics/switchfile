import { useCallback, useEffect, useState } from "react";
import { v4 } from "uuid";

export interface FileData {
  href: string;
  download: string;
}

export interface ProcessData {
  id: string;
  file: File;
  data?: FileData;
  loading: boolean;
  error?: string;
}

async function processFile(
  file: File,
  vipsInstance: typeof vips
): Promise<FileData> {
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
          setProcesses((p) => ({
            ...p,
            [id]: { id, file, loading: true },
          }));

          return processFile(file, vipsInstance)
            .then((result) => {
              setProcesses((p) => ({
                ...p,
                [id]: { id, loading: false, data: result, file },
              }));
            })
            .catch((error) => {
              setProcesses((p) => ({
                ...p,
                [id]: { id, file, loading: false, error: error.message },
              }));
            });
        })
      ).then(() => {
        setProcessing(false);
      });
    },
    [vipsInstance]
  );

  return {
    processes: Object.values(processes),
    processing,
    handleFiles,
  };
};
