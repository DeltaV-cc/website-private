import Image, { alt as origAlt, size as origSize, contentType as origCT } from "./opengraph-image";

export const dynamic = "force-static";
export const alt = origAlt;
export const size = origSize;
export const contentType = origCT;

export default Image;
