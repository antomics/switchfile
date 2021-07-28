import {
  Button,
  ButtonGroup,
  Icon,
  IconButton,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import {
  BsCheck,
  BsDownload,
  BsFileCheck,
  BsFillTrashFill,
} from "react-icons/bs";
import React from "react";
import { ProcessModel } from "./useProcessFiles";

function ProcessListItemText({
  item: { result, file },
}: {
  item: ProcessModel;
}) {
  if (result) {
    return (
      <div>
        <Text fontSize="lg">{file.name}</Text>
        <Text color="gray.500" fontSize="xs">
          {result.download}
        </Text>
      </div>
    );
  } else {
    return <p>{file.name}</p>;
  }
}

function ProcessListItemIcons({
  item,
  onDownloadClick,
  onClearClick,
}: {
  item: ProcessModel;
  onClearClick: (item: ProcessModel) => any;
  onDownloadClick: (item: ProcessModel) => any;
}) {
  const { result, file, loading, error, downloaded } = item;
  return (
    <ButtonGroup>
      {loading && <Spinner />}{" "}
      {result && (
        <Button
          colorScheme="green"
          leftIcon={<Icon as={BsDownload} />}
          as="a"
          href={result.href}
          download={result.download}
          onClick={() => onDownloadClick(item)}
        >
          Download
        </Button>
      )}
      {downloaded && (
        <IconButton
          aria-label={"Clear"}
          icon={<Icon as={BsFillTrashFill} />}
          onClick={() => onClearClick(item)}
        />
      )}
      {error && (
        <Text fontSize="md" color="red.400">
          {error}
        </Text>
      )}
    </ButtonGroup>
  );
}

export function ProcessListItem({
  item,
  onDownloadClick,
  onClearClick,
}: {
  onDownloadClick: (item: ProcessModel) => any;
  onClearClick: (item: ProcessModel) => any;
  item: ProcessModel;
}) {
  return (
    <ListItem
      backgroundColor="gray.700"
      p={4}
      rounded={2}
      borderColor="gray.600"
      borderWidth={1}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <ProcessListItemText item={item} />
      <ProcessListItemIcons
        onClearClick={onClearClick}
        onDownloadClick={onDownloadClick}
        item={item}
      />
    </ListItem>
  );
}
