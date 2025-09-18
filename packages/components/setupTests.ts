import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import failOnConsole from "jest-fail-on-console";
import { enableFetchMocks } from "jest-fetch-mock";
import { TextDecoder, TextEncoder } from "util";

// Add TextEncoder and TextDecoder to the global scope
// These are required by react-router-dom
global.TextEncoder = TextEncoder as typeof global.TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;

// This is used for tests with react-router-dom.
// There was an error thrown "ReferenceError: Request is not defined"
enableFetchMocks();

// This will fail the test if there is a console.error or console.warn
failOnConsole();


