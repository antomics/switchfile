import { ProcessModel } from "./useProcessFiles";
import { Container, UnorderedList } from "@chakra-ui/react";
import React from "react";
import { ProcessListItem } from "./ProcessListItem";

export function ProcessList(props: {
  processData: ProcessModel[];
  onDownloadClick: (item: ProcessModel) => any;
  onClearClick: (item: ProcessModel) => any;
}) {
  return (
    <UnorderedList spacing={3} m={0}>
      {props.processData.map((item) => (
        <ProcessListItem
          onClearClick={props.onClearClick}
          onDownloadClick={props.onDownloadClick}
          key={item.id}
          item={item}
        />
      ))}
    </UnorderedList>
  );
}
