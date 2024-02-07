// Normalize the strings of the same website
//eg. https://google.com, http://google.com, https://Google.com should come out as the same string as google.com
function normalizeURL(urlString) {
  const urlObject = new URL(urlString);

  const hostPath = `${urlObject.hostname}${urlObject.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

normalizeURL("https://google.com/maps");

module.exports = {
  normalizeURL,
};
