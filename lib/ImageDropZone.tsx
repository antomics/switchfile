// @flow
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { DropzoneState } from "react-dropzone";
import { css } from "@emotion/react";

type Props = { dropzone: DropzoneState };

export const ImageDropZone = ({
  dropzone: { getRootProps, getInputProps },
}: Props) => {
  const border = useColorModeValue("gray.300", "gray.600");
  const bg = useColorModeValue("gray.200", "gray.700");
  const color = useColorModeValue("gray.600", "gray.500");

  return (
    <Box p={6}>
      <Flex
        css={css`
          .dropzone {
            text-align: center;
            padding: 20px;
            border-radius: 2px;
            min-height: 150px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 2px dashed;
          }
        `}
        borderColor={border}
        backgroundColor={bg}
        color={color}
        justify="center"
        alignItems="center"
      >
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some images here, or click to select files</p>
        </div>
      </Flex>
    </Box>
  );
};
