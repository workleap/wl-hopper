/// <reference types="@testing-library/jest-dom" />
import "@testing-library/jest-dom/vitest";
import { failOnConsole } from "@hopper-ui/vitest-config/failOnConsole";

// Node 18+ provides TextEncoder/TextDecoder, fetch and Request as globals, so the
// former polyfill (from node:util) and jest-fetch-mock (which only existed to
// define `Request` for react-router) are no longer needed under Vitest + jsdom.

// This will fail the test if there is a console.error or console.warn
failOnConsole();
