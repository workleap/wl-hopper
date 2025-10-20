import { Box } from "@hopper-ui/components";

export function Example({ isClickable }: { isClickable: boolean }) {
    return (
        <Box as={isClickable ? "button" : "div"}>
            It is acceptable but not recommended
        </Box>
    );
}
