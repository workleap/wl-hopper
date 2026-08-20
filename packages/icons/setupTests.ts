/// <reference types="@testing-library/jest-dom" />
import "@testing-library/jest-dom/vitest";
import { failOnConsole } from "@hopper-ui/vitest-config/failOnConsole";

// This will fail the test if there is a console.error or console.warn
failOnConsole();
