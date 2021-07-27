import Script from "next/script";
import React from "react";
import {
  Alert,
  Container,
  Flex,
  Icon,
  ListItem,
  Spinner,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { ImageDropZone } from "../lib/ImageDropZone";
import { useVips } from "../lib/useVips";
import { useProcessFiles } from "../lib/useProcessFiles";
import { BsCheck } from "react-icons/bs";

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
        <Container>
          <UnorderedList>
            {processes.map((item) => (
              <ListItem
                backgroundColor="gray.700"
                padding="0.5rem"
                rounded={2}
                border="gray.600"
                key={item.id}
                display="flex"
                justifyContent="space-between"
              >
                {item.data ? (
                  <a href={item.data.href} download={item.data.download}>
                    {item.data.download}
                  </a>
                ) : (
                  <p>{item.file.name}</p>
                )}
                <div>
                  {item.loading && <Spinner />}{" "}
                  {item.data && <Icon as={BsCheck} color="green.400" />}
                  {item.error && (
                    <Text fontSize="md" color="red.400">
                      {item.error}
                    </Text>
                  )}
                </div>
              </ListItem>
            ))}
          </UnorderedList>
        </Container>
      ) : null}
    </div>
  );
}
