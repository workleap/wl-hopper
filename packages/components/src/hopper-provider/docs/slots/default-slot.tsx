import { ButtonContext, DEFAULT_SLOT } from "@hopper-ui/components";
import type { PropsWithChildren } from "react";

export function MyCustomComponent({ children }: PropsWithChildren) {
    return (
        <ButtonContext.Provider
            value={{
                slots: {
                    [DEFAULT_SLOT]: {
                        className: "left-button"
                    },
                    end: {
                        className: "right-button"
                    }
                }
            }}
        >
            {children}
        </ButtonContext.Provider>
    );
}
