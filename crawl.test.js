const { normalizeURL } = require("./crawl.js");
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
