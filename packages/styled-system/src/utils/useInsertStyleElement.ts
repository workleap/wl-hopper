import { isNil } from "./assertion.ts";
import { useIsomorphicInsertionEffect } from "./useIsomorphicInsertionEffect.ts";

/**  Method use for runtime injection of <style> tags in the document's head.
 * @param elementId the id of the <style> tag to inject. If the tag already exists, it is not updated.
 */
export function useInsertStyleElement(elementId: string, cssContent: string | undefined, allowUpdates = true) {
    useIsomorphicInsertionEffect(() => {
        let element = document.getElementById(elementId);
        if (isNil(element)) {
            if (!isNil(cssContent)) {
                element = document.createElement("style");
                element.id = elementId;
                document.head.appendChild(element);
                element.innerText = formatInlineCss(cssContent);

                return () => {
                    element?.remove();
                };
            }
        } else if (allowUpdates) {
            element.innerText = formatInlineCss(cssContent);
        }
    }, [elementId, cssContent]);
}

function formatInlineCss(str: string | undefined) {
    // remove all line breaks, extra spaces and tabs
    return str?.replace(/(\r\n|\n|\r|\s\s)/gm, "") ?? "";
}
