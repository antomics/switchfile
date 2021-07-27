import { Icon, ListItem, Spinner, Text } from "@chakra-ui/react";
import { BsCheck, BsDownload } from "react-icons/bs";
import React from "react";
import { ProcessData } from "./useProcessFiles";

function ProcessListItemText({
  item: { result, file },
}: {
  item: ProcessData;
}) {
  if (result) {
    return (
      <Text
        as="a"
        color="green.400"
        _hover={{ color: "green.300" }}
        href={result.href}
        download={result.download}
      >
        {result.download}
      </Text>
    );
  } else {
    return <p>{file.name}</p>;
  }
}

function ProcessListItemIcons({
  item: { result, file, loading, error },
}: {
  item: ProcessData;
}) {
  return (
    <div>
      {loading && <Spinner />}{" "}
      {result && (
        <>
          <a href={result.href} download={result.download}>
            <Icon marginRight={3} as={BsDownload} />
          </a>
          <Icon as={BsCheck} color="green.400" />
        </>
      )}
      {error && (
        <Text fontSize="md" color="red.400">
          {error}
        </Text>
      )}
    </div>
  );
}

export function ProcessListItem({ item }: { item: ProcessData }) {
  return (
    <ListItem
      backgroundColor="gray.700"
      p={2}
      rounded={2}
      m={2}
      border="gray.600"
      display="flex"
      justifyContent="space-between"
    >
      <ProcessListItemText item={item} />
      <ProcessListItemIcons item={item} />
    </ListItem>
  );
}
