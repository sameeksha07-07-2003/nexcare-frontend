// src/utils/cropImage.js

function createImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    // Needed so canvas.toBlob() doesn't throw a "tainted canvas" security
    // error for cross-origin images (not an issue for local object URLs,
    // but safe to always set).
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });
}

/**
 * Crops `imageSrc` to the rectangle described by `pixelCrop`
 * (as produced by react-easy-crop's onCropComplete), resizes it to a
 * square `outputSize`, and resolves with a JPEG Blob ready to upload.
 */
export async function getCroppedImageBlob(imageSrc, pixelCrop, outputSize = 512) {
  const image = await createImage(imageSrc);

  const canvas = document.createElement("canvas");
  canvas.width = outputSize;
  canvas.height = outputSize;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    outputSize,
    outputSize
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Canvas produced an empty image"));
          return;
        }
        resolve(blob);
      },
      "image/jpeg",
      0.92
    );
  });
}