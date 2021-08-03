import Script from "next/script";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Container,
  Grid,
  ListIcon,
  ListItem,
  Select,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { ImageDropZone } from "../lib/ImageDropZone";
import { useVips } from "../lib/useVips";
import { useProcessFiles } from "../lib/useProcessFiles";
import { ProcessList } from "../lib/ProcessList";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { FileProcessResult } from "../lib/processFile";
import Head from "next/head";
import { BsCheckCircle } from "react-icons/bs";
import { css } from "@emotion/react";

export default function Home() {
  const { vipsInstance, loading, errored } = useVips();
  const [format, setFormat] = useState("webp");
  const {
    processes,
    addProcesses,
    enqueueAll,
    setDownloaded,
    removeProcesses,
  } = useProcessFiles(vipsInstance, format);

  const dropzone = useDropzone({ onDropAccepted: addProcesses });

  let content: React.ReactNode;

  const downloadAll = () => {
    const zip = new JSZip();

    const ids: string[] = [];
    processes
      .filter((p) => !!p.result)
      .forEach((p) => {
        zip.file(
          (p.result as FileProcessResult).download,
          (p.result as FileProcessResult).buffer
        );
        ids.push(p.id);
      });

    zip
      .generateAsync({ type: "blob" })
      .then(function (content) {
        saveAs(content, "switchfile_images.zip");
      })
      .then(() => {
        setDownloaded(ids);
      });
  };

  if (errored) {
    content = (
      <Container py={6}>
        <Alert display="block" colorScheme="red" textAlign="center">
          Error while loading app.
          <br />
          Most likely your browser doesn't support it.
          <br />
          Try using recent versions of Chrome, Firefox, Edge or Opera
          <br />
          <Text fontSize="sm" color="gray.400">
            {" "}
            p.s. no, Safari doesn't work :/
          </Text>
        </Alert>
      </Container>
    );
  } else if (vipsInstance || loading) {
    content = (
      <>
        <ImageDropZone loading={loading} dropzone={dropzone} />

        <Container>
          <Grid
            alignItems="center"
            templateColumns="auto auto auto"
            gap={2}
            m={4}
          >
            <Select value={format} onChange={(e) => setFormat(e.target.value)}>
              <option value="jpg">JPG</option>
              <option value="png">PNG</option>
              <option value="webp">WebP</option>
            </Select>
            <Button
              isLoading={loading}
              colorScheme="yellow"
              onClick={() => enqueueAll()}
            >
              Convert
            </Button>
            <Button
              size="sm"
              disabled={
                loading ||
                !processes.length ||
                processes.every((p) => p.enqueued || !p.result)
              }
              onClick={() => downloadAll()}
            >
              Download all
            </Button>
          </Grid>
        </Container>
      </>
    );
  } else {
    content = (
      <Alert>Error loading app. Maybe your browser doesn't support it</Alert>
    );
  }

  return (
    <div>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-RBFNVCP4R5"
      />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-RBFNVCP4R5', { 'anonymize_ip': true });
      `,
        }}
      />
      <Script src="/vips/vips.js" />

      {/* Not persiting */}
      {/*<ColorModePicker />*/}

      <Head>
        <title>Switchfile - offline image converter</title>
      </Head>

      <header>
        <Text
          as="h1"
          textAlign="center"
          pt={4}
          fontSize={["1.2rem", "1.7rem"]}
          fontWeight="bold"
          letterSpacing="0.1em"
        >
          SWITCHFILE
        </Text>
        <Text as="h2" textAlign="center" fontSize={["0.8rem", "1.2rem"]}>
          offline image converter right in your browser
        </Text>
        <Text as="h2" textAlign="center" fontSize={["0.8rem", "1.2rem"]}>
          free, no ads, no limitations
        </Text>
      </header>

      <Grid gridTemplateRows="auto 1fr" maxH="100vh">
        <div>{content}</div>

        {processes && processes.length ? (
          <Container
            maxW="container.xl"
            p={4}
            rounded={2}
            borderColor="bg.800"
            borderTopWidth={1}
            borderBottomWidth={1}
            overflowY="auto"
            my={8}
          >
            <ProcessList
              processData={processes}
              onClearClick={({ id }) => removeProcesses([id])}
              onDownloadClick={({ id }) => setDownloaded([id])}
            />
          </Container>
        ) : null}
      </Grid>

      {processes.length < 1 && (
        <Container maxW="container.md" my={6}>
          <Text
            textDecor="underline"
            textAlign="center"
            as={"p"}
            fontSize="lg"
            fontWeight="medium"
            mb={2}
          >
            What is switchfile?
          </Text>
          <Text textAlign="center" as={"p"} fontSize="md" mb={2}>
            Switchfile is an image converting web application that processes
            files in your browser only. It doesn't use any servers. This has the
            benefits of:
          </Text>
          <UnorderedList
            css={css`
              li {
                list-style: none;
                display: flex;
                flex-direction: row;
                justify-items: center;

                svg {
                  margin-top: auto;
                  margin-bottom: auto;
                }
              }
            `}
          >
            <ListItem>
              <ListIcon as={BsCheckCircle} color="green.500" />
              <Text textAlign="center" as={"h2"} fontSize="md">
                Privacy. Your files never leave your machine
              </Text>
            </ListItem>
            <ListItem>
              <ListIcon as={BsCheckCircle} color="green.500" />
              <Text textAlign="center" as={"h2"} fontSize="md">
                Speed. The website wont be slow no matter how many people use it
              </Text>
            </ListItem>
            <ListItem>
              <ListIcon as={BsCheckCircle} color="green.500" />
              <Text textAlign="center" as={"h2"} fontSize="md">
                Cost. Servers can be expensive. That's why this app is
                completely free,
              </Text>
            </ListItem>
            <ListItem>
              <ListIcon as={BsCheckCircle} color="green.500" />
              <Text textAlign="center" as={"h2"} fontSize="md">
                No limitations. No maximum number of files. No download
                limitations, nothing
              </Text>
            </ListItem>
          </UnorderedList>
          <Text mt={4} textAlign="center" as={"p"} fontSize="md" mb={2}>
            Switchfile for now supports converting from various image formats to
            <Text as="strong" pl={1}>
              WEBP, JPG and PNG
            </Text>
          </Text>

          <Text
            mt={8}
            textAlign="center"
            as={"p"}
            fontSize="sm"
            color="gray.400"
            mb={2}
          >
            Made by <a href="mailto:antonmmihaylov@gmail.com">Anton Mihaylov</a>{" "}
            🇧🇬
          </Text>
        </Container>
      )}
    </div>
  );
}
