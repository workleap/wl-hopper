import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import failOnConsole from "jest-fail-on-console";
import { enableFetchMocks } from "jest-fetch-mock";
import { TextDecoder, TextEncoder } from "util";

// Add TextEncoder and TextDecoder to the global scope
// These are required by react-router-dom
// @ts-expect-error global variables
global.TextEncoder = TextEncoder;

// @ts-expect-error global variables
global.TextDecoder = TextDecoder;

// This is used for tests with react-router-dom.
// There was an error thrown "ReferenceError: Request is not defined"
enableFetchMocks();

// This will fail the test if there is a console.error or console.warn
failOnConsole();


