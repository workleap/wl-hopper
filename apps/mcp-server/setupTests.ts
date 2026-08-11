import "@testing-library/jest-dom/vitest";
import failOnConsole from "jest-fail-on-console";

// Node 18+ provides global fetch/Request, so jest-fetch-mock (previously used only
// to define `Request`) is no longer needed.

// This will fail the test if there is a console.error or console.warn
failOnConsole();
