const { JSDOM } = require("jsdom");

async function crawlPage(currentURL) {
  console.log(`actively crawling: ${currentURL}`);
  try {
    const response = await fetch(currentURL);
    if (response.status > 399) {
      console.log(
        `error in fetch with status code: ${response.status}, on page ${currentURL}`
      );
      return;
    }

    const contentType = response.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(
        `None html response, content type: ${contentType}, on page ${currentURL}`
      );
      return;
    }
    console.log(await response.text());
  } catch (error) {
    console.log(`error fetching ${error}, on page ${currentURL}`);
  }
}

function getURLsFromHTML(inputHTMLBody, inputBaseURL) {
  const urls = [];
  const dom = new JSDOM(inputHTMLBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === "/") {
      //relative
      try {
        const urlObject = new URL(`${inputBaseURL}${linkElement.href}`);
        urls.push(urlObject.href);
      } catch (error) {
        console.log(`error with relative url: ${error.message}`);
      }
    } else {
      //absolute
      try {
        const urlObject = new URL(linkElement.href);
        urls.push(urlObject.href);
      } catch (error) {
        console.log(`error with absolute url: ${error.message}`);
      }
    }
  }
  return urls;
}

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

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
