import type { ColorScheme } from "@hopper-ui/styled-system";
import { getDataTokens } from "../getTokens";

export function useGetDataTokens({ colorScheme }: { colorScheme?: ColorScheme }) {
    return getDataTokens({ colorScheme });
}
