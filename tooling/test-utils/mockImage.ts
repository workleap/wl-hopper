/**
 * Taken from nextui: https://github.com/nextui-org/nextui/blob/42183353a1a03c567724e125be3414dc52aad48a/packages/utilities/test-utils/src/mocks/image.ts
 * Added to it so that it supports multiple statuses based on the number of times the src is set.
 */

type Status = "loaded" | "error";

const originalImage = window.Image;

export function mockImage() {
    let statuses: Status[] = [];
    let setSrcAttempts = 0;

    //@ts-expect-error - Image is a global object
    window.Image = class Image {
        onload: VoidFunction = () => {
            console.log("called");
        };

        onerror: VoidFunction = () => {};
        _src = "";
        alt = "";
        set src(value: string) {
            this._src = value;
            setTimeout(() => {
                const status = statuses[setSrcAttempts] || "loaded";
                if (status === "error") {
                    this.onerror();
                } else {
                    this.onload();
                }
                setSrcAttempts++;
            }, mockImage.DELAY);
        }

        get src() {
            return this._src;
        }

        hasAttribute(name: string) {
            return name in this;
        }

        getAttribute(name: string) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return name in this ? (this as any)[name] : null;
        }

        constructor() {
            return this;
        }
    };

    return {
        simulate(value: Status[]) {
            statuses = value;
            setSrcAttempts = 0;
        },
        restore() {
            window.Image = originalImage;
        }
    };
}

mockImage.restore = () => {
    window.Image = originalImage;
};

mockImage.DELAY = 100;

export const mocks = {
    image: mockImage
};
