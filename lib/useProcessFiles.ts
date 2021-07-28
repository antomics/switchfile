import { keyBy } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { v4 } from "uuid";
import { FileProcessResult, processFile } from "./processFile";

export interface ProcessModel {
  id: string;
  file: File;
  enqueued: boolean;
  result?: FileProcessResult;
  loading: boolean;
  error?: string;
  downloaded?: boolean;
}

export function useProcessFiles(
  vipsInstance: typeof vips | undefined,
  targetFormat: string
) {
  const [processes, setProcesses] = useState<ProcessModel[]>([]);

  const updateProcess = useCallback(
    (newProcessData: Partial<ProcessModel> & Pick<ProcessModel, "id">) =>
      setProcesses((list) =>
        list.map((p) =>
          p.id == newProcessData.id
            ? {
                ...p,
                ...newProcessData,
              }
            : p
        )
      ),
    []
  );

  const updateProcesses = useCallback(
    (
      ids: Record<string, any> | Array<string>,
      newProcessData: Partial<ProcessModel>
    ) => {
      const idsMap = Array.isArray(ids) ? keyBy(ids, (id) => id) : ids;
      setProcesses((list) =>
        list.map((p) =>
          idsMap[p.id]
            ? {
                ...p,
                ...newProcessData,
              }
            : p
        )
      );
    },
    []
  );

  const setIsLoading = useCallback(
    (id: string) =>
      updateProcess({
        id,
        loading: true,
        enqueued: false,
        result: undefined,
        error: undefined,
        downloaded: false,
      }),
    [updateProcess]
  );

  const setSuccess = useCallback(
    (id: string, result: FileProcessResult) => {
      updateProcess({
        id,
        loading: false,
        result,
        enqueued: false,
        error: undefined,
        downloaded: false,
      });
    },
    [updateProcess]
  );

  const setError = useCallback(
    (id: string, error: string | Error) => {
      updateProcess({
        id,
        loading: false,
        error:
          typeof error === "string" ? error : error.message || error.toString(),
        enqueued: false,
        result: undefined,
        downloaded: false,
      });
    },
    [updateProcess]
  );

  const addProcesses = useCallback((files: File[]) => {
    if (!files || !files.length) {
      return;
    }

    const newProcesses: ProcessModel[] = files.map((file) => ({
      enqueued: false,
      loading: false,
      downloaded: false,
      file,
      id: v4(),
    }));

    setProcesses((p) => [...p, ...newProcesses]);
  }, []);

  useEffect(() => {
    processes
      .filter((p) => p.enqueued && !p.loading)
      .forEach((item) => {
        if (!vipsInstance) return;

        setIsLoading(item.id);

        processFile(item.file, vipsInstance, targetFormat)
          .then((result) => {
            setSuccess(item.id, result);
          })
          .catch((error) => {
            setError(item.id, error);
          });
      });
  }, [
    targetFormat,
    processes,
    setError,
    setIsLoading,
    setSuccess,
    vipsInstance,
  ]);

  const enqueue = useCallback(
    (ids: string[]) => {
      updateProcesses(
        keyBy(ids, (id) => id),
        {
          enqueued: true,
          loading: false,
          error: undefined,
          result: undefined,
          downloaded: false,
        }
      );
    },
    [updateProcesses]
  );

  const enqueueAll = useCallback(() => {
    enqueue(
      processes.filter((p) => !p.enqueued && !p.loading).map((p) => p.id)
    );
  }, [enqueue, processes]);

  const setDownloaded = useCallback(
    (ids: string[]) => {
      updateProcesses(ids, { downloaded: true });
    },
    [updateProcesses]
  );

  const setDownloadedAll = useCallback(() => {
    updateProcesses(
      processes.filter((p) => !p.downloaded).map((p) => p.id),
      { downloaded: true }
    );
  }, [processes, updateProcesses]);

  const removeProcesses = useCallback((ids: string[]) => {
    setProcesses((list) => list.filter((p) => !ids.includes(p.id)));
  }, []);

  return {
    processes,
    addProcesses,
    enqueue,
    enqueueAll,
    setDownloaded,
    setDownloadedAll,
    removeProcesses,
  };
}
