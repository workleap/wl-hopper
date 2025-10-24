import { getFormattedCode } from "@/app/lib/getComponentCode.ts";
import { highlightCode } from "@/components/highlightCode";

export async function mockGetComponentCode(code: string) {
    const mockCode = getFormattedCode(code);

    return await highlightCode(mockCode);
}
