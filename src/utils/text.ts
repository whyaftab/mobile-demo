export const extractSrcFromIframe = (iframeString: string) => {
  const regex = /src="([^"]+)"/; // Matches src attribute value within double quotes
  const match = regex.exec(iframeString);

  if (match) {
    const src = match[1]; // Extracted src value
    return src;
  } else {
    return iframeString.replace("watch?v=", "embed/");
  }
};
