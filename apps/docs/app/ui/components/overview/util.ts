import { allComponents } from "@/.contentlayer/generated";
import { getCategories } from "./categories.ts";

export const categories = getCategories(allComponents);

export { allComponents } from "@/.contentlayer/generated";
