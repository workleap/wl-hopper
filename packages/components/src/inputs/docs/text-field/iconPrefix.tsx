import { TextField } from "@hopper-ui/components";
import { SearchIcon } from "@hopper-ui/icons";

export default function Example() {
    return (
        <TextField placeholder="Full name (e.g., Jane Smith)" prefix={<SearchIcon />} label="Name" />
    );
}
