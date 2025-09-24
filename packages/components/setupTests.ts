import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import failOnConsole from "jest-fail-on-console";
import { enableFetchMocks } from "jest-fetch-mock";
import { TextDecoder, TextEncoder } from "util";

/**
 * React Router (and some of its transitive deps) expect the Web Encoding API
 * (TextEncoder / TextDecoder) to exist on the global object. jsdom does not
 * provide them, so we patch them in from Node’s util. This makes our test
 * environment behave closer to a browser. Once we migrate from jsdom to
 * happy-dom, this workaround will no longer be needed since happy-dom
 * includes these globals out of the box.
 */
global.TextEncoder = TextEncoder as typeof global.TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;

// This is used for tests with react-router-dom.
// There was an error thrown "ReferenceError: Request is not defined"
enableFetchMocks();

// This will fail the test if there is a console.error or console.warn
failOnConsole();


