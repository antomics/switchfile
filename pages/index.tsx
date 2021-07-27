import Script from "next/script";
import React from "react";
import { Alert, Flex, Spinner } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { ImageDropZone } from "../lib/ImageDropZone";
import { useVips } from "../lib/useVips";
import { useProcessFiles } from "../lib/useProcessFiles";
import { ProcessList } from "../lib/ProcessList";

export default function Home() {
  const { vipsInstance, loading } = useVips();
  const { processing, processes, handleFiles } = useProcessFiles(vipsInstance);
  const dropzone = useDropzone({ onDropAccepted: handleFiles });

  let content: React.ReactNode;

  if (loading) {
    content = (
      <Flex minH="100vh" justifyContent="center" alignItems={"center"}>
        <Spinner />
      </Flex>
    );
  } else if (vipsInstance) {
    content = <ImageDropZone dropzone={dropzone} />;
  } else {
    content = (
      <Alert>Error loading app. Maybe your browser doesn't support it</Alert>
    );
  }

  return (
    <div>
      <Script src="/vips/vips.js" />

      {content}

      {processes && processes.length ? (
        <ProcessList processData={processes} />
      ) : null}
    </div>
  );
}
