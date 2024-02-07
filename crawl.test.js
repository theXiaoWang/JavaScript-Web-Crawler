const { normalizeURL, getURLsFromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeURL, strip protocol", () => {
  const input = "https://google.com/maps";
  const actual = normalizeURL(input);
  const expected = "google.com/maps";
  expect(actual).toEqual(expected);
});

test("normalizeURL, strip trailing slash", () => {
  const input = "https://google.com/maps/";
  const actual = normalizeURL(input);
  const expected = "google.com/maps";
  expect(actual).toEqual(expected);
});

test("normalizeURL, capitals", () => {
  const input = "https://Google.com/maps/";
  const actual = normalizeURL(input);
  const expected = "google.com/maps";
  expect(actual).toEqual(expected);
});

test("normalizeURL, strip http", () => {
  const input = "http://Google.com/maps/";
  const actual = normalizeURL(input);
  const expected = "google.com/maps";
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML, absolute URLs", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="https://www.reddit.com/r/SteamDeck/">
        steamdeck oc
      </a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://www.reddit.com/r/SteamDeck";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://www.reddit.com/r/SteamDeck/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML, relative URLs", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="/r/SteamDeck/">
        steamdeck oc
      </a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://www.reddit.com";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://www.reddit.com/r/SteamDeck/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML, both URLs", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="https://www.reddit.com/r1/SteamDeck/">
        steamdeck oc 1
      </a>
      <a href="https://www.reddit.com/r2/SteamDeck/">
        steamdeck oc 2
      </a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://www.reddit.com";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [
    "https://www.reddit.com/r1/SteamDeck/",
    "https://www.reddit.com/r2/SteamDeck/",
  ];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML, invalid URLs", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="invalid">
        invalid
      </a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://www.reddit.com";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
