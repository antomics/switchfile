export interface FileProcessResult {
  href: string;
  download: string;
  buffer: Uint8Array;
}

export async function processFile(
  file: File,
  vipsInstance: typeof vips,
  targetFormat: string
): Promise<FileProcessResult> {
  const originalImageBuffer = await file.arrayBuffer();
  const image: vips.Image =
    vipsInstance.Image.newFromBuffer(originalImageBuffer);

  const webpImageBuffer = new Uint8Array(
    image.writeToBuffer("." + targetFormat)
  );

  const blob = new Blob([webpImageBuffer], {
    type: "image/webp",
  });

  const url = URL.createObjectURL(blob);

  return {
    buffer: webpImageBuffer,
    href: url,
    download:
      file.name
        .split(".")
        .filter((_, i, all) => {
          return i < all.length - 1;
        })
        .join("") +
      "." +
      targetFormat,
  };
}
