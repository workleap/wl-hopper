import { Theme, type ColorScheme } from "@/context/theme/ThemeProvider";
import sharegateDarkTokens from "../../../datas/sharegate/tokens-dark.json" with { type: "json" };
import sharegateTokens from "../../../datas/sharegate/tokens.json" with { type: "json" };
import workleapDarkTokens from "../../../datas/workleap/tokens-dark.json" with { type: "json" };
import workleapTokens from "../../../datas/workleap/tokens.json" with { type: "json" };

export interface TokenValue {
    name: string;
    value: string;
}

export const allDataTokens = {
    sharegate: {
        light: sharegateTokens,
        dark: sharegateDarkTokens
    },
    workleap: {
        light: workleapTokens,
        dark: workleapDarkTokens
    }
} satisfies Record<Theme, Record<ColorScheme, unknown>>;

export default allDataTokens;

type Primitive = string | number | boolean | bigint | symbol | null | undefined;

type DotPrefix<T extends string> = T extends "" ? "" : `.${T}`;

type KeyPaths<T> = {
    [K in keyof T & string]:
    T[K] extends Primitive
        ? K
        : T[K] extends Array<unknown>
            ? K
            : T[K] extends object
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                ? K | `${K}${DotPrefix<KeyPaths<T[K]>>}`
                : K
}[keyof T & string];

export type AllTokensKeys = KeyPaths<typeof workleapTokens>;

export function getTokens(theme: Theme = "workleap", colorScheme: ColorScheme = "light") {
    return allDataTokens[theme][colorScheme];
}

export function getTokensFromKey(key: AllTokensKeys, theme: Theme = "workleap", colorScheme: ColorScheme = "light"): TokenValue[] {
    const allTokens = getTokens(theme, colorScheme);
    const keys = key.split(".");
    return keys.reduce((obj, part) => {
        return obj?.[part];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, allTokens as any);
}
