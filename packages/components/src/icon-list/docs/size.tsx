import { IconList, Stack } from "@hopper-ui/components";
import { StarIcon, StarSolidIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <Stack alignX="center">
            <IconList size="sm">
                <StarSolidIcon />
                <StarSolidIcon />
                <StarSolidIcon />
                <StarSolidIcon />
                <StarIcon />
            </IconList>
            <IconList size="md">
                <StarSolidIcon />
                <StarSolidIcon />
                <StarSolidIcon />
                <StarSolidIcon />
                <StarIcon />
            </IconList>
            <IconList size="lg">
                <StarSolidIcon />
                <StarSolidIcon />
                <StarSolidIcon />
                <StarSolidIcon />
                <StarIcon />
            </IconList>
        </Stack>
    );
}
