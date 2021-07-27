// @flow
import { Flex } from "@chakra-ui/react";
import * as React from "react";
import { DropzoneState } from "react-dropzone";
import { css } from "@emotion/react";

type Props = { dropzone: DropzoneState };

export const ImageDropZone = ({
  dropzone: { getRootProps, getInputProps },
}: Props) => {
  return (
    <Flex
      css={css`
        .dropzone {
          text-align: center;
          padding: 20px;
          border-radius: 2px;
          min-height: 150px;
          margin: 2rem;
          min-width: 450px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 2px dashed var(--chakra-colors-gray-600);
          background-color: var(--chakra-colors-gray-700);
          color: var(--chakra-colors-gray-500);
        }
      `}
      justify="center"
      alignItems="center"
    >
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </Flex>
  );
};
