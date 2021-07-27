import { ProcessData } from "./useProcessFiles";
import { Container, UnorderedList } from "@chakra-ui/react";
import React from "react";
import { ProcessListItem } from "./ProcessListItem";

export function ProcessList(props: { processData: ProcessData[] }) {
  return (
    <Container>
      <UnorderedList>
        {props.processData.map((item) => (
          <ProcessListItem key={item.id} item={item} />
        ))}
      </UnorderedList>
    </Container>
  );
}
