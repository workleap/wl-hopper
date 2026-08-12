import { ButtonContext } from "@hopper-ui/components";
import { type PropsWithChildren, useState } from "react";

export function Stepper({ children }: PropsWithChildren) {
    const [value, setValue] = useState(0);

    return (
        <ButtonContext.Provider
            value={{
                slots: {
                    increment: {
                        onPress: () => setValue(value + 1)
                    },
                    decrement: {
                        onPress: () => setValue(value - 1)
                    }
                }
            }}
        >
            {children}
        </ButtonContext.Provider>
    );
}
